// Windows 10 secondary controls (batch 2): expander, pivot, infobar,
// avatar, badge, searchbox, number/password rows, tiles, command bar,
// tree, table, rating, breadcrumb, flyout, segmented, color grid,
// empty state, spinner, link, tooltip. Pure DOM, `w10-*` classes.

import { ICON_CHEVRON_DOWN, ICON_CHEVRON_RIGHT, ICON_SEARCH, ICON_VIEW, ICON_HIDE } from "./icons.js";

/* ================= Expander ================= */

export function w10Expander(
	header: string,
	opts: { expanded?: boolean; desc?: string; iconHTML?: string } = {},
): { el: HTMLDivElement; body: HTMLDivElement; setExpanded: (v: boolean) => void; toggle: () => void } {
	const el = document.createElement("div");
	el.className = "w10-expander";
	const head = document.createElement("button");
	head.type = "button";
	head.className = "w10-expander-head";
	const chev = document.createElement("span");
	chev.className = "w10-expander-chev";
	chev.innerHTML = ICON_CHEVRON_RIGHT;
	const texts = document.createElement("span");
	texts.className = "w10-expander-texts";
	const title = document.createElement("span");
	title.className = "w10-setting-title";
	title.textContent = header;
	texts.appendChild(title);
	if (opts.desc) {
		const sub = document.createElement("span");
		sub.className = "w10-desc";
		sub.textContent = opts.desc;
		texts.appendChild(sub);
	}
	if (opts.iconHTML) {
		const ic = document.createElement("span");
		ic.className = "w10-expander-icon";
		ic.innerHTML = opts.iconHTML;
		head.appendChild(ic);
	}
	head.appendChild(chev);
	head.appendChild(texts);
	const body = document.createElement("div");
	body.className = "w10-expander-body";
	el.appendChild(head);
	el.appendChild(body);
	let open = opts.expanded ?? false;
	const paint = () => {
		el.classList.toggle("w10-open", open);
		body.style.display = open ? "" : "none";
		chev.innerHTML = open ? ICON_CHEVRON_DOWN : ICON_CHEVRON_RIGHT;
		head.setAttribute("aria-expanded", String(open));
	};
	head.onclick = () => {
		open = !open;
		paint();
	};
	paint();
	return { el, body, setExpanded: (v) => { open = v; paint(); }, toggle: () => head.click() };
}

/* ================= Pivot (tab headers) ================= */

export function w10Pivot<T extends string>(
	tabs: { id: T; label: string }[],
	active: T,
	onSelect: (id: T) => void,
): { el: HTMLDivElement; header: HTMLDivElement; body: HTMLDivElement; sync: (id: T) => void } {
	const el = document.createElement("div");
	el.className = "w10-pivot";
	const header = document.createElement("div");
	header.className = "w10-pivot-head";
	header.setAttribute("role", "tablist");
	const body = document.createElement("div");
	body.className = "w10-pivot-body";
	el.appendChild(header);
	el.appendChild(body);
	const sync = (id: T) => {
		header.querySelectorAll(".w10-pivot-tab").forEach((b) => {
			b.classList.toggle("w10-active", (b as HTMLElement).dataset.tab === id);
		});
	};
	for (const t of tabs) {
		const b = document.createElement("button");
		b.type = "button";
		b.className = "w10-pivot-tab" + (t.id === active ? " w10-active" : "");
		b.dataset.tab = t.id;
		b.setAttribute("role", "tab");
		b.textContent = t.label;
		b.onclick = () => {
			sync(t.id);
			onSelect(t.id);
		};
		header.appendChild(b);
	}
	return { el, header, body, sync };
}

/* ================= InfoBar ================= */

export type W10InfoSeverity = "info" | "success" | "warning" | "error";

const INFOBAR_GLYPH: Record<W10InfoSeverity, string> = {
	info: "ⓘ",
	success: "✓",
	warning: "⚠",
	error: "✕",
};

