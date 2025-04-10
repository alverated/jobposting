import { Alert, AlertDescription, AlertTitle } from '@/Components/ui/alert';
import { PageProps } from '@/types';
import { UserType } from '@/types/enums/userTypes';
import { JobPost } from '@/types/models/jobPost';
import { usePage } from '@inertiajs/react';
import { JobItem } from './JobItem';

export const JobItems = ({
    jobPosts,
    onEditClick,
    onDeleteClick,
}: {
    jobPosts: JobPost[];
    onEditClick: (jobPost: JobPost) => void;
    onDeleteClick: (jobPost: JobPost) => void;
}) => {
    const { props } = usePage<PageProps>();
    const { auth } = props;
    const { user } = auth;

    const generateAlertMessage = () => {
        if (user.type === UserType.USER) {
            return "You don't have any job post yet.";
        }

        return 'No more pending job posts.';
    };

    const generateAlertDescription = () => {
        if (user.type === UserType.USER) {
            return 'Click the [Create] button above to create a new job post.';
        }

        return 'Once there are new pending job posts, you will be notified.';
    };

    return (
        <div className="space-y-4">
            {jobPosts.map((jobPost) => (
                <JobItem
                    key={jobPost.id}
                    jobPost={jobPost}
                    onEditClick={onEditClick}
                    onDeleteClick={onDeleteClick}
                />
            ))}

            {jobPosts.length === 0 && (
                <Alert variant="default" className="col-span-2">
                    <AlertTitle className="text-base font-bold">
                        {generateAlertMessage()}
                    </AlertTitle>
                    <AlertDescription className="flex flex-col">
                        <div>{generateAlertDescription()}</div>
                    </AlertDescription>
                </Alert>
            )}
        </div>
    );
};
