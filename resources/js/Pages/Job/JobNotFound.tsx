import { Button } from '@/Components/ui/button';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeftIcon } from 'lucide-react';

export const JobNotFound = () => {
    return (
        <>
            <Head title="Job Not Found" />
            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="dark:bg-gray-800">
                        <div className="mx-auto max-w-2xl items-center justify-center text-center">
                            <h2 className="text-2xl font-bold">
                                Job not found
                            </h2>
                            <p className="text-gray-500">
                                The job you are looking for does not exist.
                            </p>
                            <Button variant="outline" asChild className="mt-4">
                                <Link href={route('home')}>
                                    <ArrowLeftIcon />
                                    Back
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
