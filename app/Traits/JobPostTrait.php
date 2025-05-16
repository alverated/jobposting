<?php

namespace App\Traits;

use App\Enums\JobPostStatus;
use App\Enums\UserType;
use App\Models\JobPost;
use Illuminate\Support\Facades\Auth;

trait JobPostTrait
{
    private function validateStatus(?string $status): ?JobPostStatus
    {
        if (! $status) {
            return JobPostStatus::PENDING;
        }

        $validStatus = collect(JobPostStatus::labels())
            ->first(fn ($s) => strtolower($s) === strtolower($status));

        return $validStatus ? JobPostStatus::fromName($validStatus) : null;
    }

    private function getJobPosts($status = null)
    {
        /** @var \App\Models\User */
        $user = Auth::user();

        /** @var \App\Enums\UserType $userType */
        $userType = $user->type;

        $query = $userType === UserType::MODERATOR
            ? JobPost::with('user')
            : $user->jobPosts();

        $jobPosts = $query
            ->when($status && $userType === UserType::MODERATOR, fn ($query, $status) => $query->where('status', $status))
            ->orderBy('created_at', 'desc')
            ->paginate($this->perPage);

        return $jobPosts;
    }
}
