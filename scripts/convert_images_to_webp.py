import os
from PIL import Image

TARGET_DIRS = [
    r"d:\brixellabs\web_final\web\src\assets",
    r"d:\brixellabs\web_final\web\public"
]

def convert_to_webp():
    total_saved = 0
    converted_count = 0
    skipped_count = 0

    print("Starting WebP image conversion across assets and public directories...")

    for base_dir in TARGET_DIRS:
        if not os.path.exists(base_dir):
            continue
        for root, _, files in os.walk(base_dir):
            for file in files:
                ext = os.path.splitext(file)[1].lower()
                if ext in ['.png', '.jpg', '.jpeg']:
                    src_path = os.path.join(root, file)
                    base_name = os.path.splitext(src_path)[0]
                    dest_path = base_name + '.webp'

                    try:
                        orig_size = os.path.getsize(src_path)
                        with Image.open(src_path) as img:
                            # Handle transparent RGBA for PNG
                            if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
                                img.save(dest_path, 'WEBP', quality=85, method=6)
                            else:
                                rgb_img = img.convert('RGB')
                                rgb_img.save(dest_path, 'WEBP', quality=82, method=6)

                        webp_size = os.path.getsize(dest_path)
                        saved_bytes = orig_size - webp_size
                        if saved_bytes > 0:
                            total_saved += saved_bytes
                        converted_count += 1
                        print(f"Converted: {file} -> {os.path.basename(dest_path)} ({orig_size//1024}KB -> {webp_size//1024}KB)")
                    except Exception as e:
                        print(f"Error converting {src_path}: {e}")
                        skipped_count += 1

    print("-" * 50)
    print(f"Conversion Complete!")
    print(f"Successfully converted: {converted_count} images")
    print(f"Skipped / Errors: {skipped_count}")
    print(f"Total Disk Space Saved: {total_saved / (1024 * 1024):.2f} MB")

if __name__ == '__main__':
    convert_to_webp()
