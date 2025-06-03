
export function trim(str: string, chars = ''): string {

  if (!chars) {
    return str.trim();
  }

  // Escape special characters for use in a RegExp
  const escapedChars = chars.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
  const pattern = new RegExp(`^[${escapedChars}]+|[${escapedChars}]+$`, 'g');
  return str.replace(pattern, '');

}
