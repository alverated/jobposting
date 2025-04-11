import { Button } from '@/Components/ui/button';
import { Head } from '@inertiajs/react';
import { ServerCrashIcon } from 'lucide-react';

export default function ErrorPage({ status }: { status: number }) {
    const title = {
        503: '503: Service Unavailable',
        500: '500: Server Error',
        404: '404: Page Not Found',
        403: '403: Forbidden',
    }[status];

    const description = {
        503: 'Sorry, we are doing some maintenance. Please check back soon.',
        500: 'Whoops, something went wrong on our servers.',
        404: 'Sorry, the page you are looking for could not be found.',
        403: 'Sorry, you are forbidden from accessing this page.',
    }[status];

    const goBack = () => {
        if (typeof window !== 'undefined') {
            window.history.length > 1
                ? window.history.back()
                : (window.location.href = '/');
        }
    };

    return (
        <>
            <Head title={title} />
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="flex items-center gap-6 rounded-lg border-2 border-gray-200 bg-gray-100 p-6">
                    <ServerCrashIcon className="size-10 text-gray-700" />
                    <div className="grid gap-6">
                        <div className="gap-2">
                            <h2 className="text-2xl text-gray-700">{title}</h2>
                            <p className="text-gray-600">{description}</p>
                        </div>
                        <Button
                            variant="default"
                            className="w-fit"
                            onClick={goBack}
                        >
                            Go Back
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
