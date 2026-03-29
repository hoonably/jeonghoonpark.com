# Notion to Blog 자동화 스크립트 (`notion_to_blog.py`)

이 폴더에 있는 `notion_to_blog.py` 스크립트는 **Notion에서 HTML 형식으로 추출(Export)한 파일들(zip)**을 현재 블로그(Next.js)에 맞는 마크다운(`.md`) 파일과 이미지들로 변환해주는 자동화 도구입니다.

## 🛠 주요 기능 (Features)

1. **자동 압축 해제 (Nested Zip 방지)**:
   - Notion Export 시 종종 발생하는 이중 압축 풀기 문제를 자동으로 인식하고 해제해 줍니다.
   - 변환이 끝난 후 임시 파일들은 자동으로 모두 삭제되어 찌꺼기가 남지 않습니다. (원본 zip 파일 삭제 여부는 스크립트 코드 내 주석으로 조절 가능합니다)

2. **메타데이터 자동 추출 (Frontmatter)**:
   - Notion 문서 내부에 있는 Properties(속성표)에서 `태그(Tag)`, `카테고리(Category)`, `날짜(Date)`를 자동으로 스캔합니다.
   - 문서 제목은 `H1`이나 `<title>`을 참고하여 파싱합니다.
   - 추출 후 불필요한 속성 표 HTML은 자체적으로 제거되어 마크다운에 영향을 주지 않습니다.

3. **파일명(Slug) 입력 처리**:
   - 변환 전 콘솔에서 **영어 파일명(Slug)**을 입력하도록 유도합니다. (예: `svdquant-review`)
   - 입력받은 슬러그를 기반으로 `YYYY-MM-DD-slug.md` 형태로 결과물을 저장합니다.

4. **WebP 이미지 자동 변환 및 매핑**:
   - 원본 Zip에 포함되어 있는 기존 이미지들 확장자(`.png`, `.jpeg`, `.heic` 등)를 전부 용량이 최적화된 WebP(`.webp`)로 변환합니다.
   - 변환된 이미지를 `public/images/blog/{slug}` 경로로 복사합니다.
   - 마크다운 내부 이미지 경로(`src`, `href`)를 이 경로에 맞게 전부 치환하여 Next.js 서버에서 바로 로드할 수 있게 만듭니다.

5. **공통 스크립트 및 CSS(Notion Style) 분리**:
   - Notion Export HTML이 담고 있는 `<style>` 코드를 모두 긁어내서 `app/blog/notion.css`에 저장(덮어쓰기)합니다.
   - 이는 블로그 세부 페이지(`/blog/[slug]/page.tsx`)에서 로드되므로, 별도로 더러운 스타일이 글 내부를 차지하지 않게 합니다.

6. **코드블록 생성 대응**:
   - Prism 같은 기본 Notion 렌더링에 의존하지 않도록 `<pre><code class="language-*">` 블록들을 표준 마크다운 삼중 백틱(` ```python ` 등)으로 치환합니다.

## 📚 사용 방법

1. Notion에서 작성한 블로그 페이지를 **HTML + 하위 페이지 비포함** 형식으로 Export합니다. (압축 파일 생성)
2. 다운로드받은 `.zip` 파일을 이 스크립트가 존재하는 상위 디렉터리(`jeonghoonpark.com/` 루트 경로)에 둡니다.
3. 터미널을 열고 스크립트를 실행합니다:
   ```bash
   python _scripts/notion_to_blog.py
   ```
4. 터미널에서 `👉 파일명을 영어로 입력해주세요` 라고 나오면, 적절한 제목을 넣어줍니다.
5. `app/blog` 경로와 `public/images/blog` 경로에 각각 생성된 마크다운과 이미지 폴더를 확인합니다!