export function w10InfoBar(opts: {
	severity: W10InfoSeverity;
	title: string;
	message?: string;
	closable?: boolean;
	onClose?: () => void;
}): HTMLDivElement {
	const el = document.createElement("div");
	el.className = `w10-infobar w10-infobar-${opts.severity}`;
	el.setAttribute("role", opts.severity === "error" || opts.severity === "warning" ? "alert" : "status");
	const glyph = document.createElement("span");
	glyph.className = "w10-infobar-icon";
	glyph.textContent = INFOBAR_GLYPH[opts.severity];
	const texts = document.createElement("span");
	texts.className = "w10-infobar-texts";
	const title = document.createElement("span");
	title.className = "w10-infobar-title";
	title.textContent = opts.title;
	texts.appendChild(title);
	if (opts.message) {
		const msg = document.createElement("span");
		msg.className = "w10-infobar-msg";
		msg.textContent = opts.message;
		texts.appendChild(msg);
	}
	el.appendChild(glyph);
	el.appendChild(texts);
	if (opts.closable ?? true) {
		const x = document.createElement("button");
		x.type = "button";
		x.className = "w10-infobar-close";
		x.textContent = "✕";
		x.setAttribute("aria-label", "Dismiss");
		x.onclick = () => {
			el.remove();
			opts.onClose?.();
		};
		el.appendChild(x);
	}
	return el;
}

/* ================= Avatar / PersonPicture ================= */

export function w10Avatar(opts: { name?: string; src?: string; size?: number } = {}): HTMLDivElement {
	const el = document.createElement("div");
	el.className = "w10-avatar2";
	const size = opts.size ?? 40;
	el.style.width = `${size}px`;
	el.style.height = `${size}px`;
	el.style.fontSize = `${Math.max(11, Math.round(size * 0.38))}px`;
	if (opts.src) {
		const img = document.createElement("img");
		img.src = opts.src;
		img.alt = opts.name ?? "";
		img.draggable = false;
		img.onerror = () => {
			img.remove();
			el.textContent = initials(opts.name ?? "?");
		};
		el.appendChild(img);
	} else {
		el.textContent = initials(opts.name ?? "?");
		el.title = opts.name ?? "";
	}
	return el;
}

