import { SYS_ICONS } from "./sysicons.js";

/** Official Windows 8/10/11 logo path (Microsoft / Pentagram, Wikimedia "Windows logo - 2012.svg"). */
export const WIN10_LOGO = `<svg width="19" height="19" viewBox="0 0 88 88" fill="currentColor" aria-hidden="true"><path d="M0 12.402l35.687-4.86.016 34.423-35.67.203zm35.67 33.529l.028 34.453L.028 75.48.026 45.7zm4.326-39.025L87.314 0v41.527l-47.318.376zm47.329 39.349l-.011 41.34-47.318-6.678-.066-34.739z"/></svg>`;

/**
 * "Download" icon in the Windows 10 style (Segoe MDL2 / Fluent):
 * down arrow + tray, in currentColor. Inlined so the package
 * never depends on a network resource.
 */
export const DOWNLOAD_ICON = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 2.5v7.6" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/><path d="M6.8 7.4L10 10.6l3.2-3.2" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="square" stroke-linejoin="miter"/><path d="M4 12.6v2.2a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-2.2" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M3.5 17.5h13" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/></svg>`;

export const GLYPH_MIN = `<svg width="10" height="10" viewBox="0 0 10 10"><path d="M1 5h8" stroke="currentColor" stroke-width="1"/></svg>`;
export const GLYPH_MAX = `<svg width="10" height="10" viewBox="0 0 10 10"><rect x="1" y="1" width="8" height="8" fill="none" stroke="currentColor"/></svg>`;
export const GLYPH_RESTORE = `<svg width="10" height="10" viewBox="0 0 10 10"><rect x="4" y="1" width="5" height="5" fill="none" stroke="currentColor"/><rect x="1" y="4" width="5" height="5" fill="none" stroke="currentColor"/></svg>`;
export const GLYPH_CLOSE = `<svg width="10" height="10" viewBox="0 0 10 10"><path d="M1 1l8 8M9 1l-8 8" stroke="currentColor" stroke-width="1"/></svg>`;

/**
 * Official Windows 10 / Segoe MDL2 Assets icon pack, redrawn as inline SVG
 * (20px grid, currentColor, square caps — the MDL2 aesthetic).
 * Zero network dependency, usable anywhere (taskbar, nav, buttons, lists).
 */
const MDL2 = (inner: string) =>
	`<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">${inner}</svg>`;

/** Official blue "Information" icon (white "i"), 16px for titlebars/taskbar. */
export const INFO_ICON = `<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="7.5" fill="#0078D7"/><circle cx="8" cy="8" r="7" fill="none" stroke="#005A9E" stroke-width="1"/><rect x="7.1" y="7.2" width="1.8" height="5" fill="#fff"/><circle cx="8" cy="4.9" r="1.2" fill="#fff"/></svg>`;

/** Segoe MDL2 Globe (languages). Follows currentColor, i.e. the accent. */
export const GLOBE_ICON = `<svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.4"/><ellipse cx="8" cy="8" rx="3" ry="6.5" stroke="currentColor" stroke-width="1.2"/><path d="M1.5 8h13M2.8 4.8h10.4M2.8 11.2h10.4" stroke="currentColor" stroke-width="1.2"/></svg>`;

/** Official Win32 MessageBox icons (32px): blue i, yellow triangle, red X, blue ?. */
export const MSGBOX_INFO = `<svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="15" fill="#0078D7"/><circle cx="16" cy="16" r="14" fill="none" stroke="#005A9E" stroke-width="1.5"/><rect x="14.2" y="14.4" width="3.6" height="10" fill="#fff"/><circle cx="16" cy="9.8" r="2.4" fill="#fff"/></svg>`;
export const MSGBOX_WARNING = `<svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3.5L29.5 27.5H2.5Z" fill="#FFC83D" stroke="#7A6200" stroke-width="1.5" stroke-linejoin="round"/><rect x="14.9" y="12" width="2.2" height="8" fill="#000"/><circle cx="16" cy="23" r="1.4" fill="#000"/></svg>`;
export const MSGBOX_ERROR = `<svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="15" fill="#E81123"/><circle cx="16" cy="16" r="14" fill="none" stroke="#A50B18" stroke-width="1.5"/><path d="M11 11l10 10M21 11l-10 10" stroke="#fff" stroke-width="3"/></svg>`;
export const MSGBOX_QUESTION = `<svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="15" fill="#0078D7"/><circle cx="16" cy="16" r="14" fill="none" stroke="#005A9E" stroke-width="1.5"/><path d="M12.5 12.5c0-2 1.6-3.5 3.7-3.5 2 0 3.6 1.4 3.6 3.3 0 2.6-3 2.7-3.2 5.1" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/><circle cx="16.5" cy="21.6" r="1.5" fill="#fff"/></svg>`;

/** Navigation: back / forward arrows. */
export const ICON_BACK = MDL2(`<path d="M12 4.5L5.5 10l6.5 5.5M5.5 10H15" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/>`);
export const ICON_FORWARD = MDL2(`<path d="M8 4.5l6.5 5.5L8 15.5M14.5 10H5" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/>`);

/** Chevrons. */
export const ICON_CHEVRON_UP = MDL2(`<path d="M4.5 12L10 6.5 15.5 12" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/>`);
export const ICON_CHEVRON_DOWN = MDL2(`<path d="M4.5 8l5.5 5.5L15.5 8" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/>`);
export const ICON_CHEVRON_LEFT = MDL2(`<path d="M12 4.5L6.5 10l5.5 5.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/>`);
export const ICON_CHEVRON_RIGHT = MDL2(`<path d="M8 4.5l5.5 5.5L8 15.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/>`);

