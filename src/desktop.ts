// Full Windows 10 desktop environment: taskbar + window manager + theme.
// One call gives any web app the whole HUD:
//
//   const desktop = createDesktop({ start: { icon: WIN10_LOGO, onClick: ... } });
//   const app = desktop.createApp({ id: "main", label: "My app", title: "..." });
//   app.body.append(...);
//   app.show();
//
// Pure DOM, zero dependencies, framework-agnostic (React, Vue, vanilla...).

import { Win10Application } from "./application.js";
import { Win10StartMenu } from "./startmenu.js";
import { Win10Taskbar } from "./taskbar.js";
import { Win10Window, type Win10Geometry, type Win10Theme, type Win10WindowOptions } from "./window.js";

export const DEFAULT_ACCENT = "#0078d7";

export interface DesktopStartOptions {
	iconHTML: string;
	title?: string;
	onClick: () => void;
}

export interface DesktopClockOptions {
	onClick?: () => void;
	intervalMs?: number;
}

export interface DesktopOptions {
	/** Where to mount taskbar + windows. Defaults to document.body. */
	mount?: HTMLElement;
	taskbarId?: string;
	theme?: Win10Theme;
	accent?: string;
	start?: DesktopStartOptions;
	/** Set to false to hide the clock. */
	clock?: DesktopClockOptions | false;
}

export interface DesktopAppOptions extends Omit<Win10WindowOptions, "onClose" | "onMinimize" | "id"> {
	id: string;
	/** Label shown in the taskbar app button. */
	label: string;
	/** Tooltip of the taskbar app button. Defaults to label. */
	appTitle?: string;
	/** Icon HTML for the taskbar app button. */
	appIconHTML?: string;
	/** Auto-register in a Start menu (driven by the application). */
	startMenu?: Win10StartMenu;
	/** "hide" keeps the window for re-show (default), "destroy" removes it. */
	closeMode?: "hide" | "destroy";
	/** Build the window content lazily on first launch. */
	build?: (body: HTMLDivElement, app: Win10Application) => void;
	/** Called when the app is destroyed (close in destroy mode / desktop.destroy). */
	onDestroy?: (app: Win10Application) => void;
}

export interface DesktopApp {
	readonly id: string;
	readonly window: Win10Window;
	readonly body: HTMLDivElement;
	readonly isOpen: boolean;
	readonly isRunning: boolean;
	show: () => void;
	hide: () => void;
	toggle: () => void;
	focus: () => void;
	minimize: () => void;
	close: () => void;
	setRunning: (running: boolean) => void;
	setAppTitle: (title: string) => void;
	destroy: () => void;
}

export interface Win10Desktop {
	readonly taskbar: Win10Taskbar;
	readonly theme: Win10Theme;
	readonly accent: string;
	createApp: (opts: DesktopAppOptions) => DesktopApp;
	getApp: (id: string) => DesktopApp | undefined;
	setTheme: (theme: Win10Theme) => void;
	setAccent: (accent: string) => void;
	setStatus: (html: string | null) => void;
	setStartOpen: (open: boolean) => void;
	destroy: () => void;
}

export function isValidAccent(v: string): boolean {
	return /^#[0-9a-fA-F]{6}$/.test(v);
}

export function createDesktop(opts: DesktopOptions = {}): Win10Desktop {
	const mount = opts.mount ?? document.body;
	let theme: Win10Theme = opts.theme ?? "light";
	let accent = opts.accent ?? DEFAULT_ACCENT;
	let destroyed = false;
	const apps = new Map<string, DesktopApp>();

	const taskbar = new Win10Taskbar(opts.taskbarId ?? "w10-taskbar");
	if (opts.start) {
		taskbar.addStartButton({
			iconHTML: opts.start.iconHTML,
			title: opts.start.title ?? "Start",
			onClick: opts.start.onClick,
		});
	}
	if (opts.clock !== false) {
		if (opts.clock?.onClick) taskbar.onClockClick(opts.clock.onClick);
		taskbar.startClock(undefined, opts.clock?.intervalMs ?? 10000);
	}
	taskbar.mount(mount);
	taskbar.setAccent(accent);

	const syncAll = (focusedId?: string) => {
		for (const [otherId, other] of apps) {
			if (otherId !== focusedId) taskbar.setAppState(otherId, { running: other.isRunning, open: other.isOpen });
		}
	};

	const desktop: Win10Desktop = {
		taskbar,
		get theme() {
			return theme;
		},
		get accent() {
			return accent;
		},

		createApp(appOpts: DesktopAppOptions): DesktopApp {
			if (destroyed) throw new Error("Desktop is destroyed");
			desktop.getApp(appOpts.id)?.destroy();

			// The window is guided by its application (lifecycle, taskbar, menu)
			const guided = new Win10Application({
				...appOpts,
				titleHTML: appOpts.titleHTML,
				taskbar,
				mount,
				onFocus: () => syncAll(appOpts.id),
				onDestroy: (a) => {
					apps.delete(appOpts.id);
					appOpts.onDestroy?.(a);
				},
			});
			guided.setTheme(theme);
			guided.setAccent(accent);

			const app: DesktopApp = {
				id: guided.id,
				window: guided.window,
				body: guided.body,
				get isOpen() {
					return guided.isOpen;
				},
				get isRunning() {
					return guided.isRunning;
				},
				show: () => guided.show(),
				hide: () => guided.hide(),
				toggle: () => guided.toggle(),
				focus: () => guided.focus(),
				minimize: () => guided.minimize(),
				close: () => guided.close(),
				setRunning: (v: boolean) => guided.setRunning(v),
				setAppTitle: (title: string) => guided.setAppTitle(title),
				destroy: () => guided.destroy(),
			};
			apps.set(appOpts.id, app);
			return app;
		},

		getApp: (id: string) => apps.get(id),

		setTheme: (t: Win10Theme) => {
			theme = t;
			for (const app of apps.values()) app.window.setTheme(t);
		},

		setAccent: (a: string) => {
			if (!isValidAccent(a)) return;
			accent = a;
			taskbar.setAccent(a);
			for (const app of apps.values()) app.window.setAccent(a);
		},

		setStatus: (html: string | null) => {
			taskbar.setStatus(html);
		},

		setStartOpen: (open: boolean) => {
			taskbar.setStartOpen(open);
		},

		destroy: () => {
			if (destroyed) return;
			destroyed = true;
			for (const app of [...apps.values()]) app.destroy();
			taskbar.destroy();
		},
	};

	return desktop;
}

export type { Win10Geometry, Win10Theme };
