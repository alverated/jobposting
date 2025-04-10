import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

interface NotificationContextType {
    unreadCount: number;
    refreshUnreadCount: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
    undefined,
);

export function NotificationProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [unreadCount, setUnreadCount] = useState(0);

    const fetchUnreadCount = async () => {
        try {
            const response = await axios.get<number>(
                route('notifications.unread-count'),
            );
            setUnreadCount(response.data);
        } catch (error) {
            console.error('Error fetching unread count:', error);
        }
    };

    useEffect(() => {
        fetchUnreadCount();
        const interval = setInterval(fetchUnreadCount, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <NotificationContext.Provider
            value={{
                unreadCount,
                refreshUnreadCount: fetchUnreadCount,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotification() {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error(
            'useNotification must be used within a NotificationProvider',
        );
    }
    return context;
}