/** Directional arrows (with shaft). */
export const ICON_ARROW_UP = MDL2(`<path d="M10 16.5V3.5M4.8 8.7L10 3.5l5.2 5.2" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/>`);
export const ICON_ARROW_DOWN = MDL2(`<path d="M10 3.5v13M4.8 11.3L10 16.5l5.2-5.2" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/>`);
export const ICON_ARROW_LEFT = MDL2(`<path d="M16.5 10h-13M8.7 4.8L3.5 10l5.2 5.2" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/>`);
export const ICON_ARROW_RIGHT = MDL2(`<path d="M3.5 10h13M11.3 4.8l5.2 5.2-5.2 5.2" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/>`);

/** Basic shapes: check, plus, minus, record dot. */
export const ICON_CHECK = MDL2(`<path d="M4 10.2l4.4 4.4L16 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/>`);
export const ICON_PLUS = MDL2(`<path d="M10 4.5v11M4.5 10h11" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/>`);
export const ICON_MINUS = MDL2(`<path d="M4.5 10h11" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/>`);
export const ICON_DOT = MDL2(`<circle cx="10" cy="10" r="4" fill="currentColor" stroke="none"/>`);

/** Media transport: play, pause, stop. */
export const ICON_PLAY = MDL2(`<path d="M7 4.5l9 5.5-9 5.5z" fill="currentColor" stroke="none"/>`);
export const ICON_PAUSE = MDL2(
	`<rect x="6.5" y="4.5" width="2.8" height="11" fill="currentColor" stroke="none"/><rect x="10.7" y="4.5" width="2.8" height="11" fill="currentColor" stroke="none"/>`,
);
export const ICON_STOP = MDL2(`<rect x="6" y="6" width="8" height="8" fill="currentColor" stroke="none"/>`);

/** Audio speaker with waves. */
export const ICON_VOLUME = MDL2(
	`<path d="M3.5 8H7l4-3.2v10.4L7 12H3.5z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M13.5 7.5a4 4 0 0 1 0 5M15.8 5.5a7 7 0 0 1 0 9" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/>`,
);

/** Music note. */
export const ICON_MUSIC = MDL2(
	`<ellipse cx="7" cy="14" rx="2.6" ry="2.1" stroke="currentColor" stroke-width="1.6"/><path d="M9.6 13.6V4.2c2 0 3.5.8 4.4 2.2" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/>`,
);

/** Actions: search, refresh, save, trash, edit, share-less basics. */
export const ICON_SEARCH = MDL2(`<circle cx="9" cy="9" r="5.5" stroke="currentColor" stroke-width="1.8"/><path d="M13.2 13.2L18 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/>`);
export const ICON_REFRESH = MDL2(`<path d="M16.8 10a6.8 6.8 0 1 1-2-4.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/><path d="M15 2.5h4v4" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/>`);
export const ICON_SAVE = MDL2(
	`<path d="M5 3h8.5L17 6.5V17H5V3z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M7.5 3v4h6V3M7.5 17v-5h5v5" stroke="currentColor" stroke-width="1.4"/>`,
);
export const ICON_TRASH = MDL2(
	`<path d="M6 5.5h8M8.5 5.5V3.8h3v1.7M7 5.5l.6 11h4.8L13 5.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/><path d="M9.2 8.5v6M10.8 8.5v6" stroke="currentColor" stroke-width="1.4"/>`,
);
export const ICON_EDIT = MDL2(`<path d="M13.5 3.5l3 3L8 15H5v-3z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>`);

/** Objects: folder, file, home, star, heart, user, lock, calendar, clock, mail. */
export const ICON_FOLDER = MDL2(`<path d="M2.5 5.5h5l1.6 2h8.4V15h-15z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>`);
export const ICON_FILE = MDL2(`<path d="M5.5 2.8h5.5l4 4v10.4H5.5z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M11 2.8v4h4" stroke="currentColor" stroke-width="1.4"/>`);
export const ICON_HOME = MDL2(`<path d="M3.5 9.8L10 4l6.5 5.8M6 8.8V16h8V8.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/>`);
export const ICON_STAR = MDL2(
	`<path d="M10 3.2l2 4.8 5.2.2-4 3.2 1.3 5.1-4.5-2.9-4.5 2.9 1.3-5.1-4-3.2L8 8z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>`,
);
export const ICON_HEART = MDL2(
	`<path d="M10 17c-4-4-7-6.5-7-9.2C3 5.7 4.6 4 6.7 4c1.3 0 2.5.8 3.3 2 .8-1.2 2-2 3.3-2C15.4 4 17 5.7 17 7.8 17 10.5 14 13 10 17z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>`,
);
export const ICON_USER = MDL2(
	`<circle cx="10" cy="6.8" r="3.2" stroke="currentColor" stroke-width="1.6"/><path d="M3.8 16.8c.6-3.4 3-5.2 6.2-5.2s5.6 1.8 6.2 5.2" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/>`,
);
export const ICON_LOCK = MDL2(
	`<rect x="6" y="9" width="8" height="7" stroke="currentColor" stroke-width="1.6"/><path d="M7.8 9V6.8a2.2 2.2 0 0 1 4.4 0V9" stroke="currentColor" stroke-width="1.6"/>`,
);
export const ICON_CALENDAR = MDL2(
	`<rect x="3.5" y="5" width="13" height="11" stroke="currentColor" stroke-width="1.6"/><path d="M3.5 9h13M7 2.8V6M13 2.8V6" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/>`,
);
export const ICON_CLOCK = MDL2(`<circle cx="10" cy="10" r="6.5" stroke="currentColor" stroke-width="1.6"/><path d="M10 6.5V10l2.6 1.6" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/>`);
export const ICON_MAIL = MDL2(
	`<rect x="3" y="5.5" width="14" height="9" stroke="currentColor" stroke-width="1.6"/><path d="M3.5 6.2L10 11l6.5-4.8" stroke="currentColor" stroke-width="1.6"/>`,
);

