import re

with open("scratch/maps_out.txt", "w", encoding="utf-8") as out:
    import urllib.request
    url = "https://www.google.com/maps/search/The+Wildhood+Sector+100+Mohali"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    }
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, timeout=15) as resp:
        content = resp.read().decode('utf-8', errors='ignore')
        
    # Search for any googleusercontent URLs in the maps payload
    matches = re.findall(r'googleusercontent\.com[^\s"\'\\]+', content)
    out.write(f"Matches count: {len(matches)}\n")
    for m in set(matches):
        out.write(m + "\n")

    # Search for any jpg or webp
    imgs = re.findall(r'https?://[^\s"\'\\]+\.(?:jpg|png|webp)', content)
    out.write(f"Direct imgs count: {len(imgs)}\n")
    for img in set(imgs):
        out.write(img + "\n")

print("Done extracting maps out")
