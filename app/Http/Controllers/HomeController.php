<?php

namespace App\Http\Controllers;

use App\Models\JobPost;
use App\Services\ExternalJobService\ExternalJobService;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    private $perPage = 10;

    public function index(): Response
    {
        // Fetch external jobs from external job service
        $externalJobService = new ExternalJobService;
        $externalJobs = $externalJobService->fetchJobs(cache: true);

        // Fetch local jobs from local database
        $localJobs = JobPost::approved()->paginate($this->perPage);

        return Inertia::render('Home/Index', [
            'externalJobs' => $externalJobs,
            'jobs' => Inertia::merge(fn () => $localJobs->items()),

            // For infinite scrolling
            'currentPage' => $localJobs->currentPage(),
            'showMore' => $localJobs->currentPage() < $localJobs->lastPage(),
        ]);
    }
}
