export interface Win10MenuOptions {
    id: string;
    x: number;
    y: number;
    dark?: boolean;
    accent?: string;
    build: (menu: HTMLDivElement) => void;
}
export declare function closeWin10Menu(id: string): void;
export declare function closeAllWin10Menus(): void;
export declare function w10Separator(): HTMLDivElement;
export declare function w10MenuItem(label: string, sub?: string): HTMLButtonElement;
export declare function w10MenuHeader(title: string, sub?: string): HTMLDivElement;
export declare function showWin10Menu(opts: Win10MenuOptions): HTMLDivElement;
