export interface TaskbarAppState {
    /** The app is running -> accent underline visible. */
    running: boolean;
    /** The window is visible and not minimized -> highlighted background. */
    open: boolean;
}
export declare class Win10Taskbar {
    readonly el: HTMLDivElement;
    private apps;
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
    /** Real Win10 app: icon + label, wide, with accent bar while running. */
    addApp(opts: {
        id: string;
        iconHTML: string;
        label: string;
        title?: string;
        onClick: () => void;
    }): HTMLButtonElement;
    removeApp(id: string): void;
    setStartOpen(open: boolean): void;
    setAppState(id: string, state: TaskbarAppState): void;
    setAppTitle(id: string, title: string): void;
    setStatus(html: string | null): void;
    onClockClick(fn: () => void): void;
    startClock(tick?: () => void, intervalMs?: number): void;
    stopClock(): void;
    setAccent(accent: string): void;
    mount(target?: HTMLElement): HTMLDivElement;
    destroy(): void;
}
