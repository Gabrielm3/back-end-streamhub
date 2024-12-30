// This file generates a slug from a string
const generateSlug = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-') 
    .replace(/^-+/, '') 
    .replace(/-+$/, '');  
}

export default generateSlug
