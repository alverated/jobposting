<?php

namespace App\Notifications;

use App\Models\JobPost;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Str;

class FirstJobPost extends Notification
{
    use Queueable;

    public JobPost $jobPost;

    /**
     * Create a new notification instance.
     */
    public function __construct($jobPost)
    {
        $this->jobPost = $jobPost;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        $actionUrl = route('job-posts.show', $this->jobPost->id);

        return [
            'title' => 'Job Post Notification',
            'message' => "A new job post has been created by {$this->jobPost->user->name}. Please review and approve it.",
            'job_title' => $this->jobPost->title,
            'description' => Str::limit(strip_tags($this->jobPost->description), 100),
            'action_url' => $actionUrl,
            'icon' => 'BriefcaseBusinessIcon',
        ];
    }
}
