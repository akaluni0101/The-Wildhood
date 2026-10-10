import urllib.request
import re

url = "https://www.youtube.com/results?search_query=%22The+Wildhood%22+Mohali"
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
}

try:
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, timeout=12) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
        print("YouTube HTML length:", len(html))
        
        # Extract video IDs
        vids = re.findall(r'"videoId":"([a-zA-Z0-9_-]{11})"', html)
        print("Found video IDs:", len(vids))
        for v in list(dict.fromkeys(vids))[:10]:
            print("Video ID:", v, f"https://i.ytimg.com/vi/{v}/hqdefault.jpg")
except Exception as e:
    print("Error:", e)
