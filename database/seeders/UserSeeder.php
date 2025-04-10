<?php

namespace Database\Seeders;

use App\Enums\UserType;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (User::exists()) {
            return;
        }

        // moderator
        User::create([
            'name' => 'Moderator',
            'email' => 'moderator@example.com',
            'password' => 'password',
            'type' => UserType::MODERATOR,
        ]);

        // user
        User::create([
            'name' => 'User',
            'email' => 'user@example.com',
            'password' => 'password',
            'type' => UserType::USER,
        ]);
    }
}
