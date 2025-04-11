<?php

namespace App\Http\Controllers;

use App\Enums\JobPostStatus;
use App\Enums\UserType;
use App\Http\Requests\StoreJobPostRequest;
use App\Http\Requests\UpdateJobPostRequest;
use App\Models\JobPost;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class JobPostController extends Controller
{
    private $perPage = 10;

    public function index(): Response
    {
        /** @var \App\Models\User */
        $user = Auth::user();

        /** @var UserType $userType */
        $userType = $user->type;

        $jobPosts = $userType === UserType::MODERATOR
            ? JobPost::with('user')->where('status', JobPostStatus::PENDING)
                ->orderBy('created_at', 'desc')
                ->paginate($this->perPage)
            : $user->jobPosts()
                ->orderBy('created_at', 'desc')
                ->paginate($this->perPage);

        return Inertia::render('JobPosts/Index', [
            'jobPosts' => Inertia::merge(fn (): array => $jobPosts->items()),

            // For infinite scrolling
            'currentPage' => $jobPosts->currentPage(),
            'showMore' => $jobPosts->currentPage() < $jobPosts->lastPage(),
        ]);
    }

    public function show(JobPost $jobPost): Response
    {
        $jobPost->load('user');

        return Inertia::render('JobPosts/Show', [
            'jobPost' => $jobPost,
        ]);
    }

    public function store(StoreJobPostRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        /** @var \App\Models\User */
        $user = Auth::user();

        $user->jobPosts()->create($validated);

        return back()->with('success', 'Job post created successfully');
    }

    public function update(UpdateJobPostRequest $request, JobPost $jobPost): RedirectResponse
    {
        $validated = $request->validated();

        $jobPost->update($validated);

        return back()->with('success', 'Job post updated successfully');
    }

    public function destroy(JobPost $jobPost): RedirectResponse
    {
        $jobPost->delete();

        return redirect()->route('job-posts.index')->with('success', 'Job post deleted successfully');
    }

    public function updateStatus(JobPost $jobPost, JobPostStatus $jobPostStatus): RedirectResponse
    {
        $jobPost->update(['status' => $jobPostStatus]);

        return back()->with('success', sprintf('Job post status updated to "%s".', $jobPostStatus->name));
    }
}
