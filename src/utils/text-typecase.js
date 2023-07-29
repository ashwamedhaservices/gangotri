export const toTitleCase = (word) => {
  if(!word) return '';
  return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
}