import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const Dashboard = () => {
    const { props } = usePage<PageProps>();
    const { auth } = props;
    const { user } = auth;

    return (
        <>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            Welcome, {user.name}!
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

Dashboard.displayName = 'Dashboard';
Dashboard.layout = (page: React.ReactNode) => (
    <AuthenticatedLayout
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                Dashboard
            </h2>
        }
    >
        {page}
    </AuthenticatedLayout>
);

export default Dashboard;
