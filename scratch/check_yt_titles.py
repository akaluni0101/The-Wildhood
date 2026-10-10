import urllib.request
import re
import json

video_ids = ['pPW3_QvAY8M', 'dth9qyPWNxQ', '16GmpOPBsmo', 'B9fzbBSaPNs', 'V3kBPm7QSvI', '2-XjCDy7vZ8', 'r8JvE8jo8Ac', 'ob98s1_JgDY', 'b7JB-6A7jw4', 'f7Uz9hqhrlg']
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}

for vid in video_ids:
    url = f"https://www.youtube.com/watch?v={vid}"
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=8) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            title_m = re.search(r'<title>(.*?)</title>', html)
            title = title_m.group(1) if title_m else "Unknown"
            if "wildhood" in title.lower() or "mohali" in title.lower() or "cafe" in title.lower() or "wild" in title.lower():
                print(f"MATCH: {vid} | Title: {title}")
                print(f"  HQ Thumb: https://i.ytimg.com/vi/{vid}/hqdefault.jpg")
                print(f"  MaxRes Thumb: https://i.ytimg.com/vi/{vid}/maxresdefault.jpg")
            else:
                print(f"Other: {vid} | {title}")
    except Exception as e:
        print(f"Error {vid}: {e}")
