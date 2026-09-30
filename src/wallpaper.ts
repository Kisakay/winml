// Windows 10 desktop wallpaper layer: solid color, gradient and/or image.
// Pure DOM, zero dependencies. Owned by createDesktop() or standalone:
//
//   const wp = new Win10Wallpaper(document.body);
//   wp.set({ image: "https://example.com/bg.jpg", fit: "cover" });
//
// The layer is fixed, behind everything (z-index 0) and pointer-transparent,
// so windows, icons and the taskbar keep working above it.

export type WallpaperFit = "cover" | "contain" | "center" | "tile" | "stretch";

export interface WallpaperOptions {
	/** Image URL painted above color/gradient. `null`/empty clears it. */
	image?: string | null;
	/** Solid fallback behind gradient/image (default `#06121f`). */
	color?: string | null;
	/** CSS background layer under the image, e.g. a linear-gradient. */
	gradient?: string | null;
	/** How the image fills the screen (default `"cover"`). */
	fit?: WallpaperFit;
}

/** Default Win10-hero wallpaper (blue glow over deep navy). */
export const DEFAULT_WALLPAPER: WallpaperOptions = {
	color: "#06121f",
	gradient:
		"radial-gradient(120% 90% at 50% 115%, rgba(64, 170, 230, 0.85) 0%, rgba(20, 90, 160, 0.55) 38%, rgba(0, 0, 0, 0) 70%), linear-gradient(180deg, #06121f 0%, #0a2c4f 55%, #0e4a86 100%)",
	fit: "cover",
};

/** Dark midnight wallpaper. */
export const DARK_WALLPAPER: WallpaperOptions = {
	color: "#0b0e14",
	gradient:
		"radial-gradient(100% 80% at 50% 110%, rgba(60, 80, 120, 0.5) 0%, rgba(0, 0, 0, 0) 60%), linear-gradient(180deg, #0b0e14 0%, #11151d 60%, #1a2029 100%)",
	fit: "cover",
};

function applyFit(el: HTMLDivElement, fit: WallpaperFit): void {
	switch (fit) {
		case "contain":
			el.style.backgroundSize = "contain";
			el.style.backgroundPosition = "center";
			el.style.backgroundRepeat = "no-repeat";
			break;
		case "center":
			el.style.backgroundSize = "auto";
			el.style.backgroundPosition = "center";
			el.style.backgroundRepeat = "no-repeat";
			break;
		case "tile":
			el.style.backgroundSize = "auto";
			el.style.backgroundPosition = "0 0";
			el.style.backgroundRepeat = "repeat";
			break;
		case "stretch":
			el.style.backgroundSize = "100% 100%";
			el.style.backgroundPosition = "center";
			el.style.backgroundRepeat = "no-repeat";
			break;
		case "cover":
		default:
			el.style.backgroundSize = "cover";
			el.style.backgroundPosition = "center";
			el.style.backgroundRepeat = "no-repeat";
			break;
	}
}

export class Win10Wallpaper {
	readonly el: HTMLDivElement;
	private current: WallpaperOptions = { ...DEFAULT_WALLPAPER };

	constructor(mount: HTMLElement = document.body) {
		const layer = document.createElement("div");
		layer.className = "w10-wallpaper";
		layer.setAttribute("aria-hidden", "true");
		mount.prepend(layer);
		this.el = layer;
		this.set(this.current);
	}

	get options(): WallpaperOptions {
		return { ...this.current };
	}

	set(opts: WallpaperOptions): void {
		this.current = { ...this.current, ...opts };
		const { image, color, gradient, fit } = this.current;
		const layers: string[] = [];
		if (image) layers.push(`url("${image}")`);
		if (gradient) layers.push(gradient);
		this.el.style.backgroundImage = layers.join(", ");
		this.el.style.backgroundColor = color ?? "#06121f";
		applyFit(this.el, fit ?? "cover");
	}

	clear(): void {
		this.set({ image: null, gradient: null });
	}

	destroy(): void {
		this.el.remove();
	}
}

export function createWallpaper(mount?: HTMLElement, opts?: WallpaperOptions): Win10Wallpaper {
	const wp = new Win10Wallpaper(mount);
	if (opts) wp.set(opts);
	return wp;
}
