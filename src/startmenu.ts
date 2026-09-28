// Classic Windows 10 Start menu: search + app list + tiles + footer.
// Flyout anchored above the Start button. Apps register dynamically,
// so host apps (and future ones) appear in both list and tiles.
// Pure DOM, zero dependencies. All display strings come from the caller
// (language-agnostic core, like the MessageBox).

import type { Win10Theme } from "./window.js";

export interface StartMenuApp {
	id: string;
	label: string;
	iconHTML: string;
	onOpen: () => void;
}

export interface StartMenuFooter {
	/** Bottom-left user tile (avatar + name). */
	user?: { avatarUrl: string; name: string; title?: string; onClick: () => void };
	/** Bottom-middle settings gear. */
	settings?: { title?: string; onClick: () => void };
	/** Bottom-right power button. */
	power?: { title?: string; onClick: () => void };
}

export interface StartMenuIcons {
	settings?: string;
	power?: string;
}

export interface StartMenuOptions {
	/** DOM id (default "w10-startmenu"). */
	id?: string;
	/** Search input placeholder. */
	searchPlaceholder?: string;
	/** Footer buttons (user / settings / power). Omit to hide the footer. */
	footer?: StartMenuFooter;
	/** Custom gear/power glyphs (default built-in). */
	icons?: StartMenuIcons;
	theme?: Win10Theme;
	accent?: string;
	/** Selector of the Start button: clicks on it never close the menu (default ".w10-start"). */
	startButtonSelector?: string;
}

const SETTINGS_GLYPH = `<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="2.6" stroke="currentColor" stroke-width="1.6"/><path d="M14.6 10h2.8M2.6 10h2.8M10 14.6v2.8M10 2.6v2.8M13.2 13.2l2 2M4.8 4.8l2 2M13.2 6.8l2-2M4.8 15.2l2-2" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/></svg>`;
const POWER_GLYPH = `<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 3v6.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/><path d="M6.3 6.2a6.8 6.8 0 1 0 7.4 0" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/></svg>`;

export class Win10StartMenu {
	private opts: StartMenuOptions;
	private apps = new Map<string, StartMenuApp>();
	private el: HTMLDivElement | null = null;
	private onPointerDown: ((ev: PointerEvent) => void) | null = null;
	private onKey: ((ev: KeyboardEvent) => void) | null = null;
	private theme: Win10Theme;
	private accent: string | null;

	constructor(opts: StartMenuOptions = {}) {
		this.opts = opts;
		this.theme = opts.theme ?? "light";
		this.accent = opts.accent ?? null;
	}

	get id(): string {
		return this.opts.id ?? "w10-startmenu";
	}

	/** Register (or replace) an app. Appears in list + tiles on next open. */
	registerApp(app: StartMenuApp): void {
		this.apps.set(app.id, app);
		if (this.el) this.paintApps(this.el, "");
	}

	unregisterApp(id: string): void {
		this.apps.delete(id);
		if (this.el) this.paintApps(this.el, "");
	}

	isOpen(): boolean {
		return this.el !== null && document.body.contains(this.el);
	}

	toggle(): void {
		if (this.isOpen()) this.close();
		else this.open();
	}

