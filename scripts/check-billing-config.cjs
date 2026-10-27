// Local readiness check only: never prints secrets, connects to Firebase, or creates payments.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

// Use --server-env on the hosting server to avoid loading local fallback files.
for (const name of process.argv.includes('--server-env') ? [] : ['.env.local', '.env']) {
  const file = path.join(__dirname, '..', name);
  if (fs.existsSync(file)) process.loadEnvFile(file);
}
const file = path.join(__dirname, '../lib/billing/vnpay.ts');
const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const loaded = { exports: {} };
vm.runInNewContext(code, { module: loaded, exports: loaded.exports, require, process, Buffer, URL, URLSearchParams });
try {
  const config = loaded.exports.paymentConfig();
  console.log(`Environment: ${config.environment}`);
  console.log(`TmnCode: ${config.tmnCode}`);
  console.log(`Gateway: ${config.gateway}`);
  console.log(`Return URL: ${config.origin}/api/payments/vnpay/return`);
  if (['localhost', '127.0.0.1', '[::1]'].includes(new URL(config.origin).hostname)) {
    console.log('IPN: localhost is not reachable by VNPAY. Register a public HTTPS tunnel /api/payments/vnpay/ipn pointing to this local server for end-to-end confirmation.');
    console.log('Return only redirects to the local cart; it never marks an order paid. Existing payment URLs keep their original Return URL.');
  } else console.log(`IPN URL to register with VNPAY: ${config.origin}/api/payments/vnpay/ipn`);
  console.log('Configuration is structurally valid. Secret authenticity, registered callbacks and an end-to-end sandbox payment still require verification with VNPAY.');
} catch (error) {
  console.error(`Billing not ready [${loaded.exports.paymentReadiness().code}]: ${error.message}`);
  process.exitCode = 1;
}