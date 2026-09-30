// Demo app: proves win10ml runs anywhere with zero dependencies.
// No Tidal, no framework — plain DOM + the published ESM bundle.
import {
	ICON_BELL,
	ICON_BLUETOOTH,
	ICON_CALENDAR,
	ICON_CAMERA,
	ICON_CART,
	ICON_CHECK,
	ICON_CLOCK,
	ICON_CODE,
	ICON_COMMENT,
	ICON_COPY,
	ICON_CUT,
	ICON_EDIT,
	ICON_FILE,
	ICON_FILE_ADD,
	ICON_FILTER,
	ICON_FOLDER,
	ICON_FOLDER_OPEN,
	ICON_GAMEPAD,
	ICON_GRID,
	ICON_HEADPHONES,
	ICON_HEART,
	ICON_HELP,
	ICON_HOME,
	ICON_LIKE,
	ICON_LIST,
	ICON_LOCATION,
	ICON_MAIL,
	ICON_MENU,
	ICON_MIC,
	ICON_MORE,
	ICON_MUSIC,
	ICON_NEW_FOLDER,
	ICON_NOTEPAD,
	ICON_PASTE,
	ICON_PAUSE,
	ICON_PHONE,
	ICON_PHOTO,
	ICON_PIN,
	ICON_PLAY,
	ICON_PRINT,
	ICON_REFRESH,
	ICON_REPEAT,
	ICON_SAVE,
	ICON_SEARCH,
	ICON_SEND,
	ICON_SETTINGS,
	ICON_SHARE,
	ICON_SHEET,
	ICON_SHIELD,
	ICON_SHUFFLE,
	ICON_STAR,
	ICON_SUN,
	ICON_TRASH,
	ICON_UPLOAD,
	ICON_USER,
	ICON_VIDEO,
	ICON_VOLUME,
	ICON_WIFI,
	ICON_ZOOM_IN,
	WIN10_LOGO,
	DOWNLOAD_ICON,
	GLOBE_ICON,
	INFO_ICON,
	MSGBOX_ERROR,
	MSGBOX_INFO,
	MSGBOX_QUESTION,
	MSGBOX_WARNING,
	SYS_ICONS,
	confirmWin10,
	createDesktop,
	DEFAULT_WALLPAPER,
	DARK_WALLPAPER,
	Win10StartMenu,
	renderMarkdown,
	showWin10Menu,
	showWin10MsgBox,
	w10Button,
	w10Calendar,
	w10ComboRow,
	w10Desc,
	w10Divider,
	w10GroupTitle,
	w10Hero,
	w10ListItem,
	w10MenuHeader,
	w10MenuItem,
	w10Progress,
	w10RadioGroup,
	w10Separator,
	w10Slider,
	w10Switch,
	w10TextareaRow,
	w10TextRow,
	w10Toggle,
	showW10Flyout,
	w10Avatar,
	w10Badge,
	w10Breadcrumb,
	w10ColorGrid,
	w10CommandBar,
	w10EmptyState,
	w10Expander,
	w10InfoBar,
	w10Link,
	w10NumberRow,
	w10PasswordRow,
	w10Pivot,
	w10Rating,
	w10SearchBox,
	w10Segmented,
	w10Spinner,
	w10Table,
	w10Tile,
	w10Tree,
	w10WithTooltip,
	type DesktopApp,
	type WallpaperFit,
	type WallpaperOptions,
} from "../src/index.js";
import { SelfbotClient, Events } from "qxchat.ts";
import { solveLoginChallenge } from "./qxchallenge.js";

let startMenu: Win10StartMenu;

const DEMO_WALLPAPER_URL =
	"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp13280341.png&f=1&nofb=1&ipt=11bd6c3fa935fe308356976f5a642d42f98a27ec0bcddbc08aed2eed7ffa0c69&ipo=images";
const DEMO_WALLPAPER: WallpaperOptions = { ...DEFAULT_WALLPAPER, image: DEMO_WALLPAPER_URL, fit: "cover" };

const desktop = createDesktop({
	start: {
		iconHTML: WIN10_LOGO,
		title: "Start",
		onClick: () => startMenu.toggle(),
	},
	clock: {
		onClick: () => calendarApp.focus(),
	},
	accent: "#0078d7",
	wallpaper: { ...DEMO_WALLPAPER },
});

startMenu = new Win10StartMenu({
	searchPlaceholder: "Type here to search",
	footer: {
		user: {
			avatarUrl: "https://github.com/Kisakay.png",
			name: "Demo user",
			onClick: () => about.focus(),
		},
		settings: { title: "Settings", onClick: () => settingsApp.focus() },
		power: {
			title: "Sleep (hide all windows)",
			onClick: () => {
				about.minimize();
				settingsApp.minimize();
				gallery.minimize();
				calendarApp.minimize();
				notepad.minimize();
				paintApp.minimize();
				qxchatApp.minimize();
			},
		},
	},
});
// Keep the Start menu on the desktop theme/accent broadcast.
desktop.attachStartMenu(startMenu);

// ---- App 1 : About (markdown + links) ----
const about = desktop.createApp({
	id: "about",
	label: "About",
	appTitle: "About this demo",
	appIconHTML: ICON_HELP,
	titleHTML: `About <span class="w10-credit">win10ml demo</span>`,
	width: 420,
	height: 480,
});
about.body.appendChild(
	renderMarkdown(
		"# win10ml demo\n\nA full **Windows 10 HUD** running on a blank page — no Tidal, no React, no dependency.\n\n- Drag windows by their titlebar, double-click to maximize\n- Apps live in the taskbar with an **accent underline** while running\n- **Right-click a taskbar button to pin/unpin it**: pinned apps stay when closed, minimized windows keep their button, unpinned + idle apps hide\n- Drag on the empty desktop: blue marquee multi-select (ctrl+drag adds, ctrl+click toggles)\n- Right-click anywhere for a Win10 context menu\n\n---\nBuilt with `createDesktop()` from `win10ml`.",
	),
);
about.body.appendChild(w10GroupTitle("Links"));
const links = document.createElement("div");
links.className = "w10-toolbar";
links.appendChild(w10Button("npm package", () => window.open("https://www.npmjs.com/package/win10ml", "_blank")));
links.appendChild(w10Button("Context menu", (e) => openDemoMenu(e.clientX, e.clientY)));
about.body.appendChild(links);
about.setRunning(true);
about.show();

// ---- App 2 : Settings (every control of the framework) ----
let dark = false;
let quality = "max";
let notes = "Hello\nfrom winml";
const settingsApp: DesktopApp = desktop.createApp({
	id: "settings",
	label: "Settings demo",
	appTitle: "Settings demo",
	appIconHTML: DOWNLOAD_ICON,
	titleHTML: `Settings demo <span class="w10-credit">controls</span>`,
	width: 460,
	height: 560,
});
settingsApp.body.appendChild(w10Hero("2", "demo apps running"));
settingsApp.body.appendChild(w10GroupTitle("Appearance"));
settingsApp.body.appendChild(
	w10Toggle("Dark theme", "Dark mode for every window at once", () => dark, (v) => {
		dark = v;
		desktop.setTheme(v ? "dark" : "light");
		calHandle?.setTheme(v ? "dark" : "light");
	}),
);
settingsApp.body.appendChild(w10GroupTitle("Wallpaper"));
{
	const presets: { label: string; opts: WallpaperOptions }[] = [
		{ label: "Hero", opts: { ...DEMO_WALLPAPER } },
		{ label: "Midnight", opts: { ...DARK_WALLPAPER } },
		{ label: "Solid", opts: { image: null, gradient: null, color: "#0078d7" } },
	];
	let wallUrl = DEMO_WALLPAPER_URL;
	let wallFit: WallpaperFit = "cover";
	let urlField: HTMLInputElement | null = null;
	const wallRow = document.createElement("div");
	wallRow.className = "w10-toolbar";
	wallRow.style.flexWrap = "wrap";
	for (const preset of presets) {
		wallRow.appendChild(
			w10Button(preset.label, () => {
				desktop.setWallpaper(preset.opts);
				wallUrl = preset.opts.image ?? "";
				if (urlField) urlField.value = wallUrl;
			}),
		);
	}
	settingsApp.body.appendChild(wallRow);
	const urlRow = w10TextRow("Image URL", "Custom wallpaper (empty = none).", () => wallUrl, (v) => {
		wallUrl = v.trim();
		desktop.setWallpaper({ image: wallUrl || null, fit: wallFit });
	});
	urlField = urlRow.querySelector("input");
	settingsApp.body.appendChild(urlRow);
	settingsApp.body.appendChild(
		w10ComboRow(
			"Fit",
			"How the image fills the screen.",
			[
				{ value: "cover", label: "Fill" },
				{ value: "contain", label: "Fit" },
				{ value: "center", label: "Center" },
				{ value: "tile", label: "Tile" },
				{ value: "stretch", label: "Stretch" },
			],
			() => wallFit,
			(v) => {
				wallFit = v as WallpaperFit;
				desktop.setWallpaper({ fit: wallFit });
			},
		),
	);
}
settingsApp.body.appendChild(w10GroupTitle("Content"));
settingsApp.body.appendChild(
	w10ComboRow(
		"Quality",
		"Picked value is logged to the console.",
		[
			{ value: "max", label: "MAX" },
			{ value: "high", label: "High" },
			{ value: "low", label: "Low" },
		],
		() => quality,
		(v) => {
			quality = v;
			console.log("[demo] quality =", v);
			desktop.setStatus(`<span>Quality: ${v}</span>`);
		},
	),
);
settingsApp.body.appendChild(
	w10TextareaRow("Notes", "A Win10 textarea.", () => notes, (v) => (notes = v)),
);
settingsApp.body.appendChild(w10Desc("Close this window: the taskbar underline stays while running."));
const row = document.createElement("div");
row.className = "w10-toolbar";
row.appendChild(
	w10Button("Stop running", () => {
		settingsApp.setRunning(false);
		desktop.setStatus(null);
	}),
);
settingsApp.body.appendChild(row);
settingsApp.setRunning(true);

// ---- App 3 : Components gallery (switch, radios, slider, progress, lists, icons, msgbox) ----
let notify = true;
let plan: string = "pro";
let volume = 65;
const gallery = desktop.createApp({
	id: "components",
	label: "Components",
	appTitle: "Win10 components gallery",
	appIconHTML: ICON_SETTINGS,
	titleHTML: `Components <span class="w10-credit">gallery</span>`,
	width: 480,
	height: 600,
});
gallery.body.appendChild(w10GroupTitle("Toggle switch"));
gallery.body.appendChild(w10Switch("Notifications", "The official Win10 Settings switch.", () => notify, (v) => (notify = v)));
gallery.body.appendChild(w10GroupTitle("Radio buttons"));
gallery.body.appendChild(
	w10RadioGroup(
		[
			{ value: "free", label: "Free", desc: "No account needed." },
			{ value: "pro", label: "Pro", desc: "Accent color everywhere." },
			{ value: "team", label: "Team", desc: "Shared HUD for everyone." },
		],
		() => plan,
		(v) => (plan = v),
	),
);
gallery.body.appendChild(w10GroupTitle("Slider + progress"));
gallery.body.appendChild(
	w10Slider("Volume", 0, 100, 1, () => volume, (v) => {
		volume = v;
		bar.set(v);
	}),
);
const bar = w10Progress(65);
gallery.body.appendChild(bar.el);
const ind = w10Progress(null);
const indLabel = w10Desc("Indeterminate marquee below:");
gallery.body.appendChild(indLabel);
gallery.body.appendChild(ind.el);
gallery.body.appendChild(w10GroupTitle("ListView rows"));
for (const [icon, title, sub] of [
	[ICON_MUSIC, "Now playing", "FLAC · 44.1 kHz"],
	[ICON_FOLDER, "Downloads", "12 files"],
	[ICON_SETTINGS, "Settings", undefined],
] as [string, string, string | undefined][]) {
	gallery.body.appendChild(w10ListItem({ iconHTML: icon, title, sub }));
}
gallery.body.appendChild(w10Divider());
gallery.body.appendChild(w10GroupTitle("MessageBox (official icons)"));
const msgRow = document.createElement("div");
msgRow.className = "w10-toolbar";
msgRow.style.flexWrap = "wrap";
for (const [label, icon] of [
	["Info", "info"],
	["Warning", "warning"],
	["Error", "error"],
	["Question", "question"],
] as [string, "info" | "warning" | "error" | "question"][]) {
	msgRow.appendChild(
		w10Button(label, () =>
			showWin10MsgBox({
				title: `${label} dialog`,
				text: `This is the official ${label.toLowerCase()} dialog.\nBuilt with showWin10MsgBox().`,
				icon,
				buttons: [{ id: "ok", label: "OK", isDefault: true }],
				theme: dark ? "dark" : "light",
			}),
		),
	);
}
msgRow.appendChild(
	w10Button("Confirm…", () =>
		confirmWin10("Delete files?", "Would you want to delete 3 files?", { yes: "Yes", no: "No" }, { theme: dark ? "dark" : "light" }).then((yes) =>
			console.log("[demo] confirm =", yes),
		),
	),
);
gallery.body.appendChild(msgRow);
gallery.body.appendChild(w10GroupTitle("Official MDL2 icon pack"));
const wall = document.createElement("div");
wall.style.display = "flex";
wall.style.flexWrap = "wrap";
wall.style.gap = "6px";
for (const [icon, name] of [
	[ICON_SEARCH, "Search"],
	[ICON_REFRESH, "Refresh"],
	[ICON_SAVE, "Save"],
	[ICON_TRASH, "Trash"],
	[ICON_EDIT, "Edit"],
	[ICON_FILE, "File"],
	[ICON_HOME, "Home"],
	[ICON_STAR, "Star"],
	[ICON_HEART, "Heart"],
	[ICON_USER, "User"],
	[ICON_CALENDAR, "Calendar"],
	[ICON_CLOCK, "Clock"],
	[ICON_MAIL, "Mail"],
	[ICON_SHIELD, "Shield"],
	[ICON_WIFI, "WiFi"],
	[ICON_PLAY, "Play"],
	[ICON_PAUSE, "Pause"],
	[ICON_VOLUME, "Volume"],
	[ICON_CHECK, "Check"],
] as [string, string][]) {
	const cell = document.createElement("span");
	cell.title = name;
	cell.style.cssText = "display:inline-flex;padding:6px;border:1px solid #e1e1e1;color:var(--w10-accent,#0078d7)";
	cell.innerHTML = icon;
	wall.appendChild(cell);
}
gallery.body.appendChild(wall);
gallery.body.appendChild(w10GroupTitle("System icons (32px)"));
const sysRow = document.createElement("div");
sysRow.style.cssText = "display:flex;gap:10px;align-items:center";
for (const [svg, name] of [
	[MSGBOX_INFO, "Info"],
	[MSGBOX_WARNING, "Warning"],
	[MSGBOX_ERROR, "Error"],
	[MSGBOX_QUESTION, "Question"],
	[INFO_ICON, "Info 16"],
] as [string, string][]) {
	const cell = document.createElement("span");
	cell.title = name;
	cell.style.lineHeight = "0";
	cell.innerHTML = svg;
	sysRow.appendChild(cell);
}
gallery.body.appendChild(sysRow);
gallery.body.appendChild(w10GroupTitle("Taskbar pin policy"));
const pinStatus = w10Desc("");
const pinBtn = w10Button("", () => {
	gallery.setPinned(!gallery.isPinned());
	paintPinPolicy();
});
function paintPinPolicy(): void {
	const pinned = gallery.isPinned();
	pinStatus.textContent = pinned
		? "Components is pinned: its button stays even when the window is closed."
		: "Components is unpinned: close the window and the button hides (reopen it from the Start menu). Right-click its taskbar button to pin it back.";
	pinBtn.textContent = pinned ? "Unpin Components" : "Pin Components";
}
paintPinPolicy();
gallery.body.appendChild(pinStatus);
const pinRow = document.createElement("div");
pinRow.className = "w10-toolbar";
pinRow.appendChild(pinBtn);
gallery.body.appendChild(pinRow);

// ---- App 4 : Calendar (lazy build = content driven by its application) ----
// Starts unpinned: no taskbar button until opened from the Start menu.
let calHandle: ReturnType<typeof w10Calendar> | null = null;
const calendarApp = desktop.createApp({
	id: "calendar",
	label: "Calendar",
	appTitle: "Win10 calendar component",
	appIconHTML: ICON_CALENDAR,
	titleHTML: `Calendar <span class="w10-credit">component</span>`,
	width: 360,
	height: 420,
	pinned: false,
	build: (body) => {
		const picked = w10Desc("No date picked yet.");
		calHandle = w10Calendar({
			dark,
			onPick: (d) => {
				picked.textContent = `Picked: ${d.toLocaleDateString()}`;
			},
		});
		body.appendChild(calHandle.el);
		body.appendChild(picked);
	},
});

// ---- App 5 : Navigation (addNav with text glyphs + inline SVG glyphs) ----
const navApp = desktop.createApp({
	id: "nav",
	label: "Navigation",
	appTitle: "Nav with text + SVG glyphs",
	appIconHTML: ICON_HOME,
	titleHTML: `Navigation <span class="w10-credit">addNav</span>`,
	width: 480,
	height: 400,
});
{
	type NavSection = "home" | "globe" | "cog";
	const bodies: Record<NavSection, string> = {
		home: "Text glyph nav item (like ⬇ ✓ ⚙ ◐).",
		globe: "Inline SVG glyph (GLOBE_ICON): parsed as markup, tinted with the accent color.",
		cog: "Another SVG glyph (ICON_SETTINGS, 18px): same slot, same style.",
	};
	const paintNavBody = (id: NavSection) => {
		navApp.body.innerHTML = "";
		navApp.body.appendChild(w10GroupTitle(id === "home" ? "Home" : id === "globe" ? "Languages" : "Settings"));
		navApp.body.appendChild(w10Desc(bodies[id]));
	};
	const navCtl = navApp.window.addNav(
		[
			{ id: "home", label: "Home", glyph: "⌂" },
			{ id: "globe", label: "Languages", glyph: GLOBE_ICON },
			{ id: "cog", label: "Settings", glyph: ICON_SETTINGS },
		] as { id: NavSection; label: string; glyph: string }[],
		"home",
		(id) => {
			navCtl.sync(id);
			paintNavBody(id);
		},
	);
	paintNavBody("home");
}

