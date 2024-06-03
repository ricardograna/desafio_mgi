<?php

namespace App\Repository;

use App\Models\Task;
use App\Repository\Interface\TaskRepositoryInterface;

class TaskRepository implements TaskRepositoryInterface {

    public function index(){
        return Task::own()->orderBy('created_at')->get();
    }

    public function getById($id){
       return Task::findOrFail($id);
    }

    public function store(array $data){
       return Task::create($data);
    }

    public function update(array $data, $id){
       return Task::whereId($id)->update($data);
    }

    public function conclude($id){
        return Task::whereId($id)->update(['status' => Task::STATUS_DONE]);
    }

    public function delete($id){
       Task::destroy($id);
    }

    public function pending(){
        return Task::pending()->orderBy('created_at')->get();
    }
}
