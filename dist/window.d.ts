export type Win10Theme = "light" | "dark";
export interface Win10Geometry {
    x: number;
    y: number;
    w: number;
    h: number;
}
export interface Win10WindowOptions {
    id: string;
    /** Title HTML (e.g. `Downloader <span class="w10-credit">by me</span>`). */
    titleHTML: string;
    /** Avatar URL shown left of the title (optional). */
    avatarUrl?: string;
    avatarFallback?: () => void;
    width?: number;
    height?: number;
    minWidth?: number;
    minHeight?: number;
    resizable?: boolean;
    /** Initial position (otherwise centered). */
    x?: number | null;
    y?: number | null;
    /** Localized chrome labels (minimize / maximize / restore / close / resize). */
    chrome?: {
        minimize?: string;
        maximize?: string;
        restore?: string;
        close?: string;
        resize?: string;
    };
    onClose?: () => void;
    onMinimize?: () => void;
    onGeometry?: (geom: Win10Geometry) => void;
}
export declare class Win10Window {
    readonly id: string;
    readonly el: HTMLDivElement;
    readonly body: HTMLDivElement;
    readonly titlebar: HTMLDivElement;
    private maxBtn;
    private maximized;
    private opts;
    constructor(opts: Win10WindowOptions);
    get isMaximized(): boolean;
    setTitleHTML(html: string): void;
    setTheme(theme: Win10Theme): void;
    setAccent(accent: string): void;
    setZIndex(z: number): void;
    show(): void;
    hide(): void;
    get shown(): boolean;
    toggleMaximize(): void;
    /** Add a vertical Win10 nav left of the body, returns nav container + sync. */
    addNav<T extends string>(items: {
        id: T;
        label: string;
        glyph: string;
    }[], active: T, onSelect: (id: T) => void): {
        nav: HTMLDivElement;
        sync: (id: T) => void;
    };
    applyGeometry(x: number | null | undefined, y: number | null | undefined, w?: number | null, h?: number | null): void;
    clamp(): void;
    destroy(): void;
    private emitGeometry;
    private makeDraggable;
    private makeResizable;
}