// ---- App 6 : Widgets batch 2 (expander, pivot, infobar, tiles, tree, table, rating...) ----
const widgetsApp = desktop.createApp({
	id: "widgets",
	label: "Widgets",
	appTitle: "Win10 widgets batch 2",
	appIconHTML: ICON_GRID,
	titleHTML: `Widgets <span class="w10-credit">batch 2</span>`,
	width: 520,
	height: 620,
});
{
	let stars = 4;
	let qty = 2;
	let pwd = "";
	let view: "list" | "grid" = "list";
	let accentPick = "#0078d7";
	widgetsApp.body.appendChild(w10GroupTitle("InfoBar"));
	widgetsApp.body.appendChild(w10InfoBar({ severity: "info", title: "Update ready", message: "Restart to apply the new accent color." }));
	widgetsApp.body.appendChild(w10InfoBar({ severity: "warning", title: "Battery saver", message: "Some animations are paused." }));
	widgetsApp.body.appendChild(w10GroupTitle("Pivot"));
	const pivot = w10Pivot(
		[
			{ id: "home", label: "Home" },
			{ id: "apps", label: "Apps" },
			{ id: "about", label: "About" },
		] as { id: string; label: string }[],
		"home",
		(id) => {
			pivot.body.innerHTML = "";
			pivot.body.appendChild(w10Desc(`Pivot section: ${id}. Content is lazy like a real Win10 pivot.`));
		},
	);
	pivot.body.appendChild(w10Desc("Pivot section: home. Content is lazy like a real Win10 pivot."));
	widgetsApp.body.appendChild(pivot.el);
	widgetsApp.body.appendChild(w10GroupTitle("Expander"));
	const exp = w10Expander("Advanced options", { desc: "Rarely used switches live here.", iconHTML: ICON_SETTINGS });
	exp.body.appendChild(w10Desc("This body collapses like the Win10 Settings expander."));
	widgetsApp.body.appendChild(exp.el);
	widgetsApp.body.appendChild(w10GroupTitle("Search + breadcrumb + badges"));
	const search = w10SearchBox({ placeholder: "Search apps…", onInput: (v) => console.log("[demo] search =", v) });
	widgetsApp.body.appendChild(search.el);
	widgetsApp.body.appendChild(w10Breadcrumb([{ label: "Home" }, { label: "Apps" }, { label: "Widgets" }]));
	const badgeRow = document.createElement("div");
	badgeRow.className = "w10-toolbar";
	badgeRow.appendChild(w10Avatar({ name: "Demo User" }));
	badgeRow.appendChild(w10Badge(3));
	badgeRow.appendChild(w10Badge("NEW", { tone: "neutral" }));
	badgeRow.appendChild(w10Badge("!", { tone: "alert" }));
	widgetsApp.body.appendChild(badgeRow);
	widgetsApp.body.appendChild(w10GroupTitle("CommandBar + tiles"));
	widgetsApp.body.appendChild(
		w10CommandBar([
			{ id: "copy", label: "Copy", iconHTML: ICON_COPY, onClick: () => console.log("[demo] copy") },
			{ id: "paste", label: "Paste", iconHTML: ICON_PASTE, onClick: () => console.log("[demo] paste") },
			{ id: "share", label: "Share", iconHTML: ICON_SHARE, onClick: () => console.log("[demo] share") },
		]),
	);
	const tileRow = document.createElement("div");
	tileRow.style.cssText = "display:flex;gap:8px;flex-wrap:wrap";
	tileRow.appendChild(w10Tile({ title: "Music", iconHTML: ICON_MUSIC, size: "medium", onClick: () => about.focus() }));
	tileRow.appendChild(w10Tile({ title: "Photos", iconHTML: ICON_CAMERA, size: "medium", accent: "#107c10" }));
	tileRow.appendChild(w10Tile({ title: "Store", iconHTML: ICON_CART, size: "wide", accent: "#5c2d91" }));
	widgetsApp.body.appendChild(tileRow);
	widgetsApp.body.appendChild(w10GroupTitle("Number + password + segmented + colors"));
	widgetsApp.body.appendChild(w10NumberRow("Quantity", "Win10 spinbox with stepper.", { min: 0, max: 10, get: () => qty, set: (v) => (qty = v) }));
	widgetsApp.body.appendChild(w10PasswordRow("Password", "Reveal eye like Win10 login.", { get: () => pwd, set: (v) => (pwd = v) }).el);
	const seg = w10Segmented(
		[
			{ value: "list", label: "List" },
			{ value: "grid", label: "Grid" },
		],
		() => view,
		(v) => (view = v),
	);
	widgetsApp.body.appendChild(seg.el);
	const grid = w10ColorGrid(["#0078d7", "#107c10", "#e81123", "#5c2d91", "#ca5010"], () => accentPick, (v) => {
		accentPick = v;
		desktop.setAccent(v);
	});
	widgetsApp.body.appendChild(grid.el);
	widgetsApp.body.appendChild(w10GroupTitle("Rating + spinner + tree + table"));
	const rating = w10Rating({ value: stars, onRate: (v) => (stars = v) });
	widgetsApp.body.appendChild(rating.el);
	widgetsApp.body.appendChild(w10Spinner({ label: "Loading…" }));
	const tree = w10Tree(
		[
			{ id: "docs", label: "Documents", iconHTML: ICON_FOLDER, children: [{ id: "notes", label: "Notes", iconHTML: ICON_FILE }] },
			{ id: "pics", label: "Pictures", iconHTML: ICON_FOLDER_OPEN, children: [{ id: "cam", label: "Camera Roll", iconHTML: ICON_CAMERA }] },
		],
		{ onSelect: (id) => console.log("[demo] tree =", id) },
	);
	widgetsApp.body.appendChild(tree.el);
	const table = w10Table(["Name", "Size", "Type"], [["Notes.txt", "2 KB", "Text"], ["Photo.jpg", "1.2 MB", "Image"]]);
	widgetsApp.body.appendChild(table.el);
	widgetsApp.body.appendChild(w10GroupTitle("Empty state + link + tooltip + flyout"));
	widgetsApp.body.appendChild(w10EmptyState({ iconHTML: ICON_FOLDER, title: "Nothing here yet", message: "Add files to get started." }));
	const linkRow = document.createElement("div");
	linkRow.className = "w10-toolbar";
	const docs = w10Link("Learn more", () => console.log("[demo] link"));
	w10WithTooltip(docs, "Opens the documentation");
	linkRow.appendChild(docs);
	const flyBtn = w10Button("Flyout…", (e) => {
		showW10Flyout(e.target as HTMLElement, (fly) => {
			fly.textContent = "Anchored Win10 flyout (light-dismiss, Escape closes).";
		}, { dark: dark });
	});
	linkRow.appendChild(flyBtn);
	const pinBtn2 = w10Button("Pin test", () => console.log("[demo] pin", ICON_PIN.length > 0));
	w10WithTooltip(pinBtn2, "More new icons: bluetooth, mic, video, filter…");
	linkRow.appendChild(pinBtn2);
	widgetsApp.body.appendChild(linkRow);
	widgetsApp.body.appendChild(w10GroupTitle("New icons (extended MDL2 pack)"));
	const wall2 = document.createElement("div");
	wall2.style.display = "flex";
	wall2.style.flexWrap = "wrap";
	wall2.style.gap = "6px";
	for (const [icon, name] of [
		[ICON_BELL, "Bell"], [ICON_BLUETOOTH, "Bluetooth"], [ICON_CAMERA, "Camera"], [ICON_CART, "Cart"],
		[ICON_CODE, "Code"], [ICON_COPY, "Copy"], [ICON_PASTE, "Paste"], [ICON_CUT, "Cut"],
		[ICON_FILE_ADD, "FileAdd"], [ICON_FILTER, "Filter"], [ICON_FOLDER_OPEN, "FolderOpen"],
		[ICON_NEW_FOLDER, "NewFolder"], [ICON_GAMEPAD, "Gamepad"], [ICON_GRID, "Grid"],
		[ICON_HEADPHONES, "Headphones"], [ICON_LIKE, "Like"], [ICON_LIST, "List"],
		[ICON_LOCATION, "Location"], [ICON_MENU, "Menu"], [ICON_MORE, "More"],
		[ICON_MIC, "Mic"], [ICON_PHONE, "Phone"], [ICON_PIN, "Pin"],
		[ICON_PRINT, "Print"], [ICON_SEND, "Send"], [ICON_SHARE, "Share"],
		[ICON_SHUFFLE, "Shuffle"], [ICON_SUN, "Sun"], [ICON_UPLOAD, "Upload"],
		[ICON_VIDEO, "Video"], [ICON_ZOOM_IN, "ZoomIn"],
	] as [string, string][]) {
		const cell = document.createElement("span");
		cell.title = name;
		cell.style.cssText = "display:inline-flex;padding:6px;border:1px solid #e1e1e1;color:var(--w10-accent,#0078d7)";
		cell.innerHTML = icon;
		wall2.appendChild(cell);
	}
	widgetsApp.body.appendChild(wall2);
	widgetsApp.body.appendChild(w10GroupTitle("System icons (Fluent 20px, currentColor)"));
	const sysWall = document.createElement("div");
	sysWall.style.display = "flex";
	sysWall.style.flexWrap = "wrap";
	sysWall.style.gap = "6px";
	for (const [key, svg] of Object.entries(SYS_ICONS) as [string, string][]) {
		const cell = document.createElement("span");
		cell.title = key;
		cell.style.cssText = "display:inline-flex;padding:6px;border:1px solid #e1e1e1;color:var(--w10-accent,#0078d7)";
		cell.innerHTML = svg;
		sysWall.appendChild(cell);
	}
	widgetsApp.body.appendChild(sysWall);
	widgetsApp.body.appendChild(w10Desc("Base: Microsoft Fluent UI System Icons (MIT). B00merang was checked but ships PNGs, not SVGs."));
}

// ---- Paint workbench (classic MS Paint) ----
const P_SVG = (inner: string) =>
	`<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">${inner}</svg>`;
const P_SELECT = P_SVG(`<rect x="3.5" y="3.5" width="13" height="13" stroke="currentColor" stroke-width="1.6" stroke-dasharray="3 2"/>`);
const P_CROP = P_SVG(`<path d="M7 3.5V7H3.5M13 3.5V7h3.5M7 16.5V13H3.5M13 16.5V13h3.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/>`);
const P_BUCKET = P_SVG(`<path d="M10.5 3.5h5L11 12H6z M4.5 14.5c0-1.2 2-2 3.5-2s3.5.8 3.5 2-2 2-3.5 2-3.5-.8-3.5-2z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>`);
const P_ERASER = P_SVG(`<path d="M4.5 14.5l7.5-7.5 3.5 3.5-5 5H7z M3.5 18h13" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/>`);
const P_DROPPER = P_SVG(`<path d="M12.5 3.5l4 4L9 15H5v-4z M4 16l-1.5 1.5M3 19l.8-.8" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/>`);
const P_LINE = P_SVG(`<path d="M4.5 15.5L15.5 4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/>`);
const P_RECT = P_SVG(`<rect x="4" y="6" width="12" height="9" stroke="currentColor" stroke-width="1.6"/>`);
const P_ROUND = P_SVG(`<rect x="4" y="6" width="12" height="9" rx="3" stroke="currentColor" stroke-width="1.6"/>`);
const P_ELLIPSE = P_SVG(`<ellipse cx="10" cy="10.5" rx="7" ry="5" stroke="currentColor" stroke-width="1.6"/>`);
const P_TRI = P_SVG(`<path d="M10 4.5l6.5 11h-13z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>`);
const P_RESIZE = P_SVG(`<path d="M12 4.5V3h4v4h-1.5M8 15.5v1.5H4v-4h1.5M16 8l-8 8" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/>`);
const P_BRUSH = P_SVG(`<path d="M4.5 15.5L13 7l2.5 2.5L7 18H4.5z M13 7l1.5-3 3 3-3 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/>`);
const P_MARKER = P_SVG(`<path d="M5.5 14.5L14.5 5.5" stroke="currentColor" stroke-width="4.5" stroke-linecap="round"/>`);
const P_SPRAY = P_SVG(`<circle cx="7" cy="7" r="1.2" fill="currentColor"/><circle cx="12" cy="6" r="1.2" fill="currentColor"/><circle cx="14" cy="11" r="1.2" fill="currentColor"/><circle cx="9" cy="12" r="1.2" fill="currentColor"/><circle cx="5" cy="12" r="1.2" fill="currentColor"/><circle cx="11" cy="15" r="1.2" fill="currentColor"/><circle cx="15" cy="15" r="1.2" fill="currentColor"/>`);

const PAINT_COLORS = [
	"#000000", "#7f7f7f", "#880015", "#ed1c24", "#ff7f27", "#fff200", "#22b14c", "#00a2e8", "#3f48cc", "#a349a4",
	"#ffffff", "#c3c3c3", "#b97a57", "#ffaec9", "#ffc90e", "#efe4b0", "#b5e61d", "#99d9ea", "#7092be", "#c8bfe7",
];

type PaintTool =
	| "select" | "pencil" | "fill" | "text" | "eraser" | "picker" | "zoom"
	| "line" | "rect" | "round" | "ellipse" | "tri";
type PaintBrush = "brush" | "marker" | "spray";

function paintHexToRgb(hex: string): [number, number, number] {
	const h = hex.replace("#", "");
	const v = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
	return [
		parseInt(v.slice(0, 2), 16) || 0,
		parseInt(v.slice(2, 4), 16) || 0,
		parseInt(v.slice(4, 6), 16) || 0,
	];
}

function isPaintShape(tool: PaintTool): boolean {
	return tool === "line" || tool === "rect" || tool === "round" || tool === "ellipse" || tool === "tri";
}

