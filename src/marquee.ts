// Windows 10 desktop marquee (rubber-band) selection: dragging on the empty
// desktop draws the translucent blue rectangle; on release, intersecting
// desktop icons are selected (ctrl+drag adds to the current selection,
// Escape cancels). Owned by createDesktop() or standalone:
//
//   const marquee = new Win10Marquee({ mount: document.body, icons });
//
// Pure DOM, zero dependencies. The rectangle follows the accent color.

import type { Win10DesktopIcons } from "./desktopicons.js";

export interface MarqueeRect {
	/** Viewport coordinates (the rectangle is position:fixed). */
	x: number;
	y: number;
	w: number;
	h: number;
}

export interface Win10MarqueeOptions {
	/** Where to paint the rectangle (defaults to document.body). */
	mount?: HTMLElement;
	/** Desktop icons to select on release (optional: rect only + onDone). */
	icons?: Win10DesktopIcons | null;
	/** Initial accent color (follows setAccent afterwards). */
	accent?: string;
	/** False to construct idle (default true). */
	enabled?: boolean;
	/** Drag distance in px before the rectangle appears (default 4). */
	threshold?: number;
	/** Fired on release when a rectangle was drawn. */
	onDone?: (ids: string[], rect: MarqueeRect) => void;
}

// Shell chrome + interactive elements never start a marquee drag.
const DEAD_SELECTOR =
	".w10-win, .w10-taskbar, .w10-startmenu, .w10-menu, .w10-flyout, " +
	".w10-msgbox-overlay, .w10-dicon, .w10-cal, " +
	"a, button, input, select, textarea, [contenteditable]";

export class Win10Marquee {
	private mount: HTMLElement;
	private icons: Win10DesktopIcons | null;
	private enabled: boolean;
	private threshold: number;
	private onDone?: (ids: string[], rect: MarqueeRect) => void;
	private rect: HTMLDivElement;
	private rectShown = false;
	private drag: { x0: number; y0: number; additive: boolean; snapshot: string[] } | null = null;
	private downName: string;
	private moveName: string;
	private upName: string;

	constructor(opts: Win10MarqueeOptions = {}) {
		this.mount = opts.mount ?? document.body;
		this.icons = opts.icons ?? null;
		this.enabled = opts.enabled ?? true;
		this.threshold = opts.threshold ?? 4;
		this.onDone = opts.onDone;

		const rect = document.createElement("div");
		rect.className = "w10-marquee";
		rect.style.display = "none";
		rect.setAttribute("aria-hidden", "true");
		this.mount.appendChild(rect);
		this.rect = rect;
		if (opts.accent !== undefined) this.setAccent(opts.accent);

		// Pointer events where available, mouse fallback (old engines, jsdom).
		const hasPointer =
			typeof window !== "undefined" &&
			typeof (window as unknown as { PointerEvent?: unknown }).PointerEvent !== "undefined";
		this.downName = hasPointer ? "pointerdown" : "mousedown";
		this.moveName = hasPointer ? "pointermove" : "mousemove";
		this.upName = hasPointer ? "pointerup" : "mouseup";

		// Capture phase: snapshot the selection before the icons layer
		// clears it on background pointerdown (bubble phase).
		this.listen(this.downName, this.onDown, true);
	}

	/** True while a marquee drag (past threshold) is being drawn. */
	get active(): boolean {
		return this.rectShown;
	}

	setEnabled(enabled: boolean): void {
		this.enabled = enabled;
		if (!enabled) this.cancel();
	}

	setAccent(accent: string): void {
		if (!/^#[0-9a-fA-F]{6}$/.test(accent)) return;
		this.rect.style.setProperty("--w10-accent", accent);
	}

	destroy(): void {
		this.cancel();
		this.unlisten(this.downName, this.onDown, true);
		this.rect.remove();
		this.onDone = undefined;
		this.icons = null;
	}

	private listen(name: string, fn: (e: PointerEvent | MouseEvent) => void, capture = false): void {
		document.addEventListener(name, fn as EventListener, capture);
	}

	private unlisten(name: string, fn: (e: PointerEvent | MouseEvent) => void, capture = false): void {
		document.removeEventListener(name, fn as EventListener, capture);
	}

	private onDown = (e: PointerEvent | MouseEvent): void => {
		if (!this.enabled || this.drag) return;
		if (e.button !== 0) return;
		const target = e.target as Element | null;
		if (!target || typeof target.closest !== "function") return;
		if (target.closest(DEAD_SELECTOR)) return;
		const additive = e.ctrlKey || e.metaKey;
		// Keep the current selection for a ctrl+drag union: stop the icons
		// layer bubble listener from clearing it. Plain clicks still propagate.
		if (additive) e.stopPropagation();
		this.drag = { x0: e.clientX, y0: e.clientY, additive, snapshot: this.icons?.selectedIds ?? [] };
		this.listen(this.moveName, this.onMove);
		this.listen(this.upName, this.onUp);
		document.addEventListener("keydown", this.onKey);
	};

	private onMove = (e: PointerEvent | MouseEvent): void => {
		const drag = this.drag;
		if (!drag) return;
		if (!this.rectShown && Math.hypot(e.clientX - drag.x0, e.clientY - drag.y0) < this.threshold) return;
		e.preventDefault();
		this.rectShown = true;
		document.body.classList.add("w10-marquee-on");
		this.paint(this.geometry(e.clientX, e.clientY));
	};

	private onUp = (e: PointerEvent | MouseEvent): void => {
		const drag = this.drag;
		if (!drag) return;
		this.unhook();
		if (!this.rectShown) {
			this.drag = null;
			return;
		}
		const rect = this.geometry(e.clientX, e.clientY);
		this.hide();
		this.drag = null;
		const hit = this.icons?.hitTest(rect) ?? [];
		const additive = drag.additive || e.ctrlKey || e.metaKey;
		const ids = additive ? [...new Set([...drag.snapshot, ...hit])] : hit;
		this.icons?.selectMany(ids);
		this.onDone?.(ids, rect);
	};

	private onKey = (e: KeyboardEvent): void => {
		if (e.key === "Escape") this.cancel();
	};

	/** Abort the drag, restoring the pre-drag selection. */
	private cancel(): void {
		const drag = this.drag;
		const wasShown = this.rectShown;
		this.unhook();
		this.hide();
		this.drag = null;
		if (drag && wasShown) this.icons?.selectMany(drag.snapshot);
	}

	private unhook(): void {
		this.unlisten(this.moveName, this.onMove);
		this.unlisten(this.upName, this.onUp);
		document.removeEventListener("keydown", this.onKey);
		document.body.classList.remove("w10-marquee-on");
	}

	private hide(): void {
		this.rectShown = false;
		this.rect.style.display = "none";
	}

	private geometry(x1: number, y1: number): MarqueeRect {
		const drag = this.drag as { x0: number; y0: number };
		return {
			x: Math.min(drag.x0, x1),
			y: Math.min(drag.y0, y1),
			w: Math.abs(x1 - drag.x0),
			h: Math.abs(y1 - drag.y0),
		};
	}

	private paint(r: MarqueeRect): void {
		this.rect.style.display = "block";
		this.rect.style.left = `${r.x}px`;
		this.rect.style.top = `${r.y}px`;
		this.rect.style.width = `${r.w}px`;
		this.rect.style.height = `${r.h}px`;
	}
}
