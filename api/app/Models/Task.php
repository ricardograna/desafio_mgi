<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    const STATUS_PENDING            = 'PENDING';
    const STATUS_IN_PROGRESS        = 'IN_PROGRESS';
    const STATUS_DONE               = 'DONE';

    const STATUSES = [
        self::STATUS_PENDING        => 'Pendente',
        self::STATUS_IN_PROGRESS    => 'Em Progresso',
        self::STATUS_DONE           => 'Concluída'
    ];

    protected $casts = [
        'dt_expected_completion' => 'date',
    ];

    protected $attributes = [
        'status' => self::STATUS_PENDING
    ];

    protected $fillable = ['title', 'description', 'dt_expected_completion', 'user_id'];

    public function scopeOwn($query)
    {
        return $query->where('user_id', auth()->user()->id);
    }

    public function scopePending($query)
    {
        return $query->where('status', self::STATUS_PENDING);
    }
}
