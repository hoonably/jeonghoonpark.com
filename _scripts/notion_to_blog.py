import os
import re
from datetime import datetime
from urllib.parse import unquote
import shutil
import zipfile
from bs4 import BeautifulSoup, NavigableString
from PIL import Image

try:
    from pillow_heif import register_heif_opener
    register_heif_opener()
except ImportError:
    print("pillow_heif not installed. HEIC conversion might fail.")

# Config
APP_BLOG_DIR = "content/blog"
IMAGE_DIR = "public/images/blog"
CSS_FILE = "app/blog/notion.css"

def parse_date(date_text):
    # Try YYYY-MM-DD or YYYY.MM.DD
    match = re.search(r'(\d{4})[./-]\s*(\d{1,2})[./-]\s*(\d{1,2})', date_text)
    if match:
        y, m, d = map(int, match.groups())
        return f"{y:04d}-{m:02d}-{d:02d}", f"{y:04d}-{m:02d}-{d:02d} 00:00:00 +09:00"
        
    # Try YYYY년 MM월 DD일
    match = re.search(r'(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일', date_text)
    if match:
        y, m, d = map(int, match.groups())
        return f"{y:04d}-{m:02d}-{d:02d}", f"{y:04d}-{m:02d}-{d:02d} 00:00:00 +09:00"
        
    # Try October 25, 2023 format
    match = re.search(r'([a-zA-Z]+)\s+(\d{1,2}),\s+(\d{4})', date_text)
    if match:
        month_str, d, y = match.groups()
        try:
            m = datetime.strptime(month_str[:3], "%b").month
            return f"{int(y):04d}-{m:02d}-{int(d):02d}", f"{int(y):04d}-{m:02d}-{int(d):02d} 00:00:00 +09:00"
        except:
            pass

    # Fallback to current date if parsing fails
    now = datetime.now()
    return now.strftime("%Y-%m-%d"), now.strftime("%Y-%m-%d %H:%M:%S +09:00")

def slugify(text: str) -> str:
    # Keep Korean, English, numbers, dashes
    text = re.sub(r'[^\w\s\uac00-\ud7a3-]', '', text)
    return re.sub(r'[\s\-]+', '-', text.strip()).lower()

def extract_metadata_and_clean(html: str):
    soup = BeautifulSoup(html, "html.parser")
    
    # 1. Extract CSS and save it later in write_markdown_file
    styles = soup.find_all("style")
    for style in styles:
        style.decompose()

    # Fix React 'contenteditable' warning
    for tag in soup.find_all(True, attrs={"contenteditable": True}):
        del tag["contenteditable"]

    # Fix Notion math duplicate text rendering (remove MathML payload, keep katex-html)
    for mathml in soup.find_all("span", class_="katex-mathml"):
        mathml.decompose()

    # Optional: in some Notion exports, the math tag itself might linger
    for math_tag in soup.find_all("math"):
        math_tag.decompose()

    # 2. Extract Title
    title = "Untitled"
    h1 = soup.find("h1", class_="page-title")
    if h1:
        title = h1.get_text().strip()
        h1.decompose()
    else:
        title_tag = soup.find("title")
        if title_tag:
            title = title_tag.get_text().strip()

    # 3. Extract Properties
    tags = []
    category = "Uncategorized"
    raw_date = datetime.now().strftime("%Y-%m-%d")
    date_str = f"{raw_date} 00:00:00 +09:00"

    prop_table = soup.find("table", class_="properties")
    if prop_table:
        for tr in prop_table.find_all("tr"):
            th = tr.find("th")
            td = tr.find("td")
            if th and td:
                key = th.get_text().strip().lower()
                val = td.get_text().strip()
                if "tag" in key or "태그" in key:
                    spans = td.find_all("span", class_="selected-value")
                    if spans:
                        tags = [s.get_text().strip() for s in spans]
                    else:
                        tags = [t.strip() for t in val.split(',')]
                elif "category" in key or "카테고리" in key:
                    category = val
                elif "date" in key or "time" in key or "날짜" in key or "일시" in key or "생성일" in key:
                    time_tag = td.find("time")
                    text_val = time_tag.get_text().strip() if time_tag else val
                    if text_val:
                        raw_date, date_str = parse_date(text_val)
        prop_table.decompose()

    if soup.head:
        soup.head.decompose()

    return soup, title, tags, category, raw_date, date_str

def rewrite_image_paths_soup(soup, target_folder_name):
    for tag in soup.find_all(["img", "a"]):
        for attr in ["src", "href"]:
            if tag.has_attr(attr):
                val = unquote(tag[attr])
                if not val.startswith("http") and not val.startswith("#"):
                    base_name = os.path.basename(val)
                    if base_name:
                        # Change extension to .webp for images
                        if attr == "src" and base_name.lower().endswith(('.png', '.jpg', '.jpeg', '.heic')):
                            base_name = os.path.splitext(base_name)[0] + ".webp"
                        tag[attr] = f"/images/blog/{target_folder_name}/{base_name}"

