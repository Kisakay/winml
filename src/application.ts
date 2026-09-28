// Win10 application: every window is guided by its application.
// The app owns one window and drives its whole lifecycle — lazy content
// build, single-instance launch, focus/z-order, minimize, close modes,
// taskbar button sync and Start menu registration.
//
//   const app = new Win10Application({
//     id: "main", label: "My app", titleHTML: "My app",
//     iconHTML: MY_ICON, taskbar, startMenu,
//     build: (body) => body.append(...),
//   });
//   app.launch();
//
// Pure DOM, zero dependencies. Works standalone or inside a Win10Desktop.

import { Win10StartMenu } from "./startmenu.js";
import { Win10Taskbar } from "./taskbar.js";
import { Win10Window, type Win10Theme, type Win10WindowOptions } from "./window.js";

/** Shared z-order counter so standalone apps focus above each other. */
let zTop = 10000;

export interface Win10ApplicationOptions extends Omit<Win10WindowOptions, "onClose" | "onMinimize" | "id"> {
	id: string;
	/** Label for the taskbar button + Start menu entry. */
	label: string;
	/** Tooltip of the taskbar button (defaults to label). */
	appTitle?: string;
	/** Icon HTML for the taskbar button + Start menu entry. */
	appIconHTML?: string;
	/** Bind a taskbar button (auto-created, synced, toggles the app). */
	taskbar?: Win10Taskbar;
	/** Auto-register in a Start menu (removed on destroy). */
	startMenu?: Win10StartMenu;
	/** Where to mount the window (defaults to document.body). */
	mount?: HTMLElement;
	/** "hide" keeps the window for re-show (default), "destroy" removes it. */
	closeMode?: "hide" | "destroy";
	/** Build the window content lazily on first launch. */
	build?: (body: HTMLDivElement, app: Win10Application) => void;
	onLaunch?: (app: Win10Application) => void;
	onFocus?: (app: Win10Application) => void;
	onMinimize?: (app: Win10Application) => void;
	onClose?: (app: Win10Application) => void;
	onDestroy?: (app: Win10Application) => void;
}

export class Win10Application {
	readonly id: string;
	readonly window: Win10Window;
	private opts: Win10ApplicationOptions;
	private running = false;
	private built = false;
	private destroyed = false;
	private onPointerDown: ((ev: PointerEvent) => void) | null = null;

	constructor(opts: Win10ApplicationOptions) {
		this.opts = opts;
		this.id = opts.id;

		const win = new Win10Window({
			...opts,
			titleHTML: opts.titleHTML,
			onClose: () => this.close(),
			onMinimize: () => this.minimize(),
		});
		this.window = win;
		(opts.mount ?? document.body).appendChild(win.el);

		if (opts.taskbar) {
			opts.taskbar.addApp({
				id: opts.id,
				iconHTML: opts.appIconHTML ?? "",
				label: opts.label,
				title: opts.appTitle ?? opts.label,
				onClick: () => this.toggle(),
			});
		}
		if (opts.startMenu) {
			opts.startMenu.registerApp({
				id: opts.id,
				label: opts.label,
				iconHTML: opts.appIconHTML ?? "",
				onOpen: () => this.launch(),
			});
		}

		this.onPointerDown = () => this.focus();
		win.el.addEventListener("pointerdown", this.onPointerDown);
		this.sync();
	}

	get body(): HTMLDivElement {
		return this.window.body;
	}

	get isOpen(): boolean {
		return !this.destroyed && this.window.shown;
	}

	get isRunning(): boolean {
		return this.running && !this.destroyed;
	}

	/** Launch the app: build content once, show, focus, mark running. Single-instance. */
	launch(): void {
		if (this.destroyed) return;
		if (!this.built) {
			this.built = true;
			this.opts.build?.(this.window.body, this);
		}
		this.running = true;
		this.window.show();
		this.bringToFront();
		this.sync();
		this.opts.onLaunch?.(this);
	}

	/** Re-run the build function (e.g. language change) without touching state. */
	rebuild(): void {
		if (this.destroyed || !this.built) return;
		this.window.body.innerHTML = "";
		this.opts.build?.(this.window.body, this);
	}

	show(): void {
		if (this.destroyed) return;
		this.window.show();
		this.bringToFront();
		this.sync();
	}

	hide(): void {
		if (this.destroyed) return;
		this.window.hide();
		this.sync();
	}

	toggle(): void {
		if (this.destroyed) return;
		if (this.window.shown) {
			this.window.hide();
			this.sync();
		} else {
			this.launch();
		}
	}

	focus(): void {
		if (this.destroyed) return;
		if (!this.window.shown) this.window.show();
		this.bringToFront();
		this.sync();
		this.opts.onFocus?.(this);
	}

	minimize(): void {
		if (this.destroyed) return;
		this.window.hide();
		this.sync();
		this.opts.onMinimize?.(this);
	}

	close(): void {
		if (this.destroyed) return;
		if (this.opts.closeMode === "destroy") {
			this.destroy();
			return;
		}
		this.window.hide();
		this.sync();
		this.opts.onClose?.(this);
	}

	setRunning(running: boolean): void {
		this.running = running;
		this.sync();
	}

	setTitle(titleHTML: string): void {
		this.window.setTitleHTML(titleHTML);
	}

	setAppTitle(title: string): void {
		this.opts.taskbar?.setAppTitle(this.id, title);
	}

	setTheme(theme: Win10Theme): void {
		this.window.setTheme(theme);
	}

	setAccent(accent: string): void {
		this.window.setAccent(accent);
	}

	destroy(): void {
		if (this.destroyed) return;
		this.destroyed = true;
		if (this.onPointerDown) this.window.el.removeEventListener("pointerdown", this.onPointerDown);
		this.onPointerDown = null;
		this.opts.taskbar?.removeApp(this.id);
		this.opts.startMenu?.unregisterApp(this.id);
		this.window.destroy();
		this.opts.onDestroy?.(this);
	}

	private bringToFront(): void {
		this.window.setZIndex(++zTop);
	}

	private sync(): void {
		this.opts.taskbar?.setAppState(this.id, { running: this.isRunning, open: this.isOpen });
	}
}
