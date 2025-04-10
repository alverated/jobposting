<?php

namespace App\Http\Controllers;

use App\Models\JobPost;
use App\Services\ExternalJobService\ExternalJobService;
use Inertia\Inertia;

class JobController extends Controller
{
    public function show()
    {
        $jobId = request()->jobId;

        // Check if job post is found in local database
        $jobPost = JobPost::find($jobId);

        // If job post is not found, fetch from external job service
        if (! $jobPost) {
            $externalJobService = new ExternalJobService;
            $externalJobs = $externalJobService->fetchJobs(cache: true);
            $jobPost = collect($externalJobs)->firstWhere('id', $jobId);
        }

        return Inertia::render('Job/Index', [
            'jobPost' => $jobPost ?? null,
        ]);
    }
}
