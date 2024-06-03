<?php
namespace App\Repository\Interface;

Interface TaskRepositoryInterface
{
    public function index();
    public function getById($id);
    public function store(array $data);
    public function update(array $data, $id);
    public function conclude($id);
    public function delete($id);
}
