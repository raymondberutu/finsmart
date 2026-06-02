# 🖥️ FinSmart Backend API - Laravel 12

Backend RESTful API untuk platform **FinSmart (Smart City Malang)** menggunakan Laravel 12, MySQL, dan Laravel Sanctum.

##  Tech Stack
* **Framework:** Laravel 12 (PHP 8.2+)
* **Database:** MySQL 8.0
* **Authentication:** Laravel Sanctum (Token-based SPA)
* **Architecture:** MVC + Service Pattern
* **API Format:** JSON RESTful
* **Authorization:** Role-Based Access Control (RBAC)

## 📦 Prerequisites
* PHP >= 8.2
* Composer
* MySQL/MariaDB
* XAMPP / Laragon (untuk development lokal)

##  Instalasi

```bash
# 1. Install dependencies
composer install

# 2. Copy environment file
cp .env.example .env

# 3. Generate application key
php artisan key:generate

# 4. Setup database di .env, lalu jalankan migration
php artisan migrate

# 5. (Opsional) Seed data dummy
php artisan db:seed

# 6. Jalankan server development
php artisan serve
```
API akan berjalan di: `http://127.0.0.1:8000`

## ️ Konfigurasi Environment

Edit file `.env`:
```env
APP_NAME=FinSmart
APP_ENV=local
APP_DEBUG=true
APP_URL=http://127.0.0.1:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=finsmart
DB_USERNAME=root
DB_PASSWORD=

CACHE_DRIVER=file
SESSION_DRIVER=file
QUEUE_CONNECTION=sync
```

## 🔌 API Endpoints

### 🔐 Authentication
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| POST | `/api/register` | Registrasi user baru | ❌ |
| POST | `/api/login` | Login & dapatkan token | ❌ |
| POST | `/api/logout` | Logout & revoke token | ✅ |
| GET | `/api/me` | Get profile user login | ✅ |

### 📊 Dashboard & Analitik
| Method | Endpoint | Deskripsi | Role |
|--------|----------|-----------|------|
| GET | `/api/dashboard` | Statistik & data chart | All |
| GET | `/api/transaksi` | List transaksi paginated | All |
| GET | `/api/admin/peta-sebaran` | Koordinat & jumlah UMKM per kecamatan | Admin, Pemerintah |

### 🏢 Manajemen UMKM
| Method | Endpoint | Deskripsi | Role |
|--------|----------|-----------|------|
| GET | `/api/admin/umkm` | List UMKM (filterable) | Admin, Pemerintah |
| POST | `/api/admin/umkm` | Tambah UMKM | Admin |
| GET | `/api/admin/umkm/{id}` | Detail UMKM | Admin, Pemerintah |
| PUT | `/api/admin/umkm/{id}` | Update UMKM | Admin |
| DELETE | `/api/admin/umkm/{id}` | Hapus UMKM | Admin |

### 📈 Credit Scoring
| Method | Endpoint | Deskripsi | Role |
|--------|----------|-----------|------|
| GET | `/api/admin/scoring` | List hasil scoring | Admin, Pemerintah, Bank |
| POST | `/api/admin/scoring/generate/{umkm_id}` | Generate skor algoritma | Admin |
| PUT | `/api/admin/scoring/{id}` | Update manual skor | Admin |
| DELETE | `/api/admin/scoring/{id}` | Hapus skor | Admin |

## ️ Database Schema

| Tabel | Deskripsi | Relasi |
|-------|-----------|--------|
| `users` | Data akun & role (`admin`, `umkm`, `pemerintah`, `bank`) | 1:N UMKM |
| `umkm` | Profil usaha, lokasi, sektor, nomor QRIS | FK → users |
| `transaksi_qris` | Riwayat omzet & jumlah transaksi per bulan | FK → umkm |
| `credit_scoring` | Hasil perhitungan skor, kategori, rekomendasi | 1:1 umkm |
| `monitorings` | Status & catatan monitoring usaha | 1:N umkm |
| `personal_access_tokens` | Token autentikasi Sanctum | FK → users |

## 📁 Struktur Backend

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/      # Auth, Dashboard, UMKM, Scoring
│   │   ├── Middleware/       # CheckRole.php (RBAC)
│   │   └── Requests/         # Form Validation
│   ├── Models/               # User, UMKM, TransaksiQRIS, CreditScoring, Monitoring
│   ├── Services/             # ScoringService.php (Algoritma Credit Scoring)
│   └── Providers/
├── config/
│   ├── database.php
│   ├── sanctum.php
│   └── cors.php              # CORS untuk React Frontend
├── database/
│   ├── migrations/           # Skema database
│   └── seeders/
├── routes/
│   └── api.php               # Definisi endpoint API
├── .env
└── composer.json
```

## 🔒 Keamanan & Arsitektur
* ✅ **Laravel Sanctum**: Token-based auth untuk SPA (React)
* ✅ **RBAC Middleware**: `CheckRole` membatasi akses berdasarkan `role` user
* ✅ **Password Hashing**: `bcrypt` otomatis via Laravel
* ✅ **Validation**: `FormRequest` & inline validation di controller
* ✅ **CORS**: Dikonfigurasi di `config/cors.php` untuk origin `localhost:5173`
* ✅ **Eloquent Relationships**: Relasi 1:1, 1:N, N:M tersusun rapi
* ✅ **Service Pattern**: Logic scoring dipisah di `ScoringService.php` agar controller tetap bersih

## 🌐 Deployment ke Production

```bash
# 1. Optimasi konfigurasi & routing
php artisan config:cache
php artisan route:cache
php artisan view:cache

# 2. Install dependencies production
composer install --optimize-autoloader --no-dev

# 3. Set environment production
APP_ENV=production
APP_DEBUG=false

# 4. Jalankan migration (jika belum)
php artisan migrate --force
```

## 🐛 Troubleshooting

| Error | Solusi |
|-------|--------|
| `Class 'App\Models\...' not found` | Jalankan `composer dump-autoload` |
| `SQLSTATE[HY000] [2002] Connection refused` | Ubah `DB_HOST=localhost` menjadi `DB_HOST=127.0.0.1` |
| `419 Page Expired` atau `CSRF Token Mismatch` | Pastikan header `Accept: application/json` dikirim dari frontend |
| `CORS error` | Cek `allowed_origins` di `config/cors.php` sesuai URL frontend |
| `Sanctum token tidak return` | Pastikan model User menggunakan `use HasApiTokens;` |

