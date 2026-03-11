// In a real application, you would use a robust encryption system (e.g., Web Crypto API).
// For the scope of this project, we provide a basic obfuscation to prevent casual reading of LocalStorage.

export function encryptKey(text: string): string {
  if (!text) return text;
  try {
    // Basic obfuscation: Base64 encode the string reversed
    const reversed = text.split('').reverse().join('');
    return btoa(reversed);
  } catch (e) {
    return text;
  }
}

export function decryptKey(encodedText: string): string {
  if (!encodedText) return encodedText;
  try {
    const decoded = atob(encodedText);
    return decoded.split('').reverse().join('');
  } catch (e) {
    // If it fails to decrypt, it might not be encrypted (e.g., legacy data)
    return encodedText;
  }
}
