import { type Win10Theme } from "./window.js";
export type MsgBoxIcon = "none" | "info" | "warning" | "error" | "question";
export interface MsgBoxButton {
    id: string;
    label: string;
    /** Activated by Enter (initial focus). */
    isDefault?: boolean;
    /** Activated by Escape / X (else first non-default). */
    isCancel?: boolean;
}
export interface MsgBoxOptions {
    title: string;
    /** Message text (multi-line via \n). */
    text: string;
    icon?: MsgBoxIcon;
    buttons: MsgBoxButton[];
    theme?: Win10Theme;
    accent?: string;
    width?: number;
}
/** Show a modal dialog, resolve with the clicked button id. */
export declare function showWin10MsgBox(opts: MsgBoxOptions): Promise<string>;
/** Yes/No confirm with the official question icon (VBS style). */
export declare function confirmWin10(title: string, text: string, labels: {
    yes: string;
    no: string;
}, extra?: Partial<MsgBoxOptions>): Promise<boolean>;
