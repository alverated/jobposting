import AppLayout from '@/Layouts/AppLayout';
import { JobPost } from '@/types/models/jobPost';
import { Head, WhenVisible } from '@inertiajs/react';
import { LoaderCircleIcon } from 'lucide-react';
import { useMemo } from 'react';
import JobItems from './components/JobItems';

type Props = {
    externalJobs: JobPost[];
    jobs: JobPost[];
    currentPage: number;
    showMore: boolean;
};

export const Index = ({ externalJobs, jobs, currentPage, showMore }: Props) => {
    const loadMore = useMemo(() => {
        return {
            data: {
                page: currentPage + 1,
            },
            only: ['jobs', 'currentPage', 'showMore'],
            preserveUrl: true,
        };
    }, [currentPage]);

    return (
        <>
            <Head title="Explore Thousands of Jobs Near You" />
            <div className="flex flex-col gap-4 py-6">
                <JobItems jobPosts={externalJobs} />
                <JobItems jobPosts={jobs} />
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
        </>
    );
};

Index.displayName = 'HomeIndex';
Index.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;

export default Index;
