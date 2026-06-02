<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function umkm()
    {
        return $this->hasOne(UMKM::class);
    }

    public function isAdmin()
    {
        return $this->role === 'admin';
    }

    public function isUMKM()
    {
        return $this->role === 'umkm';
    }

    public function isPemerintah()
    {
        return $this->role === 'pemerintah';
    }

    public function isBank()
    {
        return $this->role === 'bank';
    }
}