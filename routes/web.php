<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\JobPostController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProfileController;
use App\Models\JobPost;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/job/{jobId}', [JobController::class, 'show'])->name('job.show');

Route::middleware('auth')->group(function () {

    // Job Posts
    Route::group(['prefix' => 'job-posts', 'as' => 'job-posts.'], function () {
        Route::get('/', [JobPostController::class, 'index'])->name('index');
        Route::post('/', [JobPostController::class, 'store'])->name('store')->can('create', JobPost::class);
        Route::get('/{jobPost}', [JobPostController::class, 'show'])->name('show')->can('view', 'jobPost');
        Route::patch('/{jobPost}', [JobPostController::class, 'update'])->name('update')->can('update', 'jobPost');
        Route::delete('/{jobPost}', [JobPostController::class, 'destroy'])->name('destroy')->can('delete', 'jobPost');

        Route::patch('/{jobPost}/update-status/{jobPostStatus}', [JobPostController::class, 'updateStatus'])->name('update-status')->can('updateStatus', 'jobPost');
    });

    // Notifications
    Route::group(['prefix' => 'notifications', 'as' => 'notifications.'], function () {
        Route::get('/', [NotificationController::class, 'index'])->name('index');
        Route::get('/unread-count', [NotificationController::class, 'unreadCount'])->name('unread-count');
        Route::post('/mark-as-read/{notification}', [NotificationController::class, 'markAsRead'])->name('mark-as-read');
        Route::post('/mark-all-as-read', [NotificationController::class, 'markAllAsRead'])->name('mark-all-as-read');
        Route::delete('/clear', [NotificationController::class, 'clear'])->name('clear');
        Route::delete('/{notification}', [NotificationController::class, 'destroy'])->name('destroy');
    });

    // Profile
    Route::group(['prefix' => 'profile', 'as' => 'profile.'], function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('destroy');
    });
});

require __DIR__.'/auth.php';
