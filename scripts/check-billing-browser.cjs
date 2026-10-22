// Optional visual smoke check using the existing local Chrome/Edge and native CDP.
// No dependencies installed, no login, no database changes.
const { spawn } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const assert = require('node:assert/strict');
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function main() {
  const executable = process.env.BILLING_BROWSER || 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'pte-billing-browser-'));
  const browser = spawn(executable, ['--headless=new', '--no-first-run', '--disable-gpu', '--remote-debugging-port=9335', `--user-data-dir=${directory}`, 'about:blank'], { stdio: 'ignore' });
  let socket;
  try {
    let page;
    for (let attempt = 0; attempt < 30; attempt++) {
      try { const pages = await (await fetch('http://127.0.0.1:9335/json/list')).json(); page = pages.find((p) => p.type === 'page'); if (page) break; } catch {}
      await sleep(300);
    }
    if (!page) throw Error('Browser did not start');
    socket = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
    let id = 0;
    const pending = new Map();
    const exceptions = [];
    socket.onmessage = ({ data }) => {
      const message = JSON.parse(data);
      if (message.method === 'Runtime.exceptionThrown') exceptions.push(message.params.exceptionDetails.text);
      const entry = pending.get(message.id);
      if (entry) { pending.delete(message.id); message.error ? entry.reject(message.error) : entry.resolve(message.result); }
    };
    const send = (method, params = {}) => new Promise((resolve, reject) => { const key = ++id; pending.set(key, { resolve, reject }); socket.send(JSON.stringify({ id: key, method, params })); });
    await send('Page.enable'); await send('Runtime.enable');
    // Old links must enter the unified page without losing capabilities or callback state.
    for (const suffix of ['?tab=cart', '?order=migration-test', '#fee=migration-fee&access=' + 'a'.repeat(64)]) {
      await send('Page.navigate', { url: `${process.env.BILLING_TEST_ORIGIN || 'http://localhost:3100'}/student${suffix}` });
      await sleep(3000);
      const migration = await send('Runtime.evaluate', { expression: `JSON.stringify({path:location.pathname,secret:JSON.parse(localStorage.getItem('pte-billing-fees')||'{}')['migration-fee'],active:document.querySelector('[role="tab"][data-state="active"]')?.textContent,notice:document.body.innerText})`, returnByValue: true });
      const result = JSON.parse(migration.result.value);
      assert.equal(result.path, '/cart');
      if (suffix.includes('tab=cart')) assert.match(result.active, /Khoản đã chọn/);
      if (suffix.includes('order=')) { assert.match(result.active, /Lịch sử đơn/); assert.match(result.notice, /Đã quay về từ thanh toán/); }
      if (suffix.includes('fee=')) { assert.equal(result.secret, 'a'.repeat(64)); assert.match(result.active, /Học phí cá nhân/); }
    }
    for (const width of [1440, 390]) {
      await send('Emulation.setDeviceMetricsOverride', { width, height: 1000, deviceScaleFactor: 1, mobile: width < 600 });
      for (const route of ['/courses', '/cart', '/cart?tab=fees', '/cart?tab=orders', '/admin/billing']) {
        await send('Page.navigate', { url: `${process.env.BILLING_TEST_ORIGIN || 'http://localhost:3100'}${route}` });
        await sleep(2500);
        const result = await send('Runtime.evaluate', { expression: `JSON.stringify({title:document.title, text:document.body.innerText, overflow:document.documentElement.scrollWidth > innerWidth})`, returnByValue: true });
        const dom = JSON.parse(result.result.value);
        assert.equal(dom.overflow, false, `Horizontal overflow: ${route}/${width}`);
        assert.match(dom.text, !route.startsWith('/admin') ? /[Kk]hông cần đăng nhập/ : /Vui lòng đăng nhập tài khoản quản trị/);
        if (route.startsWith('/courses')) {
          const hero = await send('Runtime.evaluate', { expression: `JSON.stringify({loaded:document.querySelector('.courses-hero-image')?.complete && document.querySelector('.courses-hero-image')?.naturalWidth > 0,color:getComputedStyle(document.querySelector('.courses-registration-hero h1')).color,cta:document.querySelector('.courses-hero-primary')?.getAttribute('href'),preview:document.querySelector('.courses-hero-secondary')?.getAttribute('href')})`, returnByValue: true });
          const heroState = JSON.parse(hero.result.value);
          assert.equal(heroState.loaded, true, 'Hero image must load');
          assert.equal(heroState.color, 'rgb(32, 32, 32)');
          assert.equal(heroState.cta, '#placement-declaration');
          assert.equal(heroState.preview, undefined);
          assert.doesNotMatch(dom.text, /Đăng nhập học viên|Mật khẩu/);
          assert.match(dom.text, /Mỗi mục tiêu lớn đều bắt đầu/);
          if (route === '/courses') {
            assert.equal((await send('Runtime.evaluate', { expression: `Boolean(document.querySelector('.student-course-grid').compareDocumentPosition(document.getElementById('placement-declaration')) & Node.DOCUMENT_POSITION_FOLLOWING)`, returnByValue: true })).result.value, true, 'Placement form must follow the course catalog');
          }
          assert.match(dom.text, /Bắt buộc trước khi tham gia khóa học/);
          assert.equal((await send('Runtime.evaluate', { expression: `Array.from(document.querySelectorAll('button')).filter(b=>b.textContent==='Thêm vào giỏ').every(b=>b.disabled)`, returnByValue: true })).result.value, true);
          if (route.includes('tab=cart')) assert.match(dom.text, /Chỉ thanh toán sau đánh giá đầu vào/);
          const check = await send('Runtime.evaluate', { expression: `fetch('/api/billing',{headers:{'x-billing-guest':localStorage.getItem('pte-billing-guest')}}).then(r=>r.status)`, awaitPromise: true, returnByValue: true });
          console.log('Guest API status:', check.result.value);
        }
        const screenshot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
        const file = path.join(directory, `${route.replace(/[^a-zA-Z0-9]/g, '_')}-${width}.png`);
        fs.writeFileSync(file, Buffer.from(screenshot.data, 'base64'));
        console.log(JSON.stringify({ route, width, title: dom.title, overflow: dom.overflow, screenshot: file }));
      }
    }
    // UI-only fixtures: no requests are made to create orders or modify Firebase.
    const fixture = {
      prices: [{ id: 'pre-pte', title: 'Khóa PTE Academic · Lộ trình cá nhân hóa', amount: 7900000, enabled: true }],
      fees: ['unpaid', 'pending', 'paid'].map((status) => ({ id: `ui-${status}`, academicApproved: true, title: status === 'unpaid' ? 'Học phí đợt 2 · Chương trình luyện thi PTE Academic theo lộ trình cá nhân' : `Học phí ${status === 'paid' ? 'đã hoàn tất' : 'đang được xác nhận'}`, amount: 3500000, dueDate: '2026-12-01', status })),
      orders: [], paymentAvailable: false, environment: 'sandbox',
    };
    for (const width of [1440, 1280, 768, 390]) {
      await send('Emulation.setDeviceMetricsOverride', { width, height: 1000, deviceScaleFactor: 1, mobile: width < 600 });
      await send('Page.navigate', { url: `${process.env.BILLING_TEST_ORIGIN || 'http://localhost:3100'}/courses` });
      await sleep(1800);
      const evaluate = async (expression) => (await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })).result.value;
      assert.equal(await evaluate(`document.querySelector('.student-tabs') === null`), true, 'Courses must not display billing tabs');
      await evaluate(`window.__originalBillingFetch=window.fetch; window.fetch=(url,options)=>String(url)==='/api/billing'?Promise.resolve(new Response(JSON.stringify(${JSON.stringify(fixture)}),{status:200,headers:{'Content-Type':'application/json'}})):window.__originalBillingFetch(url,options); document.querySelector('[aria-label="Cập nhật trạng thái học phí"]').click()`);
      await sleep(300);
      for (const state of ['courses-locked', 'checkout-populated', 'fees-populated']) {
        if (state === 'courses-locked') {
          assert.equal(await evaluate(`document.querySelector('.student-course-action strong') === null`), true, 'Course prices must be absent before placement');
          assert.equal(await evaluate(`getComputedStyle(document.querySelector('.student-course-add-hint')).visibility`), 'hidden');
          await evaluate(`document.querySelector('.student-course-add').focus()`);
          assert.equal(await evaluate(`getComputedStyle(document.querySelector('.student-course-add-hint')).visibility`), 'visible');
          assert.equal(await evaluate(`document.querySelector('.student-course-add button').disabled`), true);
          assert.match(await evaluate(`document.querySelector('.student-course-add-hint').textContent`), /bài kiểm tra đầu vào/);
          const target = await evaluate(`(()=>{document.activeElement.blur(); const r=document.querySelector('.student-course-add');r.scrollIntoView({block:'center'});const b=r.getBoundingClientRect();return JSON.stringify({x:b.x+b.width/2,y:b.y+b.height/2})})()`);
          await send('Input.dispatchMouseEvent', { type: 'mouseMoved', ...JSON.parse(target) });
          assert.equal(await evaluate(`getComputedStyle(document.querySelector('.student-course-add-hint')).visibility`), 'visible');
          assert.equal(await evaluate(`const r=document.querySelector('.student-course-add-hint').getBoundingClientRect();r.left>=0 && r.right<=innerWidth`), true);
          await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 0, y: 0 });
        }
        if (state === 'checkout-populated') {
          assert.equal(await evaluate(`document.querySelector('.courses-hero-primary').dataset.guidance`), 'true');
          assert.equal(await evaluate(`getComputedStyle(document.querySelector('.courses-hero-primary'),'::before').animationName`), 'course-guide-orbit');
          const angleBefore = await evaluate(`getComputedStyle(document.querySelector('.courses-hero-primary'),'::before').getPropertyValue('--course-guide-angle')`);
          await sleep(150);
          assert.notEqual(await evaluate(`getComputedStyle(document.querySelector('.courses-hero-primary'),'::before').getPropertyValue('--course-guide-angle')`), angleBefore);
          await evaluate(`document.querySelector('.courses-hero-primary').click()`);
          await sleep(100);
          assert.equal(await evaluate(`document.querySelector('.courses-hero-primary').dataset.guidance`), 'false');
          assert.equal(await evaluate(`document.querySelector('.student-placement-test').dataset.guidance`), 'true');
          assert.equal(await evaluate(`document.querySelector('.student-placement-checkbox').dataset.guidance`), 'true');
          assert.equal(await evaluate(`document.querySelector('textarea[name="academicFeedback"]').disabled`), true);
          assert.equal(await evaluate(`document.querySelector('li[aria-current="step"] h3').textContent`), 'Làm bài kiểm tra đầu vào');
          await evaluate(`document.querySelector('input[name="placementCompleted"]').click()`);
          await sleep(100);
          assert.equal(await evaluate(`document.querySelector('li[aria-current="step"] h3').textContent`), 'Nhận & nhập nhận xét học thuật');
          assert.equal(await evaluate(`document.querySelector('textarea').dataset.guidance`), 'true');
          assert.equal(await evaluate(`document.querySelector('.student-placement-test').dataset.guidance`), 'false');
          await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
          assert.equal(await evaluate(`getComputedStyle(document.querySelector('textarea')).animationName`), 'none');
          assert.equal(await evaluate(`getComputedStyle(document.querySelector('.course-guide-field'),'::before').animationName`), 'none');
          await send('Emulation.setEmulatedMedia', { features: [] });
          await evaluate(`const field=document.querySelector('textarea[name="academicFeedback"]');Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,'value').set.call(field,'Academic feedback recommending this course');field.dispatchEvent(new Event('input',{bubbles:true}));`);
          await sleep(200);
          assert.equal(await evaluate(`document.querySelector('textarea[name="academicFeedback"]').disabled`), false);
          assert.equal(await evaluate(`document.querySelector('li[aria-current="step"] h3').textContent`), 'Chọn khóa theo nhận xét');
          assert.equal(await evaluate(`document.querySelector('.student-placement-unlock button').dataset.guidance`), 'true');
          assert.equal(await evaluate(`document.querySelector('.student-course-action strong') === null`), true, 'Completing feedback alone must not reveal prices');
          assert.equal(await evaluate(`document.querySelector('.student-course-add button').disabled`), true, 'Course selection must wait for Continue');
          await evaluate(`Array.from(document.querySelectorAll('button')).find(b=>b.textContent.includes('Tiếp tục chọn khóa')).click()`);
          await sleep(300);
          assert.match(await evaluate(`document.querySelector('.student-course-action strong').textContent`), /7.900.000/);
          await evaluate(`document.querySelector('input[name="placementCompleted"]').click()`);
          await sleep(100);
          assert.equal(await evaluate(`document.querySelector('.student-course-action strong') === null`), true, 'Invalid placement must hide prices again');
          await evaluate(`document.querySelector('input[name="placementCompleted"]').click()`);
          await sleep(100);
          assert.equal(await evaluate(`document.querySelector('.student-course-action strong') === null`), true, 'Restoring placement still requires Continue');
          await evaluate(`Array.from(document.querySelectorAll('button')).find(b=>b.textContent.includes('Tiếp tục chọn khóa')).click()`);
          await sleep(300);
          assert.equal(await evaluate(`document.activeElement.id`), 'student-course-selection');
          assert.equal(await evaluate(`document.querySelector('.student-course-add button').dataset.guidance`), 'true');
          await evaluate(`document.querySelector('.student-course-add button').click()`);
          await sleep(150);
          assert.match(await evaluate(`document.querySelector('.student-course-action strong').textContent`), /7.900.000/, 'Prices remain visible after adding a course');
          assert.equal(await evaluate(`document.querySelector('nav a[href="/cart"]').getAttribute('aria-label')`), 'Giỏ hàng, 1 khoản đã chọn');
          assert.equal(await evaluate(`document.querySelector('nav a[href="/cart"]').dataset.guidance`), 'true');
          assert.equal(await evaluate(`document.querySelector('.student-course-add button').dataset.guidance`), 'false');
          const guideShot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
          const guideFile = path.join(directory, `guided-cart-${width}.png`);
          fs.writeFileSync(guideFile, Buffer.from(guideShot.data, 'base64'));
          console.log(JSON.stringify({ state: 'guided-cart', width, screenshot: guideFile }));
          await evaluate(`document.querySelector('nav a[href="/cart"]').click()`);
          await sleep(2000);
          assert.equal(await evaluate(`location.pathname`), '/cart');
          assert.equal(await evaluate(`document.querySelector('nav a[href="/cart"]').dataset.guidance`), 'false');
          assert.equal(await evaluate(`!!document.querySelector('input[name="name"]')`), true);
          assert.equal(await evaluate(`document.querySelector('.student-course-gate') === null`), true, 'Placement declaration must survive client navigation');
          assert.equal(await evaluate(`document.querySelector('button[type="submit"]').disabled`), true);
          assert.equal(await evaluate(`document.querySelector('form').dataset.checkoutStep`), 'review');
          await evaluate(`document.querySelector('input[name="checkoutReviewed"]').click()`);
          await sleep(100);
          assert.equal(await evaluate(`document.querySelector('form').dataset.checkoutStep`), 'name');
          const fillContact = async (name, value) => {
            await evaluate(`(()=>{const field=document.querySelector('input[name="${name}"]');Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(field,${JSON.stringify(value)});field.dispatchEvent(new Event('input',{bubbles:true}));})()`);
            await sleep(100);
          };
          await fillContact('name', 'Nguyễn Văn An');
          assert.equal(await evaluate(`document.querySelector('form').dataset.checkoutStep`), 'email', await evaluate(`JSON.stringify({fields:Array.from(new FormData(document.querySelector('form')).entries()),inputs:Array.from(document.querySelectorAll('input')).map(i=>({name:i.name,value:i.value,disabled:i.disabled}))})`));
          await fillContact('email', 'invalid');
          assert.equal(await evaluate(`document.querySelector('form').dataset.checkoutStep`), 'email');
          await fillContact('email', 'an@example.com');
          assert.equal(await evaluate(`document.querySelector('form').dataset.checkoutStep`), 'phone');
          await fillContact('phone', '+84912345678');
          assert.equal(await evaluate(`document.querySelector('form').dataset.checkoutStep`), 'unavailable');
          assert.equal(await evaluate(`document.querySelector('button[type="submit"]').disabled`), true);
          // Enable only the local read fixture. Do not submit or initiate a payment.
          await evaluate(`window.fetch=(url,options)=>String(url)==='/api/billing'?Promise.resolve(new Response(JSON.stringify(${JSON.stringify({ ...fixture, paymentAvailable: true })}),{status:200,headers:{'Content-Type':'application/json'}})):window.__originalBillingFetch(url,options);document.querySelector('[aria-label="Cập nhật trạng thái học phí"]').click()`);
          await sleep(300);
          assert.equal(await evaluate(`document.querySelector('form').dataset.checkoutStep`), 'pay');
          assert.equal(await evaluate(`document.querySelector('button[type="submit"]').dataset.guidance`), 'true');
          assert.equal(await evaluate(`document.querySelector('button[type="submit"]').disabled`), false);
          assert.equal(await evaluate(`getComputedStyle(document.querySelector('.student-pay-button'),'::before').animationName`), 'course-guide-orbit');
          await fillContact('name', ' ');
          assert.equal(await evaluate(`document.querySelector('form').dataset.checkoutStep`), 'name');
          assert.equal(await evaluate(`document.querySelector('button[type="submit"]').disabled`), true);
          await fillContact('name', 'Nguyễn Văn An');
        }
        if (state === 'fees-populated') {
          await evaluate(`document.querySelector('[role="tab"][id$="fees"]').dispatchEvent(new MouseEvent('mousedown',{bubbles:true,button:0}))`);
          await sleep(200);
          assert.match(await evaluate('document.body.innerText'), /Chờ xác nhận/);
          await evaluate(`Array.from(document.querySelectorAll('button')).find(b=>b.textContent.includes('Chọn thanh toán')).click()`);
          await evaluate(`document.querySelector('[role="tab"][id$="cart"]').dispatchEvent(new MouseEvent('mousedown',{bubbles:true,button:0}))`);
          await sleep(150);
          assert.equal(await evaluate(`JSON.parse(localStorage.getItem('pte-cart:guest')).length`), 2);
        }
        assert.equal(await evaluate('document.documentElement.scrollWidth > innerWidth'), false, `Overflow: ${state}/${width}`);
        const screenshot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
        const file = path.join(directory, `${state}-${width}.png`);
        fs.writeFileSync(file, Buffer.from(screenshot.data, 'base64'));
        console.log(JSON.stringify({ state, width, screenshot: file }));
      }
      await evaluate(`Array.from(document.querySelectorAll('button')).find(b=>b.getAttribute('aria-label')?.startsWith('Xóa ')).click()`);
      await evaluate(`Array.from(document.querySelectorAll('button')).find(b=>b.getAttribute('aria-label')?.startsWith('Xóa ')).click()`);
      assert.match(await evaluate('document.body.innerText'), /Chỉ thanh toán sau đánh giá đầu vào/);
    }
    assert.deepEqual(exceptions, []);
    console.log('Browser smoke passed: desktop/mobile logged-out student and admin, no runtime exceptions.');
  } finally { socket?.close(); browser.kill(); }
}
main().catch((error) => { console.error(error); process.exitCode = 1; });