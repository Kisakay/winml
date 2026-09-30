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
	ICON_PIN,
	ICON_PLAY,
	ICON_PRINT,
	ICON_REFRESH,
	ICON_SAVE,
	ICON_SEARCH,
	ICON_SEND,
	ICON_SETTINGS,
	ICON_SHARE,
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
		"# win10ml demo\n\nA full **Windows 10 HUD** running on a blank page — no Tidal, no React, no dependency.\n\n- Drag windows by their titlebar, double-click to maximize\n- Apps live in the taskbar with an **accent underline** while running\n- **Right-click a taskbar button to pin/unpin it**: pinned apps stay when closed, minimized windows keep their button, unpinned + idle apps hide\n- Right-click anywhere for a Win10 context menu\n\n---\nBuilt with `createDesktop()` from `win10ml`.",
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

// ---- Desktop icons (double-click to open) ----
desktop.setDesktopIcons([
	{ id: "about", label: "About", iconHTML: WIN10_LOGO, onOpen: () => about.focus() },
	{ id: "notepad", label: "Notepad", iconHTML: ICON_NOTEPAD, onOpen: () => notepad.focus() },
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