function buildPaintBody(body: HTMLDivElement): void {
	body.classList.add("w10-body-flush");
	const root = document.createElement("div");
	root.className = "w10-paint";
	root.style.position = "relative";

	let tool: PaintTool = "pencil";
	let brush: PaintBrush = "brush";
	let size = 3;
	let fontSize = 18;
	let color1 = "#000000";
	let color2 = "#ffffff";
	let shapeFill = true;
	let shapeOutline = true;
	let zoom = 100;
	let dirty = false;
	let W = 960;
	let H = 600;
	let tab: "home" | "view" = "home";
	let undoBtn: HTMLButtonElement | null = null;
	let redoBtn: HTMLButtonElement | null = null;

	const ZOOMS = [25, 50, 100, 200, 400, 800];
	const SIZES = [1, 2, 3, 5, 8];
	const FONTS = [11, 14, 18, 24, 36, 48, 72];

	// ----- chrome -----
	const tabs = document.createElement("div");
	tabs.className = "w10-paint-tabs";
	const fileTab = document.createElement("button");
	fileTab.type = "button";
	fileTab.className = "w10-ptab w10-ptab-file";
	fileTab.textContent = "File";
	const homeTab = document.createElement("button");
	homeTab.type = "button";
	homeTab.className = "w10-ptab w10-on";
	homeTab.textContent = "Home";
	const viewTab = document.createElement("button");
	viewTab.type = "button";
	viewTab.className = "w10-ptab";
	viewTab.textContent = "View";
	const qatUndo = document.createElement("button");
	qatUndo.type = "button";
	qatUndo.className = "w10-pqat";
	qatUndo.title = "Undo (Ctrl+Z)";
	qatUndo.innerHTML = `<span aria-hidden="true">↶</span>`;
	qatUndo.disabled = true;
	qatUndo.onclick = () => doUndo();
	const qatRedo = document.createElement("button");
	qatRedo.type = "button";
	qatRedo.className = "w10-pqat";
	qatRedo.title = "Redo (Ctrl+Y)";
	qatRedo.innerHTML = `<span aria-hidden="true">↷</span>`;
	qatRedo.disabled = true;
	qatRedo.onclick = () => doRedo();
	undoBtn = qatUndo;
	redoBtn = qatRedo;
	tabs.append(qatUndo, qatRedo, fileTab, homeTab, viewTab);

	const ribbon = document.createElement("div");
	ribbon.className = "w10-paint-ribbon";

	const stage = document.createElement("div");
	stage.className = "w10-paint-stage";
	const wrap = document.createElement("div");
	wrap.className = "w10-pcanvas";
	wrap.tabIndex = 0;
	const canvas = document.createElement("canvas");
	canvas.width = W;
	canvas.height = H;
	const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, W, H);
	const overlay = document.createElement("canvas");
	overlay.className = "w10-pcanvas-ov";
	overlay.width = W;
	overlay.height = H;
	const octx = overlay.getContext("2d") as CanvasRenderingContext2D;
	const grip = document.createElement("div");
	grip.className = "w10-presize";
	grip.title = "Resize canvas";
	wrap.append(canvas, overlay, grip);
	stage.appendChild(wrap);

	const status = document.createElement("div");
	status.className = "w10-paint-status";
	const sizeLabel = document.createElement("span");
	const zoomLabel = document.createElement("span");
	zoomLabel.className = "w10-push";
	status.append(sizeLabel, zoomLabel);

	const fileInput = document.createElement("input");
	fileInput.type = "file";
	fileInput.accept = "image/*";
	fileInput.style.display = "none";

	root.append(tabs, ribbon, stage, status, fileInput);
	body.appendChild(root);

	// ----- selection / floating -----
	let sel: { x: number; y: number; w: number; h: number } | null = null;
	let floating: { cv: HTMLCanvasElement; x: number; y: number; ox: number; oy: number; cut: boolean } | null = null;
	let clip: HTMLCanvasElement | null = null;
	let ants = 0;
	let antsTimer: number | null = null;

	function ensureAnts(): void {
		if (antsTimer !== null) return;
		antsTimer = window.setInterval(() => {
			ants = (ants + 1) % 8;
			drawOverlay();
		}, 120);
	}
	function stopAnts(): void {
		if (antsTimer !== null) {
			clearInterval(antsTimer);
			antsTimer = null;
		}
	}
	function drawOverlay(): void {
		octx.clearRect(0, 0, W, H);
		const box = floating
			? { x: floating.x, y: floating.y, w: floating.cv.width, h: floating.cv.height }
			: sel;
		if (floating) octx.drawImage(floating.cv, floating.x, floating.y);
		if (box && box.w > 1 && box.h > 1) {
			octx.save();
			octx.lineWidth = 1;
			octx.setLineDash([5, 3]);
			octx.lineDashOffset = -ants;
			octx.strokeStyle = "#000000";
			octx.strokeRect(box.x + 0.5, box.y + 0.5, box.w, box.h);
			octx.lineDashOffset = -ants + 4;
			octx.strokeStyle = "#ffffff";
			octx.strokeRect(box.x + 0.5, box.y + 0.5, box.w, box.h);
			octx.restore();
		}
	}
	function commitFloating(): void {
		if (!floating) return;
		snapshot();
		ctx.drawImage(floating.cv, floating.x, floating.y);
		floating = null;
		sel = null;
		stopAnts();
		drawOverlay();
		dirty = true;
	}

	// ----- status / zoom -----
	function paintStatus(): void {
		sizeLabel.textContent = `${W} x ${H}px`;
		zoomLabel.textContent = `${zoom}%`;
	}
	function applyZoom(): void {
		canvas.style.width = `${(W * zoom) / 100}px`;
		canvas.style.height = `${(H * zoom) / 100}px`;
		overlay.style.width = `${(W * zoom) / 100}px`;
		overlay.style.height = `${(H * zoom) / 100}px`;
		overlay.width = W;
		overlay.height = H;
		drawOverlay();
		paintStatus();
	}
	function zoomStep(dir: 1 | -1): void {
		const i = ZOOMS.indexOf(zoom);
		const next = ZOOMS[Math.max(0, Math.min(ZOOMS.length - 1, (i < 0 ? 2 : i) + dir))] ?? 100;
		zoom = next;
		applyZoom();
		syncRibbon();
	}

	// ----- canvas ops -----
	function resizeCanvas(nw: number, nh: number): void {
		nw = Math.max(1, Math.min(2000, Math.round(nw)));
		nh = Math.max(1, Math.min(2000, Math.round(nh)));
		if (nw === W && nh === H) return;
		snapshot();
		const t = document.createElement("canvas");
		t.width = Math.min(nw, W);
		t.height = Math.min(nh, H);
		(t.getContext("2d") as CanvasRenderingContext2D).drawImage(canvas, 0, 0, t.width, t.height);
		W = nw;
		H = nh;
		canvas.width = W;
		canvas.height = H;
		ctx.fillStyle = "#ffffff";
		ctx.fillRect(0, 0, W, H);
		ctx.drawImage(t, 0, 0);
		sel = null;
		floating = null;
		stopAnts();
		applyZoom();
		dirty = true;
	}
	function rotateCanvas(dir: 1 | -1): void {
		commitFloating();
		closeText(true);
		snapshot();
		const t = document.createElement("canvas");
		t.width = H;
		t.height = W;
		const c = t.getContext("2d") as CanvasRenderingContext2D;
		c.translate(t.width / 2, t.height / 2);
		c.rotate((dir * Math.PI) / 2);
		c.drawImage(canvas, -W / 2, -H / 2);
		const nw = H;
		const nh = W;
		W = nw;
		H = nh;
		canvas.width = W;
		canvas.height = H;
		ctx.fillStyle = "#ffffff";
		ctx.fillRect(0, 0, W, H);
		ctx.drawImage(t, 0, 0);
		overlay.width = W;
		overlay.height = H;
		applyZoom();
		dirty = true;
	}
	function flipCanvas(horizontal: boolean): void {
		commitFloating();
		closeText(true);
		snapshot();
		const t = document.createElement("canvas");
		t.width = W;
		t.height = H;
		const c = t.getContext("2d") as CanvasRenderingContext2D;
		c.translate(horizontal ? W : 0, horizontal ? 0 : H);
		c.scale(horizontal ? -1 : 1, horizontal ? 1 : -1);
		c.drawImage(canvas, 0, 0);
		ctx.fillStyle = "#ffffff";
		ctx.fillRect(0, 0, W, H);
		ctx.drawImage(t, 0, 0);
		dirty = true;
	}
	function flood(sx: number, sy: number, hex: string): void {
		sx = Math.max(0, Math.min(W - 1, sx));
		sy = Math.max(0, Math.min(H - 1, sy));
		const img = ctx.getImageData(0, 0, W, H);
		const d = img.data;
		const [fr, fg, fb] = paintHexToRgb(hex);
		const si = (sy * W + sx) * 4;
		const tr = d[si] ?? 0;
		const tg = d[si + 1] ?? 0;
		const tb = d[si + 2] ?? 0;
		if (tr === fr && tg === fg && tb === fb) return;
		const tol = 32;
		const match = (i: number): boolean =>
			Math.abs((d[i] ?? 0) - tr) <= tol &&
			Math.abs((d[i + 1] ?? 0) - tg) <= tol &&
			Math.abs((d[i + 2] ?? 0) - tb) <= tol;
		const seen = new Uint8Array(W * H);
		const stack: Array<[number, number]> = [[sx, sy]];
		while (stack.length > 0) {
			const cur = stack.pop();
			if (!cur) continue;
			let x = cur[0];
			const y = cur[1];
			if (x < 0 || x >= W || y < 0 || y >= H) continue;
			while (x >= 0 && seen[y * W + x] === 0 && match((y * W + x) * 4)) x--;
			x++;
			let spanUp = false;
			let spanDown = false;
			while (x < W && seen[y * W + x] === 0 && match((y * W + x) * 4)) {
				const i = (y * W + x) * 4;
				d[i] = fr;
				d[i + 1] = fg;
				d[i + 2] = fb;
				d[i + 3] = 255;
				seen[y * W + x] = 1;
				if (y > 0) {
					const up = seen[(y - 1) * W + x] === 0 && match(((y - 1) * W + x) * 4);
					if (up && !spanUp) {
						stack.push([x, y - 1]);
						spanUp = true;
					} else if (!up) spanUp = false;
				}
				if (y < H - 1) {
					const down = seen[(y + 1) * W + x] === 0 && match(((y + 1) * W + x) * 4);
					if (down && !spanDown) {
						stack.push([x, y + 1]);
						spanDown = true;
					} else if (!down) spanDown = false;
				}
				x++;
			}
		}
		ctx.putImageData(img, 0, 0);
	}

	// ----- text -----
	let textBox: HTMLTextAreaElement | null = null;
	function closeText(commit: boolean): void {
		if (!textBox) return;
		const ta = textBox;
		textBox = null;
		const v = ta.value;
		const fx = parseFloat(ta.dataset.x ?? "0") || 0;
		const fy = parseFloat(ta.dataset.y ?? "0") || 0;
		ta.remove();
		if (commit && v) {
			snapshot();
			ctx.save();
			ctx.fillStyle = color1;
			ctx.font = `${fontSize}px "Segoe UI", system-ui, sans-serif`;
			ctx.textBaseline = "top";
			const lines = v.split("\n");
			lines.forEach((ln, i) => ctx.fillText(ln, fx, fy + i * fontSize * 1.25));
			ctx.restore();
			dirty = true;
		}
	}
	function placeText(p: { x: number; y: number }): void {
		commitFloating();
		if (textBox) {
			closeText(true);
			return;
		}
		const s = zoom / 100;
		const ta = document.createElement("textarea");
		ta.className = "w10-ptext";
		ta.rows = 1;
		ta.style.left = `${p.x * s}px`;
		ta.style.top = `${p.y * s}px`;
		ta.style.font = `${fontSize * s}px "Segoe UI", system-ui, sans-serif`;
		ta.style.minWidth = `${140 * s}px`;
		ta.dataset.x = String(p.x);
		ta.dataset.y = String(p.y);
		ta.addEventListener("keydown", (e) => {
			e.stopPropagation();
			if (e.key === "Escape") {
				e.preventDefault();
				closeText(false);
			} else if (e.key === "Enter" && !e.shiftKey) {
				e.preventDefault();
				beginAction();
				closeText(true);
			}
		});
		ta.addEventListener("blur", () => {
			beginAction();
			closeText(true);
		});
		wrap.appendChild(ta);
		textBox = ta;
		ta.focus();
	}

	// ----- clipboard -----
	function selBox(): { x: number; y: number; w: number; h: number } | null {
		if (floating) return { x: floating.x, y: floating.y, w: floating.cv.width, h: floating.cv.height };
		return sel;
	}
	function copyToClip(src: { x: number; y: number; w: number; h: number }): void {
		const t = document.createElement("canvas");
		t.width = Math.max(1, src.w);
		t.height = Math.max(1, src.h);
		(t.getContext("2d") as CanvasRenderingContext2D).drawImage(canvas, src.x, src.y, src.w, src.h, 0, 0, t.width, t.height);
		clip = t;
		syncRibbon();
	}
	function doCopy(): void {
		const box = selBox();
		if (box && box.w > 0 && box.h > 0) copyToClip(box);
	}
	function doCut(): void {
		const box = selBox();
		if (!box || box.w <= 0 || box.h <= 0) return;
		copyToClip(box);
		beginAction();
		if (floating) {
			if (!floating.cut) {
				snapshot();
				ctx.save();
				ctx.fillStyle = color2;
				ctx.fillRect(floating.ox, floating.oy, floating.cv.width, floating.cv.height);
				ctx.restore();
			}
			floating = null;
		} else if (sel) {
			snapshot();
			ctx.save();
			ctx.fillStyle = color2;
			ctx.fillRect(sel.x, sel.y, sel.w, sel.h);
			ctx.restore();
		}
		sel = null;
		stopAnts();
		drawOverlay();
		dirty = true;
	}
	function doPaste(): void {
		if (!clip) return;
		commitFloating();
		closeText(true);
		const t = document.createElement("canvas");
		t.width = clip.width;
		t.height = clip.height;
		(t.getContext("2d") as CanvasRenderingContext2D).drawImage(clip, 0, 0);
		floating = { cv: t, x: 12, y: 12, ox: 12, oy: 12, cut: true };
		sel = null;
		ensureAnts();
		drawOverlay();
	}
	async function pasteBlob(blob: Blob): Promise<void> {
		const bmp = await createImageBitmap(blob);
		const scale = Math.min(1, 800 / Math.max(1, Math.max(bmp.width, bmp.height)));
		const w = Math.max(1, Math.round(bmp.width * scale));
		const h = Math.max(1, Math.round(bmp.height * scale));
		const t = document.createElement("canvas");
		t.width = w;
		t.height = h;
		(t.getContext("2d") as CanvasRenderingContext2D).drawImage(bmp, 0, 0, w, h);
		bmp.close();
		beginAction();
		commitFloating();
		closeText(true);
		floating = { cv: t, x: 12, y: 12, ox: 12, oy: 12, cut: true };
		sel = null;
		ensureAnts();
		drawOverlay();
	}
	async function doPasteSmart(): Promise<void> {
		try {
			const items = await navigator.clipboard.read();
			for (const item of items) {
				const type = item.types.find((t) => t.startsWith("image/"));
				if (type) {
					await pasteBlob(await item.getType(type));
					return;
				}
			}
		} catch {
			// Clipboard API unavailable/denied — fall back to the internal clipboard.
		}
		doPaste();
	}
	function doDelete(): void {
		beginAction();
		if (floating) {
			if (!floating.cut) {
				snapshot();
				ctx.save();
				ctx.fillStyle = color2;
				ctx.fillRect(floating.ox, floating.oy, floating.cv.width, floating.cv.height);
				ctx.restore();
			}
			floating = null;
			sel = null;
			stopAnts();
			drawOverlay();
			dirty = true;
			return;
		}
		if (sel && sel.w > 0 && sel.h > 0) {
			snapshot();
			ctx.save();
			ctx.fillStyle = color2;
			ctx.fillRect(sel.x, sel.y, sel.w, sel.h);
			ctx.restore();
			sel = null;
			stopAnts();
			drawOverlay();
			dirty = true;
		}
	}

	// ----- file -----
	function guardDirty(action: () => void): void {
		if (!dirty) {
			action();
			return;
		}
		confirmWin10("Paint", "Discard unsaved changes?", { yes: "Discard", no: "Cancel" }, { theme: dark ? "dark" : "light" }).then((yes) => {
			if (!yes) return;
			dirty = false;
			action();
		});
	}
	function doNew(): void {
		guardDirty(() => {
			beginAction();
			commitFloatingSilent();
			closeText(false);
			snapshot();
			W = 960;
			H = 600;
			canvas.width = W;
			canvas.height = H;
			ctx.fillStyle = "#ffffff";
			ctx.fillRect(0, 0, W, H);
			sel = null;
			stopAnts();
			applyZoom();
			dirty = false;
		});
	}
	function commitFloatingSilent(): void {
		if (!floating) return;
		ctx.drawImage(floating.cv, floating.x, floating.y);
		floating = null;
		sel = null;
		stopAnts();
		drawOverlay();
	}
	function doSave(): void {
		beginAction();
		commitFloating();
		closeText(true);
		canvas.toBlob((blob) => {
			if (!blob) return;
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = "paint.png";
			document.body.appendChild(a);
			a.click();
			a.remove();
			setTimeout(() => URL.revokeObjectURL(url), 1000);
			dirty = false;
		}, "image/png");
	}
	function doOpenFile(): void {
		guardDirty(() => fileInput.click());
	}
	fileInput.onchange = () => {
		const f = fileInput.files?.[0];
		fileInput.value = "";
		if (!f) return;
		const url = URL.createObjectURL(f);
		const img = new Image();
		img.onload = () => {
			URL.revokeObjectURL(url);
			beginAction();
			commitFloatingSilent();
			closeText(false);
			snapshot();
			const scale = Math.min(1, 2000 / Math.max(1, Math.max(img.naturalWidth, img.naturalHeight)));
			W = Math.max(1, Math.round(img.naturalWidth * scale));
			H = Math.max(1, Math.round(img.naturalHeight * scale));
			canvas.width = W;
			canvas.height = H;
			ctx.fillStyle = "#ffffff";
			ctx.fillRect(0, 0, W, H);
			ctx.drawImage(img, 0, 0, W, H);
			commitFloatingSilent();
			closeText(false);
			sel = null;
			stopAnts();
			applyZoom();
			dirty = true;
		};
		img.src = url;
	};

	// ----- history (undo/redo) -----
	interface PaintSnap {
		w: number;
		h: number;
		img: ImageData;
	}
	const hist: PaintSnap[] = [];
	const future: PaintSnap[] = [];
	let actionSeq = 0;
	let snapFor = -1;
	function beginAction(): void {
		actionSeq++;
	}
	function snapshot(): void {
		if (snapFor === actionSeq) return;
		snapFor = actionSeq;
		try {
			hist.push({ w: W, h: H, img: ctx.getImageData(0, 0, W, H) });
		} catch {
			return;
		}
		if (hist.length > 30) hist.shift();
		future.length = 0;
		syncUndoBtns();
	}
	function syncUndoBtns(): void {
		if (undoBtn) undoBtn.disabled = hist.length === 0;
		if (redoBtn) redoBtn.disabled = future.length === 0;
	}
	function restoreSnap(s: PaintSnap): void {
		floating = null;
		closeText(false);
		sel = null;
		stopAnts();
		W = s.w;
		H = s.h;
		canvas.width = W;
		canvas.height = H;
		ctx.putImageData(s.img, 0, 0);
		applyZoom();
		dirty = true;
	}
	function doUndo(): void {
		const s = hist.pop();
		if (!s) return;
		try {
			future.push({ w: W, h: H, img: ctx.getImageData(0, 0, W, H) });
		} catch {
			// Keep going with the restore.
		}
		restoreSnap(s);
		syncUndoBtns();
	}
	function doRedo(): void {
		const s = future.pop();
		if (!s) return;
		try {
			hist.push({ w: W, h: H, img: ctx.getImageData(0, 0, W, H) });
		} catch {
			// Keep going with the restore.
		}
		if (hist.length > 30) hist.shift();
		restoreSnap(s);
		syncUndoBtns();
	}

	// ----- ribbon -----
	function syncRibbon(): void {
		for (const el of Array.from(ribbon.querySelectorAll("[data-tool]"))) {
			(el as HTMLElement).classList.toggle("w10-on", (el as HTMLElement).dataset.tool === tool);
		}
		for (const el of Array.from(ribbon.querySelectorAll("[data-brush]"))) {
			(el as HTMLElement).classList.toggle("w10-on", (el as HTMLElement).dataset.brush === brush);
		}
		for (const el of Array.from(ribbon.querySelectorAll('[data-toggle="outline"]'))) {
			(el as HTMLElement).classList.toggle("w10-on", shapeOutline);
		}
		for (const el of Array.from(ribbon.querySelectorAll('[data-toggle="fill"]'))) {
			(el as HTMLElement).classList.toggle("w10-on", shapeFill);
		}
	}
	function setTool(t: PaintTool): void {
		tool = t;
		syncRibbon();
	}
	function ptool(id: PaintTool, label: string, icon: string, hint?: string): HTMLButtonElement {
		const b = document.createElement("button");
		b.type = "button";
		b.className = "w10-ptool";
		b.dataset.tool = id;
		b.title = hint ?? label;
		b.innerHTML = icon;
		const t = document.createElement("span");
		t.textContent = label;
		b.appendChild(t);
		b.onclick = () => {
			beginAction();
			commitFloating();
			closeText(true);
			setTool(id);
		};
		return b;
	}
	function paction(label: string, icon: string, hint: string, onClick: () => void): HTMLButtonElement {
		const b = document.createElement("button");
		b.type = "button";
		b.className = "w10-ptool";
		b.title = hint;
		b.innerHTML = icon;
		const t = document.createElement("span");
		t.textContent = label;
		b.appendChild(t);
		b.onclick = onClick;
		return b;
	}
	function pgroup(label: string): HTMLDivElement {
		const el = document.createElement("div");
		el.className = "w10-pgroup";
		const bdy = document.createElement("div");
		bdy.className = "w10-pgroup-body";
		const lab = document.createElement("div");
		lab.className = "w10-pgroup-label";
		lab.textContent = label;
		el.append(bdy, lab);
		ribbon.appendChild(el);
		return bdy;
	}
	function pselec(values: number[], get: () => number, set: (v: number) => void, title: string): HTMLSelectElement {
		const s = document.createElement("select");
		s.className = "w10-combo";
		s.title = title;
		s.style.width = "64px";
		s.style.alignSelf = "center";
		for (const v of values) {
			const o = document.createElement("option");
			o.value = String(v);
			o.textContent = String(v);
			s.appendChild(o);
		}
		s.value = String(get());
		s.onchange = () => set(parseInt(s.value, 10) || get());
		return s;
	}
	function paintRibbon(): void {
		homeTab.classList.toggle("w10-on", tab === "home");
		viewTab.classList.toggle("w10-on", tab === "view");
		ribbon.innerHTML = "";
		if (tab === "view") {
			const g = pgroup("Zoom");
			g.appendChild(paction("Zoom in", ICON_ZOOM_IN, "Zoom in", () => zoomStep(1)));
			g.appendChild(paction("Zoom out", ICON_ZOOM_IN, "Zoom out", () => zoomStep(-1)));
			g.appendChild(paction("100%", `<span class="w10-ptool-glyph">100%</span>`, "Actual size", () => {
				zoom = 100;
				applyZoom();
				syncRibbon();
			}));
			g.appendChild(pselec(ZOOMS, () => zoom, (v) => {
				zoom = v;
				applyZoom();
			}, "Zoom"));
			syncRibbon();
			return;
		}
		// Clipboard
		const clipG = pgroup("Clipboard");
		const pasteBtn = paction("Paste", ICON_PASTE, "Paste image (Ctrl+V)", () => void doPasteSmart());
		clipG.appendChild(pasteBtn);
		clipG.appendChild(paction("Cut", ICON_CUT, "Cut (Ctrl+X)", doCut));
		clipG.appendChild(paction("Copy", ICON_COPY, "Copy (Ctrl+C)", doCopy));
		// Image
		const imgG = pgroup("Image");
		imgG.appendChild(ptool("select", "Select", P_SELECT, "Rectangular selection"));
		imgG.appendChild(paction("Crop", P_CROP, "Crop to selection", () => {
			beginAction();
			const box = floating
				? { x: floating.x, y: floating.y, w: floating.cv.width, h: floating.cv.height }
				: sel;
			commitFloating();
			closeText(true);
			if (!box || box.w < 2 || box.h < 2) return;
			snapshot();
			const cx = Math.max(0, Math.min(W - 2, Math.round(box.x)));
			const cy = Math.max(0, Math.min(H - 2, Math.round(box.y)));
			const cw = Math.max(2, Math.min(W - cx, Math.round(box.w)));
			const ch = Math.max(2, Math.min(H - cy, Math.round(box.h)));
			const t = document.createElement("canvas");
			t.width = cw;
			t.height = ch;
			(t.getContext("2d") as CanvasRenderingContext2D).drawImage(canvas, cx, cy, cw, ch, 0, 0, cw, ch);
			W = cw;
			H = ch;
			canvas.width = W;
			canvas.height = H;
			ctx.fillStyle = "#ffffff";
			ctx.fillRect(0, 0, W, H);
			ctx.drawImage(t, 0, 0);
			sel = null;
			stopAnts();
			applyZoom();
			dirty = true;
		}));
		imgG.appendChild(paction("Resize", P_RESIZE, "Resize by percent", openResize));
		imgG.appendChild(paction("↺", `<span class="w10-ptool-glyph">↺</span>`, "Rotate left 90°", () => {
			beginAction();
			rotateCanvas(-1);
		}));
		imgG.appendChild(paction("↻", `<span class="w10-ptool-glyph">↻</span>`, "Rotate right 90°", () => {
			beginAction();
			rotateCanvas(1);
		}));
		imgG.appendChild(paction("Flip H", `<span class="w10-ptool-glyph">⇄</span>`, "Flip horizontal", () => {
			beginAction();
			flipCanvas(true);
		}));
		imgG.appendChild(paction("Flip V", `<span class="w10-ptool-glyph">⇅</span>`, "Flip vertical", () => {
			beginAction();
			flipCanvas(false);
		}));
		// Tools
		const toolsG = pgroup("Tools");
		toolsG.appendChild(ptool("pencil", "Pencil", ICON_EDIT));
		toolsG.appendChild(ptool("fill", "Fill", P_BUCKET, "Fill with color"));
		toolsG.appendChild(ptool("text", "Text", `<span class="w10-ptool-glyph">A</span>`, "Text"));
		toolsG.appendChild(ptool("eraser", "Eraser", P_ERASER));
		toolsG.appendChild(ptool("picker", "Picker", P_DROPPER, "Pick color"));
		toolsG.appendChild(ptool("zoom", "Zoom", ICON_ZOOM_IN, "Left-click zoom in, right-click zoom out"));
		// Brushes
		const brushG = pgroup("Brushes");
		for (const [id, label, icon] of [["brush", "Brush", P_BRUSH], ["marker", "Marker", P_MARKER], ["spray", "Spray", P_SPRAY]] as Array<[PaintBrush, string, string]>) {
			const b = document.createElement("button");
			b.type = "button";
			b.className = "w10-ptool";
			b.dataset.brush = id;
			b.title = label;
			b.innerHTML = icon;
			const t = document.createElement("span");
			t.textContent = label;
			b.appendChild(t);
			b.onclick = () => {
				brush = id;
				setTool("pencil");
				syncRibbon();
			};
			brushG.appendChild(b);
		}
		brushG.appendChild(pselec(SIZES, () => size, (v) => {
			size = v;
		}, "Brush size"));
		// Shapes
		const shapesG = pgroup("Shapes");
		shapesG.appendChild(ptool("line", "Line", P_LINE));
		shapesG.appendChild(ptool("rect", "Rect", P_RECT, "Rectangle"));
		shapesG.appendChild(ptool("round", "Round", P_ROUND, "Rounded rectangle"));
		shapesG.appendChild(ptool("ellipse", "Ellipse", P_ELLIPSE));
		shapesG.appendChild(ptool("tri", "Triangle", P_TRI));
		const toggles = document.createElement("div");
		toggles.className = "w10-pgroup-col";
		for (const [id, label] of [["outline", "Outline"], ["fill", "Fill"]] as Array<["outline" | "fill", string]>) {
			const b = document.createElement("button");
			b.type = "button";
			b.className = "w10-ptool";
			b.dataset.toggle = id;
			b.title = label;
			const t = document.createElement("span");
			t.textContent = label;
			b.appendChild(t);
			b.onclick = () => {
				if (id === "outline") shapeOutline = !shapeOutline;
				else shapeFill = !shapeFill;
				syncRibbon();
			};
			toggles.appendChild(b);
		}
		shapesG.appendChild(toggles);
		shapesG.appendChild(pselec(FONTS, () => fontSize, (v) => {
			fontSize = v;
		}, "Text size"));
		// Colors
		const colorsG = pgroup("Colors");
		const stack = document.createElement("div");
		stack.className = "w10-pwell-stack";
		const well1 = document.createElement("button");
		well1.type = "button";
		well1.className = "w10-pwell w10-pwell-1";
		well1.title = "Color 1 (left button draws)";
		const well2 = document.createElement("button");
		well2.type = "button";
		well2.className = "w10-pwell w10-pwell-2";
		well2.title = "Color 2 (right button draws)";
		well1.style.background = color1;
		well2.style.background = color2;
		const syncWells = (): void => {
			well1.style.background = color1;
			well2.style.background = color2;
		};
		well1.onclick = () => colorEditor(true);
		well2.onclick = () => colorEditor(true);
		stack.append(well1, well2);
		colorsG.appendChild(stack);
		const pal = document.createElement("div");
		pal.className = "w10-ppalette";
		for (const hex of PAINT_COLORS) {
			const sw = document.createElement("button");
			sw.type = "button";
			sw.className = "w10-pswatch";
			sw.style.background = hex;
			sw.title = hex;
			sw.onclick = () => {
				color1 = hex;
				syncWells();
			};
			sw.oncontextmenu = (e) => {
				e.preventDefault();
				e.stopPropagation();
				color2 = hex;
				syncWells();
			};
			pal.appendChild(sw);
		}
		colorsG.appendChild(pal);
		const editCol = document.createElement("input");
		editCol.type = "color";
		editCol.style.display = "none";
		editCol.oninput = () => {
			color1 = editCol.value;
			syncWells();
		};
		const colorEditor = (first: boolean): void => {
			if (!first) {
				// Swap C1/C2 like Paint's color mixer shortcut.
				const t = color1;
				color1 = color2;
				color2 = t;
				syncWells();
				return;
			}
			editCol.click();
		};
		colorsG.appendChild(paction("Edit", ICON_EDIT, "Custom color (right-click swaps C1/C2)", () => colorEditor(true)));
		colorsG.appendChild(editCol);
		syncRibbon();
	}

	// ----- resize popover -----
	function openResize(): void {
		commitFloating();
		closeText(true);
		const pop = document.createElement("div");
		pop.style.cssText = "position:absolute;top:96px;left:50%;transform:translateX(-50%);z-index:50;background:#fff;border:1px solid #767676;box-shadow:0 4px 16px rgba(0,0,0,.4);padding:12px;display:flex;flex-direction:column;gap:8px;font-size:12px;";
		const title = document.createElement("div");
		title.textContent = "Resize by percent";
		title.style.fontWeight = "600";
		const rowH = document.createElement("label");
		rowH.textContent = "Horizontal % ";
		const inH = document.createElement("input");
		inH.type = "number";
		inH.className = "w10-textbox";
		inH.value = "100";
		inH.min = "1";
		inH.max = "800";
		rowH.appendChild(inH);
		const rowV = document.createElement("label");
		rowV.textContent = "Vertical % ";
		const inV = document.createElement("input");
		inV.type = "number";
		inV.className = "w10-textbox";
		inV.value = "100";
		inV.min = "1";
		inV.max = "800";
		rowV.appendChild(inV);
		const btns = document.createElement("div");
		btns.className = "w10-toolbar";
		btns.style.marginBottom = "0";
		const ok = w10Button("OK", () => {
			beginAction();
			const ph = Math.max(1, Math.min(800, parseInt(inH.value, 10) || 100));
			const pv = Math.max(1, Math.min(800, parseInt(inV.value, 10) || 100));
			resizeCanvas((W * ph) / 100, (H * pv) / 100);
			close();
		});
		const cancel = w10Button("Cancel", () => close());
		btns.append(ok, cancel);
		pop.append(title, rowH, rowV, btns);
		root.appendChild(pop);
		const close = (): void => pop.remove();
		setTimeout(() => {
			const outside = (e: PointerEvent): void => {
				if (!pop.contains(e.target as Node)) {
					close();
					document.removeEventListener("pointerdown", outside);
				}
			};
			document.addEventListener("pointerdown", outside);
		}, 0);
	}

	// ----- pointer -----
	const toLocal = (e: PointerEvent): { x: number; y: number } => {
		const r = canvas.getBoundingClientRect();
		return {
			x: Math.max(0, Math.min(W - 1, Math.round((e.clientX - r.left) / (r.width / W)))),
			y: Math.max(0, Math.min(H - 1, Math.round((e.clientY - r.top) / (r.height / H)))),
		};
	};
	let stroke: { btn: number; lx: number; ly: number; moved: boolean } | null = null;
	let shapeDrag: { x0: number; y0: number; btn: number } | null = null;
	let selDrag: { x0: number; y0: number } | null = null;
	let moveDrag: { dx: number; dy: number } | null = null;

	function stampDot(x: number, y: number, color: string, radius: number, n: number): void {
		ctx.save();
		ctx.fillStyle = color;
		for (let i = 0; i < n; i++) {
			const a = Math.random() * Math.PI * 2;
			const r = Math.sqrt(Math.random()) * radius;
			ctx.fillRect(Math.round(x + Math.cos(a) * r), Math.round(y + Math.sin(a) * r), 1, 1);
		}
		ctx.restore();
	}
	function strokeSegment(x0: number, y0: number, x1: number, y1: number, color: string): void {
		ctx.save();
		if (brush === "spray") {
			const dist = Math.max(1, Math.hypot(x1 - x0, y1 - y0));
			const steps = Math.min(24, Math.ceil(dist / 2));
			for (let i = 0; i <= steps; i++) {
				const t = steps === 0 ? 0 : i / steps;
				stampDot(x0 + (x1 - x0) * t, y0 + (y1 - y0) * t, color, size * 2.5, size * 2);
			}
		} else if (brush === "marker") {
			ctx.globalAlpha = 0.55;
			ctx.strokeStyle = color;
			ctx.lineWidth = size * 2 + 2;
			ctx.lineCap = "round";
			ctx.lineJoin = "round";
			ctx.beginPath();
			ctx.moveTo(x0, y0);
			ctx.lineTo(x1, y1);
			ctx.stroke();
		} else {
			ctx.strokeStyle = color;
			ctx.lineWidth = size;
			ctx.lineCap = "round";
			ctx.lineJoin = "round";
			ctx.beginPath();
			ctx.moveTo(x0, y0);
			ctx.lineTo(x1, y1);
			ctx.stroke();
		}
		ctx.restore();
	}
	function eraserSegment(x0: number, y0: number, x1: number, y1: number, color: string): void {
		ctx.save();
		ctx.strokeStyle = color;
		ctx.lineWidth = size * 2 + 4;
		ctx.lineCap = "square";
		ctx.beginPath();
		ctx.moveTo(x0, y0);
		ctx.lineTo(x1, y1);
		ctx.stroke();
		ctx.restore();
	}
	function traceShape(
		c: CanvasRenderingContext2D,
		x0: number, y0: number, x1: number, y1: number,
		main: string, alt: string,
	): void {
		c.save();
		c.strokeStyle = main;
		c.fillStyle = alt;
		c.lineWidth = Math.max(1, size);
		c.beginPath();
		if (tool === "line") {
			c.moveTo(x0 + 0.5, y0 + 0.5);
			c.lineTo(x1 + 0.5, y1 + 0.5);
		} else if (tool === "rect") {
			c.rect(Math.min(x0, x1), Math.min(y0, y1), Math.abs(x1 - x0), Math.abs(y1 - y0));
		} else if (tool === "round") {
			const x = Math.min(x0, x1);
			const y = Math.min(y0, y1);
			const w = Math.abs(x1 - x0);
			const h = Math.abs(y1 - y0);
			const r = Math.min(12, w / 2, h / 2);
			c.moveTo(x + r, y);
			c.lineTo(x + w - r, y);
			c.quadraticCurveTo(x + w, y, x + w, y + r);
			c.lineTo(x + w, y + h - r);
			c.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
			c.lineTo(x + r, y + h);
			c.quadraticCurveTo(x, y + h, x, y + h - r);
			c.lineTo(x, y + r);
			c.quadraticCurveTo(x, y, x + r, y);
			c.closePath();
		} else if (tool === "ellipse") {
			c.ellipse((x0 + x1) / 2, (y0 + y1) / 2, Math.abs(x1 - x0) / 2, Math.abs(y1 - y0) / 2, 0, 0, Math.PI * 2);
		} else {
			c.moveTo((x0 + x1) / 2, Math.min(y0, y1));
			c.lineTo(Math.max(x0, x1), Math.max(y0, y1));
			c.lineTo(Math.min(x0, x1), Math.max(y0, y1));
			c.closePath();
		}
		if (tool === "line") c.stroke();
		else {
			if (shapeFill) c.fill();
			if (shapeOutline) c.stroke();
		}
		c.restore();
	}
	function pick(p: { x: number; y: number }, btn: number): void {
		const d = ctx.getImageData(Math.max(0, Math.min(W - 1, p.x)), Math.max(0, Math.min(H - 1, p.y)), 1, 1).data;
		const hex = `#${((d[0] ?? 0) << 16 | (d[1] ?? 0) << 8 | (d[2] ?? 0)).toString(16).padStart(6, "0")}`;
		if (btn === 2) color2 = hex;
		else color1 = hex;
		syncRibbon();
		paintRibbonWells();
	}
	function paintRibbonWells(): void {
		const w1 = ribbon.querySelector(".w10-pwell-1") as HTMLButtonElement | null;
		const w2 = ribbon.querySelector(".w10-pwell-2") as HTMLButtonElement | null;
		if (w1) w1.style.background = color1;
		if (w2) w2.style.background = color2;
	}

	function selDown(p: { x: number; y: number }): void {
		closeText(true);
		const box = floating
			? { x: floating.x, y: floating.y, w: floating.cv.width, h: floating.cv.height }
			: sel;
		if (floating && box && p.x >= box.x && p.x <= box.x + box.w && p.y >= box.y && p.y <= box.y + box.h) {
			moveDrag = { dx: p.x - floating.x, dy: p.y - floating.y };
			return;
		}
		if (box && !floating && p.x >= box.x && p.x <= box.x + box.w && p.y >= box.y && p.y <= box.y + box.h && sel) {
			// Pick up the selection.
			const t = document.createElement("canvas");
			t.width = Math.max(1, sel.w);
			t.height = Math.max(1, sel.h);
			(t.getContext("2d") as CanvasRenderingContext2D).drawImage(canvas, sel.x, sel.y, sel.w, sel.h, 0, 0, t.width, t.height);
			floating = { cv: t, x: sel.x, y: sel.y, ox: sel.x, oy: sel.y, cut: false };
			sel = null;
			moveDrag = { dx: p.x - floating.x, dy: p.y - floating.y };
			ensureAnts();
			drawOverlay();
			return;
		}
		commitFloating();
		sel = null;
		stopAnts();
		selDrag = { x0: p.x, y0: p.y };
		drawOverlay();
	}
	function selMove(p: { x: number; y: number }): void {
		if (moveDrag && floating) {
			if (!floating.cut) {
				floating.cut = true;
				ctx.save();
				ctx.fillStyle = color2;
				ctx.fillRect(floating.ox, floating.oy, floating.cv.width, floating.cv.height);
				ctx.restore();
			}
			floating.x = Math.round(p.x - moveDrag.dx);
			floating.y = Math.round(p.y - moveDrag.dy);
			drawOverlay();
			return;
		}
		if (selDrag) {
			sel = {
				x: Math.min(selDrag.x0, p.x),
				y: Math.min(selDrag.y0, p.y),
				w: Math.abs(p.x - selDrag.x0),
				h: Math.abs(p.y - selDrag.y0),
			};
			drawOverlay();
		}
	}
	function selUp(): void {
		if (moveDrag) {
			moveDrag = null;
			dirty = true;
			return;
		}
		if (selDrag) {
			selDrag = null;
			if (!sel || sel.w < 3 || sel.h < 3) {
				sel = null;
				stopAnts();
			} else ensureAnts();
			drawOverlay();
		}
	}

	wrap.addEventListener("contextmenu", (e) => {
		e.preventDefault();
		e.stopPropagation();
	});
	wrap.addEventListener("pointerdown", (e) => {
		if ((e.target as HTMLElement).closest(".w10-ptext")) return;
		wrap.focus();
		if (e.button !== 0 && e.button !== 2) return;
		beginAction();
		e.preventDefault();
		try {
			wrap.setPointerCapture(e.pointerId);
		} catch {
			// noop
		}
		const p = toLocal(e);
		if (tool === "select") {
			selDown(p);
			return;
		}
		if (tool === "text") {
			placeText(p);
			return;
		}
		if (tool === "picker") {
			pick(p, e.button);
			return;
		}
		if (tool === "fill") {
			commitFloating();
			closeText(true);
			snapshot();
			flood(p.x, p.y, e.button === 2 ? color2 : color1);
			dirty = true;
			return;
		}
		if (tool === "zoom") {
			commitFloating();
			zoomStep(e.button === 2 ? -1 : 1);
			return;
		}
		if (isPaintShape(tool)) {
			commitFloating();
			closeText(true);
			shapeDrag = { x0: p.x, y0: p.y, btn: e.button };
			return;
		}
		commitFloating();
		closeText(true);
		snapshot();
		stroke = { btn: e.button, lx: p.x, ly: p.y, moved: false };
		const col = tool === "eraser" ? (e.button === 2 ? color1 : color2) : e.button === 2 ? color2 : color1;
		if (tool === "eraser") eraserSegment(p.x, p.y, p.x, p.y, col);
		else if (brush === "spray") stampDot(p.x, p.y, col, size * 2.5, size * 3);
		else strokeSegment(p.x, p.y, p.x, p.y, col);
	});
	wrap.addEventListener("pointermove", (e) => {
		const p = toLocal(e);
		if (stroke) {
			stroke.moved = true;
			const col = tool === "eraser"
				? (stroke.btn === 2 ? color1 : color2)
				: stroke.btn === 2 ? color2 : color1;
			if (tool === "eraser") eraserSegment(stroke.lx, stroke.ly, p.x, p.y, col);
			else strokeSegment(stroke.lx, stroke.ly, p.x, p.y, col);
			stroke.lx = p.x;
			stroke.ly = p.y;
			return;
		}
		if (shapeDrag) {
			octx.clearRect(0, 0, W, H);
			drawOverlaySelOnly();
			const main = shapeDrag.btn === 2 ? color2 : color1;
			const alt = shapeDrag.btn === 2 ? color1 : color2;
			traceShape(octx, shapeDrag.x0, shapeDrag.y0, p.x, p.y, main, alt);
			return;
		}
		if (tool === "select" && (selDrag || moveDrag)) selMove(p);
	});
	function drawOverlaySelOnly(): void {
		// Overlay was just cleared for the shape preview; redraw sel ants underneath.
		const box = sel;
		if (box && box.w > 1 && box.h > 1) {
			octx.save();
			octx.lineWidth = 1;
			octx.setLineDash([5, 3]);
			octx.lineDashOffset = -ants;
			octx.strokeStyle = "#000000";
			octx.strokeRect(box.x + 0.5, box.y + 0.5, box.w, box.h);
			octx.restore();
		}
	}
	wrap.addEventListener("pointerup", (e) => {
		const p = toLocal(e);
		if (stroke) {
			stroke = null;
			dirty = true;
			return;
		}
		if (shapeDrag) {
			const s = shapeDrag;
			shapeDrag = null;
			const main = s.btn === 2 ? color2 : color1;
			const alt = s.btn === 2 ? color1 : color2;
			octx.clearRect(0, 0, W, H);
			drawOverlay();
			snapshot();
			traceShape(ctx, s.x0, s.y0, p.x, p.y, main, alt);
			dirty = true;
			return;
		}
		if (tool === "select") selUp();
	});
	wrap.addEventListener("pointercancel", () => {
		stroke = null;
		shapeDrag = null;
		selDrag = null;
		moveDrag = null;
		octx.clearRect(0, 0, W, H);
		drawOverlay();
	});
	wrap.addEventListener("keydown", (e) => {
		if ((e.target as HTMLElement).closest(".w10-ptext")) return;
		const mod = e.ctrlKey || e.metaKey;
		const key = e.key.toLowerCase();
		if (mod && key === "c") {
			e.preventDefault();
			doCopy();
		} else if (mod && key === "x") {
			e.preventDefault();
			doCut();
		} else if (mod && key === "v") {
			e.preventDefault();
			void doPasteSmart();
		} else if (mod && key === "a") {
			e.preventDefault();
			commitFloating();
			closeText(true);
			sel = { x: 0, y: 0, w: W, h: H };
			ensureAnts();
			drawOverlay();
		} else if (mod && key === "s") {
			e.preventDefault();
			doSave();
		} else if (mod && key === "z" && !e.shiftKey) {
			e.preventDefault();
			doUndo();
		} else if (mod && (key === "y" || (key === "z" && e.shiftKey))) {
			e.preventDefault();
			doRedo();
		} else if (e.key === "Delete" || e.key === "Backspace") {
			e.preventDefault();
			doDelete();
		} else if (e.key === "Escape") {
			if (textBox) closeText(false);
			else if (floating) {
				ctx.drawImage(floating.cv, floating.ox, floating.oy);
				floating = null;
				sel = null;
				stopAnts();
				drawOverlay();
			} else if (sel) {
				sel = null;
				stopAnts();
				drawOverlay();
			}
		}
	});

	// ----- canvas resize grip -----
	grip.addEventListener("pointerdown", (e) => {
		e.preventDefault();
		e.stopPropagation();
		beginAction();
		try {
			grip.setPointerCapture(e.pointerId);
		} catch {
			// noop
		}
		const r = canvas.getBoundingClientRect();
		const sx = e.clientX;
		const sy = e.clientY;
		const k = r.width / W;
		const startW = W;
		const startH = H;
		const move = (ev: PointerEvent): void => {
			resizeCanvas(startW + Math.round((ev.clientX - sx) / k), startH + Math.round((ev.clientY - sy) / k));
		};
		const up = (): void => {
			grip.removeEventListener("pointermove", move);
			grip.removeEventListener("pointerup", up);
			grip.removeEventListener("pointercancel", up);
		};
		grip.addEventListener("pointermove", move);
		grip.addEventListener("pointerup", up);
		grip.addEventListener("pointercancel", up);
	});

	// ----- tabs -----
	homeTab.onclick = () => {
		tab = "home";
		paintRibbon();
	};
	viewTab.onclick = () => {
		tab = "view";
		paintRibbon();
	};
	fileTab.onclick = () => {
		const r = fileTab.getBoundingClientRect();
		showWin10Menu({
			id: "paint-file",
			x: Math.round(r.left),
			y: Math.round(r.bottom + 2),
			dark,
			build: (menu) => {
				menu.appendChild(w10MenuHeader("Paint", "paint.exe"));
				menu.appendChild(w10Separator());
				const n = w10MenuItem("New", "clear the canvas");
				n.onclick = () => doNew();
				menu.appendChild(n);
				const o = w10MenuItem("Open…", "load an image");
				o.onclick = () => doOpenFile();
				menu.appendChild(o);
				const s = w10MenuItem("Save PNG", "download paint.png");
				s.onclick = () => doSave();
				menu.appendChild(s);
			},
		});
	};

	paintRibbon();
	applyZoom();
}

