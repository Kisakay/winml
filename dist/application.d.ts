import { Win10StartMenu } from "./startmenu.js";
import { Win10Taskbar, type TaskbarAppOptions } from "./taskbar.js";
import { Win10Window, type Win10Theme, type Win10WindowOptions } from "./window.js";
export interface Win10ApplicationOptions extends Omit<Win10WindowOptions, "onClose" | "onMinimize" | "id">, Pick<TaskbarAppOptions, "pinned" | "pinnable" | "pinTitle" | "unpinTitle" | "onPinChange"> {
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
export declare class Win10Application {
    readonly id: string;
    readonly window: Win10Window;
    private opts;
    private running;
    private built;
    private destroyed;
    private onPointerDown;
    constructor(opts: Win10ApplicationOptions);
    get body(): HTMLDivElement;
    get isOpen(): boolean;
    get isRunning(): boolean;
    /** Launch the app: build content once, show, focus, mark running. Single-instance. */
    launch(): void;
    /** Re-run the build function (e.g. language change) without touching state. */
    rebuild(): void;
    show(): void;
    hide(): void;
    toggle(): void;
    focus(): void;
    minimize(): void;
    close(): void;
    setRunning(running: boolean): void;
    /** Pin state of the taskbar button (unpinned + idle apps hide). */
    setPinned(pinned: boolean): void;
    isPinned(): boolean;
    setTitle(titleHTML: string): void;
    setAppTitle(title: string): void;
    setTheme(theme: Win10Theme): void;
    setAccent(accent: string): void;
    destroy(): void;
    private bringToFront;
    /** Run the lazy build once, whatever entry point shows the window. */
    private ensureBuilt;
    private sync;
}
