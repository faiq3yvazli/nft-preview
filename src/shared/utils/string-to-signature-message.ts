export const stringToSignatureMessage = (input: string): string => {
  const binaryArray = new Uint8Array(input.length);
  binaryArray.forEach((value, index, array) => {
    array[index] = input.charCodeAt(index);
  });
  return binaryArray.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
};
