import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/Components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { buttonVariants } from './ui/button';

type Props = {
    type?:
        | 'destructive'
        | 'link'
        | 'default'
        | 'outline'
        | 'secondary'
        | 'ghost';
    open: boolean;
    onClose: () => void;
    onDelete: () => void;
    title: string;
    description: string;
    cancelText?: string;
    confirmText?: string;
    actionLoader?: boolean;
};

export const ConfirmationDialog = ({
    type = 'default',
    open,
    onClose,
    onDelete,
    title,
    description,
    cancelText = 'Cancel',
    confirmText = 'Continue',
    actionLoader = false,
}: Props) => {
    const handleConfirmDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (actionLoader) return;

        onDelete();
    };

    const handleCancel = () => {
        if (actionLoader) return;

        onClose();
    };

    const handleOpenChange = (isOpen: boolean) => {
        if (actionLoader) return;

        if (!isOpen) {
            handleCancel();
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={handleOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        onClick={handleCancel}
                        disabled={actionLoader}
                    >
                        {cancelText}
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleConfirmDelete}
                        className={cn(buttonVariants({ variant: type }))}
                        disabled={actionLoader}
                    >
                        {actionLoader && (
                            <Loader2 className="size-4 animate-spin" />
                        )}
                        {confirmText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ConfirmationDialog;
