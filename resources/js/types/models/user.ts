import { UserType } from '../enums/userTypes';

export interface User {
    id: number;
    name: string;
    type: UserType;
    email: string;
    email_verified_at?: string;
}
