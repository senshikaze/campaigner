export interface MenuItem {
    text: string;
    title?: string;
    action?: () => void;
    link?: string[];
}
