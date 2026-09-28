import type { Win10Theme } from "./window.js";
export interface StartMenuApp {
    id: string;
    label: string;
    iconHTML: string;
    onOpen: () => void;
}
export interface StartMenuFooter {
    /** Bottom-left user tile (avatar + name). */
    user?: {
        avatarUrl: string;
        name: string;
        title?: string;
        onClick: () => void;
    };
    /** Bottom-middle settings gear. */
    settings?: {
        title?: string;
        onClick: () => void;
    };
    /** Bottom-right power button. */
    power?: {
        title?: string;
        onClick: () => void;
    };
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
export declare class Win10StartMenu {
    private opts;
    private apps;
    private el;
    private onPointerDown;
    private onKey;
    private theme;
    private accent;
    constructor(opts?: StartMenuOptions);
    get id(): string;
    /** Register (or replace) an app. Appears in list + tiles on next open. */
    registerApp(app: StartMenuApp): void;
    unregisterApp(id: string): void;
    isOpen(): boolean;
    toggle(): void;
    open(): void;
    close(): void;
    setTheme(theme: Win10Theme): void;
    setAccent(accent: string): void;
    setSearchPlaceholder(text: string): void;
    destroy(): void;
    private paintApps;
}
