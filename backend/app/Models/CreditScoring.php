<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CreditScoring extends Model
{
    use HasFactory;

    protected $table = 'credit_scoring';

    protected $fillable = [
        'umkm_id',
        'skor',
        'kategori',
        'rekomendasi',
    ];

    public function umkm()
    {
        return $this->belongsTo(UMKM::class);
    }
}