/** Windows Security shield with check (NT security). */
export const ICON_SHIELD = MDL2(
	`<path d="M10 2.8l6 2.4v4.6c0 3.8-2.6 6-6 7.2-3.4-1.2-6-3.4-6-7.2V5.2z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M7.3 9.8l1.9 1.9 3.3-3.8" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/>`,
);

/** Power button. */
export const ICON_POWER = MDL2(`<path d="M10 3v6.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/><path d="M6.3 6.2a6.8 6.8 0 1 0 7.4 0" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/>`);

/** WiFi radiating arcs. */
export const ICON_WIFI = MDL2(
	`<path d="M3.5 11.5a9 9 0 0 1 13 0M6 14a5.5 5.5 0 0 1 8 0" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/><circle cx="10" cy="16.6" r="1.3" fill="currentColor" stroke="none"/>`,
);

/** Battery. */
export const ICON_BATTERY = MDL2(
	`<rect x="2.5" y="7" width="12" height="6" stroke="currentColor" stroke-width="1.6"/><path d="M16.8 9v2" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/>`,
);

/** Settings cog (simplified official gear). */
export const ICON_SETTINGS = MDL2(
	`<circle cx="10" cy="10" r="2.6" stroke="currentColor" stroke-width="1.6"/><path d="M14.6 10h2.8M2.6 10h2.8M10 14.6v2.8M10 2.6v2.8M13.2 13.2l2 2M4.8 4.8l2 2M13.2 6.8l2-2M4.8 15.2l2-2" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/>`,
);

/* ================= Extended MDL2 pack (batch 2) =================
 * Same 20px grid / currentColor / square-cap aesthetic as above.
 * Covers the glyphs real Win10 apps use every day: media transport,
 * file operations, connectivity, devices, people, view controls... */

