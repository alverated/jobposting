<?php

use App\Enums\JobPostStatus;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('job_posts', function (Blueprint $table): void {
            $table->id();
            $table->foreignIdFor(User::class)->constrained()->index();
            $table->string('title')->index();
            $table->text('description');
            $table->string('location')->index();
            $table->string('company_name')->index();
            $table->unsignedTinyInteger('status')->default(JobPostStatus::PENDING);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_posts');
    }
};
