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
				paintApp.minimize();
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
	tabs.append(fileTab, homeTab, viewTab);

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
				closeText(true);
			}
		});
		ta.addEventListener("blur", () => closeText(true));
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
		if (floating) {
			if (!floating.cut) {
				ctx.save();
				ctx.fillStyle = color2;
				ctx.fillRect(floating.ox, floating.oy, floating.cv.width, floating.cv.height);
				ctx.restore();
			}
			floating = null;
		} else if (sel) {
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
	function doDelete(): void {
		if (floating) {
			if (!floating.cut) {
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
			commitFloatingSilent();
			closeText(false);
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
		for (const el of Array.from(ribbon.querySelectorAll('[data-clip="paste"]'))) {
			(el as HTMLButtonElement).disabled = clip === null;
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
		const pasteBtn = paction("Paste", ICON_PASTE, "Paste (Ctrl+V)", doPaste);
		pasteBtn.dataset.clip = "paste";
		clipG.appendChild(pasteBtn);
		clipG.appendChild(paction("Cut", ICON_CUT, "Cut (Ctrl+X)", doCut));
		clipG.appendChild(paction("Copy", ICON_COPY, "Copy (Ctrl+C)", doCopy));
		// Image
		const imgG = pgroup("Image");
		imgG.appendChild(ptool("select", "Select", P_SELECT, "Rectangular selection"));
		imgG.appendChild(paction("Crop", P_CROP, "Crop to selection", () => {
			const box = floating
				? { x: floating.x, y: floating.y, w: floating.cv.width, h: floating.cv.height }
				: sel;
			commitFloating();
			closeText(true);
			if (!box || box.w < 2 || box.h < 2) return;
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
		imgG.appendChild(paction("↺", `<span class="w10-ptool-glyph">↺</span>`, "Rotate left 90°", () => rotateCanvas(-1)));
		imgG.appendChild(paction("↻", `<span class="w10-ptool-glyph">↻</span>`, "Rotate right 90°", () => rotateCanvas(1)));
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
		if (mod && e.key.toLowerCase() === "c") {
			e.preventDefault();
			doCopy();
		} else if (mod && e.key.toLowerCase() === "x") {
			e.preventDefault();
			doCut();
		} else if (mod && e.key.toLowerCase() === "v") {
			e.preventDefault();
			doPaste();
		} else if (mod && e.key.toLowerCase() === "a") {
			e.preventDefault();
			commitFloating();
			closeText(true);
			sel = { x: 0, y: 0, w: W, h: H };
			ensureAnts();
			drawOverlay();
		} else if (mod && e.key.toLowerCase() === "s") {
			e.preventDefault();
			doSave();
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

// ---- Desktop icons (double-click to open) ----
desktop.setDesktopIcons([
	{ id: "about", label: "About", iconHTML: WIN10_LOGO, onOpen: () => about.focus() },
	{ id: "notepad", label: "Notepad", iconHTML: ICON_NOTEPAD, onOpen: () => notepad.focus() },
	{ id: "paint", label: "Paint", iconHTML: ICON_PHOTO, onOpen: () => paintApp.focus() },
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
