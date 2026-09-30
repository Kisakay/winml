// Windows 10 desktop icons (shortcuts): single-click select, double-click
// (or Enter) to open. Pure DOM, zero dependencies. Owned by createDesktop()
// or standalone:
//
//   const icons = new Win10DesktopIcons({ mount: document.body });
//   icons.addIcon({ id: "notepad", label: "Notepad", iconHTML: ICON_NOTEPAD,
//     onOpen: () => notepad.focus() });
//
// The layer sits above the wallpaper but below windows (z-index 9000) and is
// pointer-transparent except on the icons themselves, so window dragging and
// the global context menu keep working around them.

export interface DesktopIconDef {
	id: string;
	label: string;
	iconHTML: string;
	title?: string;
	onOpen: () => void;
}

export interface DesktopIconsOptions {
	mount?: HTMLElement;
	icons?: DesktopIconDef[];
}

export class Win10DesktopIcons {
	readonly el: HTMLDivElement;
	private mount: HTMLElement;
	private buttons = new Map<string, HTMLButtonElement>();
	private defs = new Map<string, DesktopIconDef>();
	private selected: string | null = null;
	private onDocPointer: ((e: PointerEvent) => void) | null = null;

	constructor(opts: DesktopIconsOptions = {}) {
		this.mount = opts.mount ?? document.body;
		const layer = document.createElement("div");
		layer.className = "w10-dicons";
		layer.setAttribute("role", "list");
		layer.setAttribute("aria-label", "Desktop icons");
		this.mount.appendChild(layer);
		this.el = layer;

		this.onDocPointer = (e) => {
			if ((e.target as HTMLElement | null)?.closest?.(".w10-dicon")) return;
			this.select(null);
		};
		document.addEventListener("pointerdown", this.onDocPointer);

		if (opts.icons) this.setIcons(opts.icons);
	}

	get selectedId(): string | null {
		return this.selected;
	}

	addIcon(def: DesktopIconDef): void {
		const existing = this.defs.get(def.id);
		if (existing) {
			const next = { ...existing, ...def };
			this.defs.set(def.id, next);
			const btn = this.buttons.get(def.id);
			if (btn) this.paintButton(btn, next);
			return;
		}
		this.defs.set(def.id, { ...def });
		const btn = document.createElement("button");
		btn.type = "button";
		btn.className = "w10-dicon";
		btn.dataset.icon = def.id;
		btn.setAttribute("role", "listitem");
		this.paintButton(btn, def);
		btn.addEventListener("click", () => this.select(def.id));
		btn.addEventListener("dblclick", () => {
			this.select(def.id);
			def.onOpen();
		});
		btn.addEventListener("keydown", (e) => {
			if (e.key === "Enter") {
				e.preventDefault();
				this.select(def.id);
				def.onOpen();
			}
		});
		this.buttons.set(def.id, btn);
		this.el.appendChild(btn);
	}

	removeIcon(id: string): void {
		this.defs.delete(id);
		this.buttons.get(id)?.remove();
		this.buttons.delete(id);
		if (this.selected === id) this.selected = null;
	}

	setIcons(defs: DesktopIconDef[]): void {
		this.clear();
		for (const def of defs) this.addIcon(def);
	}

	clear(): void {
		this.defs.clear();
		for (const btn of this.buttons.values()) btn.remove();
		this.buttons.clear();
		this.selected = null;
	}

	select(id: string | null): void {
		this.selected = id;
		for (const [key, btn] of this.buttons) {
			btn.classList.toggle("w10-selected", key === id);
		}
	}

	destroy(): void {
		if (this.onDocPointer) document.removeEventListener("pointerdown", this.onDocPointer);
		this.onDocPointer = null;
		this.el.remove();
		this.buttons.clear();
		this.defs.clear();
		this.selected = null;
	}

	private paintButton(btn: HTMLButtonElement, def: DesktopIconDef): void {
		btn.setAttribute("aria-label", def.label);
		btn.title = def.title ?? def.label;
		btn.innerHTML = "";
		const glyph = document.createElement("span");
		glyph.className = "w10-dicon-glyph";
		glyph.setAttribute("aria-hidden", "true");
		glyph.innerHTML = def.iconHTML;
		const label = document.createElement("span");
		label.className = "w10-dicon-label";
		label.textContent = def.label;
		btn.appendChild(glyph);
		btn.appendChild(label);
	}
}
