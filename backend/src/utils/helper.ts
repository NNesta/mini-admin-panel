export const importPrivateKey = (pem: string) => {
  // Remove PEM header/footer and whitespace
  const binaryDer = str2ab(window.atob(cleanPrivateKey(pem)));

  return crypto.subtle.importKey(
    'spki',
    binaryDer,
    {
      name: 'RSASSA-PKCS1-v1_5',
      hash: 'SHA-384',
    },
    false,
    ['sign'],
  );
};
function str2ab(str: string) {
  const buf = new ArrayBuffer(str.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < str.length; i++) view[i] = str.charCodeAt(i);
  return buf;
}

export const cleanPrivateKey = (pem: string) => {
  return pem
    .replace('-----BEGIN RSA PRIVATE KEY-----', '')
    .replace('-----END RSA PRIVATE KEY-----', '')
    .replace(/\s+/g, '');
};
