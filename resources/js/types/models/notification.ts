export interface NotificationData {
    title: string;
    message: string;
    job_title: string;
    description: string;
    action_url: string;
    icon: string;
}

export interface Notification {
    id: string;
    type: string;
    notifiable_id: string;
    notifiable_type: string;
    data: NotificationData;
    read_at: string | null;
    created_at: string;
    updated_at: string;
}