export const ICON_INFO = MDL2(`<circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.6"/><path d="M10 9v5" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/><circle cx="10" cy="6.6" r="1.1" fill="currentColor" stroke="none"/>`);
export const ICON_WARN = MDL2(`<path d="M10 3.5L17.5 16.5H2.5Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M10 8v4" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/><circle cx="10" cy="14" r="1" fill="currentColor" stroke="none"/>`);
export const ICON_ERROR = MDL2(`<circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.6"/><path d="M7.5 7.5l5 5M12.5 7.5l-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/>`);
export const ICON_SUCCESS = MDL2(`<circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.6"/><path d="M6.8 10.2l2.2 2.2 4.2-4.6" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/>`);
export const ICON_CANCEL = MDL2(`<circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.6"/><path d="M8 8l4 4M12 8l-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/>`);
export const ICON_ACCEPT = MDL2(`<circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.6"/><path d="M6.8 10.2l2.2 2.2 4.2-4.6" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/>`);
export const ICON_UNDO = MDL2(`<path d="M8 6H4.5v3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/><path d="M4.8 9.5A6 6 0 1 1 3.5 14" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/>`);
export const ICON_REDO = MDL2(`<path d="M12 6h3.5v3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/><path d="M15.2 9.5A6 6 0 1 0 16.5 14" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/>`);
export const ICON_SKIP_BACK = MDL2(`<path d="M5 5v10" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/><path d="M15.5 5.5L8.5 10l7 4.5z" fill="currentColor" stroke="none"/>`);
export const ICON_SKIP_FORWARD = MDL2(`<path d="M15 5v10" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/><path d="M4.5 5.5l7 4.5-7 4.5z" fill="currentColor" stroke="none"/>`);
export const ICON_REPEAT = MDL2(`<path d="M4 8h9.5l-2-2M16 12H6.5l2 2" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/>`);
export const ICON_SHUFFLE = MDL2(`<path d="M3.5 6.5h3.2l6.6 7h3.2M3.5 13.5h3.2l1.8-1.9M11.5 8.4l1.8-1.9h3.2" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/><path d="M14.5 4.5l2 2-2 2M14.5 11.5l2 2-2 2" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/>`);
export const ICON_EJECT = MDL2(`<path d="M10 4.5L16 12H4z" fill="currentColor" stroke="none"/><path d="M4.5 14.5h11" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/>`);
export const ICON_MUTE = MDL2(`<path d="M3.5 8H7l4-3.2v10.4L7 12H3.5z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M13.5 9.5l4 4M17.5 9.5l-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/>`);
export const ICON_VIDEO = MDL2(`<rect x="2.5" y="6" width="11" height="8" stroke="currentColor" stroke-width="1.6"/><path d="M13.5 9.5l4-2.5v6l-4-2.5" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>`);
export const ICON_PHOTO = MDL2(`<rect x="3" y="4.5" width="14" height="11" stroke="currentColor" stroke-width="1.6"/><circle cx="7" cy="8.5" r="1.4" stroke="currentColor" stroke-width="1.4"/><path d="M3.5 14.5l4-4 3 3 2.5-2.5 3 3" stroke="currentColor" stroke-width="1.4"/>`);
export const ICON_CAMERA = MDL2(`<rect x="2.5" y="7" width="15" height="9" stroke="currentColor" stroke-width="1.6"/><circle cx="10" cy="11.5" r="2.6" stroke="currentColor" stroke-width="1.6"/><path d="M7 7l1-2h4l1 2" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>`);
export const ICON_MIC = MDL2(`<rect x="7.5" y="2.8" width="5" height="9" stroke="currentColor" stroke-width="1.6"/><path d="M5 10.5a5 5 0 0 0 10 0M10 15.5V18" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/>`);
export const ICON_PHONE = MDL2(`<path d="M6.5 3.5h3l1.5 4-2 1.5a8 8 0 0 0 3.5 3.5l1.5-2 4 1.5v3a1.5 1.5 0 0 1-1.6 1.5C10.4 16.4 3.6 9.6 3.5 3.6A1.5 1.5 0 0 1 5 2.1" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>`);
export const ICON_COMMENT = MDL2(`<path d="M3.5 4.5h13v8h-8l-3.5 3v-3H3.5z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>`);
export const ICON_SHARE = MDL2(`<circle cx="6" cy="10" r="2.4" stroke="currentColor" stroke-width="1.6"/><circle cx="14.5" cy="5.5" r="2.4" stroke="currentColor" stroke-width="1.6"/><circle cx="14.5" cy="14.5" r="2.4" stroke="currentColor" stroke-width="1.6"/><path d="M8.2 9l4-2.4M8.2 11l4 2.4" stroke="currentColor" stroke-width="1.4"/>`);
export const ICON_SEND = MDL2(`<path d="M17 3L8.5 11.5M17 3l-6 14-2.5-5.5L3 9z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>`);
export const ICON_LINK = MDL2(`<path d="M8.5 11.5a3.5 3.5 0 0 0 5 0l2.5-2.5a3.5 3.5 0 0 0-5-5L9.5 5.5M11.5 8.5a3.5 3.5 0 0 0-5 0L4 11a3.5 3.5 0 0 0 5 5l1.5-1.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/>`);
export const ICON_ATTACH = MDL2(`<path d="M13.5 8.5l-4.7 4.7a2.3 2.3 0 0 1-3.2-3.2l6-6a3.8 3.8 0 0 1 5.4 5.4l-6.2 6.2a6 6 0 0 1-8.4-8.4" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/>`);
export const ICON_TAG = MDL2(`<path d="M3.5 3.5H10l6.5 6.5-6.5 6.5-6.5-6.5z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="7.5" cy="7.5" r="1.2" fill="currentColor" stroke="none"/>`);
export const ICON_FLAG = MDL2(`<path d="M6 17.5v-14" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/><path d="M6 3.5h9.5l-2 3.5 2 3.5H6" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>`);
export const ICON_BOOKMARK = MDL2(`<path d="M6 3.5h8V17l-4-2.8L6 17z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>`);
export const ICON_HISTORY = MDL2(`<path d="M3.5 10a6.5 6.5 0 1 1 2 4.7" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/><path d="M3.5 10H2l1-2.5L5.5 8 4 9.5M10 6.8V10l2.4 1.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/>`);
export const ICON_HELP = MDL2(`<circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.6"/><path d="M8 8.5c0-1.2 1-2 2.2-2 1.1 0 2 .8 2 1.9 0 1.5-1.7 1.6-1.9 3" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/><circle cx="10.3" cy="14" r="1" fill="currentColor" stroke="none"/>`);
export const ICON_EMOJI = MDL2(`<circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.6"/><circle cx="7.6" cy="8.6" r="1" fill="currentColor" stroke="none"/><circle cx="12.4" cy="8.6" r="1" fill="currentColor" stroke="none"/><path d="M6.8 12a4 4 0 0 0 6.4 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/>`);
export const ICON_BELL = MDL2(`<path d="M10 3.5a4.5 4.5 0 0 1 4.5 4.5c0 3 1 4 1.5 4.5H4c.5-.5 1.5-1.5 1.5-4.5A4.5 4.5 0 0 1 10 3.5z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M8.5 15.5a1.6 1.6 0 0 0 3 0" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/>`);
export const ICON_BELL_OFF = MDL2(`<path d="M10 3.5a4.5 4.5 0 0 1 4.5 4.5c0 3 1 4 1.5 4.5H7" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M4 4l12 12" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/>`);
export const ICON_PIN = MDL2(`<path d="M12.5 3.5l4 4-2 .5-2.5 2.5.5 3-2.5 2.5-.5-2.5-3.5-3.5L3 9.5 5.5 7l3 .5L11 5z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>`);
export const ICON_UNPIN = MDL2(`<path d="M12.5 3.5l4 4-2 .5-2.5 2.5.5 3-2.5 2.5-.5-2.5-3.5-3.5L3 9.5 5.5 7l3 .5L11 5z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M3.5 3.5l13 13" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/>`);
export const ICON_MENU = MDL2(`<path d="M3.5 6h13M3.5 10h13M3.5 14h13" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/>`);
export const ICON_MORE = MDL2(`<circle cx="5" cy="10" r="1.3" fill="currentColor" stroke="none"/><circle cx="10" cy="10" r="1.3" fill="currentColor" stroke="none"/><circle cx="15" cy="10" r="1.3" fill="currentColor" stroke="none"/>`);
export const ICON_LIST = MDL2(`<path d="M7 6h9.5M7 10h9.5M7 14h9.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/><circle cx="4.5" cy="6" r="1" fill="currentColor" stroke="none"/><circle cx="4.5" cy="10" r="1" fill="currentColor" stroke="none"/><circle cx="4.5" cy="14" r="1" fill="currentColor" stroke="none"/>`);
export const ICON_GRID = MDL2(`<rect x="3.5" y="3.5" width="5.5" height="5.5" stroke="currentColor" stroke-width="1.6"/><rect x="11" y="3.5" width="5.5" height="5.5" stroke="currentColor" stroke-width="1.6"/><rect x="3.5" y="11" width="5.5" height="5.5" stroke="currentColor" stroke-width="1.6"/><rect x="11" y="11" width="5.5" height="5.5" stroke="currentColor" stroke-width="1.6"/>`);
export const ICON_SORT = MDL2(`<path d="M6 4.5v11M6 15.5l-2.5-2.5M6 15.5l2.5-2.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/><path d="M10 7h6.5M10 11h5M10 15h3" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/>`);
export const ICON_FILTER = MDL2(`<path d="M3.5 5h13l-5 6v4.5l-3 1.5v-6z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>`);
export const ICON_ZOOM_IN = MDL2(`<circle cx="9" cy="9" r="5.5" stroke="currentColor" stroke-width="1.8"/><path d="M13.2 13.2L18 18M9 6.5v5M6.5 9h5" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/>`);
export const ICON_ZOOM_OUT = MDL2(`<circle cx="9" cy="9" r="5.5" stroke="currentColor" stroke-width="1.8"/><path d="M13.2 13.2L18 18M6.5 9h5" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/>`);
export const ICON_FULLSCREEN = MDL2(`<path d="M3.5 7V3.5H7M13 3.5h3.5V7M16.5 13v3.5H13M7 16.5H3.5V13" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/>`);
export const ICON_COPY = MDL2(`<rect x="7" y="7" width="9.5" height="9.5" stroke="currentColor" stroke-width="1.6"/><path d="M13 7V3.5H3.5V13H7" stroke="currentColor" stroke-width="1.6"/>`);
export const ICON_PASTE = MDL2(`<rect x="4" y="6" width="12" height="10.5" stroke="currentColor" stroke-width="1.6"/><path d="M7 6V4.5h6V6M7.5 10h5M7.5 12.5h5" stroke="currentColor" stroke-width="1.4"/>`);
export const ICON_CUT = MDL2(`<circle cx="6" cy="7" r="2.4" stroke="currentColor" stroke-width="1.5"/><circle cx="6" cy="13.5" r="2.4" stroke="currentColor" stroke-width="1.5"/><path d="M8 8.8L16.5 16M8 11.7l8.5-7.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/>`);
export const ICON_PRINT = MDL2(`<path d="M6.5 7V3.5h7V7" stroke="currentColor" stroke-width="1.6"/><rect x="3.5" y="7" width="13" height="6.5" stroke="currentColor" stroke-width="1.6"/><rect x="6.5" y="11.5" width="7" height="5" stroke="currentColor" stroke-width="1.4"/>`);
export const ICON_CLOUD = MDL2(`<path d="M6 15.5a3.5 3.5 0 0 1 .5-7A5 5 0 0 1 16 9.5a3 3 0 0 1 .5 6z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>`);
export const ICON_UPLOAD = MDL2(`<path d="M10 12.5V4M6.8 7.2L10 4l3.2 3.2" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/><path d="M4 13.5v1.5a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-1.5" stroke="currentColor" stroke-width="1.8"/><path d="M3.5 17.5h13" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/>`);
export const ICON_LOCATION = MDL2(`<path d="M10 17.5S4.5 11.4 4.5 7.5a5.5 5.5 0 0 1 11 0c0 3.9-5.5 10-5.5 10z" stroke="currentColor" stroke-width="1.6"/><circle cx="10" cy="7.5" r="1.8" stroke="currentColor" stroke-width="1.4"/>`);
export const ICON_MAP = MDL2(`<path d="M7 4L3 5.5v11L7 15l6 1.5 4-1.5v-11L13 5.5zM7 4v11M13 5.5v11" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>`);
export const ICON_CALCULATOR = MDL2(`<rect x="5" y="2.8" width="10" height="14.4" stroke="currentColor" stroke-width="1.6"/><path d="M6.5 6h7" stroke="currentColor" stroke-width="1.6"/><path d="M7.5 10h1M9.5 10h1M11.5 10h1M7.5 12.5h1M9.5 12.5h1M11.5 12.5h1M7.5 15h1M9.5 15h1M11.5 15h1" stroke="currentColor" stroke-width="1.4" stroke-linecap="square"/>`);
export const ICON_NOTEPAD = MDL2(`<path d="M5 3h10v14H5z" stroke="currentColor" stroke-width="1.6"/><path d="M7.5 7h5M7.5 10h5M7.5 13h3" stroke="currentColor" stroke-width="1.4" stroke-linecap="square"/>`);
export const ICON_TERMINAL = MDL2(`<rect x="2.5" y="4" width="15" height="12" stroke="currentColor" stroke-width="1.6"/><path d="M6 8l2.5 2L6 12M10 12.5h4" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/>`);
export const ICON_CODE = MDL2(`<path d="M7.5 6.5L3.5 10l4 3.5M12.5 6.5l4 3.5-4 3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/>`);
export const ICON_BUG = MDL2(`<ellipse cx="10" cy="11" rx="3.5" ry="4.5" stroke="currentColor" stroke-width="1.6"/><path d="M10 6.5V4M7.5 5l1 1.5M12.5 5l-1 1.5M4.5 9l2 .8M15.5 9l-2 .8M4.5 13.5l2-.8M15.5 13.5l-2-.8" stroke="currentColor" stroke-width="1.4" stroke-linecap="square"/>`);
export const ICON_GIFT = MDL2(`<rect x="3.5" y="8" width="13" height="3.5" stroke="currentColor" stroke-width="1.6"/><path d="M5 11.5V16.5h10v-5M10 8v8.5M10 8S7 8 6 7a1.5 1.5 0 0 1 2-2c1.2 0 2 3 2 3zM10 8s3 0 4-1a1.5 1.5 0 0 0-2-2c-1.2 0-2 3-2 3z" stroke="currentColor" stroke-width="1.4"/>`);
export const ICON_GAMEPAD = MDL2(`<path d="M7 7.5h6a4 4 0 0 1 4 4v1.5a2.5 2.5 0 0 1-4.5 1.5L11 13H9l-1.5 1.5A2.5 2.5 0 0 1 3 13v-1.5a4 4 0 0 1 4-4z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M7 10.5v3M5.5 12h3" stroke="currentColor" stroke-width="1.3" stroke-linecap="square"/><circle cx="13" cy="11" r=".9" fill="currentColor" stroke="none"/><circle cx="14.8" cy="12.8" r=".9" fill="currentColor" stroke="none"/>`);
export const ICON_CART = MDL2(`<path d="M3 4h2.5l2 10h9.5l2-7H6" stroke="currentColor" stroke-width="1.6" stroke-linecap="square" stroke-linejoin="round"/><circle cx="8.5" cy="17" r="1.2" stroke="currentColor" stroke-width="1.3"/><circle cx="14" cy="17" r="1.2" stroke="currentColor" stroke-width="1.3"/>`);
export const ICON_CONTACT = MDL2(`<rect x="3" y="4.5" width="14" height="11" stroke="currentColor" stroke-width="1.6"/><circle cx="7.5" cy="9" r="1.8" stroke="currentColor" stroke-width="1.4"/><path d="M5 13.5c.4-1.8 1.4-2.6 2.5-2.6s2.1.8 2.5 2.6M12 8.5h3M12 11h3" stroke="currentColor" stroke-width="1.4" stroke-linecap="square"/>`);
export const ICON_GROUP = MDL2(`<circle cx="8" cy="7.5" r="2.8" stroke="currentColor" stroke-width="1.5"/><path d="M2.5 16c.5-3 2.6-4.5 5.5-4.5s5 1.5 5.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/><circle cx="14" cy="8.5" r="2" stroke="currentColor" stroke-width="1.4"/><path d="M14.5 11.7c2 .3 3.2 1.5 3.5 3.8" stroke="currentColor" stroke-width="1.4" stroke-linecap="square"/>`);
export const ICON_LIKE = MDL2(`<path d="M7 9.5V16.5H4.5V9.5zM7 10l4-6.5c1 0 1.6.8 1.2 1.9L11.5 8H16a1.5 1.5 0 0 1 1.5 1.8l-1.2 5.4a1.5 1.5 0 0 1-1.5 1.3H7" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>`);
export const ICON_DISLIKE = MDL2(`<path d="M7 10.5V3.5h2.5v7zM7 10l4 6.5c1 0 1.6-.8 1.2-1.9L11.5 12H16a1.5 1.5 0 0 0 1.5-1.8l-1.2-5.4A1.5 1.5 0 0 0 14.8 3.5H7" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>`);
export const ICON_KEYBOARD = MDL2(`<rect x="2" y="6.5" width="16" height="7" stroke="currentColor" stroke-width="1.6"/><path d="M5 9.5h1M8 9.5h1M11 9.5h1M14 9.5h1M6 12h8" stroke="currentColor" stroke-width="1.3" stroke-linecap="square"/>`);
export const ICON_MOUSE = MDL2(`<rect x="6.5" y="3" width="7" height="14" stroke="currentColor" stroke-width="1.6"/><path d="M10 3v4.5" stroke="currentColor" stroke-width="1.4"/>`);
export const ICON_MONITOR = MDL2(`<rect x="2.5" y="4" width="15" height="10" stroke="currentColor" stroke-width="1.6"/><path d="M8 17.5h4M10 14v3.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/>`);
export const ICON_LAPTOP = MDL2(`<rect x="5" y="4.5" width="10" height="7" stroke="currentColor" stroke-width="1.6"/><path d="M2.5 14.5h15l-1.5 2h-12z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>`);
export const ICON_TABLET = MDL2(`<rect x="5.5" y="2.8" width="9" height="14.4" stroke="currentColor" stroke-width="1.6"/><circle cx="10" cy="15" r=".9" fill="currentColor" stroke="none"/>`);
export const ICON_TV = MDL2(`<rect x="2" y="5" width="16" height="10" stroke="currentColor" stroke-width="1.6"/><path d="M8 17.5h4" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/>`);
export const ICON_HEADPHONES = MDL2(`<path d="M4.5 13.5v-3a5.5 5.5 0 0 1 11 0v3" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/><rect x="3.5" y="12" width="3" height="4.5" stroke="currentColor" stroke-width="1.5"/><rect x="13.5" y="12" width="3" height="4.5" stroke="currentColor" stroke-width="1.5"/>`);
export const ICON_BLUETOOTH = MDL2(`<path d="M7 4.5l6 4.5-6 4.5zM7 4.5v9M7 9l6-4.5M7 11l6 4.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="square" stroke-linejoin="round"/>`);
export const ICON_MOON = MDL2(`<path d="M14.5 13.5A5.5 5.5 0 0 1 6.5 5.5a5.5 5.5 0 1 0 8 8z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>`);
export const ICON_SUN = MDL2(`<circle cx="10" cy="10" r="3" stroke="currentColor" stroke-width="1.6"/><path d="M10 2.8v2M10 15.2v2M2.8 10h2M15.2 10h2M4.9 4.9l1.4 1.4M13.7 13.7l1.4 1.4M15.1 4.9l-1.4 1.4M6.3 13.7l-1.4 1.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/>`);
export const ICON_TASKVIEW = MDL2(`<rect x="2.5" y="5" width="8" height="10" stroke="currentColor" stroke-width="1.6"/><rect x="12.5" y="7" width="5" height="4" stroke="currentColor" stroke-width="1.4"/><rect x="12.5" y="12.5" width="5" height="2.5" stroke="currentColor" stroke-width="1.4"/>`);
export const ICON_CORTANA = MDL2(`<circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.6"/><circle cx="10" cy="10" r="3" stroke="currentColor" stroke-width="1.4"/>`);
export const ICON_DASHBOARD = MDL2(`<rect x="3" y="3" width="7" height="7" fill="currentColor" stroke="none"/><rect x="11" y="3" width="6" height="7" fill="currentColor" stroke="none" opacity=".65"/><rect x="3" y="11" width="6" height="6" fill="currentColor" stroke="none" opacity=".65"/><rect x="10" y="11" width="7" height="6" fill="currentColor" stroke="none"/>`);
export const ICON_FOLDER_OPEN = MDL2(`<path d="M2.5 5.5h5l1.6 2h8.4v2H4l-1.5-4z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M2.5 9.5h15V15h-15z" stroke="currentColor" stroke-width="1.6"/>`);
export const ICON_NEW_FOLDER = MDL2(`<path d="M2.5 5.5h5l1.6 2h8.4V15h-15z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M13 11.5v4M11 13.5h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/>`);
export const ICON_FILE_ADD = MDL2(`<path d="M5.5 2.8h5.5l4 4v10.4H5.5z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M12 8.5v3M10.5 10h3" stroke="currentColor" stroke-width="1.4" stroke-linecap="square"/>`);
export const ICON_BLOCK = MDL2(`<circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.6"/><path d="M5 5l10 10" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/>`);
export const ICON_UPDATE = MDL2(`<path d="M16.5 10a6.5 6.5 0 0 1-11 4.6M3.5 10a6.5 6.5 0 0 1 11-4.6" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/><path d="M14.5 2.8v3h-3M5.5 17.2v-3h3" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/>`);
export const ICON_TROPHY = MDL2(`<path d="M7 4h6v4a3 3 0 0 1-6 0z" stroke="currentColor" stroke-width="1.6"/><path d="M7 5H4.5a.5.5 0 0 0-.5.5C4 7.5 5.5 8.5 7 8.5M13 5h2.5a.5.5 0 0 1 .5.5c0 2-1.5 3-3 3M10 11v2.5M7.5 16.5h5M9 13.5h2" stroke="currentColor" stroke-width="1.4" stroke-linecap="square"/>`);
export const ICON_SCAN = MDL2(`<path d="M3.5 7V3.5H7M13 3.5h3.5V7M16.5 13v3.5H13M7 16.5H3.5V13" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/><path d="M4 10h12" stroke="currentColor" stroke-width="1.6"/>`);
export const ICON_KEY = MDL2(`<circle cx="7" cy="10" r="4" stroke="currentColor" stroke-width="1.6"/><path d="M11 10h6M15 10v3M17 10v2" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/>`);
export const ICON_COMPASS = MDL2(`<circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.6"/><path d="M12.5 7.5l-2 3.5-3 1 2-3.5z" fill="currentColor" stroke="none"/>`);
export const ICON_VIEW = MDL2(`<path d="M2.5 10S5.5 5.5 10 5.5 17.5 10 17.5 10 14.5 14.5 10 14.5 2.5 10 2.5 10z" stroke="currentColor" stroke-width="1.6"/><circle cx="10" cy="10" r="2.2" stroke="currentColor" stroke-width="1.4"/>`);
export const ICON_HIDE = MDL2(`<path d="M2.5 10S5.5 5.5 10 5.5c1.5 0 2.8.5 4 1.2M17.5 10S14.5 14.5 10 14.5c-1.5 0-2.8-.5-4-1.2" stroke="currentColor" stroke-width="1.6"/><path d="M4 4l12 12" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/>`);
export const ICON_WIFI_OFF = MDL2(`<path d="M3.5 11.5a9 9 0 0 1 5-2.7M16.5 11.5a9 9 0 0 0-3.5-2.3M6 14a5.5 5.5 0 0 1 2.5-1.4" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/><path d="M4 4l12 12" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/>`);
export const ICON_ETHERNET = MDL2(`<path d="M6.5 13.5L10 16l3.5-2.5M10 16v-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/><path d="M6 4.5h8v6H6z" stroke="currentColor" stroke-width="1.6"/><path d="M7.5 7h1M9.5 7h1M11.5 7h1" stroke="currentColor" stroke-width="1.2" stroke-linecap="square"/>`);
export const ICON_PRINTER_ALT = MDL2(`<rect x="6" y="2.5" width="8" height="5" stroke="currentColor" stroke-width="1.5"/><rect x="3" y="7" width="14" height="7" stroke="currentColor" stroke-width="1.6"/><rect x="6" y="11" width="8" height="5.5" stroke="currentColor" stroke-width="1.4"/>`);
export const ICON_FAVORITE = MDL2(`<path d="M10 3.2l2 4.8 5.2.2-4 3.2 1.3 5.1-4.5-2.9-4.5 2.9 1.3-5.1-4-3.2L8 8z" fill="currentColor" stroke="none"/>`);
export const ICON_DOCUMENT = MDL2(`<path d="M5.5 2.8h5.5l4 4v10.4H5.5z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M7.5 10h5M7.5 12.5h5M7.5 15h3" stroke="currentColor" stroke-width="1.3" stroke-linecap="square"/>`);

