import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { resolve, join } from 'path';
import { generateKeyPairSync } from 'crypto';

export async function generateKeys() {
  try {
    console.log(resolve);
    const backendDir = resolve(__dirname, '../../');
    const frontendDir = resolve(backendDir, '../frontend');

    const backendKeysDir = resolve(backendDir, 'keys');
    const frontendKeysDir = resolve(frontendDir, 'keys');

    // Create key folders if missing
    [backendKeysDir, frontendKeysDir].forEach((dir) => {
      if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    });

    // Generate RSA key pair
    const { privateKey, publicKey } = generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: { type: 'spki', format: 'pem' },
      privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
    });

    // Write keys to files
    writeFileSync(join(backendKeysDir, 'private.pem'), privateKey);
    writeFileSync(join(frontendKeysDir, 'public.pem'), publicKey);

    console.log('✅ RSA key pair generated successfully!');
    console.log(`🔒 Backend private key: ${backendKeysDir}/private.pem`);
    console.log(`🔑 Frontend public key: ${frontendKeysDir}/public.pem`);
  } catch (err) {
    console.error('❌ Error generating keys:', err);
  }
}
