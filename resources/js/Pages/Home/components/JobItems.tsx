import { JobPost } from '@/types/models/jobPost';
import JobItem from './JobItem';

type Props = {
    jobPosts: JobPost[];
};

const JobItems = ({ jobPosts }: Props) => {
    return (
        <>
            {jobPosts.map((jobPost) => (
                <JobItem
                    key={`${jobPost.is_external ? 'external' : 'local'}-${jobPost.id}`}
                    jobPost={jobPost}
                />
            ))}
        </>
    );
};

export default JobItems;
