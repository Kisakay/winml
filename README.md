# win10ml

WinML is a custom window manager framework built in HTML5/JS/CSS for mocking the actual Windows 10 window manager.

Framework-agnostic **Windows 10 desktop HUD for the web**: draggable windows, a taskbar with Start button and pinned apps, context menus, Settings-style controls, calendar, message boxes, Markdown and the official icon pack. **Zero dependencies, pure DOM** — works with vanilla JS, React, Vue, or anything else.

```bash
npm install win10ml
```

```ts
import { createDesktop, WIN10_LOGO, renderMarkdown } from "win10ml";
import "win10ml/style.css";

const desktop = createDesktop({
	start: { iconHTML: WIN10_LOGO, title: "About", onClick: () => about.focus() },
});

const about = desktop.createApp({
	id: "about",
	label: "About",
	titleHTML: `About <span class="w10-credit">my app</span>`,
	width: 420,
	height: 480,
});
about.body.appendChild(renderMarkdown("# Hello\n\nA **Win10 window** on a blank page."));
about.setRunning(true);
about.show();
```

Run the local demo: `npm run build && npm run demo` (http://localhost:8080).
Work on the demo with live rebuild: `npm run dev` (or `bun run dev`, same URL, esbuild watch + serve, no cache).

## API

### `createDesktop(opts): Win10Desktop`

Builds the whole environment: taskbar + window manager + theme broadcast.

| Option      | Type                                 | Description                                                |
| ----------- | ------------------------------------ | ---------------------------------------------------------- |
| `mount`     | `HTMLElement`                        | Where to mount taskbar + windows (default `document.body`) |
| `theme`     | `"light" \| "dark"`                  | Initial theme (default `"light"`)                          |
| `accent`    | `string`                             | Hex accent color, e.g. `#0078d7`                           |
| `start`     | `{ iconHTML, title?, onClick }`      | Start button (Windows logo). Omit for no Start button      |
| `clock`     | `{ onClick?, intervalMs? } \| false` | Taskbar clock. `false` hides it                            |
| `taskbarId` | `string`                             | DOM id of the taskbar (default `"w10-taskbar"`)            |

Desktop methods: `createApp`, `getApp`, `setTheme`, `setAccent` (broadcast to every window + attached Start menu), `setStatus(html | null)` (taskbar status text), `setStartOpen`, `attachStartMenu(menu)` (sync a standalone Start menu with the shell theme/accent), `destroy`.

### `desktop.createApp(opts): DesktopApp`

| Option         | Type                  | Description                                            |
| -------------- | --------------------- | ------------------------------------------------------ |
| `id`           | `string`              | Unique id (taskbar button + window)                    |
| `label`        | `string`              | Taskbar button label                                   |
| `appTitle`     | `string`              | Taskbar tooltip (default = label)                      |
| `appIconHTML`  | `string`              | Taskbar icon HTML (SVG string, see icon pack)          |
| `titleHTML`    | `string`              | Window title HTML                                      |
| `avatarUrl`    | `string`              | Small avatar left of the title                         |
| `width/height` | `number`              | Initial size (default 520×560)                         |
| `x/y`          | `number \| null`      | Initial position (default centered)                    |
| `closeMode`    | `"hide" \| "destroy"` | Close button behavior (default `"hide"`)               |
| `onGeometry`   | `(geom) => void`      | Persist position/size after drag/resize                |
| `onDestroy`    | `() => void`          | Cleanup hook                                           |

App methods: `show`, `hide`, `toggle`, `focus` (show + bring to front), `minimize`, `close`, `setRunning` (accent underline in taskbar), `setAppTitle`, `destroy`, plus `window`, `body`, `isOpen`, `isRunning`.

### Application-driven windows

Every window is guided by a `Win10Application`: single-instance launch, lazy content build, focus/z-order, minimize, close modes, taskbar sync and Start menu registration.

```ts
import { Win10Application, Win10Taskbar, Win10StartMenu } from "win10ml";

const app = new Win10Application({
	id: "main",
	label: "My app",
	titleHTML: "My app",
	iconHTML: MY_ICON,
	taskbar, // auto-created button, synced, toggles the app
	startMenu, // auto-registered entry
	build: (body) => body.append(...), // lazy, once — rebuild() to refresh
	onLaunch: () => console.log("launched"),
});
app.launch(); // show + focus + running (no duplicate if already open)
```

### À-la-carte classes

- `Win10Window` — standalone window (drag/resize/min/max/close, `addNav`, `applyGeometry`, `setTheme`, `setAccent`, localized `chrome` labels).
- `Win10Taskbar` — standalone taskbar (`addStartButton`, `addApp`, `setAppState`, `setStatus`, `startClock`). Owns the Win10 display policy: pinned apps stay visible when closed, minimized windows keep their button, unpinned + idle apps hide; right-click offers Pin/Unpin (`pinned`, `pinnable`, `pinTitle`/`unpinTitle`, `onPinChange`, `setPinned`/`isPinned`, `minimized` in `setAppState`).
- `Win10StartMenu` — classic Start menu flyout: live search, app list + accent tiles, configurable footer (user/settings/power). Apps register dynamically:

```ts
import { Win10StartMenu } from "win10ml";

const menu = new Win10StartMenu({
	searchPlaceholder: "Type here to search",
	footer: {
		user: { avatarUrl: "https://github.com/me.png", name: "Me", onClick: openProfile },
		settings: { onClick: openSettings },
		power: { onClick: hideAll },
	},
});
menu.registerApp({ id: "main", label: "My app", iconHTML: MY_ICON, onOpen: () => app.focus() });
startButton.onclick = () => menu.toggle();
```
- Controls: `w10Button`, `w10Toggle` (checkbox), `w10Switch` (toggle switch), `w10RadioGroup`, `w10TextRow`, `w10TextareaRow`, `w10ComboRow`, `w10Slider`, `w10Progress` (determinate + indeterminate), `w10ListItem`, `w10Hero`, `w10GroupTitle`, `w10Desc`, `w10Divider`.
- Widgets batch 2: `w10Expander`, `w10Pivot`, `w10InfoBar` (info/success/warning/error), `w10Avatar` (PersonPicture), `w10Badge`, `w10SearchBox`, `w10NumberRow` (spinbox), `w10PasswordRow` (reveal), `w10Tile` (small/medium/wide/large), `w10CommandBar`, `w10Tree`, `w10Table` (DetailsList), `w10Rating`, `w10Breadcrumb`, `showW10Flyout`, `w10Segmented`, `w10ColorGrid`, `w10EmptyState`, `w10Spinner` (ProgressRing), `w10Link`, `w10WithTooltip`.
- `w10Calendar` — month grid + nav + today footer + date picking (`setTheme` follows later theme switches).
- MessageBox: `showWin10MsgBox`, `confirmWin10` (official system icons, modal, Enter/Escape).
- Menus: `showWin10Menu`, `w10MenuItem`, `w10MenuHeader`, `w10Separator`, `closeWin10Menu`.
- `renderMarkdown(md)` — `#/##/###`, `**bold**`, `*italic*`, `` `code` ``, `[text](url)`, `- lists`, `---`.

### Official icon pack

Win10 logo, ~120 Segoe MDL2 glyphs (back/forward, chevrons, arrows, check/plus/minus, play/pause/stop/skip/repeat/shuffle, volume/mute, music/video/photo/camera/mic, search/zoom, refresh/update, save, trash, edit, copy/paste/cut, folder/file (+open/new/add), home, star/favorite, heart, like/dislike, user/contact/group, lock/key, calendar, clock/history, mail/phone/comment, share/send/link/attach, shield, power, wifi/ethernet/bluetooth, battery, settings, globe/location/map/compass, info/warn/error/success, bell, pin/unpin, menu/more/list/grid/dashboard/taskview, sort/filter, print/scan, cloud/upload, calculator/notepad/terminal/code/bug, gift/trophy/gamepad/cart, keyboard/mouse/monitor/laptop/tablet/tv/headphones, moon/sun, cortana…), caption glyphs, `INFO_ICON`, and the 32px system icons `MSGBOX_INFO/WARNING/ERROR/QUESTION`. All inline SVG, `currentColor` where it makes sense (accent-tinted), zero network. Dynamic lookup via `ICONS` / `getWin10Icon(name)` / `w10Icon(name)` (`Win10IconName`).

## Stylesheet

```ts
import "win10ml/style.css";
```

Self-contained, every rule scoped to `.w10-*` — no global resets, no element selectors. Accent via `--w10-accent`, dark mode via `.w10-dark`.

## Build outputs

`dist/index.js` (ESM), `dist/index.cjs` (CJS), `dist/index.d.ts` (types), `dist/win10-shell.css`.

## License

GPL-3.0-only.