function initials(name: string): string {
	const parts = name.trim().split(/\s+/).filter(Boolean);
	if (parts.length === 0) return "?";
	if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
	return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/* ================= Badge ================= */

export function w10Badge(text: string | number, opts: { tone?: "accent" | "neutral" | "alert" } = {}): HTMLSpanElement {
	const el = document.createElement("span");
	el.className = `w10-badge w10-badge-${opts.tone ?? "accent"}`;
	el.textContent = String(text);
	return el;
}

/* ================= SearchBox ================= */

export function w10SearchBox(opts: {
	placeholder?: string;
	value?: string;
	onInput?: (v: string) => void;
	onClear?: () => void;
} = {}): { el: HTMLDivElement; input: HTMLInputElement; setValue: (v: string) => void; focus: () => void } {
	const el = document.createElement("div");
	el.className = "w10-searchbox";
	const icon = document.createElement("span");
	icon.className = "w10-searchbox-icon";
	icon.innerHTML = ICON_SEARCH;
	const input = document.createElement("input");
	input.type = "text";
	input.className = "w10-searchbox-input";
	input.placeholder = opts.placeholder ?? "Search";
	input.value = opts.value ?? "";
	const clear = document.createElement("button");
	clear.type = "button";
	clear.className = "w10-searchbox-clear";
	clear.textContent = "✕";
	clear.setAttribute("aria-label", "Clear search");
	const paint = () => {
		clear.style.display = input.value ? "" : "none";
	};
	clear.onclick = () => {
		input.value = "";
		paint();
		opts.onInput?.("");
		opts.onClear?.();
		input.focus();
	};
	input.oninput = () => {
		paint();
		opts.onInput?.(input.value);
	};
	el.appendChild(icon);
	el.appendChild(input);
	el.appendChild(clear);
	paint();
	return { el, input, setValue: (v) => { input.value = v; paint(); }, focus: () => input.focus() };
}

/* ================= Number row (spinbox) ================= */

export function w10NumberRow(
	label: string,
	desc: string,
	opts: { min?: number; max?: number; step?: number; get: () => number; set: (v: number) => void },
): HTMLDivElement {
	const row = document.createElement("div");
	row.className = "w10-setting w10-setting-col";
	const title = document.createElement("div");
	title.className = "w10-setting-title";
	title.textContent = label;
	row.appendChild(title);
	if (desc) {
		const sub = document.createElement("div");
		sub.className = "w10-desc";
		sub.textContent = desc;
		row.appendChild(sub);
	}
	const wrap = document.createElement("div");
	wrap.className = "w10-number";
	const input = document.createElement("input");
	input.type = "number";
	input.className = "w10-textbox w10-number-input";
	const min = opts.min ?? Number.MIN_SAFE_INTEGER;
	const max = opts.max ?? Number.MAX_SAFE_INTEGER;
	const step = opts.step ?? 1;
	const sync = () => {
		input.value = String(opts.get());
	};
	const commit = (v: number) => {
		const clamped = Math.max(min, Math.min(max, Number.isFinite(v) ? v : opts.get()));
		opts.set(clamped);
		sync();
	};
	input.onchange = () => commit(Number(input.value));
	const minus = document.createElement("button");
	minus.type = "button";
	minus.className = "w10-number-btn";
	minus.textContent = "−";
	minus.onclick = () => commit(opts.get() - step);
	const plus = document.createElement("button");
	plus.type = "button";
	plus.className = "w10-number-btn";
	plus.textContent = "+";
	plus.onclick = () => commit(opts.get() + step);
	wrap.appendChild(minus);
	wrap.appendChild(input);
	wrap.appendChild(plus);
	row.appendChild(wrap);
	sync();
	return row;
}

/* ================= Password row (reveal) ================= */

export function w10PasswordRow(
	label: string,
	desc: string,
	opts: { get: () => string; set: (v: string) => void; placeholder?: string },
): { el: HTMLDivElement; input: HTMLInputElement } {
	const row = document.createElement("div");
	row.className = "w10-setting w10-setting-col";
	const title = document.createElement("div");
	title.className = "w10-setting-title";
	title.textContent = label;
	row.appendChild(title);
	if (desc) {
		const sub = document.createElement("div");
		sub.className = "w10-desc";
		sub.textContent = desc;
		row.appendChild(sub);
	}
	const wrap = document.createElement("div");
	wrap.className = "w10-passwrap";
	const input = document.createElement("input");
	input.type = "password";
	input.className = "w10-textbox";
	input.placeholder = opts.placeholder ?? "";
	input.value = opts.get();
	input.onchange = () => opts.set(input.value);
	const reveal = document.createElement("button");
	reveal.type = "button";
	reveal.className = "w10-passbtn";
	reveal.innerHTML = ICON_VIEW;
	reveal.title = "Show password";
	let shown = false;
	reveal.onclick = () => {
		shown = !shown;
		input.type = shown ? "text" : "password";
		reveal.innerHTML = shown ? ICON_HIDE : ICON_VIEW;
		reveal.title = shown ? "Hide password" : "Show password";
	};
	wrap.appendChild(input);
	wrap.appendChild(reveal);
	row.appendChild(wrap);
	return { el: row, input };
}

/* ================= Tile ================= */

export type W10TileSize = "small" | "medium" | "wide" | "large";

export function w10Tile(opts: {
	title: string;
	iconHTML?: string;
	size?: W10TileSize;
	accent?: string;
	selected?: boolean;
	onClick?: (e: MouseEvent) => void;
}): HTMLButtonElement {
	const btn = document.createElement("button");
	btn.type = "button";
	btn.className = `w10-tile w10-tile-${opts.size ?? "medium"}` + (opts.selected ? " w10-selected" : "");
	if (opts.accent) btn.style.setProperty("--w10-tile", opts.accent);
	if (opts.iconHTML) {
		const ic = document.createElement("span");
		ic.className = "w10-tile-icon";
		ic.innerHTML = opts.iconHTML;
		btn.appendChild(ic);
	}
	const label = document.createElement("span");
	label.className = "w10-tile-label";
	label.textContent = opts.title;
	btn.appendChild(label);
	if (opts.onClick) btn.onclick = opts.onClick;
	return btn;
}

/* ================= CommandBar ================= */

export interface W10Command {
	id: string;
	label: string;
	iconHTML?: string;
	disabled?: boolean;
	onClick?: () => void;
}

export function w10CommandBar(commands: W10Command[]): HTMLDivElement {
	const bar = document.createElement("div");
	bar.className = "w10-commandbar";
	bar.setAttribute("role", "toolbar");
	for (const cmd of commands) {
		const b = document.createElement("button");
		b.type = "button";
		b.className = "w10-command";
		b.disabled = cmd.disabled ?? false;
		if (cmd.iconHTML) {
			const ic = document.createElement("span");
			ic.className = "w10-command-icon";
			ic.innerHTML = cmd.iconHTML;
			b.appendChild(ic);
		}
		const label = document.createElement("span");
		label.className = "w10-command-label";
		label.textContent = cmd.label;
		b.appendChild(label);
		b.onclick = () => cmd.onClick?.();
		bar.appendChild(b);
	}
	return bar;
}

/* ================= TreeView ================= */

export interface W10TreeNode {
	id: string;
	label: string;
	iconHTML?: string;
	children?: W10TreeNode[];
}

export function w10Tree(
	nodes: W10TreeNode[],
	opts: { onSelect?: (id: string) => void; selected?: string } = {},
): { el: HTMLDivElement; select: (id: string) => void } {
	const el = document.createElement("div");
	el.className = "w10-tree";
	el.setAttribute("role", "tree");
	const select = (id: string) => {
		el.querySelectorAll(".w10-tree-label").forEach((b) => {
			b.classList.toggle("w10-selected", (b as HTMLElement).dataset.node === id);
		});
	};
	const render = (list: W10TreeNode[], depth: number, parent: HTMLElement) => {
		for (const node of list) {
			const row = document.createElement("div");
			row.className = "w10-tree-row";
			const hasKids = !!node.children?.length;
			const toggle = document.createElement("button");
			toggle.type = "button";
			toggle.className = "w10-tree-toggle" + (hasKids ? "" : " w10-tree-spacer");
			if (hasKids) toggle.innerHTML = ICON_CHEVRON_RIGHT;
			row.appendChild(toggle);
			const label = document.createElement("button");
			label.type = "button";
			label.className = "w10-tree-label" + (node.id === (opts.selected ?? "") ? " w10-selected" : "");
			label.dataset.node = node.id;
			if (node.iconHTML) {
				const ic = document.createElement("span");
				ic.className = "w10-tree-icon";
				ic.innerHTML = node.iconHTML;
				label.appendChild(ic);
			}
			const text = document.createElement("span");
			text.textContent = node.label;
			label.appendChild(text);
			label.onclick = () => {
				select(node.id);
				opts.onSelect?.(node.id);
			};
			row.appendChild(label);
			row.style.setProperty("--w10-depth", String(depth));
			parent.appendChild(row);
			if (hasKids) {
				const kids = document.createElement("div");
				kids.className = "w10-tree-kids";
				kids.style.display = "none";
				let open = false;
				toggle.onclick = (e) => {
					e.stopPropagation();
					open = !open;
					kids.style.display = open ? "" : "none";
					toggle.innerHTML = open ? ICON_CHEVRON_DOWN : ICON_CHEVRON_RIGHT;
				};
				parent.appendChild(kids);
				render(node.children as W10TreeNode[], depth + 1, kids);
			}
		}
	};
	render(nodes, 0, el);
	return { el, select };
}

/* ================= Table (DetailsList) ================= */

export function w10Table(
	columns: string[],
	rows: string[][],
	opts: { onSelect?: (index: number) => void; selected?: number } = {},
): { el: HTMLDivElement; select: (index: number) => void } {
	const el = document.createElement("div");
	el.className = "w10-tablewrap";
	const table = document.createElement("div");
	table.className = "w10-table";
	table.setAttribute("role", "table");
	const head = document.createElement("div");
	head.className = "w10-trow w10-thead";
	head.setAttribute("role", "row");
	for (const c of columns) {
		const cell = document.createElement("span");
		cell.className = "w10-tcell w10-thead-cell";
		cell.textContent = c;
		head.appendChild(cell);
	}
	table.appendChild(head);
	let selected = opts.selected ?? -1;
	const bodyRows: HTMLButtonElement[] = [];
	rows.forEach((cells, i) => {
		const r = document.createElement("button");
		r.type = "button";
		r.className = "w10-trow" + (i === selected ? " w10-selected" : "");
		r.setAttribute("role", "row");
		cells.forEach((c) => {
			const cell = document.createElement("span");
			cell.className = "w10-tcell";
			cell.textContent = c;
			r.appendChild(cell);
		});
		r.onclick = () => {
			select(i);
			opts.onSelect?.(i);
		};
		bodyRows.push(r);
		table.appendChild(r);
	});
	const select = (i: number) => {
		selected = i;
		bodyRows.forEach((r, j) => r.classList.toggle("w10-selected", j === i));
	};
	el.appendChild(table);
	return { el, select };
}

/* ================= Rating ================= */

export function w10Rating(opts: {
	value?: number;
	max?: number;
	readonly?: boolean;
	onRate?: (v: number) => void;
}): { el: HTMLDivElement; set: (v: number) => void; get: () => number } {
	const max = opts.max ?? 5;
	let value = opts.value ?? 0;
	const el = document.createElement("div");
	el.className = "w10-rating";
	el.setAttribute("role", opts.readonly ? "img" : "radiogroup");
	const btns: HTMLButtonElement[] = [];
	const paint = () => {
		btns.forEach((b, i) => {
			b.classList.toggle("w10-on", i < value);
			b.textContent = i < value ? "★" : "☆";
		});
		el.setAttribute("aria-label", `Rated ${value} out of ${max}`);
	};
	for (let i = 1; i <= max; i++) {
		const b = document.createElement("button");
		b.type = "button";
		b.className = "w10-star";
		b.disabled = opts.readonly ?? false;
		b.title = `${i} star${i > 1 ? "s" : ""}`;
		b.onclick = () => {
			value = i;
			paint();
			opts.onRate?.(i);
		};
		btns.push(b);
		el.appendChild(b);
	}
	paint();
	return { el, set: (v) => { value = Math.max(0, Math.min(max, v)); paint(); }, get: () => value };
}

/* ================= Breadcrumb ================= */

export function w10Breadcrumb(segments: { label: string; onClick?: () => void }[]): HTMLDivElement {
	const el = document.createElement("div");
	el.className = "w10-breadcrumb";
	el.setAttribute("aria-label", "Breadcrumb");
	segments.forEach((seg, i) => {
		if (i > 0) {
			const sep = document.createElement("span");
			sep.className = "w10-crumb-sep";
			sep.textContent = "›";
			el.appendChild(sep);
		}
		const last = i === segments.length - 1;
		if (seg.onClick && !last) {
			const b = document.createElement("button");
			b.type = "button";
			b.className = "w10-crumb-link";
			b.textContent = seg.label;
			b.onclick = seg.onClick;
			el.appendChild(b);
		} else {
			const s = document.createElement("span");
			s.className = "w10-crumb-current";
			s.textContent = seg.label;
			el.appendChild(s);
		}
	});
	return el;
}

/* ================= Flyout ================= */

export function showW10Flyout(
	anchor: HTMLElement,
	build: (flyout: HTMLDivElement, close: () => void) => void,
	opts: { dark?: boolean; accent?: string; width?: number } = {},
): () => void {
	const fly = document.createElement("div");
	fly.className = "w10-flyout" + (opts.dark ? " w10-dark" : "");
	if (opts.accent) fly.style.setProperty("--w10-accent", opts.accent);
	if (opts.width) fly.style.width = `${opts.width}px`;
	document.body.appendChild(fly);
	const close = () => {
		fly.remove();
		document.removeEventListener("pointerdown", onDown, true);
		document.removeEventListener("keydown", onKey, true);
	};
	build(fly, close);
	const r = anchor.getBoundingClientRect();
	const w = fly.offsetWidth || 240;
	const h = fly.offsetHeight || 120;
	let x = Math.max(8, Math.min(window.innerWidth - w - 8, r.left));
	let y = r.bottom + 6;
	if (y + h > window.innerHeight - 48) y = Math.max(8, r.top - h - 6);
	fly.style.left = `${x}px`;
	fly.style.top = `${y}px`;
	const onDown = (e: PointerEvent) => {
		if (!fly.contains(e.target as Node) && e.target !== anchor) close();
	};
	const onKey = (e: KeyboardEvent) => {
		if (e.key === "Escape") close();
	};
	document.addEventListener("pointerdown", onDown, true);
	document.addEventListener("keydown", onKey, true);
	return close;
}

/* ================= Segmented ================= */

export function w10Segmented<T extends string>(
	options: { value: T; label: string }[],
	get: () => T,
	set: (v: T) => void,
): { el: HTMLDivElement; sync: () => void } {
	const el = document.createElement("div");
	el.className = "w10-segmented";
	el.setAttribute("role", "radiogroup");
	const sync = () => {
		el.querySelectorAll(".w10-seg").forEach((b) => {
			b.classList.toggle("w10-on", (b as HTMLElement).dataset.value === get());
		});
	};
	for (const o of options) {
		const b = document.createElement("button");
		b.type = "button";
		b.className = "w10-seg";
		b.dataset.value = o.value;
		b.setAttribute("role", "radio");
		b.textContent = o.label;
		b.onclick = () => {
			set(o.value);
			sync();
		};
		el.appendChild(b);
	}
	sync();
	return { el, sync };
}

/* ================= Color grid ================= */

export function w10ColorGrid(
	colors: string[],
	get: () => string,
	set: (v: string) => void,
): { el: HTMLDivElement; sync: () => void } {
	const el = document.createElement("div");
	el.className = "w10-colorgrid";
	el.setAttribute("role", "radiogroup");
	const sync = () => {
		el.querySelectorAll(".w10-swatch").forEach((b) => {
			const on = (b as HTMLElement).dataset.color?.toLowerCase() === get().toLowerCase();
			b.classList.toggle("w10-on", on);
		});
	};
	for (const c of colors) {
		const b = document.createElement("button");
		b.type = "button";
		b.className = "w10-swatch";
		b.dataset.color = c;
		b.style.background = c;
		b.title = c;
		b.setAttribute("aria-label", c);
		b.onclick = () => {
			set(c);
			sync();
		};
		el.appendChild(b);
	}
	sync();
	return { el, sync };
}

/* ================= Empty state ================= */

export function w10EmptyState(opts: {
	iconHTML?: string;
	title: string;
	message?: string;
	actionLabel?: string;
	onAction?: () => void;
}): HTMLDivElement {
	const el = document.createElement("div");
	el.className = "w10-empty";
	if (opts.iconHTML) {
		const ic = document.createElement("div");
		ic.className = "w10-empty-icon";
		ic.innerHTML = opts.iconHTML;
		el.appendChild(ic);
	}
	const title = document.createElement("div");
	title.className = "w10-empty-title";
	title.textContent = opts.title;
	el.appendChild(title);
	if (opts.message) {
		const msg = document.createElement("div");
		msg.className = "w10-desc";
		msg.textContent = opts.message;
		el.appendChild(msg);
	}
	if (opts.actionLabel) {
		const btn = document.createElement("button");
		btn.type = "button";
		btn.className = "w10-btn";
		btn.textContent = opts.actionLabel;
		btn.onclick = () => opts.onAction?.();
		el.appendChild(btn);
	}
	return el;
}

/* ================= Spinner (ProgressRing) ================= */

export function w10Spinner(opts: { size?: number; label?: string } = {}): HTMLDivElement {
	const el = document.createElement("div");
	el.className = "w10-spinner-row";
	const ring = document.createElement("div");
	ring.className = "w10-spinner";
	const size = opts.size ?? 28;
	ring.style.width = `${size}px`;
	ring.style.height = `${size}px`;
	ring.setAttribute("role", "progressbar");
	el.appendChild(ring);
	if (opts.label) {
		const label = document.createElement("span");
		label.className = "w10-desc";
		label.textContent = opts.label;
		el.appendChild(label);
	}
	return el;
}

/* ================= Link ================= */

export function w10Link(label: string, onClick: (e: MouseEvent) => void): HTMLButtonElement {
	const b = document.createElement("button");
	b.type = "button";
	b.className = "w10-link";
	b.textContent = label;
	b.onclick = onClick;
	return b;
}

/* ================= Tooltip ================= */

export function w10WithTooltip<T extends HTMLElement>(target: T, text: string): T {
	target.classList.add("w10-tip");
	target.setAttribute("data-w10-tip", text);
	return target;
}
