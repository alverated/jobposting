<?php

namespace App\Services\ExternalJobService;

use App\Http\Resources\JobPostResource;
use Exception;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class ExternalJobService
{
    public function fetchJobs($cache = true): array
    {
        $apiEndpoint = config('services.jobfeeds.mrge.url');

        if (! $cache) {
            Cache::forget('jobfeeds-mrge');
        }

        $jobPosts = Cache::remember('jobfeeds-mrge', 60, function () use ($apiEndpoint) {
            try {
                $response = Http::get($apiEndpoint);

                if (! $response->successful()) {
                    return [];
                }

                $xml = simplexml_load_string($response->body(), 'SimpleXMLElement', LIBXML_NOCDATA);

                if (! $xml) {
                    return [];
                }

                $json = json_encode($xml);
                $data = json_decode($json, true);

                $jobs = $data['position'] ?? [];
                $jobs = array_is_list($jobs) ? $jobs : [$jobs];

                $jobPosts = collect($jobs)->map(function ($job) {
                    $formatted = [
                        'id' => $job['id'] ? intval($job['id']) : null,
                        'title' => $job['name'] ?? null,
                        'location' => $job['office'] ?? null,
                        'description' => $this->getDescription($job['jobDescriptions']['jobDescription'] ?? []),
                        'company_name' => $job['subcompany'] ?? null,
                        'updated_at' => $job['createdAt'] ?? null,
                        'created_at' => $job['createdAt'] ?? null,
                        'is_external' => true,
                    ];

                    return (new JobPostResource($formatted))->toArray(request());
                })->toArray();
            } catch (Exception $e) {
                $jobPosts = [];
            }

            return $jobPosts;
        });

        return $jobPosts;
    }

    private function getDescription(array $descriptions): string
    {
        $fullDescription = '';

        foreach ($descriptions as $description) {
            $fullDescription .= $description['name'].$description['value'];
        }

        return $fullDescription;
    }
}