// ---- App 7 : Notepad (notepad.exe) ----
const NOTEPAD_KEY = "win10ml.notepad";
function loadNote(): string {
	try {
		return localStorage.getItem(NOTEPAD_KEY) ?? "";
	} catch {
		return "";
	}
}
function persistNote(value: string): void {
	try {
		localStorage.setItem(NOTEPAD_KEY, value);
	} catch {
		// Private mode / file:// — keep it in memory only.
	}
}
const notepad = desktop.createApp({
	id: "notepad",
	label: "Notepad",
	appTitle: "Notepad — notepad.exe",
	appIconHTML: ICON_NOTEPAD,
	titleHTML: `Notepad <span class="w10-credit">notepad.exe</span>`,
	width: 520,
	height: 480,
	build: (body) => {
		body.classList.add("w10-body-flush");
		const root = document.createElement("div");
		root.className = "w10-notepad";
		const bar = document.createElement("div");
		bar.className = "w10-notepad-bar";
		const area = document.createElement("textarea");
		area.className = "w10-notepad-area";
		area.spellcheck = false;
		area.placeholder = "Type here… (auto-saved locally)";
		area.value = loadNote();
		const status = document.createElement("div");
		status.className = "w10-notepad-status";
		const paint = () => {
			const text = area.value;
			const head = text.slice(0, area.selectionStart ?? text.length);
			const lines = head.split("\n");
			const last = lines[lines.length - 1] ?? "";
			const words = text.split(/\s+/).filter(Boolean).length;
			status.textContent = `Ln ${lines.length}, Col ${last.length + 1} · ${text.length} chars · ${words} words`;
		};
		area.addEventListener("input", () => {
			persistNote(area.value);
			paint();
		});
		area.addEventListener("keyup", paint);
		area.addEventListener("click", paint);
		bar.appendChild(
			w10Button("New", () => {
				if (!area.value) {
					area.focus();
					return;
				}
				confirmWin10("Notepad", "Clear the current note?", { yes: "Clear", no: "Cancel" }, { theme: dark ? "dark" : "light" }).then((yes) => {
					if (!yes) return;
					area.value = "";
					persistNote("");
					paint();
					area.focus();
				});
			}),
		);
		bar.appendChild(
			w10Button("Save .txt", () => {
				const blob = new Blob([area.value], { type: "text/plain;charset=utf-8" });
				const url = URL.createObjectURL(blob);
				const a = document.createElement("a");
				a.href = url;
				a.download = "notepad.txt";
				document.body.appendChild(a);
				a.click();
				a.remove();
				setTimeout(() => URL.revokeObjectURL(url), 1000);
			}),
		);
		root.appendChild(bar);
		root.appendChild(area);
		root.appendChild(status);
		body.appendChild(root);
		paint();
	},
});