def convert_figure_images(soup):
    for figure in soup.find_all("figure", class_="image"):
        a_tag = figure.find("a")
        img_tag = a_tag.find("img") if a_tag else figure.find("img")
        if img_tag is None:
            continue
        
        # Format image tags cleanly
        img_tag["class"] = "img-fluid rounded z-depth-1 px-to-pct"
        img_tag["loading"] = "lazy"
        
        # Convert absolute width (px) to relative width (%)
        # Baseline content width suggested by user: 710px
        style = img_tag.get("style", "")
        if style:
            # Handle both width and height to maintain aspect ratio
            # Use [\d\.]+ to handle decimal values like 643.98px
            px_match = re.search(r'width:\s*([\d\.]+)px', style)
            if px_match:
                px_val = float(px_match.group(1))
                
                # If inside a column, we want it to be 100% of the column width 
                # as requested by the user to avoid being too small
                is_inside_column = figure.find_parent("div", class_="column") is not None
                
                if is_inside_column:
                    pct_val = 100
                else:
                    # Convert to % (max 100%)
                    pct_val = min(100, round((px_val / 710) * 100, 2))
                
                # Replace px with % and ensure height is auto to maintain aspect ratio
                new_style = re.sub(r'width:\s*[\d\.]+px', f"width: {pct_val}%", style)
                new_style = re.sub(r'height:\s*[^;]+;?', "", new_style).strip()
                if not new_style.endswith(";"): new_style += ";"
                new_style += " height: auto;"
                img_tag["style"] = new_style

        if a_tag:
            a_tag.replace_with(img_tag)

def normalize_lang(lang: str) -> str:
    s = lang.lower()
    mapping = {
        'py': 'python', 'python3': 'python', 'c#': 'csharp', 'c++': 'cpp',
        'js': 'javascript', 'ts': 'typescript', 'sh': 'bash',
        'plaintext': '', 'none': '', 'text': ''
    }
    return mapping.get(s, s)

def convert_prism_codeblocks_to_md(soup):
    for tag in soup.find_all(['script', 'link']):
        src = tag.get('src', '') or tag.get('href', '')
        if 'prism' in src:
            tag.decompose()

    placeholders = {}
    placeholder_counter = 0

    for pre in soup.find_all('pre'):
        code = pre.find('code')
        if not code:
            continue

        classes = code.get('class', [])
        class_str = ' '.join(classes)
        m = re.search(r'language-([A-Za-z0-9#+._-]+)', class_str, flags=re.I)
        lang = normalize_lang(m.group(1)) if m else ''

        code_text = code.get_text()
        md_block = f'\n\n```{lang}\n{code_text}\n```\n\n'
        
        placeholder = f"___CODEBLOCK_PLACEHOLDER_{placeholder_counter}___"
        placeholders[placeholder] = md_block
        placeholder_counter += 1
        
        pre.replace_with(NavigableString(placeholder))
    return placeholders

def write_markdown_file(html_content, original_filename, project_root):
    soup, title, tags, category, raw_date, date_str = extract_metadata_and_clean(html_content)
    
    # ... Extract CSS and save to absolute notion.css path inside extract_metadata_and_clean
    # Wait, extract_metadata_and_clean uses CSS_FILE "app/blog/notion.css". Let's handle it.
    css_file_path = os.path.join(project_root, CSS_FILE)
    styles = soup.find_all("style")
    css_content = "\n".join([style.get_text() for style in styles])
    
    # Add base list styles to counteract Tailwind resets
    base_list_styles = """
/* Base list styles to counteract Tailwind resets */
ol { list-style-type: decimal !important; padding-inline-start: 1.6em !important; }
ul { list-style-type: disc !important; padding-inline-start: 1.7em !important; }
ol.numbered-list { list-style-type: decimal !important; }
ul.bulleted-list { list-style-type: disc !important; }
ol[type="a"] { list-style-type: lower-alpha !important; }
ol[type="i"] { list-style-type: lower-roman !important; }
"""
    if css_content.strip():
        os.makedirs(os.path.dirname(css_file_path), exist_ok=True)
        with open(css_file_path, "w", encoding="utf-8") as f:
            f.write(css_content + base_list_styles)
    for style in styles:
        style.decompose()
        
    print(f"\n📝 [{original_filename}] 글 제목: {title}")
    slug = input("👉 파일명을 영어로 입력해주세요 (공백은 '-'로, 대문자는 소문자로 자동 변경됩니다): ").strip()
    
    while not slug or not re.fullmatch(r"[a-zA-Z0-9 \-]+", slug):
        if not slug:
            print("❌ 비워둘 수 없습니다.")
        else:
            print("❌ 영어, 숫자, 공백, 하이픈(-)만 사용할 수 있습니다.")
        slug = input("다시 입력해주세요: ").strip()
        
    slug = slug.lower().replace(" ", "-")
    slug = re.sub(r'[-]+', '-', slug).strip('-')
    
    target_folder_name = slug
    new_filename = f"{raw_date}-{slug}"
    
    rewrite_image_paths_soup(soup, target_folder_name)
    convert_figure_images(soup)
    placeholders = convert_prism_codeblocks_to_md(soup)
    
    html_str = str(soup)
    for p, md in placeholders.items():
        html_str = html_str.replace(p, md)
        
    html_str = re.sub(r'(?is).*?<body[^>]*>\s*', '', html_str, count=1)
    html_str = re.sub(r'(?is)</body>\s*</html>\s*', '', html_str, count=1)
    
    html_str = html_str.replace("<details open=\"\">", "<details>")
    html_str = html_str.replace("<details open>", "<details>")

    yaml_front_matter = f"""---
title: "{title.replace('"', '')}"
date: {date_str}
tags: [{', '.join(tags)}]
category: {category}
giscus_comments: true
---
"""
    final_content = yaml_front_matter + "\n\n" + html_str.strip()
    
    out_dir = os.path.join(project_root, APP_BLOG_DIR)
    os.makedirs(out_dir, exist_ok=True)
    new_filepath = os.path.join(out_dir, f"{new_filename}.md")
    with open(new_filepath, 'w', encoding='utf-8') as f:
        f.write(final_content)
        
    print(f"⭐️ 마크다운 생성 완료: {new_filepath}")
    return target_folder_name

