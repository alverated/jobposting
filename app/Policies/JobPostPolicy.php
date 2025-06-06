<?php

namespace App\Policies;

use App\Enums\UserType;
use App\Models\JobPost;
use App\Models\User;

class JobPostPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, JobPost $jobPost): bool
    {
        /** @var \App\Enums\UserType */
        $userType = $user->type;

        return $user->id === $jobPost->user_id || $userType === UserType::MODERATOR;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, JobPost $jobPost): bool
    {
        return $user->id === $jobPost->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, JobPost $jobPost): bool
    {
        return $user->id === $jobPost->user_id;
    }

    public function updateStatus(User $user, JobPost $jobPost): bool
    {
        /** @var \App\Enums\UserType */
        $userType = $user->type;

        return $userType === UserType::MODERATOR;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, JobPost $jobPost): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, JobPost $jobPost): bool
    {
        return false;
    }
}
