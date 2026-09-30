import { Win10Application, type Win10ApplicationOptions } from "./application.js";
import { Win10StartMenu } from "./startmenu.js";
import { Win10Taskbar } from "./taskbar.js";
import { Win10Window, type Win10Geometry, type Win10Theme, type Win10WindowOptions } from "./window.js";
export declare const DEFAULT_ACCENT = "#0078d7";
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
export interface DesktopAppOptions extends Omit<Win10WindowOptions, "onClose" | "onMinimize" | "id">, Pick<Win10ApplicationOptions, "pinned" | "pinnable" | "pinTitle" | "unpinTitle" | "onPinChange"> {
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
    setPinned: (pinned: boolean) => void;
    isPinned: () => boolean;
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
    /**
     * Attach a standalone Start menu to the shell: it is synced with the
     * current theme/accent immediately, then follows setTheme/setAccent.
     * The caller keeps ownership (desktop.destroy() won't destroy it).
     */
    attachStartMenu: (menu: Win10StartMenu) => void;
    destroy: () => void;
}
export declare function isValidAccent(v: string): boolean;
export declare function createDesktop(opts?: DesktopOptions): Win10Desktop;
export type { Win10Geometry, Win10Theme };
