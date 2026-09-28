export interface W10CalendarOptions {
    value?: Date;
    /** BCP47 tag for month/day names (default runtime locale). */
    locale?: string;
    /** Monday-first columns like Windows 10 default (default true). */
    mondayFirst?: boolean;
    dark?: boolean;
    accent?: string;
    onPick?: (date: Date) => void;
}
export interface W10Calendar {
    el: HTMLDivElement;
    setValue: (d: Date) => void;
    sync: () => void;
}
export declare function w10Calendar(opts?: W10CalendarOptions): W10Calendar;
