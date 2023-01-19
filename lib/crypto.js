import CryptoJS from "crypto-js";

function encrypt(text) {
  const cipherText = CryptoJS.AES.encrypt(text, process.env.CRYPTO_KEY).toString();
  return cipherText
}

function decrypt(text) {
    const bytes  = CryptoJS.AES.decrypt(text, process.env.CRYPTO_KEY);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText
}

export { encrypt, decrypt };
