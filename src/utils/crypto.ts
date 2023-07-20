const plaintextAlphabet =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const shift = 15;

const cipherAlphabet = plaintextAlphabet.split("").map((_symbol, index) => {
  const newIndex = (index + shift) % plaintextAlphabet.length;
  return plaintextAlphabet[newIndex];
});

export const encipher = (message: string) => {
  return message
    .split("")
    .map((symbol) => {
      const index = plaintextAlphabet.indexOf(symbol);
      return cipherAlphabet[index];
    })
    .join("");
};

export const decipher = (message: string) => {
  return message
    .split("")
    .map((symbol) => {
      const index = cipherAlphabet.indexOf(symbol);
      return plaintextAlphabet[index];
    })
    .join("");
};
