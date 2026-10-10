import urllib.request
import re

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Accept-Language': 'en-IN,en;q=0.9',
}

url = "https://www.google.com/search?kgmid=/g/11w9zt4q4p&hl=en-IN&q=The+wildhood"
req = urllib.request.Request(url, headers=headers)
with urllib.request.urlopen(req, timeout=15) as resp:
    html = resp.read().decode('utf-8', errors='ignore')

# Search for any image links (img src)
img_tags = re.findall(r'<img[^>]+src=[\'"]([^\'"]+)[\'"]', html)
print("Total img tags:", len(img_tags))
for tag in img_tags:
    if "google" in tag or "gstatic" in tag or "http" in tag:
        print("IMG SRC:", tag[:150])

# Search for data-src or photo links
data_srcs = re.findall(r'data-src=[\'"]([^\'"]+)[\'"]', html)
print("Data srcs:", len(data_srcs))
for ds in data_srcs:
    print("DATA SRC:", ds[:150])
