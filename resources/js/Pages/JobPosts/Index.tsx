import { ConfirmationDialog } from '@/Components/ConfirmationDialog';
import { Button } from '@/Components/ui/button';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { UserType } from '@/types/enums/userTypes';
import { JobPost } from '@/types/models/jobPost';
import { Head, router, usePage, WhenVisible } from '@inertiajs/react';
import { LoaderCircleIcon, PlusIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import Form from './components/Form';
import { JobItems } from './components/JobItems';

type Props = {
    jobPosts: JobPost[];
    showMore: boolean;
    currentPage: number;
};

export const JobPostsIndex = ({
    jobPosts = [],
    showMore,
    currentPage,
}: Props) => {
    const { props } = usePage<PageProps>();
    const { auth } = props;
    const { user } = auth;

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
        useState(false);
    const [selectedJobPost, setSelectedJobPost] = useState<JobPost | null>(
        null,
    );

    const openCreateForm = () => {
        setSelectedJobPost(null);
        setIsFormOpen(true);
    };

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

    const loadMore = useMemo(() => {
        return {
            data: {
                page: currentPage + 1,
            },
            only: ['jobPosts', 'currentPage', 'showMore'],
            preserveUrl: true,
        };
    }, [currentPage]);

    return (
        <>
            <Head title="Job Posts" />
            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="dark:bg-gray-800">
                        <div className="mx-4 sm:mx-0">
                            {user.type === UserType.USER && (
                                <div className="mb-4 flex justify-end">
                                    <Button
                                        type="button"
                                        className="w-full sm:w-auto"
                                        onClick={openCreateForm}
                                    >
                                        <PlusIcon />
                                        Create
                                    </Button>
                                </div>
                            )}
                            <div className="">
                                <JobItems
                                    jobPosts={jobPosts}
                                    onEditClick={handleEditClick}
                                    onDeleteClick={handleDeleteClick}
                                />
                                {showMore && (
                                    <WhenVisible
                                        data=""
                                        params={loadMore}
                                        fallback={
                                            <div className="my-3 flex items-center justify-center gap-2 text-sm text-gray-500">
                                                <LoaderCircleIcon className="animate-spin" />
                                                Loading more job posts...
                                            </div>
                                        }
                                        always
                                    >
                                        <></>
                                    </WhenVisible>
                                )}
                            </div>
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

JobPostsIndex.displayName = 'JobPostsIndex';
JobPostsIndex.layout = (page: React.ReactNode) => (
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

export default JobPostsIndex;
