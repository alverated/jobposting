import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/Components/ui/dialog';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { autoFocus } from '@/lib/utils';
import { PageProps } from '@/types';
import { JobPost } from '@/types/models/jobPost';
import { useForm } from '@inertiajs/react';
import { BriefcaseBusinessIcon, Loader2Icon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

interface FormProps {
    open: boolean;
    onClose: () => void;
    jobPost: JobPost | null;
}

const Form = ({ open, onClose, jobPost }: FormProps) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const { data, setData, post, patch, processing, errors, clearErrors } =
        useForm({
            title: jobPost?.title || '',
            location: jobPost?.location || '',
            company_name: jobPost?.company_name || '',
            description: jobPost?.description || '',
        });

    const handleCancel = () => onClose();

    const handleOnOpenChange = () => open && onClose();

    const handleInputChange = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    ) => {
        const { name, value } = e.target;
        setData(name as keyof typeof data, value);
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        clearErrors();

        if (jobPost?.id) {
            patch(route('job-posts.update', { id: jobPost?.id }), {
                onSuccess: ({ props }) => {
                    const { flash } = (props as unknown as PageProps) || {};
                    const { success = '' } = flash || {};
                    if (success) toast.success(success);
                    onClose();
                },
            });
        } else {
            post(route('job-posts.store'), {
                onSuccess: ({ props }) => {
                    const { flash } = (props as unknown as PageProps) || {};
                    const { success = '' } = flash || {};
                    if (success) toast.success(success);
                    onClose();
                },
            });
        }
    };

    useEffect(() => {
        if (open && jobPost) {
            setData('title', jobPost?.title || '');
            setData('location', jobPost?.location || '');
            setData('company_name', jobPost?.company_name || '');
            setData('description', jobPost?.description || '');
        } else {
            setData('title', '');
            setData('location', '');
            setData('company_name', '');
            setData('description', '');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [jobPost, open]);

    return (
        <Dialog open={open} onOpenChange={handleOnOpenChange} modal>
            <DialogContent
                className="sm:max-w-screen-sm"
                aria-describedby={undefined}
                onInteractOutside={(e) => e.preventDefault()}
                onOpenAutoFocus={(e) => {
                    e.preventDefault();
                    if (open) autoFocus(textAreaRef);
                }}
            >
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <BriefcaseBusinessIcon size={18} />
                        {jobPost?.title?.length
                            ? 'Edit Job Post'
                            : 'Create a Job Post'}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                            <Label>Title</Label>
                            <Input
                                name="title"
                                value={data.title}
                                onChange={handleInputChange}
                                autoFocus
                            />
                            <InputError message={errors.title} />
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                            <Label>Location</Label>
                            <Input
                                name="location"
                                value={data.location}
                                onChange={handleInputChange}
                            />
                            <InputError message={errors.location} />
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                            <Label>Company Name</Label>
                            <Input
                                name="company_name"
                                value={data.company_name}
                                onChange={handleInputChange}
                            />
                            <InputError message={errors.company_name} />
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                            <Label>Description</Label>
                            <Textarea
                                className="max-h-72 min-h-28"
                                name="description"
                                value={data.description}
                                onChange={handleInputChange}
                            />
                            <InputError message={errors.description} />
                        </div>
                    </div>
                    <DialogFooter className="mt-4">
                        <Button type="submit" disabled={processing}>
                            {processing && (
                                <Loader2Icon className="mr-2 size-4 animate-spin" />
                            )}
                            {jobPost?.title?.length ? 'Update' : 'Submit'}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default Form;
