import React from 'react';
import {
    TooltipContent,
    Tooltip as TooltipRoot,
    TooltipTrigger,
} from './ui/tooltip';

interface TooltipProps {
    children: React.JSX.Element;
    message: string | React.JSX.Element;
    delay?: number;
    side?: 'top' | 'right' | 'bottom' | 'left';
    align?: 'start' | 'center' | 'end';
    className?: string;
}

export default function Tooltip({
    message,
    delay = 200,
    children,
    side,
    align,
    className,
}: TooltipProps) {
    return (
        <TooltipRoot delayDuration={delay}>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
            <TooltipContent className={className} side={side} align={align}>
                {message}
            </TooltipContent>
        </TooltipRoot>
    );
}
