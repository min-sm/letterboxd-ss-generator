function replaceMultipleSpaces(text) {
  return text.replace(/\s+/g, " ");
}

// Example usage:
const originalText =
  "              This   text   has   multiple       spaces.              ";
const replacedText = replaceMultipleSpaces(originalText).trim();
console.log(replacedText); // Output: "This text has multiple spaces."