/**
 * Named registry of every icon in the pack (old + extended + system set).
 * Use with {@link getWin10Icon} / {@link w10Icon} for dynamic lookup
 * (Start menu search, settings pages, file lists...).
 */
export const ICONS = {
	back: ICON_BACK, forward: ICON_FORWARD,
	chevronUp: ICON_CHEVRON_UP, chevronDown: ICON_CHEVRON_DOWN, chevronLeft: ICON_CHEVRON_LEFT, chevronRight: ICON_CHEVRON_RIGHT,
	arrowUp: ICON_ARROW_UP, arrowDown: ICON_ARROW_DOWN, arrowLeft: ICON_ARROW_LEFT, arrowRight: ICON_ARROW_RIGHT,
	check: ICON_CHECK, plus: ICON_PLUS, minus: ICON_MINUS, dot: ICON_DOT,
	play: ICON_PLAY, pause: ICON_PAUSE, stop: ICON_STOP, skipBack: ICON_SKIP_BACK, skipForward: ICON_SKIP_FORWARD,
	repeat: ICON_REPEAT, shuffle: ICON_SHUFFLE, eject: ICON_EJECT,
	volume: ICON_VOLUME, mute: ICON_MUTE, music: ICON_MUSIC, video: ICON_VIDEO, photo: ICON_PHOTO, camera: ICON_CAMERA, mic: ICON_MIC,
	search: ICON_SEARCH, refresh: ICON_REFRESH, save: ICON_SAVE, trash: ICON_TRASH, edit: ICON_EDIT,
	folder: ICON_FOLDER, folderOpen: ICON_FOLDER_OPEN, newFolder: ICON_NEW_FOLDER,
	file: ICON_FILE, fileAdd: ICON_FILE_ADD, document: ICON_DOCUMENT,
	home: ICON_HOME, star: ICON_STAR, favorite: ICON_FAVORITE, heart: ICON_HEART,
	like: ICON_LIKE, dislike: ICON_DISLIKE, comment: ICON_COMMENT,
	user: ICON_USER, contact: ICON_CONTACT, group: ICON_GROUP,
	lock: ICON_LOCK, key: ICON_KEY, shield: ICON_SHIELD,
	calendar: ICON_CALENDAR, clock: ICON_CLOCK, history: ICON_HISTORY, mail: ICON_MAIL, phone: ICON_PHONE,
	power: ICON_POWER, wifi: ICON_WIFI, wifiOff: ICON_WIFI_OFF, ethernet: ICON_ETHERNET, bluetooth: ICON_BLUETOOTH, battery: ICON_BATTERY,
	settings: ICON_SETTINGS, globe: GLOBE_ICON, location: ICON_LOCATION, map: ICON_MAP, compass: ICON_COMPASS,
	info: ICON_INFO, warn: ICON_WARN, error: ICON_ERROR, success: ICON_SUCCESS, cancel: ICON_CANCEL, accept: ICON_ACCEPT, help: ICON_HELP,
	block: ICON_BLOCK, flag: ICON_FLAG, bookmark: ICON_BOOKMARK, tag: ICON_TAG,
	link: ICON_LINK, attach: ICON_ATTACH, share: ICON_SHARE, send: ICON_SEND,
	copy: ICON_COPY, paste: ICON_PASTE, cut: ICON_CUT, print: ICON_PRINT, printAlt: ICON_PRINTER_ALT, scan: ICON_SCAN,
	undo: ICON_UNDO, redo: ICON_REDO, sort: ICON_SORT, filter: ICON_FILTER,
	zoomIn: ICON_ZOOM_IN, zoomOut: ICON_ZOOM_OUT, fullscreen: ICON_FULLSCREEN, view: ICON_VIEW, hide: ICON_HIDE,
	menu: ICON_MENU, more: ICON_MORE, list: ICON_LIST, grid: ICON_GRID, dashboard: ICON_DASHBOARD, taskview: ICON_TASKVIEW, cortana: ICON_CORTANA,
	pin: ICON_PIN, unpin: ICON_UNPIN, bell: ICON_BELL, bellOff: ICON_BELL_OFF, emoji: ICON_EMOJI,
	cloud: ICON_CLOUD, upload: ICON_UPLOAD, update: ICON_UPDATE,
	keyboard: ICON_KEYBOARD, mouse: ICON_MOUSE, monitor: ICON_MONITOR, laptop: ICON_LAPTOP, tablet: ICON_TABLET, tv: ICON_TV, headphones: ICON_HEADPHONES,
	calculator: ICON_CALCULATOR, notepad: ICON_NOTEPAD, terminal: ICON_TERMINAL, code: ICON_CODE, bug: ICON_BUG,
	gift: ICON_GIFT, trophy: ICON_TROPHY, gamepad: ICON_GAMEPAD, cart: ICON_CART,
	moon: ICON_MOON, sun: ICON_SUN,
	...SYS_ICONS,
} as const;

export type Win10IconName = keyof typeof ICONS;

/** Dynamic lookup: `getWin10Icon("wifi")` -> SVG string. */
export function getWin10Icon(name: Win10IconName): string {
	return ICONS[name];
}

/** Build a tinted inline icon element (accent via CSS `color`). */
export function w10Icon(name: Win10IconName, label?: string): HTMLSpanElement {
	const el = document.createElement("span");
	el.className = "w10-icon";
	el.innerHTML = ICONS[name];
	if (label) el.title = label;
	el.setAttribute("aria-hidden", "true");
	return el;
}
