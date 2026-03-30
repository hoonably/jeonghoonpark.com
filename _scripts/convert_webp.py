import os
import shutil
from PIL import Image
from pillow_heif import register_heif_opener

# HEIC 포맷을 PIL에서 열 수 있도록 등록
register_heif_opener()

# 이미지 파일을 webp로 변환하는 함수
def convert_to_webp(input_path, output_path, quality=80):
    try:
        img = Image.open(input_path)
        ext = os.path.splitext(input_path)[1].lower()

        if ext in [".jpg", ".jpeg", ".heic"]:
            img = img.convert("RGB")
        elif ext == ".png":
            img = img.convert("RGBA")

        img.save(output_path, "webp", quality=quality)
        return True

    except Exception as e:
        print(f"❌ 이미지 변환 실패: {input_path}\n에러: {e}")
        return False

# ────────────────────────────────────────────────────────────────────────────────
def batch_convert_images():
    supported_exts = [".png", ".jpg", ".jpeg", ".heic"]
    converted_success = []

    script_dir = os.path.dirname(os.path.abspath(__file__))
    input_folder = os.path.join(script_dir)
    output_folder = os.path.join(script_dir, "output_webp")

    os.makedirs(output_folder, exist_ok=True)

    for filename in os.listdir(input_folder):
        base, ext = os.path.splitext(filename)
        if ext.lower() in supported_exts:
            src_path = os.path.join(input_folder, filename)
            webp_output_path = os.path.join(output_folder, base + ".webp")

            success = convert_to_webp(src_path, webp_output_path)
            if success:
                converted_success.append(src_path)
                print(f"✅ 변환 완료: {filename} → {base}.webp")

    # 삭제 여부 묻기
    if converted_success:
        answer = input("\n🗑️ 변환 성공한 이미지의 원본을 input_img 폴더에서 삭제할까요? [Y/N]: ").strip().lower()
        if answer == "y":
            for path in converted_success:
                try:
                    os.remove(path)
                    print(f"🗑️ 삭제됨: {os.path.basename(path)}")
                except Exception as e:
                    print(f"❌ 삭제 실패: {os.path.basename(path)}\n에러: {e}")
        else:
            print("🛑 원본 이미지는 삭제하지 않았습니다.")
    else:
        print("⚠️ 변환된 이미지가 없습니다.")


if __name__ == "__main__":
    batch_convert_images()
