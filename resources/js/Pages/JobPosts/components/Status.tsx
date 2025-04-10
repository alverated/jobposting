import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
} from '@/Components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/Components/ui/popover';
import { PageProps } from '@/types';
import {
    JobPostStatus,
    jobPostStatuses,
    JobPostStatusOption,
} from '@/types/enums/jobPostStatus';
import { router } from '@inertiajs/react';
import { ChevronDownIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type Props = {
    jobId: number;
    status: JobPostStatus;
    editable?: boolean;
};

export default function Status({ jobId, status, editable = false }: Props) {
    const [open, setOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] =
        useState<JobPostStatusOption | null>(null);

    const getCurrentStatus = (status: JobPostStatus) => {
        switch (status) {
            case JobPostStatus.PENDING:
                return (
                    <Badge variant="secondary" className="uppercase">
                        Pending
                    </Badge>
                );
            case JobPostStatus.APPROVED:
                return (
                    <Badge variant="outline" className="uppercase">
                        Approved
                    </Badge>
                );
            case JobPostStatus.SPAM:
                return (
                    <Badge variant="destructive" className="uppercase">
                        Spam
                    </Badge>
                );
        }
    };

    const handleSelectStatus = (value: string) => {
        setSelectedStatus(
            jobPostStatuses.find(
                (status) => status.value === parseInt(value),
            ) || null,
        );

        router.patch(
            route('job-posts.update-status', {
                jobPost: jobId,
                jobPostStatus: Number(value),
            }),
            {},
            {
                preserveScroll: true,
                onSuccess: ({ props }) => {
                    const { flash } = (props as unknown as PageProps) || {};
                    const { success = '' } = flash || {};
                    if (success) toast.success(success);
                },
                onFinish: () => {
                    setOpen(false);
                },
            },
        );
    };

    useEffect(() => {
        if (status) {
            setSelectedStatus(
                jobPostStatuses.find((s) => s.value === status) || null,
            );
        }
    }, [status]);

    return (
        <div className="flex items-center space-x-4">
            {!editable ? (
                <div className="text-sm text-muted-foreground">
                    {getCurrentStatus(status)}
                </div>
            ) : (
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            size={editable ? 'default' : 'sm'}
                            variant="outline"
                            className="justify-start [&_svg]:size-3"
                        >
                            {selectedStatus ? (
                                <>
                                    {selectedStatus.label}
                                    <ChevronDownIcon />
                                </>
                            ) : (
                                <>+ Change status</>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0" side="right" align="start">
                        <Command>
                            <CommandList>
                                <CommandGroup>
                                    {jobPostStatuses.map((status) => (
                                        <CommandItem
                                            key={status.value}
                                            value={status.value.toString()}
                                            onSelect={handleSelectStatus}
                                        >
                                            {status.label}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            )}
        </div>
    );
}
