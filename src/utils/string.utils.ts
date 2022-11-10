import slugify from 'slugify';

export function toSlug(text: string): string {
  if (!text) return '';
  text = text.replace('$', '').replace('%', '');

  return slugify(text, {
    replacement: '-',
    lower: true,
    strict: true,
    trim: true,
  });
}

export function toKeyword(text: string): string {
  if (!text) return '';
  return text.replace(/-/g, ' ');
}
