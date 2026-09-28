/** Settings-style section title ("Appearance", "Quality"...). */
export declare function w10GroupTitle(text: string): HTMLDivElement;
export declare function w10Desc(text: string): HTMLDivElement;
export declare function w10Button(label: string, onClick: (e: MouseEvent) => void, small?: boolean): HTMLButtonElement;
export declare function w10Toggle(label: string, desc: string, get: () => boolean, set: (v: boolean) => void): HTMLDivElement;
export declare function w10TextRow(label: string, desc: string, get: () => string, set: (v: string) => void): HTMLDivElement;
export declare function w10TextareaRow(label: string, desc: string, get: () => string, set: (v: string) => void, rows?: number): HTMLDivElement;
export type W10ComboOption = {
    value: string;
    label: string;
};
export declare function w10ComboRow(label: string, desc: string, options: W10ComboOption[], get: () => string, set: (v: string) => void): HTMLDivElement;
/**
 * Official Win10 toggle switch (pill + knob). Unlike the square checkbox,
 * this is the switch used across Windows 10 Settings pages.
 */
export declare function w10Switch(label: string, desc: string, get: () => boolean, set: (v: boolean) => void): HTMLDivElement;
/** Official Win10 radio buttons (vertical group, circle + dot). */
export declare function w10RadioGroup(options: {
    value: string;
    label: string;
    desc?: string;
}[], get: () => string, set: (v: string) => void): HTMLDivElement;
/** Official Win10 progress bar. `value` 0..100, or null for indeterminate marquee. */
export declare function w10Progress(value: number | null): {
    el: HTMLDivElement;
    set: (v: number | null) => void;
};
/** Official Win10 slider (square thumb, accent fill on hover/focus). */
export declare function w10Slider(label: string, min: number, max: number, step: number, get: () => number, set: (v: number) => void): HTMLDivElement;
/** ListView row: optional icon + title + sub, full-width hover like Win10 lists. */
export declare function w10ListItem(opts: {
    iconHTML?: string;
    title: string;
    sub?: string;
    selected?: boolean;
    onClick?: (e: MouseEvent) => void;
}): HTMLButtonElement;
/** Thin horizontal divider. */
export declare function w10Divider(): HTMLDivElement;
/** Big number + label hero block. */
export declare function w10Hero(num: string, label: string, numClass?: string): HTMLDivElement;
