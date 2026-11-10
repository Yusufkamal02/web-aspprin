const paths = {
  home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
  bricks: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9.3h18M3 14.6h18M9 4v5.3m6 0v5.3m-6 0V20"/>',
  calculator: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8m-8 5h1m6 0h1m-8 4h1m6 0h1"/>',
  users: '<circle cx="9" cy="8" r="3"/><path d="M2 20v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2m0-15a3 3 0 0 1 0 6m2 3a4 4 0 0 1 4 4v2"/>',
  'arrow-right': '<path d="M4 12h15m-6-6 6 6-6 6"/>',
  'arrow-up-right': '<path d="M6 18 18 6M8 6h10v10"/>',
  'arrow-left': '<path d="M20 12H5m6 6-6-6 6-6"/>',
  chevron: '<path d="m9 6 6 6-6 6"/>',
  bag: '<path d="M5 8h14l2 13H3L5 8zM9 10V6a3 3 0 0 1 6 0v4"/>',
  pin: '<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  bed: '<path d="M3 18v-7m18 7v-7M3 16h18M5 11V6h14v5M3 11h18m-13 0V9h3v2m2 0V9h3v2"/>',
  bath: '<path d="M3 12h18M5 12V5a2 2 0 0 1 4 0v1m-5 6 1 5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2l1-5M7 19v2m10-2v2"/>',
  ruler: '<path d="m3 15 12-12 6 6L9 21zM12 6l2 2m-5 1 2 2m-5 1 2 2"/>',
  sparkles: '<path d="M10 2c.8 5 2.7 7 7 8-4.3 1-6.2 3-7 8-.8-5-2.7-7-7-8 4.3-1 6.2-3 7-8zm9 12v6m-3-3h6m-3-14v4m-2-2h4"/>',
  search: '<circle cx="11" cy="11" r="6"/><path d="m16 16 4 4"/>',
  package: '<path d="m12 3 9 5v8l-9 5-9-5V8zm-9 5 9 5 9-5m-9 5v8M7.5 5.5l9 5"/>',
  messages: '<path d="M20 11a7 7 0 0 1-7 7H8l-4 3v-5a7 7 0 0 1-2-5V9a7 7 0 0 1 7-7h4a7 7 0 0 1 7 7zm-13-1h.01m4 0h.01m4 0h.01"/>',
  send: '<path d="m21 3-6 18-4-8-8-4 18-6zM11 13 21 3"/>',
  x: '<path d="m6 6 12 12M18 6 6 18"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
  phone: '<path d="M8 3H4v3a15 15 0 0 0 14 14h3v-4l-5-2-2 2a12 12 0 0 1-6-6l2-2z"/>',
  tree: '<rect x="8" y="2" width="8" height="5" rx="1"/><path d="M12 7v5M4 17v-5h16v5"/><rect x="1" y="17" width="6" height="5" rx="1"/><rect x="17" y="17" width="6" height="5" rx="1"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8h.01"/>',
  heart: '<path d="M20 5a5 5 0 0 0-8 1 5 5 0 0 0-8-1c-3 3-1 7 2 10l6 5 6-5c3-3 5-7 2-10z"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  shield: '<path d="M12 2 4 5v6c0 5 3 8 8 11 5-3 8-6 8-11V5z"/><path d="m8.5 12 2 2 5-5"/>',
};

export function icon(name, size = 20) {
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] ?? ''}</svg>`;
}
