<?php

namespace App\Observers;

use App\Enums\UserType;
use App\Models\JobPost;
use App\Models\User;
use App\Notifications\FirstJobPost;

class JobPostObserver
{
    /**
     * Handle the JobPost "created" event.
     */
    public function created(JobPost $jobPost): void
    {
        /** @var \App\Models\User */
        $user = $jobPost->user;

        // if the job post is the first one, notify moderators
        if ($user->jobPosts()->count() === 1) {
            $moderators = User::where('type', UserType::MODERATOR)->get();
            foreach ($moderators as $moderator) {
                $moderator->notify(new FirstJobPost($jobPost));
            }
        }
    }

    /**
     * Handle the JobPost "updated" event.
     */
    public function updated(JobPost $jobPost): void
    {
        //
    }

    /**
     * Handle the JobPost "deleted" event.
     */
    public function deleted(JobPost $jobPost): void
    {
        //
    }

    /**
     * Handle the JobPost "restored" event.
     */
    public function restored(JobPost $jobPost): void
    {
        //
    }

    /**
     * Handle the JobPost "force deleted" event.
     */
    public function forceDeleted(JobPost $jobPost): void
    {
        //
    }
}
