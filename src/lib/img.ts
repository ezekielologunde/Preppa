/**
 * Right-size remote images at the CDN so we never download a multi-MB original
 * to fill a 200px card. Unsplash + Supabase Storage both support on-the-fly
 * transforms via query params. Unknown hosts pass through unchanged.
 */
export function imgUrl(url: string | null | undefined, width = 600): string {
  if (!url) return url ?? '';
  const w = Math.round(width);
  if (url.includes('images.unsplash.com')) {
    const base = url.split('?')[0];
    return `${base}?auto=format&fit=crop&w=${w}&q=70`;
  }
  // Supabase public storage → render endpoint with width + quality.
  if (url.includes('/storage/v1/object/public/')) {
    const rendered = url.replace('/storage/v1/object/public/', '/storage/v1/render/image/public/');
    const sep = rendered.includes('?') ? '&' : '?';
    return `${rendered}${sep}width=${w}&quality=70&resize=cover`;
  }
  return url;
}
