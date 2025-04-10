import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const autoFocus = (ref: React.RefObject<HTMLElement | null>) => {
    setTimeout(() => {
        ref.current?.focus();
        const length =
            (ref.current as HTMLInputElement | HTMLTextAreaElement)?.value
                .length || 0;
        (
            ref.current as HTMLInputElement | HTMLTextAreaElement
        )?.setSelectionRange(length, length);
    }, 10);
};

export function truncateString(str: string, maxLength: number): string {
    return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
}