// ---- QxChat (chat-only client, qxchat.ts running in the browser) ----
// The SDK ships TS sources with path aliases + node:crypto (challenge code):
// esbuild resolves them for the demo bundle (see build:demo --alias and
// demo/vendor/node-crypto-shim.ts). E2EE runs on WebCrypto, transport on the
// native browser WebSocket — no Bun gateway needed.
const QX_SERVER_KEY = "win10ml.qxchat.server";
const QX_TOKEN_KEY = "win10ml.qxchat.token";
const QX_ROOM_KEY = "win10ml.qxchat.room";
const QX_DEFAULT_SERVER = "wss://qxch.at/ws";

function qxApiBase(wsUrl: string): string {
	return wsUrl.replace(/^ws/, "http").replace(/\/ws$/, "");
}

function qxRoomIdOf(input: string): string {
	const v = input.trim();
	if (/^[0-9a-fA-F]{96}$/.test(v)) return v.slice(0, 32).toLowerCase();
	return v;
}

function qxLoad(key: string, fallback: string): string {
	try {
		return localStorage.getItem(key) ?? fallback;
	} catch {
		return fallback;
	}
}

function qxSave(key: string, value: string): void {
	try {
		if (value) localStorage.setItem(key, value);
		else localStorage.removeItem(key);
	} catch {
		// Private mode — keep it in memory only.
	}
}

function buildQxChatBody(body: HTMLDivElement): void {
	body.classList.add("w10-body-flush");
	const root = document.createElement("div");
	root.className = "w10-chat";

	let client: SelfbotClient | null = null;
	let me = "";
	let roomId = "";
	const bubbles = new Map<string, HTMLDivElement>();
	const typingTimers = new Map<string, number>();

	// ----- status -----
	const statusBar = document.createElement("div");
	statusBar.className = "w10-chat-status";
	const dot = document.createElement("span");
	dot.className = "w10-dot";
	const statusText = document.createElement("span");
	statusText.textContent = "Offline";
	const logoutBtn = document.createElement("button");
	logoutBtn.type = "button";
	logoutBtn.className = "w10-btn w10-btn-small";
	logoutBtn.textContent = "Logout";
	logoutBtn.style.display = "none";
	logoutBtn.style.marginLeft = "auto";
	logoutBtn.onclick = () => {
		qxSave(QX_TOKEN_KEY, "");
		try {
			client?.logout();
		} catch {
			// Already gone.
		}
		client = null;
		showConnect();
	};
	statusBar.append(dot, statusText, logoutBtn);

	const setStatus = (mode: "off" | "busy" | "on", text: string): void => {
		dot.className = `w10-dot${mode === "on" ? " w10-on" : mode === "busy" ? " w10-busy" : ""}`;
		statusText.textContent = text;
	};

	// ----- views -----
	const viewConnect = document.createElement("div");
	viewConnect.className = "w10-chat-form";
	const viewRoom = document.createElement("div");
	viewRoom.className = "w10-chat-form";
	viewRoom.style.display = "none";
	const viewChat = document.createElement("div");
	viewChat.className = "w10-chat";
	viewChat.style.display = "none";
	viewChat.style.flex = "1";
	viewChat.style.minHeight = "0";

	const showOnly = (el: HTMLElement): void => {
		for (const v of [viewConnect, viewRoom, viewChat]) v.style.display = v === el ? "" : "none";
	};
	const showConnect = (): void => {
		me = "";
		roomId = "";
		logoutBtn.style.display = "none";
		setStatus("off", "Offline");
		showOnly(viewConnect);
	};
	const showRoom = (): void => {
		logoutBtn.style.display = "";
		setStatus("on", me ? `Online as ${me}` : "Online");
		showOnly(viewRoom);
	};
	const showChat = (): void => {
		logoutBtn.style.display = "";
		setStatus("on", me ? `${me} · ${roomId.slice(0, 8)}…` : roomId);
		showOnly(viewChat);
	};

	const field = (label: string, input: HTMLInputElement, hint: string): HTMLDivElement => {
		const wrap = document.createElement("div");
		wrap.className = "w10-setting w10-setting-col";
		const title = document.createElement("div");
		title.className = "w10-setting-title";
		title.textContent = label;
		const sub = document.createElement("div");
		sub.className = "w10-desc";
		sub.textContent = hint;
		wrap.append(title, sub, input);
		return wrap;
	};
	const textInput = (value: string, placeholder: string, password = false): HTMLInputElement => {
		const input = document.createElement("input");
		input.type = password ? "password" : "text";
		input.className = "w10-textbox";
		input.value = value;
		input.placeholder = placeholder;
		input.spellcheck = false;
		return input;
	};

	// ----- connect form -----
	const serverInput = textInput(qxLoad(QX_SERVER_KEY, QX_DEFAULT_SERVER), QX_DEFAULT_SERVER);
	const userInput = textInput("", "qx username");
	const passInput = textInput("", "password", true);
	const tokenInput = textInput(qxLoad(QX_TOKEN_KEY, ""), "session token (or login below)", true);
	viewConnect.appendChild(w10GroupTitle("QxChat"));
	viewConnect.appendChild(w10Desc("Chat-only client, qxchat.ts running natively in your browser (E2EE included)."));
	viewConnect.appendChild(field("Server", serverInput, "QXChat gateway WebSocket URL."));
	viewConnect.appendChild(field("Session token", tokenInput, "Preferred: paste a token, nothing is stored but the token."));
	viewConnect.appendChild(field("Username", userInput, "Or login with username + password (one shot)."));
	viewConnect.appendChild(field("Password", passInput, "Exchanged for a token, never stored."));
	const connectRow = document.createElement("div");
	connectRow.className = "w10-toolbar";
	const loginTokenBtn = w10Button("Login (token)", () => {
		const token = tokenInput.value.trim();
		if (!token) {
			tokenInput.focus();
			return;
		}
		void connect({ token });
	});
	const loginPassBtn = w10Button("Login (pass)", () => {
		if (!userInput.value.trim() || !passInput.value) {
			(userInput.value.trim() ? passInput : userInput).focus();
			return;
		}
		const auth = { user: userInput.value.trim(), pass: passInput.value };
		passInput.value = "";
		void connect(auth);
	});
	connectRow.append(loginTokenBtn, loginPassBtn);
	viewConnect.appendChild(connectRow);

	// ----- room form -----
	const roomInput = textInput(qxLoad(QX_ROOM_KEY, ""), "96-char invite token or room ID");
	viewRoom.appendChild(w10GroupTitle("Room"));
	viewRoom.appendChild(field("Invite token / room ID", roomInput, "Paste a 96-char invite token (key auto-registered)."));
	const joinRow = document.createElement("div");
	joinRow.className = "w10-toolbar";
	const joinBtn = w10Button("Join", () => {
		void doJoin();
	});
	joinRow.appendChild(joinBtn);
	viewRoom.appendChild(joinRow);

	// ----- chat view -----
	const log = document.createElement("div");
	log.className = "w10-chat-log";
	const emptyHint = document.createElement("div");
	emptyHint.className = "w10-chat-empty";
	emptyHint.textContent = "No messages yet — say hi.";
	log.appendChild(emptyHint);
	const typingLine = document.createElement("div");
	typingLine.className = "w10-chat-typing";
	const compose = document.createElement("div");
	compose.className = "w10-chat-compose";
	const msgInput = textInput("", "Message… (Enter to send, 2000 max)");
	const sendBtn = w10Button("Send", () => sendCurrent());
	const leaveBtn = w10Button("Leave", () => {
		void doLeave();
	});
	compose.append(msgInput, sendBtn, leaveBtn);
	viewChat.append(log, typingLine, compose);

	const nearBottom = (): boolean => log.scrollHeight - log.scrollTop - log.clientHeight < 60;
	const scrollDown = (): void => {
		log.scrollTop = log.scrollHeight;
	};
	const fmtTime = (ts: number): string => {
		const d = new Date(typeof ts === "number" && ts > 0 ? ts : Date.now());
		return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
	};
	const sysMsg = (text: string): void => {
		emptyHint.remove();
		const row = document.createElement("div");
		row.className = "w10-chat-row w10-sys";
		const bubble = document.createElement("div");
		bubble.className = "w10-chat-bubble";
		bubble.textContent = text;
		row.appendChild(bubble);
		log.appendChild(row);
		while (log.children.length > 200) log.firstChild?.remove();
		if (nearBottom()) scrollDown();
	};
	const addMsg = (m: { messageId: string; username: string; text: string; timestamp: number; mine: boolean; locked: boolean }): void => {
		emptyHint.remove();
		const stick = nearBottom();
		const row = document.createElement("div");
		row.className = `w10-chat-row${m.mine ? " w10-mine" : ""}`;
		const meta = document.createElement("div");
		meta.className = "w10-chat-meta";
		meta.textContent = `${m.username} · ${fmtTime(m.timestamp)}`;
		const bubble = document.createElement("div");
		bubble.className = "w10-chat-bubble";
		bubble.textContent = m.locked ? "🔒 encrypted message (no key)" : m.text;
		row.append(meta, bubble);
		log.appendChild(row);
		if (m.messageId) bubbles.set(m.messageId, bubble);
		while (log.children.length > 200) log.firstChild?.remove();
		if (stick) scrollDown();
	};
	const paintTyping = (active: string[]): void => {
		typingLine.textContent = active.length === 0 ? "" : `${active.join(", ")} ${active.length === 1 ? "is" : "are"} typing…`;
	};
	const typingUsers = new Set<string>();
	const markTyping = (username: string, typing: boolean): void => {
		const prev = typingTimers.get(username);
		if (prev !== undefined) {
			clearTimeout(prev);
			typingTimers.delete(username);
		}
		typingUsers.delete(username);
		if (typing && username !== me) {
			typingUsers.add(username);
			typingTimers.set(
				username,
				window.setTimeout(() => {
					typingTimers.delete(username);
					typingUsers.delete(username);
					paintTyping(Array.from(typingUsers));
				}, 3000),
			);
		}
		paintTyping(Array.from(typingUsers));
	};

	const sendCurrent = (): void => {
		const text = msgInput.value.slice(0, 2000);
		if (!text.trim() || !client || !roomId) return;
		msgInput.value = "";
		msgInput.focus();
		client.sendMessage(roomId, text).catch((err: unknown) => {
			sysMsg(`Error: ${err instanceof Error ? err.message : "send failed"}`);
		});
	};
	msgInput.addEventListener("keydown", (e) => {
		e.stopPropagation();
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			sendCurrent();
		}
	});
	sendBtn.onclick = () => sendCurrent();

	async function doJoin(): Promise<void> {
		if (!client) return;
		const raw = roomInput.value.trim();
		if (!raw) {
			roomInput.focus();
			return;
		}
		setStatus("busy", "Joining…");
		try {
			await client.joinRoom(raw);
			roomId = qxRoomIdOf(raw);
			qxSave(QX_ROOM_KEY, raw);
			log.innerHTML = "";
			bubbles.clear();
			log.appendChild(emptyHint);
			sysMsg(`Joined ${roomId.slice(0, 12)}…`);
			showChat();
			msgInput.focus();
			try {
				await client.fetchHistory(roomId);
			} catch {
				// History is best-effort; live messages still flow.
			}
		} catch (err) {
			setStatus("on", me ? `Online as ${me}` : "Online");
			sysMsg(`Error: ${err instanceof Error ? err.message : "join failed"}`);
		}
	}

	async function doLeave(): Promise<void> {
		if (client && roomId) {
			try {
				await client.leaveRoom(roomId);
			} catch {
				// Best-effort.
			}
		}
		roomId = "";
		qxSave(QX_ROOM_KEY, "");
		showRoom();
	}

	function subscribe(c: SelfbotClient): void {
		c.on(Events.Ready, () => {
			me = c.username;
			qxSave(QX_TOKEN_KEY, tokenInput.value.trim());
			if (roomInput.value.trim()) void doJoin();
			else showRoom();
		});
		c.on(Events.MessageCreate, (m) => {
			if (m.roomId !== roomId) return;
			addMsg({
				messageId: m.messageId,
				username: m.username || "?",
				text: m.text,
				timestamp: m.timestamp,
				mine: m.username === c.username,
				locked: m.locked,
			});
		});
		c.on(Events.MessageUpdate, (m) => {
			if (m.roomId !== roomId) return;
			const b = bubbles.get(m.messageId);
			if (b) b.textContent = m.locked ? "🔒 encrypted message (no key)" : m.text;
		});
		c.on(Events.MessageDelete, (d) => {
			if (d.roomId !== roomId) return;
			const b = bubbles.get(d.messageId);
			if (b) {
				b.textContent = "Message deleted.";
				b.parentElement?.classList.add("w10-sys");
			}
		});
		c.on(Events.RoomMessagesClear, (d) => {
			if (d.roomId !== roomId) return;
			log.innerHTML = "";
			bubbles.clear();
			log.appendChild(emptyHint);
		});
		c.on(Events.TypingStart, (d) => {
			if (d.roomId !== roomId) return;
			markTyping(d.username, true);
		});
		c.on(Events.TypingEnd, (d) => {
			if (d.roomId !== roomId) return;
			markTyping(d.username, false);
		});
		c.on(Events.PresenceUpdate, (d) => {
			sysMsg(`${d.username} is ${d.status}.`);
		});
		c.on(Events.UserJoin, (d) => {
			if (d.roomId !== roomId) return;
			sysMsg(`${d.username} joined.`);
		});
		c.on(Events.UserLeave, (d) => {
			if (d.roomId !== roomId) return;
			sysMsg(`${d.username} left.`);
		});
		c.on(Events.Disconnect, (reason) => {
			setStatus("off", String(reason || "disconnected"));
			sysMsg("Disconnected from QXChat.");
		});
		c.on(Events.Banned, (d) => {
			sysMsg(`Banned: ${d.reason}`);
		});
		c.on(Events.Error, (err) => {
			sysMsg(`Error: ${err?.message || "QXChat error"}`);
			if (!me) setStatus("off", "Login failed");
		});
	}

	async function connect(auth: { token: string } | { user: string; pass: string }): Promise<void> {
		try {
			client?.logout();
		} catch {
			// Already gone.
		}
		client = null;
		const wsUrl = serverInput.value.trim() || QX_DEFAULT_SERVER;
		qxSave(QX_SERVER_KEY, wsUrl);
		const apiBase = qxApiBase(wsUrl);
		setStatus("busy", "Logging in…");
		const c = new SelfbotClient({ wsUrl });
		subscribe(c);
		try {
			if ("token" in auth) await c.login(auth.token);
			else {
				let token = "";
				try {
					token = await SelfbotClient.fetchToken(auth.user, auth.pass, apiBase);
				} catch (err) {
					// The server answers HTTP 200 + ok:false on missing proofs, so the
					// SDK's status-gated auto-challenge never fires — solve it here.
					// Also catch the SDK's own PQC crash (TypeError on Buffer): its
					// solver expects the legacy key format (see demo/qxchallenge.ts).
					const msg = err instanceof Error ? err.message : "";
					if (!/captcha|quota|challenge|vdf|429|Buffer|ArrayBuffer/i.test(msg)) throw err;
					setStatus("busy", "Solving security challenge…");
					await new Promise((r) => setTimeout(r, 30));
					const proofs = await solveLoginChallenge(apiBase, auth.user);
					sysMsg("Challenge solved, retrying login…");
					const res = await fetch(`${apiBase}/api/auth/login`, {
						method: "POST",
						headers: { "content-type": "application/json" },
						body: JSON.stringify({
							username: auth.user.trim().toLowerCase(),
							password: auth.pass,
							vdfChallenge: proofs.vdfChallenge,
							vdfProof: proofs.vdfProof,
							quotaToken: proofs.quotaToken,
							nullifier: proofs.nullifier,
							pqcCiphertext: proofs.pqcCiphertext,
						}),
					});
					const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; token?: string };
					if (!res.ok || data?.ok === false || !data.token) {
						throw new Error(data?.error || `Auth failed: ${res.status}`);
					}
					token = data.token;
				}
				tokenInput.value = token;
				await c.login(token);
			}
			client = c;
			// Events.Ready switches to the room view.
		} catch (err) {
			setStatus("off", "Login failed");
			sysMsg(`Error: ${err instanceof Error ? err.message : "login failed"}`);
		}
	}

	root.append(statusBar, viewConnect, viewRoom, viewChat);
	body.appendChild(root);
}

