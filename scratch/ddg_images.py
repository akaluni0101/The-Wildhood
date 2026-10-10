import urllib.request
import urllib.parse
import json
import re

query = "The Wildhood Mohali"
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Referer': 'https://duckduckgo.com/'
}

# 1. Get token
url = "https://duckduckgo.com/?q=" + urllib.parse.quote(query) + "&t=h_&iar=images&iax=images&ia=images"
req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req, timeout=10) as resp:
        html = resp.read().decode('utf-8')
    vqd_match = re.search(r'vqd=([0-9-]+)', html)
    if not vqd_match:
        vqd_match = re.search(r'vqd="([0-9-]+)"', html)
    if vqd_match:
        vqd = vqd_match.group(1)
        print("Found VQD:", vqd)
        
        # 2. Query images
        img_url = f"https://duckduckgo.com/i.js?l=us-en&o=json&q={urllib.parse.quote(query)}&vqd={vqd}&f=,,,&p=1"
        req2 = urllib.request.Request(img_url, headers=headers)
        with urllib.request.urlopen(req2, timeout=10) as resp2:
            data = json.loads(resp2.read().decode('utf-8'))
            results = data.get('results', [])
            print(f"Found {len(results)} image results:")
            for r in results[:15]:
                print("Title:", r.get('title'))
                print("Image:", r.get('image'))
                print("Source:", r.get('url'))
                print("---")
    else:
        print("Could not find VQD token")
except Exception as e:
    print("Error:", e)