def convert_to_webp(input_path, output_path, quality=80):
    try:
        img = Image.open(input_path)
        ext = os.path.splitext(input_path)[1].lower()

        if ext in [".jpg", ".jpeg", ".heic"]:
            img = img.convert("RGB")
        elif ext == ".png":
            img = img.convert("RGBA")

        img.save(output_path, "webp", quality=quality)
        os.remove(input_path)
    except Exception as e:
        print(f"❌ 이미지 변환 실패: {input_path}\n에러: {e}")

def copy_images(html_path, target_folder_name, project_root):
    original_image_folder = os.path.splitext(html_path)[0]
    
    if not os.path.isdir(original_image_folder):
        html_dir = os.path.dirname(html_path)
        dirs = [d for d in os.listdir(html_dir) if os.path.isdir(os.path.join(html_dir, d))]
        if len(dirs) == 1:
            original_image_folder = os.path.join(html_dir, dirs[0])
        else:
            return
            
    target_folder = os.path.join(project_root, IMAGE_DIR, target_folder_name)
    os.makedirs(target_folder, exist_ok=True)
    
    for item in os.listdir(original_image_folder):
        src_path = os.path.join(original_image_folder, item)
        if os.path.isfile(src_path):
            base, ext = os.path.splitext(item)
            dst_path = os.path.join(target_folder, base + ".webp")
            convert_to_webp(src_path, dst_path)
            
    print(f"⭐️ 이미지 복사 및 WebP 변환 완료 → {target_folder}")

def process_zip(zip_path, extract_dir, project_root):
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        file_list = zip_ref.namelist()
        if len(file_list) == 1 and file_list[0].lower().endswith('.zip'):
            zip_ref.extractall(extract_dir)
            inner_zip_path = os.path.join(extract_dir, file_list[0])
            with zipfile.ZipFile(inner_zip_path, 'r') as inner_zip:
                inner_zip.extractall(extract_dir)
            os.remove(inner_zip_path)
        else:
            zip_ref.extractall(extract_dir)

    processed_any = False
    for root, _, files in os.walk(extract_dir):
        for f in files:
            if f.endswith(".html"):
                html_path = os.path.join(root, f)
                with open(html_path, 'r', encoding='utf-8') as file:
                    html_content = file.read()
                
                target_folder_name = write_markdown_file(html_content, f, project_root)
                copy_images(html_path, target_folder_name, project_root)
                processed_any = True

    shutil.rmtree(extract_dir)
    return processed_any

if __name__ == "__main__":
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    
    # Process zip files in the _scripts directory
    found_zip = False
    for filename in os.listdir(script_dir):
        if filename.endswith(".zip") and "ExportBlock" in filename:
            found_zip = True
            zip_path = os.path.join(script_dir, filename)
            extract_dir = os.path.join(script_dir, "_notion_temp_extract")
            
            print(f"📦 압축 해제 및 변환 시작: {filename}")
            try:
                success = process_zip(zip_path, extract_dir, project_root)
                if success:
                    print(f"✅ 변환 완료!: {filename}\n")
                    os.remove(zip_path) # uncomment to delete original zip
                else:
                    print(f"⚠️ 매칭되는 HTML 파일을 찾지 못했습니다: {filename}\n")
            except Exception as e:
                print(f"❌ 변환 중 오류 발생 ({filename}): {e}\n")
                if os.path.exists(extract_dir):
                    shutil.rmtree(extract_dir)
                    
    if not found_zip:
        print("❌ 변환할 zip 파일을 찾지 못했습니다!")
        print(f"👉 Notion에서 다운받은 '.zip' 파일이 '_scripts' 폴더({script_dir})에 있는지 확인해주세요.")
        print("👉 파일명에 'ExportBlock'이 포함되어 있어야 인식됩니다.\n")
