import Tooltip from '@/Components/Tooltip';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import { truncateString } from '@/lib/utils';
import { JobPost } from '@/types/models/jobPost';
import { Link } from '@inertiajs/react';
import moment from 'moment-timezone';

type Props = {
    jobPost: JobPost;
};

const JobItem = ({ jobPost }: Props) => {
    return (
        <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader className="space-y-0 pb-2">
                <CardTitle className="cursor-pointer text-lg font-bold text-blue-800 hover:underline">
                    <Link href={route('job.show', { jobId: jobPost.id })}>
                        {jobPost.title}
                    </Link>
                </CardTitle>
                <CardDescription className="mt-0 text-base font-semibold text-gray-600">
                    {jobPost.company_name} - {jobPost.location}
                </CardDescription>
            </CardHeader>
            <CardContent className="text-sm">
                <div className="pb-3 text-gray-500">
                    {truncateString(jobPost.description, 100)}
                </div>
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
        </Card>
    );
};

export default JobItem;
