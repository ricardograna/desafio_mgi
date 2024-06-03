<?php

namespace App\Providers;

use App\Jobs\SendPendingTasksJob;
use Illuminate\Support\ServiceProvider;
use App\Repository\TaskRepository;
use App\Repository\Interface\TaskRepositoryInterface;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(TaskRepositoryInterface::class, TaskRepository::class);

        $this->app->bindMethod(SendPendingTasksJob::class.'@handle', function ($job, $app) {
            return $job->handle($app->make(TaskRepository::class));
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
