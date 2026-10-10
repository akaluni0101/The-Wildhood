import urllib.request
import re
import json

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
}

# 1. Instagram profile check
print("--- Checking Instagram Profile ---")
try:
    req = urllib.request.Request('https://www.instagram.com/the_wildhood_/', headers=headers)
    with urllib.request.urlopen(req, timeout=10) as resp:
        content = resp.read().decode('utf-8', errors='ignore')
        print("IG HTML length:", len(content))
        # Look for image urls (cdninstagram)
        img_urls = re.findall(r'https://[^"\'\s]+\.cdninstagram\.com/[^"\'\s]+', content)
        print("Found cdninstagram URLs:", len(img_urls))
        for u in set(img_urls[:10]):
            # clean escape characters
            clean_u = u.replace('\\u0026', '&').replace('\\', '')
            print("IG Image:", clean_u[:120])
except Exception as e:
    print("IG Error:", e)

# 2. Google location check: "The Wildhood Mohali Sector 100"
print("\n--- Checking Google Images / Places for The Wildhood ---")
try:
    query = "The+Wildhood+Mohali+Sector+100+photos"
    url = f"https://www.google.com/search?q={query}&tbm=isch&hl=en"
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, timeout=10) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
        print("Google search HTML length:", len(html))
        # Find image source URLs
        srcs = re.findall(r'https://encrypted-tbn0\.gstatic\.com/images\?q=tbn:[^"\'\s&]+', html)
        print("Found Google image thumbnail URLs:", len(srcs))
        for s in set(srcs[:10]):
            print("Google Image:", s)
except Exception as e:
    print("Google Search Error:", e)

# 3. Direct Google Maps link resolution
print("\n--- Resolving Google Share link ---")
try:
    req = urllib.request.Request('https://share.google/d18UVv7zeG6oCj9fx', headers=headers)
    with urllib.request.urlopen(req, timeout=10) as resp:
        print("Resolved URL:", resp.geturl())
except Exception as e:
    print("Share link error:", e)
