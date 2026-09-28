/** Official Windows 8/10/11 logo path (Microsoft / Pentagram, Wikimedia "Windows logo - 2012.svg"). */
export declare const WIN10_LOGO = "<svg width=\"19\" height=\"19\" viewBox=\"0 0 88 88\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M0 12.402l35.687-4.86.016 34.423-35.67.203zm35.67 33.529l.028 34.453L.028 75.48.026 45.7zm4.326-39.025L87.314 0v41.527l-47.318.376zm47.329 39.349l-.011 41.34-47.318-6.678-.066-34.739z\"/></svg>";
/**
 * "Download" icon in the Windows 10 style (Segoe MDL2 / Fluent):
 * down arrow + tray, in currentColor. Inlined so the package
 * never depends on a network resource.
 */
export declare const DOWNLOAD_ICON = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" aria-hidden=\"true\"><path d=\"M10 2.5v7.6\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><path d=\"M6.8 7.4L10 10.6l3.2-3.2\" stroke=\"currentColor\" stroke-width=\"1.8\" fill=\"none\" stroke-linecap=\"square\" stroke-linejoin=\"miter\"/><path d=\"M4 12.6v2.2a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-2.2\" stroke=\"currentColor\" stroke-width=\"1.8\" fill=\"none\"/><path d=\"M3.5 17.5h13\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"square\"/></svg>";
export declare const GLYPH_MIN = "<svg width=\"10\" height=\"10\" viewBox=\"0 0 10 10\"><path d=\"M1 5h8\" stroke=\"currentColor\" stroke-width=\"1\"/></svg>";
export declare const GLYPH_MAX = "<svg width=\"10\" height=\"10\" viewBox=\"0 0 10 10\"><rect x=\"1\" y=\"1\" width=\"8\" height=\"8\" fill=\"none\" stroke=\"currentColor\"/></svg>";
export declare const GLYPH_RESTORE = "<svg width=\"10\" height=\"10\" viewBox=\"0 0 10 10\"><rect x=\"4\" y=\"1\" width=\"5\" height=\"5\" fill=\"none\" stroke=\"currentColor\"/><rect x=\"1\" y=\"4\" width=\"5\" height=\"5\" fill=\"none\" stroke=\"currentColor\"/></svg>";
export declare const GLYPH_CLOSE = "<svg width=\"10\" height=\"10\" viewBox=\"0 0 10 10\"><path d=\"M1 1l8 8M9 1l-8 8\" stroke=\"currentColor\" stroke-width=\"1\"/></svg>";
/** Official blue "Information" icon (white "i"), 16px for titlebars/taskbar. */
export declare const INFO_ICON = "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" aria-hidden=\"true\"><circle cx=\"8\" cy=\"8\" r=\"7.5\" fill=\"#0078D7\"/><circle cx=\"8\" cy=\"8\" r=\"7\" fill=\"none\" stroke=\"#005A9E\" stroke-width=\"1\"/><rect x=\"7.1\" y=\"7.2\" width=\"1.8\" height=\"5\" fill=\"#fff\"/><circle cx=\"8\" cy=\"4.9\" r=\"1.2\" fill=\"#fff\"/></svg>";
/** Segoe MDL2 Globe (languages). Follows currentColor, i.e. the accent. */
export declare const GLOBE_ICON = "<svg width=\"15\" height=\"15\" viewBox=\"0 0 16 16\" fill=\"none\" aria-hidden=\"true\"><circle cx=\"8\" cy=\"8\" r=\"6.5\" stroke=\"currentColor\" stroke-width=\"1.4\"/><ellipse cx=\"8\" cy=\"8\" rx=\"3\" ry=\"6.5\" stroke=\"currentColor\" stroke-width=\"1.2\"/><path d=\"M1.5 8h13M2.8 4.8h10.4M2.8 11.2h10.4\" stroke=\"currentColor\" stroke-width=\"1.2\"/></svg>";
/** Official Win32 MessageBox icons (32px): blue i, yellow triangle, red X, blue ?. */
export declare const MSGBOX_INFO = "<svg width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" aria-hidden=\"true\"><circle cx=\"16\" cy=\"16\" r=\"15\" fill=\"#0078D7\"/><circle cx=\"16\" cy=\"16\" r=\"14\" fill=\"none\" stroke=\"#005A9E\" stroke-width=\"1.5\"/><rect x=\"14.2\" y=\"14.4\" width=\"3.6\" height=\"10\" fill=\"#fff\"/><circle cx=\"16\" cy=\"9.8\" r=\"2.4\" fill=\"#fff\"/></svg>";
export declare const MSGBOX_WARNING = "<svg width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" aria-hidden=\"true\"><path d=\"M16 3.5L29.5 27.5H2.5Z\" fill=\"#FFC83D\" stroke=\"#7A6200\" stroke-width=\"1.5\" stroke-linejoin=\"round\"/><rect x=\"14.9\" y=\"12\" width=\"2.2\" height=\"8\" fill=\"#000\"/><circle cx=\"16\" cy=\"23\" r=\"1.4\" fill=\"#000\"/></svg>";
export declare const MSGBOX_ERROR = "<svg width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" aria-hidden=\"true\"><circle cx=\"16\" cy=\"16\" r=\"15\" fill=\"#E81123\"/><circle cx=\"16\" cy=\"16\" r=\"14\" fill=\"none\" stroke=\"#A50B18\" stroke-width=\"1.5\"/><path d=\"M11 11l10 10M21 11l-10 10\" stroke=\"#fff\" stroke-width=\"3\"/></svg>";
export declare const MSGBOX_QUESTION = "<svg width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" aria-hidden=\"true\"><circle cx=\"16\" cy=\"16\" r=\"15\" fill=\"#0078D7\"/><circle cx=\"16\" cy=\"16\" r=\"14\" fill=\"none\" stroke=\"#005A9E\" stroke-width=\"1.5\"/><path d=\"M12.5 12.5c0-2 1.6-3.5 3.7-3.5 2 0 3.6 1.4 3.6 3.3 0 2.6-3 2.7-3.2 5.1\" fill=\"none\" stroke=\"#fff\" stroke-width=\"2.4\" stroke-linecap=\"round\"/><circle cx=\"16.5\" cy=\"21.6\" r=\"1.5\" fill=\"#fff\"/></svg>";
/** Navigation: back / forward arrows. */
export declare const ICON_BACK: string;
export declare const ICON_FORWARD: string;
/** Chevrons. */
export declare const ICON_CHEVRON_UP: string;
export declare const ICON_CHEVRON_DOWN: string;
export declare const ICON_CHEVRON_LEFT: string;
export declare const ICON_CHEVRON_RIGHT: string;
/** Directional arrows (with shaft). */
export declare const ICON_ARROW_UP: string;
export declare const ICON_ARROW_DOWN: string;
export declare const ICON_ARROW_LEFT: string;
export declare const ICON_ARROW_RIGHT: string;
/** Basic shapes: check, plus, minus, record dot. */
export declare const ICON_CHECK: string;
export declare const ICON_PLUS: string;
export declare const ICON_MINUS: string;
export declare const ICON_DOT: string;
/** Media transport: play, pause, stop. */
export declare const ICON_PLAY: string;
export declare const ICON_PAUSE: string;
export declare const ICON_STOP: string;
/** Audio speaker with waves. */
export declare const ICON_VOLUME: string;
/** Music note. */
export declare const ICON_MUSIC: string;
/** Actions: search, refresh, save, trash, edit, share-less basics. */
export declare const ICON_SEARCH: string;
export declare const ICON_REFRESH: string;
export declare const ICON_SAVE: string;
export declare const ICON_TRASH: string;
export declare const ICON_EDIT: string;
/** Objects: folder, file, home, star, heart, user, lock, calendar, clock, mail. */
export declare const ICON_FOLDER: string;
export declare const ICON_FILE: string;
export declare const ICON_HOME: string;
export declare const ICON_STAR: string;
export declare const ICON_HEART: string;
export declare const ICON_USER: string;
export declare const ICON_LOCK: string;
export declare const ICON_CALENDAR: string;
export declare const ICON_CLOCK: string;
export declare const ICON_MAIL: string;
/** Windows Security shield with check (NT security). */
export declare const ICON_SHIELD: string;
/** Power button. */
export declare const ICON_POWER: string;
/** WiFi radiating arcs. */
export declare const ICON_WIFI: string;
/** Battery. */
export declare const ICON_BATTERY: string;
/** Settings cog (simplified official gear). */
export declare const ICON_SETTINGS: string;
