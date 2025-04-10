export enum JobPostStatus {
    PENDING = 1,
    APPROVED = 2,
    SPAM = 3,
}

export const jobPostStatusLabels = {
    [JobPostStatus.PENDING]: 'Pending',
    [JobPostStatus.APPROVED]: 'Approved',
    [JobPostStatus.SPAM]: 'Spam',
};

export type JobPostStatusOption = {
    value: number;
    label: string;
};

export const jobPostStatuses: JobPostStatusOption[] = Object.values(
    JobPostStatus,
)
    .filter((status) => typeof status === 'number')
    .map((status) => ({
        value: status as number,
        label: jobPostStatusLabels[status as keyof typeof jobPostStatusLabels],
    }));
