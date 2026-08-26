
import urllib.request, ssl, re

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
h = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0'}

with open(r'C:\Users\HP\OneDrive\Desktop\Rvr agency\index.html', 'r', encoding='utf-8') as f:
    content = f.read()

urls = re.findall(r'src="(https://images\.unsplash\.com/[^"]+)"', content)
seen = set()
for url in urls:
    if url in seen:
        continue
    seen.add(url)
    try:
        req = urllib.request.Request(url, headers=h)
        with urllib.request.urlopen(req, timeout=10, context=ctx) as r:
            data = r.read()
        print(f'OK {len(data):,}b | {url}')
    except Exception as e:
        print(f'FAIL | {url}')
        print(f'     -> {e}')
