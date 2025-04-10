import ConfirmationDialog from '@/Components/ConfirmationDialog';
import Tooltip from '@/Components/Tooltip';
import { Button } from '@/Components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { UserType } from '@/types/enums/userTypes';
import { JobPost } from '@/types/models/jobPost';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { ArrowLeftIcon, PencilIcon, TrashIcon } from 'lucide-react';
import moment from 'moment-timezone';
import { useState } from 'react';
import { toast } from 'sonner';
import Form from './components/Form';
import Status from './components/Status';

type Props = {
    jobPost: JobPost;
};

export const JobPostsShow = ({ jobPost }: Props) => {
    const { props } = usePage<PageProps>();
    const { auth } = props;
    const { user } = auth;

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
        useState(false);
    const [selectedJobPost, setSelectedJobPost] = useState<JobPost | null>(
        null,
    );

    const closeForm = () => {
        setIsFormOpen(false);
    };

    const handleEditClick = (jobPost: JobPost) => {
        setSelectedJobPost(jobPost);
        setIsFormOpen(true);
    };

    const handleDeleteClick = (jobPost: JobPost) => {
        setSelectedJobPost(jobPost);
        setIsConfirmationDialogOpen(true);
    };

    const closeConfirmationDialog = () => {
        setIsConfirmationDialogOpen(false);
    };

    const handleConfirmDelete = () => {
        if (selectedJobPost) {
            router.delete(route('job-posts.destroy', selectedJobPost.id), {
                preserveScroll: true,
                onSuccess: ({ props }) => {
                    const { flash } = (props as unknown as PageProps) || {};
                    const { success = '' } = flash || {};
                    if (success) toast.success(success);
                },
                onFinish: () => {
                    setIsConfirmationDialogOpen(false);
                },
            });
        }
    };

    return (
        <>
            <Head title="Job Posts" />
            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="dark:bg-gray-800">
                        <div className="mx-4 sm:mx-0">
                            <div className="mb-4 flex justify-between">
                                <Button asChild>
                                    <Link href={route('job-posts.index')}>
                                        <ArrowLeftIcon />
                                        Back
                                    </Link>
                                </Button>

                                {user.type === UserType.USER && (
                                    <div className="flex gap-1">
                                        <Button
                                            onClick={() =>
                                                handleEditClick(jobPost)
                                            }
                                        >
                                            <PencilIcon size={16} />
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            onClick={() =>
                                                handleDeleteClick(jobPost)
                                            }
                                        >
                                            <TrashIcon size={16} />
                                        </Button>
                                    </div>
                                )}

                                {user.type === UserType.MODERATOR && (
                                    <Status
                                        jobId={jobPost.id}
                                        status={jobPost.status}
                                        editable
                                    />
                                )}
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
                                    {user.type === UserType.MODERATOR && (
                                        <div className="!mt-2 text-xs font-normal text-gray-500">
                                            Posted by: {jobPost.user.name}
                                        </div>
                                    )}
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
                                    <div className="whitespace-pre-wrap pb-3 text-gray-500">
                                        {jobPost.description}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
            <Form
                open={isFormOpen}
                onClose={closeForm}
                jobPost={selectedJobPost}
            />
            <ConfirmationDialog
                open={isConfirmationDialogOpen}
                onClose={closeConfirmationDialog}
                onDelete={handleConfirmDelete}
                title="Delete Job Post"
                description="Are you sure you want to delete this job post?"
                cancelText="Cancel"
                confirmText="Yes, Delete it!"
            />
        </>
    );
};

JobPostsShow.displayName = 'JobPostsShow';
JobPostsShow.layout = (page: React.ReactNode) => (
    <AuthenticatedLayout
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                Job Posts
            </h2>
        }
    >
        {page}
    </AuthenticatedLayout>
);

export default JobPostsShow;
