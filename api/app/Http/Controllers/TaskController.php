<?php

namespace App\Http\Controllers;

use App\Classes\ApiResponseClass;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Repository\Interface\TaskRepositoryInterface;
use App\Http\Resources\TaskResource;
use App\Http\Requests\Task\StoreTaskRequest;
use App\Http\Requests\Task\UpdateTaskRequest;
use Carbon\Carbon;
use App\Models\Task;

class TaskController extends Controller
{
    private $taskRepository;

    public function __construct( TaskRepositoryInterface $taskRepository ) {
        $this->taskRepository = $taskRepository;
    }

    public function index()
    {
        $data = $this->taskRepository->index();

        return ApiResponseClass::sendResponse(TaskResource::collection($data), '', 200);
    }

    public function get($id)
    {
        return new TaskResource($this->taskRepository->getById($id));
    }

    public function store(StoreTaskRequest $request)
    {
        $data = [
            'title' => $request->title,
            'description' => $request->description,
            'dt_expected_completion' => Carbon::parse($request->dt_expected_completion),
            'user_id'  => auth()->user()->id
        ];

        DB::beginTransaction();

        try{
             $task = $this->taskRepository->store($data);

             DB::commit();

             return ApiResponseClass::sendResponse(new TaskResource($task), 'Task Created', 201);

        }catch(\Exception $ex){
            return ApiResponseClass::rollback($ex);
        }
    }

    public function update(UpdateTaskRequest $request, $id)
    {
        $data = [
            'title' => $request->title,
            'description' => $request->description,
            'dt_expected_completion' => Carbon::parse($request->dt_expected_completion),
        ];


        DB::beginTransaction();
        try{
             $this->taskRepository->update($data,$id);

             DB::commit();

             return ApiResponseClass::sendResponse($this->get($id), '', 200);

        }catch(\Exception $ex){
            return ApiResponseClass::rollback($ex);
        }
    }

    public function conclude($id)
    {
        DB::beginTransaction();
        try{
            $task = $this->taskRepository->getById($id);

            if ($task->status === Task::STATUS_DONE)
            {
                abort(422, 'Tarefa já concluída');
            }

            $this->taskRepository->conclude($id);

            DB::commit();
            return ApiResponseClass::sendResponse('Task done', '', 200);

        }catch(\Exception $ex){
            return ApiResponseClass::rollback($ex);
        }
    }

    public function destroy($id)
    {
         $this->taskRepository->delete($id);

        return ApiResponseClass::sendResponse('Task Deleted', '', 204);
    }
}
