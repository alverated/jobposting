<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class JobPostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id ?? $this['id'] ?? null,
            'title' => $this->title ?? $this['title'] ?? null,
            'description' => $this->description ?? $this['description'] ?? null,
            'location' => $this->location ?? $this['location'] ?? null,
            'company_name' => $this->company_name ?? $this['company_name'] ?? null,
            'created_at' => $this->created_at ?? $this['created_at'] ?? null,
            'updated_at' => $this->updated_at ?? $this['updated_at'] ?? null,
            'is_external' => $this->is_external ?? $this['is_external'] ?? false,
        ];
    }
}
