<?php

namespace App\Http\Middleware;

use Closure;
use App\Repository\TaskRepository;

class TaskUserMiddleware
{

    private $taskRepository;

    public function __construct(TaskRepository $taskRepository){
        $this->taskRepository = $taskRepository;
    }

    public function handle($request, Closure $next, $guard = null)
    {
        $id = $request->route('id');

        if($id){
            $task = $this->taskRepository->getById($id);

            if ($task->user_id !== auth()->user()->id) {
                abort(403, "User don't have access to this task");
            }
        }

        return $next($request);
    }
}
