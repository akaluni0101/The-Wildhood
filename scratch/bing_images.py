import urllib.request
import urllib.parse
import re

query = 'The Wildhood Mohali Sector 100'
url = f"https://www.bing.com/images/search?q={urllib.parse.quote(query)}&form=HDRSC2&first=1"
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
}

try:
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, timeout=12) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
        print("Bing search HTML length:", len(html))
        # Bing embeds image URLs in m="{...murl:&quot;URL&quot;...}"
        murls = re.findall(r'murl&quot;:&quot;(https?://[^&]+)&quot;', html)
        print("Found Bing image murls:", len(murls))
        for idx, u in enumerate(set(murls[:10])):
            print(f"[{idx}] {u}")
except Exception as e:
    print("Bing error:", e)
