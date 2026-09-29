export interface TaskbarAppState {
    /** The app is running -> accent underline visible. */
    running: boolean;
    /** The window is visible and not minimized -> highlighted background. */
    open: boolean;
    /** The window exists but is hidden (minimized) -> button stays, like Win10. */
    minimized?: boolean;
}
export interface TaskbarAppOptions {
    id: string;
    iconHTML: string;
    label: string;
    title?: string;
    onClick: () => void;
    /** Pinned apps stay visible even when closed (default true). */
    pinned?: boolean;
    /** False disables the built-in right-click Pin/Unpin menu (button always visible). */
    pinnable?: boolean;
    /** Right-click menu labels (defaults "Pin to taskbar" / "Unpin from taskbar"). */
    pinTitle?: string;
    unpinTitle?: string;
    /** Called when the user toggles pin in the menu (persist it, then setPinned). */
    onPinChange?: (id: string, pinned: boolean) => void;
}
export declare class Win10Taskbar {
    readonly el: HTMLDivElement;
    private apps;
    private records;
    private statusEl;
    private clockEl;
    private timeEl;
    private dateEl;
    private tickId;
    private accent;
    constructor(id?: string);
    /** Start button (Windows logo) at the far left. */
    addStartButton(opts: {
        iconHTML: string;
        title: string;
        onClick: () => void;
    }): HTMLButtonElement;
    /** Real Win10 app: icon + label, wide, with accent bar while running.
     * Idempotent: re-adding an existing id refreshes it in place (never duplicates).
     * Visibility follows the Win10 policy (see sync): pinned/minimized/running
     * apps keep their button, unpinned + idle apps are hidden. */
    addApp(opts: TaskbarAppOptions): HTMLButtonElement;
    removeApp(id: string): void;
    /** Pin state (unpinned + idle apps are hidden by the display policy). Silent: persist via onPinChange. */
    setPinned(id: string, pinned: boolean): void;
    isPinned(id: string): boolean;
    setStartOpen(open: boolean): void;
    setAppState(id: string, state: TaskbarAppState): void;
    /** Win10 display policy: pinned, running, open or minimized -> visible.
     * Only an unpinned + idle (closed, no activity) app is hidden. */
    private syncApp;
    /** Refresh icon + label + tooltip + click handler in place. */
    private paintApp;
    /** Right-click on an app button: Pin/Unpin context menu (Win10 style). */
    private showAppMenu;
    setAppTitle(id: string, title: string): void;
    setStatus(html: string | null): void;
    onClockClick(fn: () => void): void;
    startClock(tick?: () => void, intervalMs?: number): void;
    stopClock(): void;
    setAccent(accent: string): void;
    mount(target?: HTMLElement): HTMLDivElement;
    destroy(): void;
}
