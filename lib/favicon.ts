export const FAVICON_ID = 'favicon';

export const faviconSvg = (bg: string, fg: string): string =>
  [
    '<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">',
    `<rect width="64" height="64" rx="14" fill="${bg}" />`,
    `<path d="M18 21 L31 32 L18 43" fill="none" stroke="${fg}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />`,
    `<rect x="35" y="38" width="13" height="6" rx="1.5" fill="${fg}" />`,
    '</svg>',
  ].join('');

export const syncFavicon = (): void => {
  const link = document.getElementById(FAVICON_ID);
  if (!(link instanceof HTMLLinkElement)) return;
  const css = getComputedStyle(document.documentElement);
  const bg = css.getPropertyValue('--color-bg').trim();
  const fg = css.getPropertyValue('--color-orange').trim();
  if (!bg || !fg) return;
  link.href = `data:image/svg+xml,${encodeURIComponent(faviconSvg(bg, fg))}`;
};
