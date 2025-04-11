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
import {
    jobPostStatuses,
    JobPostStatusOption,
} from '@/types/enums/jobPostStatus';
import { router } from '@inertiajs/react';
import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';

const jobStatuses = [
    {
        value: 0,
        label: 'All',
    },
    ...jobPostStatuses,
];

type Props = {
    selectedStatus: JobPostStatusOption | null;
};

export default function Filter({ selectedStatus }: Props) {
    const [open, setOpen] = useState(false);

    const handleSelectStatus = (value: string) => {
        router.get(route('job-posts.index'), {
            status: jobStatuses
                .find((status) => status.value === parseInt(value))
                ?.label.toLowerCase(),
        });
    };

    return (
        <div className="flex items-center space-x-4">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        size="default"
                        variant="outline"
                        className="justify-start [&_svg]:size-3"
                    >
                        {selectedStatus ? (
                            <>
                                {selectedStatus.label}
                                <ChevronDownIcon />
                            </>
                        ) : (
                            <>
                                All <ChevronDownIcon />
                            </>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0" side="right" align="start">
                    <Command>
                        <CommandList>
                            <CommandGroup>
                                {jobStatuses.map((status) => (
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
        </div>
    );
}
