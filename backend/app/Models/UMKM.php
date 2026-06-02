<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UMKM extends Model
{
    use HasFactory;

    protected $table = 'umkm';

    protected $fillable = [
        'user_id',
        'nama_usaha',
        'pemilik',
        'alamat',
        'kecamatan',
        'sektor_usaha',
        'tahun_berdiri',
        'nomor_qris',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function transaksi()
    {
        return $this->hasMany(TransaksiQRIS::class);
    }

    public function scoring()
    {
        return $this->hasOne(CreditScoring::class);
    }

    public function monitoring()
    {
        return $this->hasMany(Monitoring::class);
    }
}