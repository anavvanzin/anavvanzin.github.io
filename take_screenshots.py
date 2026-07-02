import json
import urllib.request
import websocket
import base64
import time
import os

# Create screenshots directory
out_dir = "/Users/ana/Projects/anavvanzin.github.io/audit-screenshots"
os.makedirs(out_dir, exist_ok=True)

# Fetch active tabs
try:
    response = urllib.request.urlopen("http://127.0.0.1:9222/json/list")
    tabs = json.loads(response.read().decode())
    page_tab = None
    for tab in tabs:
        if tab['type'] == 'page':
            page_tab = tab
            break
    if not page_tab:
        raise Exception("No active page tab found")
except Exception as e:
    print(f"Error fetching tabs: {e}")
    exit(1)

ws_url = page_tab['webSocketDebuggerUrl']
print(f"Connecting to tab {page_tab['id']} via WebSocket: {ws_url}")

ws = websocket.create_connection(ws_url)

def send_cdp(method, params={}):
    global ws
    req = {
        "id": int(time.time() * 1000),
        "method": method,
        "params": params
    }
    ws.send(json.dumps(req))
    res = ws.recv()
    return json.loads(res)

# Pages to audit
pages = [
    ("home", "index.html"),
    ("sobre", "sobre.html"),
    ("perfil", "perfil.html"),
    ("conceitos", "conceitos.html"),
    ("trabalhos", "trabalhos.html"),
    ("metodologia", "metodologia/index.html"),
    ("sala-de-leitura", "sala-de-leitura/index.html"),
    ("publicacoes", "publicacoes/index.html")
]

# Set device metrics to mobile (390x844)
send_cdp("Emulation.setDeviceMetricsOverride", {
    "width": 390,
    "height": 844,
    "deviceScaleFactor": 3,
    "mobile": True
})

for name, rel_path in pages:
    url = f"http://127.0.0.1:8000/{rel_path}"
    print(f"Auditing mobile page: {name} ({url})")
    
    # Navigate
    send_cdp("Page.navigate", {"url": url})
    
    # Wait for navigation and animations to finish
    time.sleep(2)
    
    # Capture screenshot
    res = send_cdp("Page.captureScreenshot", {"format": "png"})
    
    if "result" in res and "data" in res["result"]:
        img_data = base64.b64decode(res["result"]["data"])
        out_path = os.path.join(out_dir, f"{name}.png")
        with open(out_path, "wb") as f:
            f.write(img_data)
        print(f"Saved mobile screenshot: {out_path}")
    else:
        print(f"Failed to capture screenshot for {name}: {res}")

ws.close()
print("All screenshots captured successfully.")
