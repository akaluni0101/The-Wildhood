import urllib.request
import re
import json

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
}

sites = [
    ("EazyDiner", "https://www.eazydiner.com/chandigarh/the-wildhood-sector-100-mohali"),
    ("Magicpin", "https://magicpin.in/Mohali/Sector-100/Restaurant/The-Wildhood/store/"),
]

for name, url in sites:
    print(f"\n--- Checking {name}: {url} ---")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=12) as resp:
            content = resp.read().decode('utf-8', errors='ignore')
            print(f"Content length: {len(content)}")
            
            # Find image URLs
            # EazyDiner images usually from eazydiner.com / cloudfront / s3
            # Magicpin images usually from magicpin.in / lh3 / cloudfront
            imgs = re.findall(r'https://[^"\'\s>]+\.(?:jpg|jpeg|png|webp)', content)
            print(f"Total image URLs found: {len(imgs)}")
            
            # Filter relevant restaurant/dish/interior images
            relevant = [i for i in imgs if any(k in i.lower() for k in ['restaurant', 'wildhood', 'food', 'upload', 'media', 'photos', 'gallery', 'res'])]
            print(f"Filtered relevant images: {len(relevant)}")
            for r in set(relevant[:15]):
                print("  ", r)
    except Exception as e:
        print(f"Error on {name}:", e)
