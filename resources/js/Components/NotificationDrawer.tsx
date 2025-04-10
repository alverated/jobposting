import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/Components/ui/sheet';
import { useNotification } from '@/contexts/notification';
import { PaginatedResponse } from '@/helpers';
import { cn } from '@/lib/utils';
import { Notification } from '@/types/models';
import { router } from '@inertiajs/react';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import {
    BellIcon,
    BellRingIcon,
    BriefcaseBusinessIcon,
    Trash2Icon,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

const NotificationDrawer = () => {
    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const { unreadCount, refreshUnreadCount } = useNotification();

    const toggleDrawer = () => setOpen(!open);

    const fetchNotifications = async (page: number = 1) => {
        try {
            const response = await axios.get<PaginatedResponse<Notification>>(
                route('notifications.index', { page }),
            );
            if (page === 1) {
                setNotifications(response.data.data);
            } else {
                setNotifications((prev) => [...prev, ...response.data.data]);
            }
            setCurrentPage(response.data.current_page);
            setHasMore(response.data.current_page < response.data.last_page);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    const loadMore = async () => {
        if (loadingMore || !hasMore) return;
        setLoadingMore(true);
        await fetchNotifications(currentPage + 1);
    };

    const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
        const target = event.target as HTMLDivElement;
        const scrollPosition = target.scrollTop;
        const scrollHeight = target.scrollHeight;
        const clientHeight = target.clientHeight;

        // If we're within 100px of the bottom, load more
        if (scrollHeight - scrollPosition - clientHeight < 100) {
            loadMore();
        }
    };

    const markAsRead = async (notificationId: string) => {
        try {
            await axios.post(
                route('notifications.mark-as-read', {
                    notification: notificationId,
                }),
            );

            setNotifications(
                notifications.map((notification) =>
                    notification.id === notificationId
                        ? { ...notification, read_at: new Date().toISOString() }
                        : notification,
                ),
            );

            await refreshUnreadCount();
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    const markAllAsRead = async () => {
        try {
            await axios.post(route('notifications.mark-all-as-read'));
            setNotifications(
                notifications.map((notification) => ({
                    ...notification,
                    read_at: new Date().toISOString(),
                })),
            );
            await refreshUnreadCount();
        } catch (error) {
            console.error('Error marking all notifications as read:', error);
        }
    };

    const clearNotifications = async () => {
        try {
            await axios.delete(route('notifications.clear'));
            setNotifications([]);
        } catch (error) {
            console.error('Error clearing notifications:', error);
        }
    };

    const deleteNotification = async (notificationId: string) => {
        try {
            await axios.delete(
                route('notifications.destroy', {
                    notification: notificationId,
                }),
            );
            setNotifications(
                notifications.filter(
                    (notification) => notification.id !== notificationId,
                ),
            );
            await refreshUnreadCount();
            toast.success('Notification has been deleted.');
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    };

    const handleNotificationClick = (notification: Notification) => {
        if (!notification.read_at) {
            markAsRead(notification.id);
        }

        router.visit(notification.data.action_url);

        setOpen(false);
    };

    useEffect(() => {
        if (open) {
            setCurrentPage(1);
            setHasMore(true);
            fetchNotifications(1);
        }
    }, [open]);

    const getIcon = (iconName: string) => {
        switch (iconName) {
            case 'BriefcaseBusinessIcon':
                return <BriefcaseBusinessIcon size={20} />;
            case 'BellIcon':
                return <BellIcon size={20} />;
            case 'BellRingIcon':
                return <BellRingIcon size={20} />;
            default:
                return <BellIcon size={20} />;
        }
    };

    return (
        <>
            <div className="relative">
                <Button
                    size="icon"
                    className="size-7 rounded-full"
                    onClick={toggleDrawer}
                    variant="ghost"
                >
                    <BellIcon />
                    {unreadCount > 0 && (
                        <>
                            <span className="absolute right-1.5 top-1 rounded-full bg-red-500 p-1"></span>
                            <span className="absolute right-1.5 top-1 animate-ping rounded-full bg-red-500 p-1"></span>
                        </>
                    )}
                </Button>
            </div>
            <Sheet open={open} onOpenChange={toggleDrawer} modal={true}>
                <SheetContent
                    className="gap-0 p-0"
                    aria-describedby={undefined}
                >
                    <SheetHeader className="shadow-xs border-b p-4">
                        <div className="flex flex-col items-start gap-2">
                            <div>
                                <SheetTitle>Notifications</SheetTitle>
                            </div>
                            {notifications.length > 0 && (
                                <div className="flex gap-2">
                                    <Button
                                        size="xs"
                                        variant="outline"
                                        onClick={markAllAsRead}
                                    >
                                        Mark All As Read
                                    </Button>
                                    <Button
                                        size="xs"
                                        variant="ghost"
                                        onClick={clearNotifications}
                                    >
                                        Clear
                                    </Button>
                                </div>
                            )}
                        </div>
                    </SheetHeader>
                    <ScrollArea
                        className="h-[calc(100dvh-78px)]"
                        type="scroll"
                        onScrollCapture={handleScroll}
                        ref={scrollAreaRef}
                    >
                        <div className="divide-y">
                            {loading ? (
                                <div className="flex items-center justify-center py-8">
                                    <div className="size-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
                                </div>
                            ) : notifications.length === 0 ? (
                                <div className="flex items-center justify-center py-8 text-sm text-gray-500">
                                    You have no notifications!
                                </div>
                            ) : (
                                <>
                                    {notifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={cn(
                                                'flex cursor-pointer items-center justify-between px-4 py-4 transition-colors duration-200 ease-in-out hover:bg-gray-100',
                                                !notification.read_at &&
                                                    'bg-blue-50',
                                            )}
                                            onClick={() =>
                                                handleNotificationClick(
                                                    notification,
                                                )
                                            }
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="flex size-10 flex-none items-center justify-center rounded-full bg-gray-200">
                                                    {getIcon(
                                                        notification.data
                                                            .icon ||
                                                            'BriefcaseBusinessIcon',
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {
                                                            notification.data
                                                                .title
                                                        }
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {
                                                            notification.data
                                                                .message
                                                        }
                                                    </p>

                                                    <p className="text-sm font-bold text-gray-500">
                                                        {
                                                            notification.data
                                                                .job_title
                                                        }
                                                    </p>
                                                    <p className="mt-1 text-xs text-gray-400">
                                                        {formatDistanceToNow(
                                                            new Date(
                                                                notification.created_at,
                                                            ),
                                                            { addSuffix: true },
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    deleteNotification(
                                                        notification.id,
                                                    );
                                                }}
                                                className="ml-4 size-7 rounded-full hover:bg-gray-200"
                                            >
                                                <Trash2Icon
                                                    size={16}
                                                    className="text-gray-500"
                                                />
                                            </Button>
                                        </div>
                                    ))}
                                    {loadingMore && (
                                        <div className="flex justify-center py-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <div className="size-4 animate-spin rounded-full border-2 border-gray-500 border-t-transparent"></div>
                                                Loading more...
                                            </div>
                                        </div>
                                    )}
                                    {!loadingMore && hasMore && (
                                        <div className="h-4 w-full" />
                                    )}
                                    {!loadingMore &&
                                        !hasMore &&
                                        notifications.length > 0 && (
                                            <div className="flex justify-center py-4 text-sm text-gray-500">
                                                You're all caught up!
                                            </div>
                                        )}
                                </>
                            )}
                        </div>
                    </ScrollArea>
                </SheetContent>
            </Sheet>
        </>
    );
};

export default NotificationDrawer;
