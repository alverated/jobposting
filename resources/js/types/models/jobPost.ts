import { JobPostStatus } from '../enums/jobPostStatus';
import { User } from './user';

export interface JobPost {
    id: number;
    title: string;
    description: string;
    location: string;
    company_name: string;
    status: JobPostStatus;
    created_at: string;
    updated_at: string;
    is_external?: boolean;
    // relationships
    user: User;
}
