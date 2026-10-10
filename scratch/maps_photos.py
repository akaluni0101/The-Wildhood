import urllib.request
import re

url = "https://www.google.com/maps/search/The+Wildhood+Sector+100+Mohali"
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
}

req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req, timeout=15) as resp:
        content = resp.read().decode('utf-8', errors='ignore')
        print("Google Maps search HTML length:", len(content))
        
        # Look for googleusercontent photos (lh3.googleusercontent.com/p/...)
        photos = re.findall(r'https://lh[0-9]\.googleusercontent\.com/p/[^"\'\s\\=]+', content)
        print("Found Google Place photo IDs:", len(photos))
        for p in set(photos):
            print("Place photo:", p)
except Exception as e:
    print("Error:", e)
