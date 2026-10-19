import os
from PIL import Image

TARGET_DIRS = [
    'src/assets',
    'public',
    'logo + Banner',
    'icons'
]

def compress_image(filepath):
    orig_size = os.path.getsize(filepath)
    ext = os.path.splitext(filepath)[1].lower()
    
    if ext not in ['.jpg', '.jpeg', '.png', '.webp']:
        return 0, 0
    
    # Don't touch tiny files (< 20KB) or icons
    if orig_size < 20 * 1024:
        return 0, 0

    try:
        with Image.open(filepath) as img:
            # Preserve RGBA transparency if png/webp
            has_alpha = img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info)
            
            # If image dimensions are absurdly large (> 2560px), resize proportionally
            max_dimension = 2560
            width, height = img.size
            if max(width, height) > max_dimension:
                if width > height:
                    new_w = max_dimension
                    new_h = int(height * (max_dimension / width))
                else:
                    new_h = max_dimension
                    new_w = int(width * (max_dimension / height))
                img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)

            temp_path = filepath + '.tmp'
            
            if ext in ['.jpg', '.jpeg']:
                if has_alpha:
                    img = img.convert('RGB')
                img.save(temp_path, 'JPEG', quality=82, optimize=True)
            elif ext == '.png':
                if orig_size > 100 * 1024: # Larger PNGs
                    # Try saving as optimized PNG
                    img.save(temp_path, 'PNG', optimize=True)
                else:
                    return 0, 0
            elif ext == '.webp':
                img.save(temp_path, 'WEBP', quality=82, method=6)
            
            new_size = os.path.getsize(temp_path)
            
            # Only keep if actually smaller
            if new_size < orig_size:
                os.replace(temp_path, filepath)
                saved = orig_size - new_size
                print(f"Compressed {os.path.basename(filepath)}: {orig_size//1024}KB -> {new_size//1024}KB (saved {saved//1024}KB)")
                return orig_size, new_size
            else:
                if os.path.exists(temp_path):
                    os.remove(temp_path)
                return 0, 0
    except Exception as e:
        print(f"Error compressing {filepath}: {e}")
        return 0, 0

total_orig = 0
total_new = 0
compressed_count = 0

for base_dir in TARGET_DIRS:
    if not os.path.exists(base_dir):
        continue
    for root, dirs, files in os.walk(base_dir):
        if 'node_modules' in root or '.git' in root or 'dist' in root:
            continue
        for f in list(files):
            if f.endswith('.tmp'):
                continue
            full_path = os.path.join(root, f)
            if not os.path.isfile(full_path):
                continue
            o, n = compress_image(full_path)
            if o > 0:
                total_orig += o
                total_new += n
                compressed_count += 1

print("\n-------------------------------------------")
print(f"Compressed {compressed_count} images.")
if total_orig > 0:
    saved = total_orig - total_new
    print(f"Total size reduced from {total_orig//(1024*1024)}MB to {total_new//(1024*1024)}MB.")
    print(f"Total bandwidth saved: {saved//(1024*1024)}MB ({(saved/total_orig)*100:.1f}%)")
print("-------------------------------------------")
