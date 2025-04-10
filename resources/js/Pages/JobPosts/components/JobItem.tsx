import Tooltip from '@/Components/Tooltip';
import { Button } from '@/Components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import { truncateString } from '@/lib/utils';
import { PageProps } from '@/types';
import { UserType } from '@/types/enums/userTypes';
import { JobPost } from '@/types/models/jobPost';
import { Link, usePage } from '@inertiajs/react';
import { ChevronRightIcon, PencilIcon, TrashIcon } from 'lucide-react';
import moment from 'moment-timezone';
import Status from './Status';

type Props = {
    jobPost: JobPost;
    onEditClick: (jobPost: JobPost) => void;
    onDeleteClick: (jobPost: JobPost) => void;
};

export const JobItem = ({ jobPost, onEditClick, onDeleteClick }: Props) => {
    const { props } = usePage<PageProps>();
    const { auth } = props;
    const { user } = auth;

    const truncatedDescription = truncateString(jobPost.description, 320);

    return (
        <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader className="space-y-0 pb-2">
                <CardTitle className="cursor-pointer text-lg font-bold text-blue-800 hover:underline">
                    <Link href={route('job-posts.show', jobPost.id)}>
                        {jobPost.title}
                    </Link>
                </CardTitle>
                <CardDescription className="mt-0 text-base font-semibold text-gray-600">
                    {jobPost.company_name} - {jobPost.location}
                </CardDescription>
                {jobPost.user && (
                    <div className="text-xs font-normal text-gray-500">
                        Posted by: {jobPost.user.name}
                    </div>
                )}
            </CardHeader>
            <CardContent className="pb-2 text-sm">
                <div className="pb-3 text-gray-500">{truncatedDescription}</div>
                <div className="flex space-x-1 text-xs text-gray-600">
                    <Tooltip
                        delay={500}
                        message={moment(jobPost.created_at).format(
                            'MMM DD, YYYY hh:mm A',
                        )}
                    >
                        <div className="flex cursor-pointer items-center">
                            <span>{moment(jobPost.created_at).fromNow()}</span>
                        </div>
                    </Tooltip>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between space-x-2">
                <div>
                    <Status jobId={jobPost.id} status={jobPost.status} />
                </div>
                {user.type === UserType.USER ? (
                    <div className="flex gap-2">
                        <Button size="sm" onClick={() => onEditClick(jobPost)}>
                            <PencilIcon size={16} />
                        </Button>
                        <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => onDeleteClick(jobPost)}
                        >
                            <TrashIcon size={16} />
                        </Button>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <Button size="sm" asChild>
                            <Link href={route('job-posts.show', jobPost.id)}>
                                <ChevronRightIcon size={16} />
                            </Link>
                        </Button>
                    </div>
                )}
            </CardFooter>
        </Card>
    );
};
