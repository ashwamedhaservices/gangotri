export const toTitleCase = (word) => {
  if(!word) return '';
  return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
}

export const fullName = (fname, mname, lname) => {
  return [fname, mname, lname].filter(Boolean).map((name) => toTitleCase(name)).join(' ');
}