// ---- App 8 : Paint (paint.exe) ----
const paintApp = desktop.createApp({
	id: "paint",
	label: "Paint",
	appTitle: "Paint — paint.exe",
	appIconHTML: ICON_PHOTO,
	titleHTML: `Paint <span class="w10-credit">paint.exe</span>`,
	width: 980,
	height: 680,
	build: (body) => buildPaintBody(body),
});

// ---- App 9 : Excel (excel.exe) ----
const EXCEL_KEY = "win10ml.excel";
const EX_COLS = 26;
const EX_ROWS = 100;

interface ExCell {
	raw: string;
	bold?: boolean;
	italic?: boolean;
	align?: "" | "l" | "c" | "r";
}

type ExVal =
	| { t: "n"; v: number }
	| { t: "s"; v: string }
	| { t: "b"; v: boolean }
	| { t: "e"; v: string }
	| { t: "arr"; v: ExVal[] }
	| { t: "empty" };

const EX_ERR_DIV = "#DIV/0!";
const EX_ERR_NAME = "#NAME?";
const EX_ERR_VALUE = "#VALUE!";
const EX_ERR_REF = "#REF!";
const EX_ERR_CIRC = "#CIRC!";

function exKey(c: number, r: number): string {
	return `${c}:${r}`;
}

function exColName(i: number): string {
	let n = i + 1;
	let s = "";
	while (n > 0) {
		const m = (n - 1) % 26;
		s = String.fromCharCode(65 + m) + s;
		n = Math.floor((n - 1) / 26);
	}
	return s;
}

function exRefName(c: number, r: number): string {
	return `${exColName(c)}${r + 1}`;
}

/** Parse "B12" (tolerates $) -> {c, r} or null. */
function exParseRef(text: string): { c: number; r: number } | null {
	const m = /^\$?([A-Za-z]{1,3})\$?([0-9]+)$/.exec(text.trim());
	if (!m) return null;
	const letters = m[1].toUpperCase();
	let c = 0;
	for (const ch of letters) c = c * 26 + (ch.charCodeAt(0) - 64);
	c -= 1;
	const r = parseInt(m[2], 10) - 1;
	if (c < 0 || r < 0) return null;
	return { c, r };
}

function exInGrid(c: number, r: number): boolean {
	return c >= 0 && c < EX_COLS && r >= 0 && r < EX_ROWS;
}

function exDisplay(v: ExVal): string {
	switch (v.t) {
		case "n": return String(parseFloat(v.v.toPrecision(10)));
		case "s": return v.v;
		case "b": return v.v ? "TRUE" : "FALSE";
		case "e": return v.v;
		case "arr": return EX_ERR_VALUE;
		case "empty": return "";
	}
}

function exToNumber(v: ExVal): number | null {
	switch (v.t) {
		case "n": return v.v;
		case "b": return v.v ? 1 : 0;
		case "empty": return 0;
		case "s": {
			const t = v.v.trim();
			if (t === "") return null;
			const n = Number(t);
			return Number.isFinite(n) ? n : null;
		}
		default: return null;
	}
}

function exToText(v: ExVal): string | null {
	switch (v.t) {
		case "s": return v.v;
		case "n": return exDisplay(v);
		case "b": return v.v ? "TRUE" : "FALSE";
		case "empty": return "";
		default: return null;
	}
}

function exTruth(v: ExVal): boolean {
	switch (v.t) {
		case "b": return v.v;
		case "n": return v.v !== 0;
		case "s": return v.v.length > 0;
		case "empty": return false;
		default: return false;
	}
}

type ExTok =
	| { t: "num"; v: number }
	| { t: "str"; v: string }
	| { t: "id"; v: string }
	| { t: "ref"; c: number; r: number }
	| { t: "op"; v: string }
	| { t: "lp" } | { t: "rp" } | { t: "comma" } | { t: "colon" } | { t: "eof" };

class ExParseError extends Error {}

function exTokenize(src: string): ExTok[] {
	const out: ExTok[] = [];
	let i = 0;
	const fail = (): never => {
		throw new ExParseError(`cannot tokenize at ${i}`);
	};
	while (i < src.length) {
		const ch = src[i];
		if (ch === " " || ch === "\t" || ch === "\n") {
			i++;
			continue;
		}
		if ((ch >= "0" && ch <= "9") || (ch === "." && i + 1 < src.length && src[i + 1] >= "0" && src[i + 1] <= "9")) {
			let j = i;
			while (j < src.length && ((src[j] >= "0" && src[j] <= "9") || src[j] === ".")) j++;
			if (j < src.length && (src[j] === "e" || src[j] === "E")) {
				let k = j + 1;
				if (src[k] === "+" || src[k] === "-") k++;
				if (k < src.length && src[k] >= "0" && src[k] <= "9") {
					j = k;
					while (j < src.length && src[j] >= "0" && src[j] <= "9") j++;
				}
			}
			out.push({ t: "num", v: parseFloat(src.slice(i, j)) });
			i = j;
			continue;
		}
		if (ch === '"') {
			let j = i + 1;
			let s = "";
			while (j < src.length && src[j] !== '"') {
				if (src[j] === '"' && src[j + 1] === '"') {
					s += '"';
					j += 2;
				} else {
					s += src[j];
					j++;
				}
			}
			if (j >= src.length) fail();
			out.push({ t: "str", v: s });
			i = j + 1;
			continue;
		}
		if ((ch >= "A" && ch <= "Z") || (ch >= "a" && ch <= "z") || ch === "_" || ch === "$") {
			let j = i;
			while (j < src.length && /[A-Za-z0-9_.$]/.test(src[j])) j++;
			const word = src.slice(i, j);
			const ref = exParseRef(word);
			out.push(ref ? { t: "ref", c: ref.c, r: ref.r } : { t: "id", v: word });
			i = j;
			continue;
		}
		const two = src.slice(i, i + 2);
		if (two === "<=" || two === ">=" || two === "<>") {
			out.push({ t: "op", v: two });
			i += 2;
			continue;
		}
		if (ch === "+" || ch === "-" || ch === "*" || ch === "/" || ch === "^" || ch === "%" || ch === "&" || ch === "=" || ch === "<" || ch === ">") {
			out.push({ t: "op", v: ch });
			i++;
			continue;
		}
		if (ch === "(") {
			out.push({ t: "lp" });
			i++;
			continue;
		}
		if (ch === ")") {
			out.push({ t: "rp" });
			i++;
			continue;
		}
		if (ch === ",") {
			out.push({ t: "comma" });
			i++;
			continue;
		}
		if (ch === ":") {
			out.push({ t: "colon" });
			i++;
			continue;
		}
		fail();
	}
	out.push({ t: "eof" });
	return out;
}

interface ExScope {
	lookup: (c: number, r: number) => ExVal;
}

class ExParser {
	private toks: ExTok[];
	private pos = 0;
	private scope: ExScope;

	constructor(src: string, scope: ExScope) {
		this.toks = exTokenize(src);
		this.scope = scope;
	}

	private peek(): ExTok {
		return this.toks[this.pos] ?? { t: "eof" };
	}

	private next(): ExTok {
		const t = this.peek();
		this.pos++;
		return t;
	}

	parse(): ExVal {
		const v = this.parseComparison();
		if (this.peek().t !== "eof") throw new ExParseError("trailing tokens");
		return v;
	}

	private parseComparison(): ExVal {
		let left = this.parseConcat();
		for (;;) {
			const t = this.peek();
			if (t.t !== "op" || (t.v !== "=" && t.v !== "<>" && t.v !== "<" && t.v !== ">" && t.v !== "<=" && t.v !== ">=")) return left;
			this.next();
			const right = this.parseConcat();
			left = exCompare(left, t.v, right);
			if (left.t === "e") return left;
		}
	}

	private parseConcat(): ExVal {
		let left = this.parseAdd();
		for (;;) {
			const t = this.peek();
			if (t.t !== "op" || t.v !== "&") return left;
			this.next();
			const right = this.parseAdd();
			if (left.t === "e") return left;
			if (right.t === "e") return right;
			if (left.t === "arr" || right.t === "arr") return { t: "e", v: EX_ERR_VALUE };
			const a = exToText(left);
			const b = exToText(right);
			if (a === null || b === null) return { t: "e", v: EX_ERR_VALUE };
			left = { t: "s", v: a + b };
		}
	}

	private parseAdd(): ExVal {
		let left = this.parseMul();
		for (;;) {
			const t = this.peek();
			if (t.t !== "op" || (t.v !== "+" && t.v !== "-")) return left;
			this.next();
			const right = this.parseMul();
			left = exArith(left, t.v, right);
			if (left.t === "e") return left;
		}
	}

	private parseMul(): ExVal {
		let left = this.parseUnary();
		for (;;) {
			const t = this.peek();
			if (t.t !== "op" || (t.v !== "*" && t.v !== "/")) return left;
			this.next();
			const right = this.parseUnary();
			left = exArith(left, t.v, right);
			if (left.t === "e") return left;
		}
	}

	private parseUnary(): ExVal {
		const t = this.peek();
		if (t.t === "op" && (t.v === "-" || t.v === "+")) {
			this.next();
			const v = this.parseUnary();
			if (v.t === "e") return v;
			const n = exToNumber(v);
			if (n === null) return { t: "e", v: EX_ERR_VALUE };
			return { t: "n", v: t.v === "-" ? -n : n };
		}
		return this.parsePower();
	}

	private parsePower(): ExVal {
		const base = this.parsePostfix();
		const t = this.peek();
		if (t.t !== "op" || t.v !== "^") return base;
		this.next();
		const exp = this.parseUnary();
		if (base.t === "e") return base;
		if (exp.t === "e") return exp;
		const a = exToNumber(base);
		const b = exToNumber(exp);
		if (a === null || b === null) return { t: "e", v: EX_ERR_VALUE };
		const v = Math.pow(a, b);
		if (!Number.isFinite(v)) return { t: "e", v: EX_ERR_DIV };
		return { t: "n", v };
	}

	private parsePostfix(): ExVal {
		let v = this.parsePrimary();
		for (;;) {
			const t = this.peek();
			if (t.t !== "op" || t.v !== "%") return v;
			this.next();
			if (v.t === "e") return v;
			const n = exToNumber(v);
			if (n === null) return { t: "e", v: EX_ERR_VALUE };
			v = { t: "n", v: n / 100 };
		}
	}

	private parsePrimary(): ExVal {
		const t = this.next();
		switch (t.t) {
			case "num": return { t: "n", v: t.v };
			case "str": return { t: "s", v: t.v };
			case "ref": {
				const after = this.peek();
				if (after.t === "colon") {
					this.next();
					const end = this.next();
					if (end.t !== "ref") throw new ExParseError("range needs A1:B2");
					return this.range(t.c, t.r, end.c, end.r);
				}
				return this.scope.lookup(t.c, t.r);
			}
			case "id": {
				const after = this.peek();
				if (after.t !== "lp") {
					const word = t.v.toUpperCase();
					if (word === "TRUE") return { t: "b", v: true };
					if (word === "FALSE") return { t: "b", v: false };
					throw new ExParseError(`unknown name ${t.v}`);
				}
				this.next();
				const args = this.parseArgs();
				const rp = this.next();
				if (rp.t !== "rp") throw new ExParseError("missing )");
				return exCall(t.v, args);
			}
			case "lp": {
				const v = this.parseComparison();
				if (this.next().t !== "rp") throw new ExParseError("missing )");
				return v;
			}
			default: throw new ExParseError("unexpected token");
		}
	}

	private parseArgs(): ExVal[] {
		const args: ExVal[] = [];
		if (this.peek().t === "rp") return args;
		for (;;) {
			args.push(this.parseComparison());
			const t = this.peek();
			if (t.t === "comma") {
				this.next();
				continue;
			}
			return args;
		}
	}

	private range(c1: number, r1: number, c2: number, r2: number): ExVal {
		if (!exInGrid(c1, r1) || !exInGrid(c2, r2)) return { t: "e", v: EX_ERR_REF };
		const out: ExVal[] = [];
		const c0 = Math.min(c1, c2);
		const c9 = Math.max(c1, c2);
		const q0 = Math.min(r1, r2);
		const q9 = Math.max(r1, r2);
		if ((c9 - c0 + 1) * (q9 - q0 + 1) > 10000) return { t: "e", v: EX_ERR_VALUE };
		for (let r = q0; r <= q9; r++) {
			for (let c = c0; c <= c9; c++) out.push(this.scope.lookup(c, r));
		}
		return { t: "arr", v: out };
	}
}

function exArith(a: ExVal, op: string, b: ExVal): ExVal {
	if (a.t === "e") return a;
	if (b.t === "e") return b;
	if (a.t === "arr" || b.t === "arr") return { t: "e", v: EX_ERR_VALUE };
	const x = exToNumber(a);
	const y = exToNumber(b);
	if (x === null || y === null) return { t: "e", v: EX_ERR_VALUE };
	let v = 0;
	if (op === "+") v = x + y;
	else if (op === "-") v = x - y;
	else if (op === "*") v = x * y;
	else v = y === 0 ? NaN : x / y;
	if (!Number.isFinite(v)) return { t: "e", v: EX_ERR_DIV };
	return { t: "n", v };
}

function exRank(v: ExVal): number {
	if (v.t === "s") return 1;
	if (v.t === "b") return 2;
	return 0;
}

