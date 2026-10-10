import urllib.request
import re
import json

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Accept-Language': 'en-IN,en;q=0.9',
}

url = "https://www.google.com/search?kgmid=/g/11w9zt4q4p&hl=en-IN&q=The+wildhood"
print("Fetching Google place page:", url)

try:
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, timeout=15) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
        print("HTML length:", len(html))

        # Look for Google user/business photos (lh3.googleusercontent.com or lh5.googleusercontent.com)
        lh_urls = re.findall(r'https://lh[0-9]\.googleusercontent\.com/[^"\'\s\\<>]+', html)
        print("Found googleusercontent URLs:", len(lh_urls))
        for u in set(lh_urls):
            clean_u = u.replace('\\u003d', '=').replace('\\u0026', '&')
            print("Photo URL:", clean_u)

        # Look for streetview / photos
        maps_photos = re.findall(r'https://streetviewpixels-pa\.googleapis\.com/[^"\'\s\\<>]+', html)
        print("Streetview photos:", len(maps_photos))

except Exception as e:
    print("Error:", e)
