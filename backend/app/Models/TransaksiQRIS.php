<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransaksiQRIS extends Model
{
    use HasFactory;

    protected $table = 'transaksi_qris';

    protected $fillable = [
        'umkm_id',
        'bulan',
        'omzet',
        'jumlah_transaksi',
    ];

    public function umkm()
    {
        return $this->belongsTo(UMKM::class);
    }
}