function exCompare(a: ExVal, op: string, b: ExVal): ExVal {
	if (a.t === "e") return a;
	if (b.t === "e") return b;
	if (a.t === "arr" || b.t === "arr") return { t: "e", v: EX_ERR_VALUE };
	const emptyA = a.t === "empty";
	const emptyB = b.t === "empty";
	let eq: boolean;
	if (emptyA || emptyB) {
		const other = emptyA ? b : a;
		const otherIsBlank = other.t === "empty" || (other.t === "n" && other.v === 0) || (other.t === "s" && other.v === "");
		eq = op === "=" ? otherIsBlank : op === "<>" ? !otherIsBlank : false;
		if (op !== "=" && op !== "<>") {
			const n = exToNumber(other);
			if (n === null) return { t: "e", v: EX_ERR_VALUE };
			eq = op === "<" ? 0 < n : op === ">" ? 0 > n : op === "<=" ? 0 <= n : 0 >= n;
		}
		return { t: "b", v: eq };
	}
	if (op === "=" || op === "<>") {
		if (exRank(a) !== exRank(b)) eq = false;
		else if (a.t === "s" && b.t === "s") eq = a.v === b.v;
		else {
			const x = exToNumber(a);
			const y = exToNumber(b);
			eq = x !== null && y !== null && x === y;
		}
		return { t: "b", v: op === "=" ? eq : !eq };
	}
	if (a.t === "s" && b.t === "s") {
		eq = op === "<" ? a.v < b.v : op === ">" ? a.v > b.v : op === "<=" ? a.v <= b.v : a.v >= b.v;
		return { t: "b", v: eq };
	}
	if (exRank(a) !== exRank(b)) {
		// Different type ranks never compare equal: strict and wide agree.
		const r = exRank(a) < exRank(b);
		eq = op === "<" || op === "<=" ? r : !r;
		return { t: "b", v: eq };
	}
	const x = exToNumber(a);
	const y = exToNumber(b);
	if (x === null || y === null) return { t: "e", v: EX_ERR_VALUE };
	eq = op === "<" ? x < y : op === ">" ? x > y : op === "<=" ? x <= y : x >= y;
	return { t: "b", v: eq };
}

function exFlat(args: ExVal[]): ExVal[] {
	const out: ExVal[] = [];
	for (const a of args) {
		if (a.t === "arr") out.push(...a.v);
		else out.push(a);
	}
	return out;
}

function exCall(name: string, args: ExVal[]): ExVal {
	const fn = name.toUpperCase();
	const flat = exFlat(args);
	const nums: number[] = [];
	for (const a of flat) {
		if (a.t === "e") return a;
		if (a.t === "n") nums.push(a.v);
		else if (a.t !== "empty" && (fn === "COUNTA" || fn === "COUNT" || fn === "SUM" || fn === "AVERAGE" || fn === "MIN" || fn === "MAX" || fn === "PRODUCT")) {
			if (a.t === "s" || a.t === "b") continue;
			return { t: "e", v: EX_ERR_VALUE };
		}
	}
	switch (fn) {
		case "SUM": return { t: "n", v: nums.reduce((s, n) => s + n, 0) };
		case "PRODUCT": return { t: "n", v: nums.reduce((s, n) => s * n, 1) };
		case "AVERAGE":
			if (nums.length === 0) return { t: "e", v: EX_ERR_DIV };
			return { t: "n", v: nums.reduce((s, n) => s + n, 0) / nums.length };
		case "MIN": return { t: "n", v: nums.length ? Math.min(...nums) : 0 };
		case "MAX": return { t: "n", v: nums.length ? Math.max(...nums) : 0 };
		case "COUNT": return { t: "n", v: nums.length };
		case "COUNTA": return { t: "n", v: flat.filter((a) => a.t !== "empty").length };
		case "ABS":
		case "INT":
		case "SQRT": {
			if (args.length !== 1 || flat[0]?.t === "arr") return { t: "e", v: EX_ERR_VALUE };
			const one = flat.length === 1 ? exToNumber(flat[0]) : null;
			if (one === null || one === undefined) return { t: "e", v: EX_ERR_VALUE };
			if (fn === "ABS") return { t: "n", v: Math.abs(one) };
			if (fn === "INT") return { t: "n", v: Math.floor(one) };
			if (one < 0) return { t: "e", v: EX_ERR_VALUE };
			return { t: "n", v: Math.sqrt(one) };
		}
		case "ROUND":
		case "MOD":
		case "POWER": {
			if (args.length !== 2) return { t: "e", v: EX_ERR_VALUE };
			const x = exToNumber(flat[0]);
			const y = exToNumber(flat[1]);
			if (x === null || y === null) return { t: "e", v: EX_ERR_VALUE };
			if (fn === "ROUND") {
				const d = Math.trunc(y);
				const f = Math.pow(10, d);
				return { t: "n", v: Math.round(x * f) / f };
			}
			if (fn === "MOD") {
				if (y === 0) return { t: "e", v: EX_ERR_DIV };
				return { t: "n", v: x % y };
			}
			const v = Math.pow(x, y);
			if (!Number.isFinite(v)) return { t: "e", v: EX_ERR_DIV };
			return { t: "n", v };
		}
		case "IF": {
			if (args.length < 2 || args.length > 3) return { t: "e", v: EX_ERR_VALUE };
			return exTruth(args[0]) ? args[1] : (args[2] ?? { t: "b" as const, v: false });
		}
		case "AND": {
			for (const a of args) {
				if (a.t === "e") return a;
				if (a.t === "arr") return { t: "e", v: EX_ERR_VALUE };
			}
			return { t: "b", v: args.every(exTruth) };
		}
		case "OR": {
			for (const a of args) {
				if (a.t === "e") return a;
				if (a.t === "arr") return { t: "e", v: EX_ERR_VALUE };
			}
			return { t: "b", v: args.some(exTruth) };
		}
		case "NOT": {
			if (args.length !== 1 || args[0].t === "arr") return { t: "e", v: EX_ERR_VALUE };
			if (args[0].t === "e") return args[0];
			return { t: "b", v: !exTruth(args[0]) };
		}
		case "LEN":
		case "UPPER":
		case "LOWER":
		case "TRIM": {
			if (args.length !== 1 || args[0].t === "arr") return { t: "e", v: EX_ERR_VALUE };
			const s = exToText(args[0]);
			if (s === null) return { t: "e", v: EX_ERR_VALUE };
			if (fn === "LEN") return { t: "n", v: s.length };
			if (fn === "UPPER") return { t: "s", v: s.toUpperCase() };
			if (fn === "LOWER") return { t: "s", v: s.toLowerCase() };
			return { t: "s", v: s.trim().replace(/\s+/g, " ") };
		}
		case "TODAY":
		case "NOW": {
			if (args.length !== 0) return { t: "e", v: EX_ERR_VALUE };
			const d = new Date();
			return { t: "s", v: fn === "TODAY" ? d.toLocaleDateString() : d.toLocaleString() };
		}
		default: return { t: "e", v: EX_ERR_NAME };
	}
}

function exEvaluateFormula(body: string, scope: ExScope): ExVal {
	try {
		return new ExParser(body, scope).parse();
	} catch (e) {
		if (e instanceof ExParseError) return { t: "e", v: EX_ERR_NAME };
		throw e;
	}
}

const EXCEL_SHEET_KEY = EXCEL_KEY;

function loadExcel(): { cells: [number, number, string, boolean, boolean, string][]; widths: number[] } | null {
	try {
		const raw = localStorage.getItem(EXCEL_SHEET_KEY);
		if (!raw) return null;
		const data = JSON.parse(raw);
		if (!data || !Array.isArray(data.cells)) return null;
		return {
			cells: data.cells.filter((e: unknown[]) => Array.isArray(e)),
			widths: Array.isArray(data.widths) ? data.widths.filter((w: unknown) => typeof w === "number") : [],
		};
	} catch {
		return null;
	}
}