	open(): void {
		if (this.isOpen()) return;
		const menu = document.createElement("div");
		menu.id = this.id;
		menu.className = "w10-startmenu" + (this.theme === "dark" ? " w10-dark" : "");
		if (this.accent) menu.style.setProperty("--w10-accent", this.accent);

		const searchRow = document.createElement("div");
		searchRow.className = "w10-sm-search";
		const searchInput = document.createElement("input");
		searchInput.type = "text";
		searchInput.className = "w10-textbox";
		searchInput.placeholder = this.opts.searchPlaceholder ?? "";
		searchInput.setAttribute("aria-label", this.opts.searchPlaceholder ?? "Search");
		searchRow.appendChild(searchInput);
		menu.appendChild(searchRow);

		const body = document.createElement("div");
		body.className = "w10-sm-body";

		const list = document.createElement("div");
		list.className = "w10-sm-list";
		const appsBox = document.createElement("div");
		appsBox.className = "w10-sm-apps";
		list.appendChild(appsBox);

		const footer = this.opts.footer;
		if (footer && (footer.user || footer.settings || footer.power)) {
			const foot = document.createElement("div");
			foot.className = "w10-sm-foot";
			if (footer.user) {
				const u = footer.user;
				const userBtn = document.createElement("button");
				userBtn.type = "button";
				userBtn.className = "w10-sm-footbtn";
				userBtn.title = u.title ?? u.name;
				const avatar = document.createElement("img");
				avatar.className = "w10-sm-avatar";
				avatar.src = u.avatarUrl;
				avatar.alt = u.name;
				avatar.draggable = false;
				avatar.onerror = () => avatar.remove();
				userBtn.appendChild(avatar);
				userBtn.onclick = () => {
					this.close();
					u.onClick();
				};
				foot.appendChild(userBtn);
			}
			if (footer.settings) {
				const s = footer.settings;
				const settingsBtn = document.createElement("button");
				settingsBtn.type = "button";
				settingsBtn.className = "w10-sm-footbtn";
				settingsBtn.title = s.title ?? "Settings";
				settingsBtn.innerHTML = `<span class="w10-sm-footicon">${this.opts.icons?.settings ?? SETTINGS_GLYPH}</span>`;
				settingsBtn.onclick = () => {
					this.close();
					s.onClick();
				};
				foot.appendChild(settingsBtn);
			}
			if (footer.power) {
				const p = footer.power;
				const powerBtn = document.createElement("button");
				powerBtn.type = "button";
				powerBtn.className = "w10-sm-footbtn";
				powerBtn.title = p.title ?? "Power";
				powerBtn.innerHTML = `<span class="w10-sm-footicon">${this.opts.icons?.power ?? POWER_GLYPH}</span>`;
				powerBtn.onclick = () => {
					this.close();
					p.onClick();
				};
				foot.appendChild(powerBtn);
			}
			list.appendChild(foot);
		}
		body.appendChild(list);

		const tiles = document.createElement("div");
		tiles.className = "w10-sm-tiles";
		body.appendChild(tiles);
		menu.appendChild(body);

		this.el = menu;
		searchInput.oninput = () => this.paintApps(menu, searchInput.value);
		this.paintApps(menu, "");

		document.body.appendChild(menu);
		searchInput.focus();

		const ignoreSel = this.opts.startButtonSelector ?? ".w10-start";
		this.onPointerDown = (ev: PointerEvent) => {
			const target = ev.target as HTMLElement;
			// The Start button toggles through its own onclick
			if (target.closest(ignoreSel)) return;
			if (!menu.contains(target)) this.close();
		};
		this.onKey = (ev: KeyboardEvent) => {
			if (ev.key === "Escape") this.close();
		};
		document.addEventListener("pointerdown", this.onPointerDown);
		document.addEventListener("keydown", this.onKey);
	}

	close(): void {
		if (this.onPointerDown) document.removeEventListener("pointerdown", this.onPointerDown);
		if (this.onKey) document.removeEventListener("keydown", this.onKey);
		this.onPointerDown = this.onKey = null;
		this.el?.remove();
		this.el = null;
	}

	setTheme(theme: Win10Theme): void {
		this.theme = theme;
		this.el?.classList.toggle("w10-dark", theme === "dark");
	}

	setAccent(accent: string): void {
		if (!/^#[0-9a-fA-F]{6}$/.test(accent)) return;
		this.accent = accent;
		this.el?.style.setProperty("--w10-accent", accent);
	}

	setSearchPlaceholder(text: string): void {
		this.opts.searchPlaceholder = text;
		const input = this.el?.querySelector(".w10-sm-search input");
		if (input) {
			(input as HTMLInputElement).placeholder = text;
			input.setAttribute("aria-label", text);
		}
	}

	destroy(): void {
		this.close();
		this.apps.clear();
	}

	private paintApps(menu: HTMLDivElement, query: string): void {
		const appsBox = menu.querySelector(".w10-sm-apps");
		const tiles = menu.querySelector(".w10-sm-tiles");
		if (!appsBox || !tiles) return;
		const q = query.trim().toLowerCase();
		appsBox.innerHTML = "";
		tiles.innerHTML = "";
		for (const entry of this.apps.values()) {
			if (q && !entry.label.toLowerCase().includes(q)) continue;
			const row = document.createElement("button");
			row.type = "button";
			row.className = "w10-sm-app";
			row.innerHTML = `<span class="w10-sm-appicon"></span><span class="w10-sm-applabel"></span>`;
			(row.querySelector(".w10-sm-appicon") as HTMLSpanElement).innerHTML = entry.iconHTML;
			(row.querySelector(".w10-sm-applabel") as HTMLSpanElement).textContent = entry.label;
			row.onclick = () => {
				this.close();
				entry.onOpen();
			};
			appsBox.appendChild(row);

			const tile = document.createElement("button");
			tile.type = "button";
			tile.className = "w10-sm-tile";
			tile.title = entry.label;
			tile.innerHTML = `<span class="w10-sm-tileicon"></span><span class="w10-sm-tilelabel"></span>`;
			(tile.querySelector(".w10-sm-tileicon") as HTMLSpanElement).innerHTML = entry.iconHTML;
			(tile.querySelector(".w10-sm-tilelabel") as HTMLSpanElement).textContent = entry.label;
			tile.onclick = () => {
				this.close();
				entry.onOpen();
			};
			tiles.appendChild(tile);
		}
	}
}
