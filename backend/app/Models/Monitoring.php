<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Monitoring extends Model
{
    use HasFactory;

    protected $table = 'monitorings';

    protected $fillable = [
        'umkm_id',
        'status',
        'catatan',
    ];

    public function umkm()
    {
        return $this->belongsTo(UMKM::class);
    }
}