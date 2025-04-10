import { Config } from 'ziggy-js';
import { User } from './models/user';

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
    flash: {
        success?: string;
        error?: string;
        status?: string;
    };
    app: {
        name: string;
    };
};
