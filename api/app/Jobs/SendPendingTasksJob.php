<?php

namespace App\Jobs;

use App\Http\Resources\TaskSendResource;
use App\Repository\TaskRepository;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;

class SendPendingTasksJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Execute the job.
     */
    public function handle(TaskRepository $taskRepository): void
    {
        $tasks = $taskRepository->pending();

        foreach($tasks as $task)
        {
            Http::post('http://desafio-json-server:3000/tasks', new TaskSendResource($task));
        }
    }
}
