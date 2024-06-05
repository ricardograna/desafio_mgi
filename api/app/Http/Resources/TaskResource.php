<?php

namespace App\Http\Resources;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'                        => $this->id,
            'title'                     => $this->title,
            'description'               => $this->description,
            'dt_expected_completion'    => $this->dt_expected_completion,
            'status'                    => Task::STATUSES[$this->status],
            'created_at'                => $this->created_at,
            'updated_at'                => $this->updated_at
        ];
    }
}
