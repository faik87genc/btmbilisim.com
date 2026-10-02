// Usage: npm run hash-password -- "your-password-here"
// Prints a value to put in ADMIN_PASSWORD_HASH in your .env.local / Vercel env
// vars, plus a freshly generated SESSION_SECRET suggestion.
// Nothing is written to disk; the password itself is never printed.
import { randomBytes, scryptSync } from "crypto";

const MIN_LENGTH = 12;
const MAX_LENGTH = 256; // lib/auth.ts rejects longer passwords at login

const password = process.argv[2];

if (!password) {
  console.error('Kullanım: npm run hash-password -- "sifreniz"');
  process.exit(1);
}
if (password.length < MIN_LENGTH) {
  console.error(`Şifre en az ${MIN_LENGTH} karakter olmalı (şu an ${password.length}).`);
  process.exit(1);
}
if (password.length > MAX_LENGTH) {
  console.error(`Şifre en fazla ${MAX_LENGTH} karakter olabilir.`);
  process.exit(1);
}

const salt = randomBytes(16).toString("hex");
const hash = scryptSync(password, salt, 64).toString("hex");

console.log("\nADMIN_PASSWORD_HASH değeri:\n");
console.log(`${salt}:${hash}`);
console.log("\nSESSION_SECRET için rastgele bir değer (henüz tanımlamadıysanız):\n");
console.log(randomBytes(48).toString("base64url"));
console.log(
  "\nBu değerleri .env.local dosyanıza ve Vercel ortam değişkenlerine ekleyin." +
    "\nNot: shell geçmişinde şifre kalmaması için komutu çalıştırdıktan sonra geçmişi temizleyebilirsiniz.\n",
);
