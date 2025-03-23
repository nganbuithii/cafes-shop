export type ShiftEvent = {
    id: string;
    title: string;
    start: string;
    color: string;
};
export interface ShiftFormDrawerProps {
    date: string | null;
    isOpen: boolean;
    onClose: () => void;
}