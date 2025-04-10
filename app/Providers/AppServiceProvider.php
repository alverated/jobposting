<?php

namespace App\Providers;

use App\Enums\JobPostStatus;
use App\Models\JobPost;
use App\Observers\JobPostObserver;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        $this->registerObservers();
        $this->configureEnumRouteBindings();
    }

    private function registerObservers(): void
    {
        JobPost::observe(JobPostObserver::class);
    }

    private function configureEnumRouteBindings(): void
    {
        Route::bind('jobPostStatus', fn ($value): JobPostStatus => JobPostStatus::from($value));
    }
}
