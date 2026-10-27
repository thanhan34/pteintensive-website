// Read-only browser smoke: no users, fee records, orders or payments are created.
const { spawn } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const assert = require('node:assert/strict');
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function main() {
  const origin = process.env.BILLING_TEST_ORIGIN || 'http://localhost:3200';
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'pte-clerk-smoke-'));
  const browser = spawn(process.env.BILLING_BROWSER || 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', ['--headless=new', '--no-first-run', '--disable-gpu', '--remote-debugging-port=9336', `--user-data-dir=${directory}`, 'about:blank'], { stdio: 'ignore' });
  let socket;
  try {
    let page;
    for (let attempt = 0; attempt < 40; attempt++) {
      try { page = (await (await fetch('http://127.0.0.1:9336/json/list')).json()).find((item) => item.type === 'page'); if (page) break; } catch {}
      await sleep(300);
    }
    if (!page) throw Error('Browser did not start');
    socket = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
    let sequence = 0;
    const pending = new Map();
    socket.onmessage = ({ data }) => {
      const message = JSON.parse(data);
      const entry = pending.get(message.id);
      if (entry) { pending.delete(message.id); message.error ? entry.reject(message.error) : entry.resolve(message.result); }
    };
    const send = (method, params = {}) => new Promise((resolve, reject) => { const id = ++sequence; pending.set(id, { resolve, reject }); socket.send(JSON.stringify({ id, method, params })); });
    await send('Page.enable'); await send('Runtime.enable');
    const evaluate = async (expression) => (await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })).result.value;
    for (const width of [1440, 390]) {
      await send('Emulation.setDeviceMetricsOverride', { width, height: 1000, deviceScaleFactor: 1, mobile: width < 600 });
      for (const route of ['/cart', '/courses', '/sign-in', '/sign-up']) {
        await send('Page.navigate', { url: origin + route });
        for (let attempt = 0; attempt < 30; attempt++) {
          await sleep(500);
          if (await evaluate(`!!document.querySelector('[data-clerk-component]') || document.body.innerText.includes('Đăng nhập / Tạo tài khoản')`)) break;
        }
        const dom = await evaluate(`({text:document.body.innerText,overflow:document.documentElement.scrollWidth>innerWidth+1,clerk:!!document.querySelector('[data-clerk-component]')})`);
        assert.equal(dom.overflow, false, `${route} overflows at ${width}`);
        if (route === '/cart') assert.match(dom.text, /Đăng nhập để tiếp tục/);
        if (route === '/courses') assert.match(dom.text, /Mỗi mục tiêu lớn đều bắt đầu/);
        if (route.startsWith('/sign-')) assert.ok(dom.clerk, `Clerk auth did not render: ${dom.text.slice(0, 400)}`);
        const image = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
        fs.writeFileSync(path.join(directory, `${route.slice(1)}-${width}.png`), Buffer.from(image.data, 'base64'));
        console.log(JSON.stringify({ route, width, overflow: dom.overflow, clerk: dom.clerk }));
      }
    }
    await send('Page.navigate', { url: origin + '/cart' }); await sleep(1000);
    for (const [route, method, expected] of [['/api/billing/draft', 'GET', 401], ['/api/billing', 'POST', 401], ['/api/billing/check', 'POST', 401]]) {
      const status = await evaluate(`fetch(${JSON.stringify(route)},{method:${JSON.stringify(method)},headers:{'Content-Type':'application/json'},${method === 'POST' ? "body:'{}'," : ''}}).then(r=>r.status)`);
      assert.equal(status, expected, `${route} must reject signed-out requests`);
    }
    const ipn = await evaluate(`fetch('/api/payments/vnpay/ipn?vnp_SecureHash=invalid').then(async r=>({type:r.headers.get('Content-Type'),body:await r.json()}))`);
    assert.match(ipn.type, /application\/json/);
    assert.notEqual(ipn.body.RspCode, '00');
    console.log(`Screenshots: ${directory}`);
  } finally {
    if (socket) socket.close(); browser.kill();
  }
}
main().catch((error) => { console.error(error); process.exitCode = 1; });