function exDownload(filename: string, text: string, mime: string): void {
	const blob = new Blob([text], { type: mime });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	a.remove();
	setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function exCsvCell(s: string): string {
	return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function exParseCsv(text: string): string[][] {
	const rows: string[][] = [];
	let row: string[] = [];
	let cur = "";
	let quoted = false;
	for (let i = 0; i < text.length; i++) {
		const ch = text[i];
		if (quoted) {
			if (ch === '"') {
				if (text[i + 1] === '"') {
					cur += '"';
					i++;
				} else {
					quoted = false;
				}
			} else {
				cur += ch;
			}
		} else if (ch === '"') {
			quoted = true;
		} else if (ch === ",") {
			row.push(cur);
			cur = "";
		} else if (ch === "\n") {
			row.push(cur);
			rows.push(row);
			row = [];
			cur = "";
		} else if (ch === "\r") {
			continue;
		} else {
			cur += ch;
		}
	}
	row.push(cur);
	rows.push(row);
	while (rows.length > 0 && rows[rows.length - 1].every((c) => c === "")) rows.pop();
	return rows;
}

function exToolButton(html: string, title: string, onClick: () => void): HTMLButtonElement {
	const b = document.createElement("button");
	b.type = "button";
	b.className = "w10-sheet-tool";
	b.innerHTML = html;
	b.title = title;
	b.tabIndex = -1;
	b.onclick = (e) => {
		e.preventDefault();
		onClick();
	};
	return b;
}

function buildExcelBody(body: HTMLDivElement): void {
	body.classList.add("w10-body-flush");
	const root = document.createElement("div");
	root.className = "w10-sheet";

	const cells = new Map<string, ExCell>();
	const widths: number[] = [];
	for (let c = 0; c < EX_COLS; c++) widths.push(96);
	let anchor = { c: 0, r: 0 };
	let focus = { c: 0, r: 0 };

	const saved = loadExcel();
	if (saved) {
		for (const [c, r, raw, b, i, a] of saved.cells) {
			if (typeof c !== "number" || typeof r !== "number" || typeof raw !== "string") continue;
			if (!exInGrid(c, r) || raw === "") continue;
			cells.set(exKey(c, r), {
				raw,
				bold: b === true ? true : undefined,
				italic: i === true ? true : undefined,
				align: a === "l" || a === "c" || a === "r" ? a : undefined,
			});
		}
		for (let c = 0; c < Math.min(saved.widths.length, EX_COLS); c++) {
			const w = saved.widths[c];
			if (w >= 40 && w <= 400) widths[c] = w;
		}
	}

	const persist = (): void => {
		try {
			const arr: [number, number, string, boolean, boolean, string][] = [];
			for (const [k, cell] of cells) {
				const [c, r] = k.split(":").map(Number);
				arr.push([c, r, cell.raw, cell.bold === true, cell.italic === true, cell.align ?? ""]);
			}
			localStorage.setItem(EXCEL_SHEET_KEY, JSON.stringify({ v: 1, cells: arr, widths }));
		} catch {
			// Private mode / file:// — keep it in memory only.
		}
	};

	const bar = document.createElement("div");
	bar.className = "w10-sheet-bar";
	const formularow = document.createElement("div");
	formularow.className = "w10-sheet-formula";
	const namebox = document.createElement("input");
	namebox.className = "w10-sheet-name";
	namebox.value = "A1";
	namebox.spellcheck = false;
	const fx = document.createElement("span");
	fx.className = "w10-sheet-fx";
	fx.textContent = "fx";
	const fxinput = document.createElement("input");
	fxinput.className = "w10-sheet-fxinput";
	fxinput.spellcheck = false;
	formularow.appendChild(namebox);
	formularow.appendChild(fx);
	formularow.appendChild(fxinput);

	const gridwrap = document.createElement("div");
	gridwrap.className = "w10-sheet-gridwrap";
	gridwrap.tabIndex = 0;
	const table = document.createElement("table");
	table.className = "w10-sheet-table";
	const colgroup = document.createElement("colgroup");
	const rowheadCol = document.createElement("col");
	rowheadCol.style.width = "44px";
	colgroup.appendChild(rowheadCol);
	const colEls: HTMLTableColElement[] = [];
	for (let c = 0; c < EX_COLS; c++) {
		const col = document.createElement("col");
		col.style.width = `${widths[c]}px`;
		colgroup.appendChild(col);
		colEls.push(col);
	}
	table.appendChild(colgroup);
	const thead = document.createElement("thead");
	const headrow = document.createElement("tr");
	const corner = document.createElement("th");
	corner.className = "w10-sheet-corner";
	headrow.appendChild(corner);
	const colHeads: HTMLTableCellElement[] = [];
	for (let c = 0; c < EX_COLS; c++) {
		const th = document.createElement("th");
		th.className = "w10-sheet-colhead";
		th.dataset.c = String(c);
		const label = document.createElement("span");
		label.textContent = exColName(c);
		th.appendChild(label);
		const grip = document.createElement("div");
		grip.className = "w10-sheet-resize";
		grip.title = "Resize column";
		th.appendChild(grip);
		headrow.appendChild(th);
		colHeads.push(th);
	}
	thead.appendChild(headrow);
	table.appendChild(thead);
	const tbody = document.createElement("tbody");
	const tds: HTMLTableCellElement[][] = [];
	const rowHeads: HTMLTableCellElement[] = [];
	for (let r = 0; r < EX_ROWS; r++) {
		const tr = document.createElement("tr");
		const rh = document.createElement("th");
		rh.className = "w10-sheet-rowhead";
		rh.textContent = String(r + 1);
		rh.dataset.r = String(r);
		tr.appendChild(rh);
		rowHeads.push(rh);
		const row: HTMLTableCellElement[] = [];
		for (let c = 0; c < EX_COLS; c++) {
			const td = document.createElement("td");
			td.className = "w10-sheet-cell";
			td.dataset.c = String(c);
			td.dataset.r = String(r);
			tr.appendChild(td);
			row.push(td);
		}
		tds.push(row);
		tbody.appendChild(tr);
	}
	table.appendChild(tbody);
	gridwrap.appendChild(table);
	const editor = document.createElement("input");
	editor.className = "w10-sheet-edit";
	editor.style.display = "none";
	editor.spellcheck = false;
	gridwrap.appendChild(editor);

	const status = document.createElement("div");
	status.className = "w10-sheet-status";
	const stats = document.createElement("span");
	const dims = document.createElement("span");
	dims.textContent = `Sheet1 · ${EX_COLS} × ${EX_ROWS}`;
	status.appendChild(stats);
	status.appendChild(dims);

	const getCell = (c: number, r: number): ExCell | undefined => cells.get(exKey(c, r));

	const evalCell = (c: number, r: number, seen: Set<string>): ExVal => {
		if (!exInGrid(c, r)) return { t: "e", v: EX_ERR_REF };
		const k = exKey(c, r);
		if (seen.has(k)) return { t: "e", v: EX_ERR_CIRC };
		const cell = cells.get(k);
		if (!cell || cell.raw === "") return { t: "empty" };
		const raw = cell.raw.trim();
		if (!raw.startsWith("=")) {
			if (/^(true|false)$/i.test(raw)) return { t: "b", v: raw[0].toLowerCase() === "t" };
			if (raw !== "" && Number.isFinite(Number(raw))) return { t: "n", v: Number(raw) };
			return { t: "s", v: cell.raw };
		}
		seen.add(k);
		const v = exEvaluateFormula(raw.slice(1), {
			lookup: (cc, rr) => evalCell(cc, rr, seen),
		});
		seen.delete(k);
		return v;
	};

	const rangeBounds = (): { c0: number; r0: number; c1: number; r1: number } => ({
		c0: Math.min(anchor.c, focus.c),
		r0: Math.min(anchor.r, focus.r),
		c1: Math.max(anchor.c, focus.c),
		r1: Math.max(anchor.r, focus.r),
	});

	const paintSelection = (): void => {
		const b = rangeBounds();
		for (let r = 0; r < EX_ROWS; r++) {
			for (let c = 0; c < EX_COLS; c++) {
				const td = tds[r][c];
				td.classList.toggle("w10-sheet-range", c >= b.c0 && c <= b.c1 && r >= b.r0 && r <= b.r1);
				td.classList.toggle("w10-sheet-active", c === focus.c && r === focus.r);
			}
		}
		for (let c = 0; c < EX_COLS; c++) colHeads[c].classList.toggle("w10-sheet-hl", c >= b.c0 && c <= b.c1);
		for (let r = 0; r < EX_ROWS; r++) rowHeads[r].classList.toggle("w10-sheet-hl", r >= b.r0 && r <= b.r1);
		const active = getCell(focus.c, focus.r);
		namebox.value = exRefName(focus.c, focus.r);
		if (document.activeElement !== fxinput) fxinput.value = active?.raw ?? "";
		paintStatus();
		syncFormatButtons();
	};

	const paintStatus = (): void => {
		const b = rangeBounds();
		let count = 0;
		let sum = 0;
		for (let r = b.r0; r <= b.r1; r++) {
			for (let c = b.c0; c <= b.c1; c++) {
				const v = evalCell(c, r, new Set());
				if (v.t === "n") {
					count++;
					sum += v.v;
				}
			}
		}
		stats.textContent =
			count > 0
				? `Average: ${exDisplay({ t: "n", v: sum / count })}   Count: ${count}   Sum: ${exDisplay({ t: "n", v: sum })}`
				: `Count: ${(b.c1 - b.c0 + 1) * (b.r1 - b.r0 + 1)}`;
	};

	const paintValues = (): void => {
		for (let r = 0; r < EX_ROWS; r++) {
			for (let c = 0; c < EX_COLS; c++) {
				const td = tds[r][c];
				const cell = cells.get(exKey(c, r));
				td.classList.remove("w10-sheet-cellnum", "w10-sheet-bold", "w10-sheet-italic");
				td.style.textAlign = "";
				if (!cell || (cell.raw === "" && !cell.bold && !cell.italic && !cell.align)) {
					td.textContent = "";
					continue;
				}
				const v = evalCell(c, r, new Set());
				td.textContent = exDisplay(v);
				if (v.t === "n") td.classList.add("w10-sheet-cellnum");
				if (cell.bold) td.classList.add("w10-sheet-bold");
				if (cell.italic) td.classList.add("w10-sheet-italic");
				if (cell.align === "l") td.style.textAlign = "left";
				else if (cell.align === "c") td.style.textAlign = "center";
				else if (cell.align === "r") td.style.textAlign = "right";
			}
		}
		paintSelection();
		persist();
	};

	const setRaw = (c: number, r: number, raw: string): void => {
		const k = exKey(c, r);
		if (raw === "") {
			const cur = cells.get(k);
			if (!cur) return;
			if (cur.bold || cur.italic || cur.align) cells.set(k, { ...cur, raw: "" });
			else cells.delete(k);
			return;
		}
		const cur = cells.get(k);
		cells.set(k, { raw, bold: cur?.bold, italic: cur?.italic, align: cur?.align });
	};

	const jumpTo = (c: number, r: number): void => {
		if (!exInGrid(c, r)) return;
		anchor = { c, r };
		focus = { c, r };
		hideEditor();
		paintSelection();
		tds[r][c].scrollIntoView?.({ block: "nearest", inline: "nearest" });
	};

	const offsetIn = (el: HTMLElement, stop: HTMLElement): { x: number; y: number } => {
		let x = 0;
		let y = 0;
		let n: HTMLElement | null = el;
		while (n && n !== stop) {
			x += n.offsetLeft;
			y += n.offsetTop;
			n = n.offsetParent as HTMLElement | null;
		}
		return { x, y };
	};

	const hideEditor = (): void => {
		editor.style.display = "none";
	};

	const editing = (): boolean => editor.style.display !== "none";

	const startEdit = (initial?: string): void => {
		const td = tds[focus.r][focus.c];
		const p = offsetIn(td, gridwrap);
		editor.style.display = "block";
		editor.style.left = `${p.x - 1}px`;
		editor.style.top = `${p.y - 1}px`;
		editor.style.width = `${Math.max(td.offsetWidth + 1, 60)}px`;
		editor.style.height = `${Math.max(td.offsetHeight + 1, 22)}px`;
		const cur = getCell(focus.c, focus.r);
		editor.value = initial ?? cur?.raw ?? "";
		editor.focus();
		if (initial === undefined) editor.select();
	};

	const commitEdit = (move?: { dc: number; dr: number }): void => {
		if (!editing()) return;
		const at = { ...focus };
		setRaw(at.c, at.r, editor.value);
		hideEditor();
		paintValues();
		if (move) {
			const nc = Math.max(0, Math.min(EX_COLS - 1, at.c + move.dc));
			const nr = Math.max(0, Math.min(EX_ROWS - 1, at.r + move.dr));
			anchor = { c: nc, r: nr };
			focus = { c: nc, r: nr };
			paintSelection();
		}
		gridwrap.focus();
	};

	editor.addEventListener("keydown", (e) => {
		e.stopPropagation();
		if (e.key === "Enter") {
			e.preventDefault();
			commitEdit({ dc: 0, dr: e.shiftKey ? -1 : 1 });
		} else if (e.key === "Tab") {
			e.preventDefault();
			commitEdit({ dc: e.shiftKey ? -1 : 1, dr: 0 });
		} else if (e.key === "Escape") {
			e.preventDefault();
			hideEditor();
			gridwrap.focus();
		}
	});
	editor.addEventListener("blur", () => {
		if (editing()) {
			setRaw(focus.c, focus.r, editor.value);
			hideEditor();
			paintValues();
		}
	});

	fxinput.addEventListener("keydown", (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			setRaw(focus.c, focus.r, fxinput.value);
			paintValues();
			gridwrap.focus();
		} else if (e.key === "Escape") {
			e.preventDefault();
			fxinput.value = getCell(focus.c, focus.r)?.raw ?? "";
			gridwrap.focus();
		}
	});

	namebox.addEventListener("keydown", (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			const ref = exParseRef(namebox.value);
			if (ref && exInGrid(ref.c, ref.r)) jumpTo(ref.c, ref.r);
			else namebox.value = exRefName(focus.c, focus.r);
			gridwrap.focus();
		} else if (e.key === "Escape") {
			namebox.value = exRefName(focus.c, focus.r);
			gridwrap.focus();
		}
	});

	const moveFocus = (dc: number, dr: number, extend: boolean): void => {
		if (editing()) {
			commitEdit({ dc, dr });
			return;
		}
		const nc = Math.max(0, Math.min(EX_COLS - 1, focus.c + dc));
		const nr = Math.max(0, Math.min(EX_ROWS - 1, focus.r + dr));
		if (!extend) anchor = { c: nc, r: nr };
		focus = { c: nc, r: nr };
		paintSelection();
		tds[nr][nc].scrollIntoView?.({ block: "nearest", inline: "nearest" });
	};

	const clearRange = (): void => {
		const b = rangeBounds();
		for (let r = b.r0; r <= b.r1; r++) {
			for (let c = b.c0; c <= b.c1; c++) setRaw(c, r, "");
		}
		hideEditor();
		paintValues();
	};

	gridwrap.addEventListener("keydown", (e) => {
		if (e.key === "ArrowUp") {
			e.preventDefault();
			moveFocus(0, -1, e.shiftKey);
		} else if (e.key === "ArrowDown") {
			e.preventDefault();
			moveFocus(0, 1, e.shiftKey);
		} else if (e.key === "ArrowLeft") {
			e.preventDefault();
			moveFocus(-1, 0, e.shiftKey);
		} else if (e.key === "ArrowRight") {
			e.preventDefault();
			moveFocus(1, 0, e.shiftKey);
		} else if (e.key === "Tab") {
			e.preventDefault();
			moveFocus(e.shiftKey ? -1 : 1, 0, false);
		} else if (e.key === "Enter") {
			e.preventDefault();
			moveFocus(0, e.shiftKey ? -1 : 1, false);
		} else if (e.key === "F2") {
			e.preventDefault();
			startEdit();
		} else if (e.key === "Delete" || e.key === "Backspace") {
			e.preventDefault();
			clearRange();
		} else if (e.key === "Escape") {
			anchor = { ...focus };
			paintSelection();
		} else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
			e.preventDefault();
			startEdit(e.key);
		} else if ((e.ctrlKey || e.metaKey) && (e.key === "b" || e.key === "B")) {
			e.preventDefault();
			toggleBold();
		} else if ((e.ctrlKey || e.metaKey) && (e.key === "i" || e.key === "I")) {
			e.preventDefault();
			toggleItalic();
		}
	});

	table.addEventListener("click", (e) => {
		const target = e.target as HTMLElement;
		if (target.closest(".w10-sheet-resize")) return;
		const td = target.closest("td.w10-sheet-cell") as HTMLTableCellElement | null;
		if (td) {
			const c = Number(td.dataset.c);
			const r = Number(td.dataset.r);
			if (e.shiftKey) {
				focus = { c, r };
			} else {
				anchor = { c, r };
				focus = { c, r };
			}
			hideEditor();
			paintSelection();
			gridwrap.focus();
			return;
		}
		const rh = target.closest("th.w10-sheet-rowhead") as HTMLElement | null;
		if (rh) {
			const r = Number(rh.dataset.r);
			anchor = { c: 0, r };
			focus = { c: EX_COLS - 1, r };
			hideEditor();
			paintSelection();
			gridwrap.focus();
			return;
		}
		const ch = target.closest("th.w10-sheet-colhead") as HTMLElement | null;
		if (ch) {
			const c = Number(ch.dataset.c);
			anchor = { c, r: 0 };
			focus = { c, r: EX_ROWS - 1 };
			hideEditor();
			paintSelection();
			gridwrap.focus();
			return;
		}
		if (target.closest("th.w10-sheet-corner")) {
			anchor = { c: 0, r: 0 };
			focus = { c: EX_COLS - 1, r: EX_ROWS - 1 };
			hideEditor();
			paintSelection();
			gridwrap.focus();
		}
	});

	table.addEventListener("dblclick", (e) => {
		const td = (e.target as HTMLElement).closest("td.w10-sheet-cell") as HTMLTableCellElement | null;
		if (!td) return;
		anchor = { c: Number(td.dataset.c), r: Number(td.dataset.r) };
		focus = { ...anchor };
		paintSelection();
		startEdit();
	});

	const applyWidths = (): void => {
		for (let c = 0; c < EX_COLS; c++) colEls[c].style.width = `${widths[c]}px`;
	};

	table.addEventListener("pointerdown", (e) => {
		const grip = (e.target as HTMLElement).closest(".w10-sheet-resize") as HTMLElement | null;
		if (!grip) return;
		const th = grip.parentElement as HTMLElement;
		const c = Number(th.dataset.c);
		const startX = e.clientX;
		const startW = widths[c];
		e.preventDefault();
		const onMove = (ev: PointerEvent): void => {
			widths[c] = Math.max(40, Math.min(400, startW + ev.clientX - startX));
			applyWidths();
		};
		const onUp = (): void => {
			document.removeEventListener("pointermove", onMove);
			document.removeEventListener("pointerup", onUp);
			persist();
		};
		document.addEventListener("pointermove", onMove);
		document.addEventListener("pointerup", onUp);
	});

	const forEachRange = (fn: (cell: ExCell, c: number, r: number) => void): void => {
		const b = rangeBounds();
		for (let r = b.r0; r <= b.r1; r++) {
			for (let c = b.c0; c <= b.c1; c++) {
				const k = exKey(c, r);
				let cell = cells.get(k);
				if (!cell) {
					cell = { raw: "" };
					cells.set(k, cell);
				}
				fn(cell, c, r);
			}
		}
		for (const [k, cell] of cells) {
			if (cell.raw === "" && !cell.bold && !cell.italic && !cell.align) cells.delete(k);
		}
	};

	const toggleBold = (): void => {
		const cur = getCell(focus.c, focus.r)?.bold === true;
		forEachRange((cell) => {
			cell.bold = !cur ? true : undefined;
		});
		hideEditor();
		paintValues();
		gridwrap.focus();
	};

	const toggleItalic = (): void => {
		const cur = getCell(focus.c, focus.r)?.italic === true;
		forEachRange((cell) => {
			cell.italic = !cur ? true : undefined;
		});
		hideEditor();
		paintValues();
		gridwrap.focus();
	};

	const setAlign = (a: "l" | "c" | "r"): void => {
		const cur = getCell(focus.c, focus.r)?.align ?? "";
		forEachRange((cell) => {
			cell.align = cur === a ? undefined : a;
		});
		hideEditor();
		paintValues();
		gridwrap.focus();
	};

	const boldBtn = exToolButton("<b>B</b>", "Bold (Ctrl+B)", toggleBold);
	const italicBtn = exToolButton("<i>I</i>", "Italic (Ctrl+I)", toggleItalic);
	const alignL = exToolButton("&#9776;", "Align left", () => setAlign("l"));
	const alignC = exToolButton("&#9777;", "Align center", () => setAlign("c"));
	const alignR = exToolButton("&#9778;", "Align right", () => setAlign("r"));

	const syncFormatButtons = (): void => {
		const cur = getCell(focus.c, focus.r);
		boldBtn.classList.toggle("w10-on", cur?.bold === true);
		italicBtn.classList.toggle("w10-on", cur?.italic === true);
		const a = cur?.align ?? "";
		alignL.classList.toggle("w10-on", a === "l");
		alignC.classList.toggle("w10-on", a === "c");
		alignR.classList.toggle("w10-on", a === "r");
	};

	const fileInput = document.createElement("input");
	fileInput.type = "file";
	fileInput.accept = ".csv,text/csv,text/plain";
	fileInput.style.display = "none";
	fileInput.addEventListener("change", () => {
		const f = fileInput.files?.[0];
		fileInput.value = "";
		if (!f) return;
		const doImport = (): void => {
			const rd = new FileReader();
			rd.onload = () => {
				const rows = exParseCsv(String(rd.result ?? ""));
				cells.clear();
				for (let r = 0; r < Math.min(rows.length, EX_ROWS); r++) {
					const line = rows[r];
					for (let c = 0; c < Math.min(line.length, EX_COLS); c++) {
						if (line[c] !== "") cells.set(exKey(c, r), { raw: line[c] });
					}
				}
				anchor = { c: 0, r: 0 };
				focus = { c: 0, r: 0 };
				paintValues();
				gridwrap.focus();
			};
			rd.readAsText(f);
		};
		if (cells.size > 0) {
			confirmWin10("Excel", "Replace the current sheet with the CSV?", { yes: "Replace", no: "Cancel" }, { theme: dark ? "dark" : "light" }).then((yes) => {
				if (yes) doImport();
			});
		} else {
			doImport();
		}
	});

	bar.appendChild(w10Button("New", () => {
		if (cells.size === 0) {
			gridwrap.focus();
			return;
		}
		confirmWin10("Excel", "Clear the current sheet?", { yes: "Clear", no: "Cancel" }, { theme: dark ? "dark" : "light" }).then((yes) => {
			if (!yes) return;
			cells.clear();
			anchor = { c: 0, r: 0 };
			focus = { c: 0, r: 0 };
			paintValues();
			gridwrap.focus();
		});
	}, true));
	const importBtn = w10Button("Import", () => fileInput.click(), true);
	bar.appendChild(importBtn);
	bar.appendChild(w10Button("Export", () => {
		let r1 = 0;
		let c1 = 0;
		for (const k of cells.keys()) {
			const [c, r] = k.split(":").map(Number);
			if (c > c1) c1 = c;
			if (r > r1) r1 = r;
		}
		const lines: string[] = [];
		for (let r = 0; r <= r1; r++) {
			const line: string[] = [];
			for (let c = 0; c <= c1; c++) {
				const cell = cells.get(exKey(c, r));
				line.push(cell ? exDisplay(evalCell(c, r, new Set())) : "");
			}
			lines.push(line.map(exCsvCell).join(","));
		}
		exDownload("sheet.csv", lines.join("\n"), "text/csv;charset=utf-8");
	}, true));
	const sep1 = document.createElement("div");
	sep1.className = "w10-sheet-sep";
	bar.appendChild(sep1);
	bar.appendChild(boldBtn);
	bar.appendChild(italicBtn);
	const sep2 = document.createElement("div");
	sep2.className = "w10-sheet-sep";
	bar.appendChild(sep2);
	bar.appendChild(alignL);
	bar.appendChild(alignC);
	bar.appendChild(alignR);
	const sep3 = document.createElement("div");
	sep3.className = "w10-sheet-sep";
	bar.appendChild(sep3);
	bar.appendChild(w10Button("Clear", () => {
		clearRange();
		gridwrap.focus();
	}, true));

	applyWidths();
	root.appendChild(bar);
	root.appendChild(formularow);
	root.appendChild(gridwrap);
	root.appendChild(status);
	root.appendChild(fileInput);
	body.appendChild(root);
	paintValues();
}

const excelApp = desktop.createApp({
	id: "excel",
	label: "Excel",
	appTitle: "Excel — excel.exe",
	appIconHTML: ICON_SHEET,
	titleHTML: `Excel <span class="w10-credit">excel.exe</span>`,
	width: 900,
	height: 620,
	build: (body) => buildExcelBody(body),
});

// ---- App 10 : QxChat (chat-only, qxchat.ts in the browser) ----
const qxchatApp = desktop.createApp({
	id: "qxchat",
	label: "QxChat",
	appTitle: "QxChat — chat",
	appIconHTML: ICON_COMMENT,
	titleHTML: `QxChat <span class="w10-credit">chat</span>`,
	width: 420,
	height: 560,
	build: (body) => buildQxChatBody(body),
});

// ---- Desktop icons (double-click to open) ----
desktop.setDesktopIcons([
	{ id: "about", label: "About", iconHTML: WIN10_LOGO, onOpen: () => about.focus() },
	{ id: "notepad", label: "Notepad", iconHTML: ICON_NOTEPAD, onOpen: () => notepad.focus() },
	{ id: "paint", label: "Paint", iconHTML: ICON_PHOTO, onOpen: () => paintApp.focus() },
	{ id: "qxchat", label: "QxChat", iconHTML: ICON_COMMENT, onOpen: () => qxchatApp.focus() },
	{ id: "excel", label: "Excel", iconHTML: ICON_SHEET, onOpen: () => excelApp.focus() },
	{ id: "settings", label: "Settings", iconHTML: DOWNLOAD_ICON, onOpen: () => settingsApp.focus() },
	{ id: "components", label: "Components", iconHTML: ICON_SETTINGS, onOpen: () => gallery.focus() },
	{ id: "calendar", label: "Calendar", iconHTML: ICON_CALENDAR, onOpen: () => calendarApp.focus() },
	{ id: "widgets", label: "Widgets", iconHTML: ICON_GRID, onOpen: () => widgetsApp.focus() },
]);

	startMenu.registerApp({ id: "about", label: "About", iconHTML: ICON_HELP, onOpen: () => about.focus() });
	startMenu.registerApp({ id: "settings", label: "Settings demo", iconHTML: DOWNLOAD_ICON, onOpen: () => settingsApp.focus() });
	startMenu.registerApp({ id: "components", label: "Components", iconHTML: ICON_SETTINGS, onOpen: () => gallery.focus() });
	startMenu.registerApp({ id: "calendar", label: "Calendar", iconHTML: ICON_CALENDAR, onOpen: () => calendarApp.focus() });
	startMenu.registerApp({ id: "nav", label: "Navigation", iconHTML: ICON_HOME, onOpen: () => navApp.focus() });
	startMenu.registerApp({ id: "widgets", label: "Widgets", iconHTML: ICON_GRID, onOpen: () => widgetsApp.focus() });
	startMenu.registerApp({ id: "notepad", label: "Notepad", iconHTML: ICON_NOTEPAD, onOpen: () => notepad.focus() });
	startMenu.registerApp({ id: "paint", label: "Paint", iconHTML: ICON_PHOTO, onOpen: () => paintApp.focus() });
	startMenu.registerApp({ id: "qxchat", label: "QxChat", iconHTML: ICON_COMMENT, onOpen: () => qxchatApp.focus() });
	startMenu.registerApp({ id: "excel", label: "Excel", iconHTML: ICON_SHEET, onOpen: () => excelApp.focus() });

	console.log("[demo] accent API: desktop.setAccent('#e81123'), desktop.setTheme('dark')");

// ---- Global right-click menu ----
function openDemoMenu(x: number, y: number): void {
	showWin10Menu({
		id: "demo-menu",
		x,
		y,
		dark,
		build: (menu) => {
			menu.appendChild(w10MenuHeader("Demo menu", "win10ml context menu"));
			menu.appendChild(w10Separator());
			const openAbout = w10MenuItem("Open About", "focus the About app");
			openAbout.onclick = () => about.focus();
			menu.appendChild(openAbout);
			const openGallery = w10MenuItem("Open Components", "the new gallery");
			openGallery.onclick = () => gallery.focus();
			menu.appendChild(openGallery);
			const openNotepad = w10MenuItem("Open Notepad", "notepad.exe");
			openNotepad.onclick = () => notepad.focus();
			menu.appendChild(openNotepad);
			const openPaint = w10MenuItem("Open Paint", "paint.exe");
			openPaint.onclick = () => paintApp.focus();
			menu.appendChild(openPaint);
			const openQxChat = w10MenuItem("Open QxChat", "chat");
			openQxChat.onclick = () => qxchatApp.focus();
			menu.appendChild(openQxChat);
			const openExcel = w10MenuItem("Open Excel", "excel.exe");
			openExcel.onclick = () => excelApp.focus();
			menu.appendChild(openExcel);
			menu.appendChild(w10Separator());
			const red = w10MenuItem("Red accent", "broadcast to shell");
			red.onclick = () => desktop.setAccent("#e81123");
			menu.appendChild(red);
			const blue = w10MenuItem("Blue accent", "broadcast to shell");
			blue.onclick = () => desktop.setAccent("#0078d7");
			menu.appendChild(blue);
		},
	});
}

document.addEventListener("contextmenu", (e) => {
	e.preventDefault();
	openDemoMenu(e.clientX, e.clientY);
});
