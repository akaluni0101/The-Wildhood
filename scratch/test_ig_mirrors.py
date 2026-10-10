import urllib.request
import re

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
}

viewers = [
    "https://www.picuki.com/profile/the_wildhood_",
    "https://imginn.com/the_wildhood_/",
]

for url in viewers:
    print(f"\n--- Trying viewer: {url} ---")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=12) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            print("HTML length:", len(html))
            
            # Find photo links
            imgs = re.findall(r'https?://[^"\'\s>]+\.(?:jpg|jpeg|webp)', html)
            print("Found images:", len(imgs))
            for i in set(imgs[:10]):
                print("Image URL:", i)
    except Exception as e:
        print("Error:", e)
