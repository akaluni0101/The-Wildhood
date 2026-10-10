import urllib.request
import json
import re

url = "https://www.instagram.com/the_wildhood_/"
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
}

req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req, timeout=15) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
        
        # Look for image URLs ending in jpg, webp, etc.
        # Often inside json or window._sharedData
        all_matches = re.findall(r'https://[^"\'\s\\<>]+\.cdninstagram\.com/[^"\'\s\\<>]+', html)
        print("Total cdninstagram matches:", len(all_matches))
        
        # Filter for actual media content, not static assets like rsrc.php
        media_imgs = [m for m in all_matches if 'static.cdninstagram' not in m and ('scontent' in m or 'cdninstagram' in m)]
        print("Media images found:", len(media_imgs))
        for mi in set(media_imgs[:20]):
            clean = mi.replace('\\u0026', '&').replace('\\', '')
            print("Media image:", clean)
            
        # Also look for any jpg/webp URLs
        jpgs = re.findall(r'https://[^"\'\s\\<>]+\.jpg[^"\'\s\\<>]*', html)
        print("Total jpgs found:", len(jpgs))
        for j in set(jpgs[:10]):
            clean = j.replace('\\u0026', '&').replace('\\', '')
            print("JPG:", clean)
except Exception as e:
    print("Error:", e)
