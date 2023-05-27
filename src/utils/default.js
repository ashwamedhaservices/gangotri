export const createSlug = (str) => {
  return str.replace('-', '').toLowerCase().split(' ').filter(a => !!a).join('-')
}