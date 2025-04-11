<?php

// @formatter:off
// phpcs:ignoreFile
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int $user_id
 * @property string $title
 * @property string $description
 * @property string $location
 * @property string $company_name
 * @property \App\Enums\JobPostStatus $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|JobPost approved()
 * @method static \Database\Factories\JobPostFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|JobPost newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|JobPost newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|JobPost query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|JobPost whereCompanyName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|JobPost whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|JobPost whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|JobPost whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|JobPost whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|JobPost whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|JobPost whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|JobPost whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|JobPost whereUserId($value)
 */
	class JobPost extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property \App\Enums\UserType $type
 * @property string $name
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\JobPost> $jobPosts
 * @property-read int|null $job_posts_count
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUpdatedAt($value)
 */
	class User extends \Eloquent {}
}

