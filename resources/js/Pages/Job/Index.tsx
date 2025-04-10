import Tooltip from '@/Components/Tooltip';
import { Button } from '@/Components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import AppLayout from '@/Layouts/AppLayout';
import { JobPost } from '@/types/models/jobPost';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeftIcon } from 'lucide-react';
import moment from 'moment-timezone';
import Status from '../JobPosts/components/Status';

type Props = {
    jobPost: JobPost | null;
};

const JobIndex = ({ jobPost }: Props) => {
    if (!jobPost) {
        return <div>Job not found</div>;
    }

    console.log(jobPost);

    return (
        <>
            <Head title={`${jobPost.title}`} />
            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="dark:bg-gray-800">
                        <div className="mx-4 sm:mx-0">
                            <div className="mb-4 flex justify-between">
                                <Button asChild>
                                    <Link href={route('home')}>
                                        <ArrowLeftIcon />
                                        Back
                                    </Link>
                                </Button>
                            </div>
                            <Card className="transition-all duration-300">
                                <CardHeader className="space-y-0">
                                    <div className="mb-2">
                                        <Status
                                            jobId={jobPost.id}
                                            status={jobPost.status}
                                        />
                                    </div>
                                    <CardTitle className="text-lg font-bold text-blue-800">
                                        <h1>{jobPost.title}</h1>
                                    </CardTitle>
                                    <CardDescription className="text-base font-semibold text-gray-600">
                                        {jobPost.company_name} -{' '}
                                        {jobPost.location}
                                    </CardDescription>
                                    <div className="!mt-1 flex space-x-1 text-xs text-gray-600">
                                        <Tooltip
                                            delay={500}
                                            message={moment(
                                                jobPost.created_at,
                                            ).format('MMM DD, YYYY hh:mm A')}
                                        >
                                            <div className="flex cursor-pointer items-center">
                                                <span>
                                                    {moment(
                                                        jobPost.created_at,
                                                    ).fromNow()}
                                                </span>
                                            </div>
                                        </Tooltip>
                                    </div>
                                </CardHeader>
                                <CardContent className="pb-2 text-sm">
                                    <div
                                        className="whitespace-pre-line pb-3 text-gray-500"
                                        dangerouslySetInnerHTML={{
                                            __html: jobPost.description,
                                        }}
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

JobIndex.displayName = 'JobIndex';
JobIndex.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;

export default JobIndex;
