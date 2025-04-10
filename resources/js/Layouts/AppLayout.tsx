import { Button } from '@/Components/ui/button';
import { TooltipProvider } from '@/Components/ui/tooltip';
import { PageProps } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function AppLayout({ children }: PropsWithChildren) {
    const { props } = usePage<PageProps>();
    const { auth } = props;
    const { user } = auth;

    return (
        <TooltipProvider delayDuration={0}>
            <div className="min-h-screen bg-gray-100">
                <header className="bg-white shadow-sm">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                        <nav className="flex h-16 items-center space-x-2 sm:space-x-6">
                            <div className="shrink-0 sm:flex">
                                <span className="text-lg font-bold">
                                    Job Posting
                                </span>
                            </div>
                        </nav>
                        <div className="flex items-center space-x-2">
                            {user ? (
                                <Button variant="outline" asChild>
                                    <Link href={route('dashboard')}>
                                        Dashboard
                                    </Link>
                                </Button>
                            ) : (
                                <>
                                    <Button variant="outline" asChild>
                                        <Link href={route('login')}>Login</Link>
                                    </Button>
                                    <Button variant="outline" asChild>
                                        <Link href={route('register')}>
                                            Register
                                        </Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </header>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="">{children}</div>
                </div>
            </div>
        </TooltipProvider>
    );
}
