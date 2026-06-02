README.md FinsSamrt:Smart City Malang

```markdown
# FinSmart - Smart City Malang

<div align="center">

![FinSmart Logo](https://img.shields.io/badge/FinSmart-Smart%20City%20Malang-1D9E75?style=for-the-badge)

**Platform Financial Technology untuk Credit Scoring UMKM Berbasis QRIS**

[![Laravel](https://img.shields.io/badge/Laravel-12-FF2D20?style=flat-square&logo=laravel&logoColor=white)](https://laravel.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat-square&logo=mysql&logoColor=white)](https://mysql.com)

</div>

---

## 📋 Daftar Isi

- [Tentang Project](#-tentang-project)
- [Fitur Utama](#-fitur-utama)
- [Teknologi yang Digunakan](#-teknologi-yang-digunakan)
- [Arsitektur Sistem](#-arsitektur-sistem)
- [Alur Kerja Aplikasi](#-alur-kerja-aplikasi)
- [Instalasi dan Setup](#-instalasi-dan-setup)
- [Konfigurasi Environment](#-konfigurasi-environment)
- [Menjalankan Aplikasi](#-menjalankan-aplikasi)
- [User Roles dan Akses](#-user-roles-dan-akses)
- [API Endpoints](#-api-endpoints)
- [Database Schema](#-database-schema)
- [Algoritma Credit Scoring](#-algoritma-credit-scoring)
- [Struktur Folder](#-struktur-folder)
- [Screenshot Aplikasi](#-screenshot-aplikasi)
- [Development Team](#-development-team)
- [License](#-license)

---

## 📖 Tentang Project

**FinSmart** adalah platform Financial Technology yang dikembangkan untuk mendukung program **Smart City Malang**. Aplikasi ini dirancang khusus untuk membantu UMKM (Usaha Mikro, Kecil, dan Menengah) di Kota Malang memperoleh akses pendanaan yang lebih mudah melalui sistem **Alternative Credit Scoring** berbasis data transaksi QRIS.

### Latar Belakang
- **48.000+ UMKM** terdaftar di Kota Malang
- **93.16%** merchant telah menggunakan QRIS
- **Rp579 Triliun** total transaksi digital
- Kebutuhan akses pendanaan yang cepat dan transparan

### Solusi yang Ditawarkan
FinSmart menganalisis data transaksi QRIS UMKM secara real-time untuk menghasilkan skor kredit yang objektif, akurat, dan dapat dipertanggungjawabkan. Sistem ini mengintegrasikan 5 faktor penilaian dengan bobot yang telah ditentukan untuk menghasilkan rekomendasi kelayakan kredit.

---

## ✨ Fitur Utama

### 1. **Alternative Credit Scoring**
- Analisis berbasis data transaksi QRIS real-time
- 5 faktor penilaian dengan algoritma terbobot
- 4 kategori kelayakan: Sangat Layak, Layak, Cukup Layak, Tidak Layak

### 2. **Multi-Role Dashboard**
- **Dashboard Admin**: Manajemen pengguna, UMKM, dan monitoring sistem
- **Dashboard UMKM**: Monitoring skor kredit, riwayat transaksi, simulasi kredit
- **Dashboard Pemerintah**: Analitik regional, peta sebaran UMKM, laporan ekonomi
- **Dashboard Bank/Lembaga Keuangan**: Daftar UMKM potensial, persetujuan pendanaan

### 3. **Peta Sebaran UMKM Interaktif**
- Visualisasi 5 kecamatan di Kota Malang (Klojen, Lowokwaru, Blimbing, Sukun, Kedungkandang)
- Marker interaktif dengan detail statistik per kecamatan
- Filter berdasarkan sektor usaha dan kategori kredit

### 4. **Dashboard Analitik Real-Time**
- Total UMKM dan transaksi QRIS
- Grafik pertumbuhan transaksi per bulan
- Distribusi kategori kredit (Pie Chart)
- Volume transaksi per sektor (Bar Chart)
- Rata-rata skor kredit regional

### 5. **Manajemen Data Lengkap**
- CRUD UMKM (Create, Read, Update, Delete)
- CRUD Transaksi QRIS
- CRUD Credit Scoring
- Monitoring status UMKM

### 6. **Keamanan dan Autentikasi**
- Laravel Sanctum untuk API Authentication
- Role-Based Access Control (RBAC)
- Password hashing dengan bcrypt
- CSRF Protection
- Input validation

---

## 🛠 Teknologi yang Digunakan

### **Backend**
- **Framework**: Laravel 12
- **Authentication**: Laravel Sanctum
- **Database ORM**: Eloquent ORM
- **Architecture**: MVC (Model-View-Controller)
- **API**: RESTful API dengan API Resource
- **Database**: MySQL 8.0

### **Frontend**
- **Library**: React 18
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS v3
- **Charts**: Recharts
- **Icons**: React Icons
- **Alerts**: SweetAlert2
- **Maps**: React Leaflet (Leaflet.js)

### **Development Tools**
- **Package Manager**: Composer (PHP), npm (Node.js)
- **Build Tool**: Vite
- **Code Editor**: Visual Studio Code
- **Database Management**: phpMyAdmin
- **Local Server**: XAMPP / Laragon

### **Server & Deployment**
- **Web Server**: Apache / Nginx
- **PHP Version**: 8.2+
- **Node.js**: v18+

---

## 🏗 Arsitektur Sistem

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                         │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │   Browser  │  │   Mobile   │  │   Tablet   │            │
│  └────────────┘  └────────────┘  └────────────┘            │
└─────────────────────────┬───────────────────────────────────┘
                          │ HTTPS/JSON
┌─────────────────────────▼───────────────────────────────────┐
│                    PRESENTATION LAYER                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           React.js Frontend (Vite)                   │  │
│  │  - Components  - Pages  - Context  - Services        │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────┬───────────────────────────────────┘
                          │ Axios + Bearer Token
┌─────────────────────────▼───────────────────────────────────┐
│                    APPLICATION LAYER                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │        Laravel 12 Backend API                        │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐          │  │
│  │  │Controllers│  │Services  │  │Middleware│          │  │
│  │  └──────────┘  └──────────┘  └──────────          │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐          │  │
│  │  │  Models  │  │Resources │  │ Requests │          │  │
│  │  └──────────┘  └──────────┘  └──────────┘          │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────┬───────────────────────────────────┘
                          │ Eloquent ORM
┌─────────────────────────▼───────────────────────────────────┐
│                       DATA LAYER                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              MySQL Database                          │  │
│  │  - users            - credit_scoring                │  │
│  │  - umkm             - monitorings                   │  │
│  │  - transaksi_qris   - personal_access_tokens        │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Alur Kerja Aplikasi

### **1. Alur Registrasi dan Login**

```
┌─────────┐     ┌──────────────┐     ┌─────────────┐     ┌─────────────┐
│  User   │────▶│  Halaman     │────▶│  Validasi   │────▶│  Database   │
│  Akses  │     │  Register    │     │  Input      │     │  (Simpan)   │
└─────────┘     └──────────────┘     └─────────────┘     └─────────────┘
                                           │
                                           ▼
                                    ┌─────────────┐
                                    │  Hash       │
                                    │  Password   │
                                    └─────────────┘

┌─────────┐     ┌──────────────┐     ┌─────────────┐     ┌─────────────┐
│  User   │────▶│  Halaman     │────▶│  Verifikasi │────▶│  Generate   │
│  Login  │     │  Login       │     │  Credential │     │  Token      │
└─────────┘     └──────────────┘     └─────────────┘     └─────────────┘
                                                              │
                                                              ▼
                                                       ┌─────────────┐
                                                       │  Redirect   │
                                                       │  Dashboard  │
                                                       └─────────────┘
```

### **2. Alur Credit Scoring**

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Data UMKM   │────▶│  Transaksi   │────▶│  Perhitungan │
│  + QRIS      │     │  QRIS        │     │  5 Faktor    │
└──────────────┘     └──────────────┘     └──────────────┘
                                              │
                                              ▼
                                       ┌──────────────┐
                                       │  Bobot:      │
                                       │  - Stabilitas│
                                       │    (30%)     │
                                       │  - Volume    │
                                       │    (25%)     │
                                       │  - Pertumbuhan│
                                       │    (20%)     │
                                       │  - Risiko    │
                                       │    (15%)     │
                                       │  - Riwayat   │
                                       │    (10%)     │
                                       └──────────────┘
                                              │
                                              ▼
                                       ┌──────────────┐
                                       │  Skor Akhir  │
                                       │  (0-100)     │
                                       └──────────────┘
                                              │
                    ┌─────────────────────────┼─────────────────────────┐
                    ▼                         ▼                         ▼
            ┌──────────────┐          ┌──────────────┐          ┌──────────────┐
            │ 80-100       │          │ 60-79        │          │ 40-59        │
            │ Sangat Layak │          │ Layak        │          │ Cukup Layak  │
            └──────────────┘          └──────────────┘          └──────────────┘
                    │                         │                         │
                    ▼                         ▼                         ▼
            ┌──────────────┐          ┌──────────────┐          ┌──────────────┐
            │ Plafon Tinggi│          │ Plafon       │          │ Pendampingan │
            │ Bunga Rendah │          │ Standar      │          │ Diperlukan   │
            └──────────────┘          └──────────────┘          └──────────────┘
```

### **3. Alur Monitoring dan Pelaporan**

```
┌─────────────┐     ┌──────────────┐     ┌──────────────┐
│  Dashboard  │────▶│  Real-Time   │────▶│  Visualisasi │
│  Pemerintah │     │  Data Sync   │     │  Peta & Chart│
└─────────────┘     └──────────────┘     └──────────────┘
                                              │
                                              ▼
                                       ┌──────────────┐
                                       │  Analisis    │
                                       │  - Per Kec.  │
                                       │  - Per Sektor│
                                       │  - Trend     │
                                       └──────────────┘
                                              │
                                              ▼
                                       ┌──────────────┐
                                       │  Laporan     │
                                       │  Kebijakan   │
                                       └──────────────┘
```

---

## 📦 Instalasi dan Setup

### **Prerequisites (Persyaratan)**

Pastikan sudah terinstall:
- **PHP 8.2+** ([Download](https://windows.php.net/download/))
- **Composer** ([Install Guide](https://getcomposer.org/download/))
- **Node.js 18+** ([Download](https://nodejs.org/))
- **MySQL 8.0+** (via XAMPP/Laragon)
- **Git** ([Download](https://git-scm.com/))
- **VS Code** ([Download](https://code.visualstudio.com/))

### **Langkah Instalasi**

#### **1. Clone atau Download Project**

```bash
# Buat folder project
mkdir finsmart
cd finsmart

# Atau clone dari repository (jika ada)
# git clone https://github.com/username/finsmart.git
```

#### **2. Setup Backend (Laravel)**

```bash
# Install Laravel
composer create-project laravel/laravel backend

# Masuk ke folder backend
cd backend

# Install Sanctum
composer require laravel/sanctum

# Publish Sanctum configuration
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"

# Copy environment file
copy .env.example .env
# Atau di Mac/Linux: cp .env.example .env

# Generate application key
php artisan key:generate
```

#### **3. Setup Database**

```sql
-- Buka phpMyAdmin (http://localhost/phpmyadmin)
-- Jalankan query berikut:
CREATE DATABASE finsmart CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

**Edit file `.env` di folder backend:**

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=finsmart
DB_USERNAME=root
DB_PASSWORD=
```

#### **4. Jalankan Migration**

```bash
# Buat tabel database
php artisan migrate

# (Opsional) Seed data dummy
# php artisan db:seed
```

#### **5. Setup Frontend (React)**

```bash
# Kembali ke folder root
cd ..

# Buat project React dengan Vite
npm create vite@latest frontend -- --template react

# Masuk ke folder frontend
cd frontend

# Install dependencies
npm install

# Install package tambahan
npm install axios react-router-dom recharts react-icons sweetalert2

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer

# Initialize Tailwind
npx tailwindcss init -p
```

#### **6. Konfigurasi Tailwind CSS**

**File: `frontend/tailwind.config.js`**

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1D9E75",
        dark: "#085041",
        blue: "#185FA5",
        amber: "#EF9F27",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
        grotesk: ["Space Grotesk", "sans-serif"],
      },
    },
  },
  plugins: [],
}
```

**File: `frontend/src/index.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');

@layer base {
  body {
    @apply font-sans antialiased bg-gray-50 text-gray-800;
  }
}

@layer components {
  .btn-primary {
    @apply bg-primary hover:bg-dark text-white font-semibold py-2.5 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg;
  }
  .glass-card {
    @apply backdrop-blur-md bg-white/90 border border-white/20 shadow-lg rounded-xl;
  }
}
```

---

## ⚙️ Konfigurasi Environment

### **Backend Configuration**

**File: `backend/.env`**

```env
APP_NAME=FinSmart
APP_ENV=local
APP_KEY=base64:... (auto-generated)
APP_DEBUG=true
APP_URL=http://localhost:8000

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=finsmart
DB_USERNAME=root
DB_PASSWORD=

BROADCAST_CONNECTION=log
FILESYSTEM_DISK=local
QUEUE_CONNECTION=database

CACHE_STORE=file
SESSION_DRIVER=file
SESSION_LIFETIME=120

MEMCACHED_HOST=127.0.0.1

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_HOST=
PUSHER_PORT=443
PUSHER_SCHEME=https
PUSHER_APP_CLUSTER=mt1

VITE_APP_NAME="${APP_NAME}"
```

### **Frontend Configuration**

**File: `frontend/.env`** (buat jika belum ada)

```env
VITE_API_URL=http://127.0.0.1:8000/api
VITE_APP_NAME=FinSmart
```

---

## 🚀 Menjalankan Aplikasi

### **Metode 1: Menggunakan 2 Terminal (Recommended)**

**Terminal 1 - Backend:**
```bash
cd backend
php artisan serve
```
Server akan berjalan di: **http://127.0.0.1:8000**

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Server akan berjalan di: **http://localhost:5173**

### **Metode 2: Menggunakan Laravel Herd (Windows/Mac)**

1. Install [Laravel Herd](https://herd.laravel.com/)
2. Tambahkan folder `backend` ke Herd
3. Backend otomatis berjalan di: **http://finsmart.test**
4. Jalankan frontend seperti biasa

### **Metode 3: Menggunakan XAMPP/Laragon**

**Backend:**
1. Copy folder `backend` ke `htdocs` (XAMPP) atau `www` (Laragon)
2. Start Apache dan MySQL
3. Akses: **http://localhost/backend/public**

**Frontend:**
```bash
cd frontend
npm run dev
```

---

## 👥 User Roles dan Akses

### **1. Admin**
**Akses Penuh Sistem:**
- ✅ Manajemen Users (CRUD)
- ✅ Manajemen UMKM (CRUD)
- ✅ Manajemen Transaksi QRIS
- ✅ Generate Credit Scoring
- ✅ Dashboard Analitik Lengkap
- ✅ Monitoring Sistem

**Default Credentials:**
```
Email: admin@finsmart.com
Password: password123
```

### **2. Pemerintah (Dinas Koperasi & UMKM)**
**Monitoring dan Pelaporan:**
- ✅ Dashboard Statistik Regional
- ✅ Peta Sebaran UMKM (5 Kecamatan)
- ✅ Analitik Aktivitas Ekonomi
- ✅ Laporan dan Export Data
- ✅ View Data UMKM & Scoring

**Default Credentials:**
```
Email: pemerintah@malangkota.go.id
Password: password123
```

### **3. UMKM (Usaha Mikro, Kecil, Menengah)**
**Monitoring Usaha:**
- ✅ Dashboard Personal
- ✅ Riwayat Transaksi QRIS
- ✅ Skor Kredit & Kategori
- ✅ Simulasi Kredit
- ✅ Status Pendanaan

**Registrasi:** Tersedia form registrasi publik

### **4. Bank/Lembaga Keuangan**
**Evaluasi Calon Debitur:**
- ✅ Dashboard Lembaga
- ✅ Daftar UMKM Potensial
- ✅ Skor Kredit UMKM
- ✅ Persetujuan Pendanaan
- ✅ Monitoring Portofolio

**Default Credentials:**
```
Email: bank@finsmart.com
Password: password123
```

---

## 🌐 API Endpoints

### **Authentication Endpoints**

| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| POST | `/api/register` | Registrasi user baru | ❌ |
| POST | `/api/login` | Login user | ❌ |
| POST | `/api/logout` | Logout user | ✅ |
| GET | `/api/me` | Get current user | ✅ |

**Request Body - Register:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "password_confirmation": "password123",
  "role": "umkm"
}
```

**Request Body - Login:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response - Login Success:**
```json
{
  "message": "Login berhasil",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "umkm"
  },
  "token": "1|abc123xyz..."
}
```

### **Dashboard Endpoints**

| Method | Endpoint | Deskripsi | Role |
|--------|----------|-----------|------|
| GET | `/api/dashboard` | Dashboard analitik | All |
| GET | `/api/transaksi` | List transaksi | All |
| GET | `/api/admin/peta-sebaran` | Data peta UMKM | Admin, Pemerintah |

**Response - Dashboard:**
```json
{
  "stats": {
    "total_umkm": 1240,
    "total_transaksi": 8500,
    "total_omzet": 8500000000,
    "kredit_layak": 967,
    "avg_skor": 72.5
  },
  "sectors": [
    { "sektor_usaha": "Kuliner", "total": 450 },
    { "sektor_usaha": "Fashion", "total": 320 }
  ],
  "creditDistribution": [
    { "name": "Sangat Layak", "value": 310 },
    { "name": "Layak", "value": 657 },
    { "name": "Cukup Layak", "value": 203 },
    { "name": "Tidak Layak", "value": 70 }
  ],
  "growthData": [
    { "bulan": "2024-01", "total_omzet": 650000000 },
    { "bulan": "2024-02", "total_omzet": 720000000 }
  ]
}
```

### **UMKM Endpoints**

| Method | Endpoint | Deskripsi | Role |
|--------|----------|-----------|------|
| GET | `/api/admin/umkm` | List semua UMKM | Admin, Pemerintah |
| POST | `/api/admin/umkm` | Tambah UMKM | Admin |
| GET | `/api/admin/umkm/{id}` | Detail UMKM | Admin, Pemerintah |
| PUT | `/api/admin/umkm/{id}` | Update UMKM | Admin |
| DELETE | `/api/admin/umkm/{id}` | Hapus UMKM | Admin |

**Request Body - Create UMKM:**
```json
{
  "user_id": 1,
  "nama_usaha": "Warung Makan Sejahtera",
  "pemilik": "Budi Santoso",
  "alamat": "Jl. Raya Malang No. 123",
  "kecamatan": "Lowokwaru",
  "sektor_usaha": "Kuliner",
  "tahun_berdiri": 2018,
  "nomor_qris": "QRIS123456789"
}
```

### **Credit Scoring Endpoints**

| Method | Endpoint | Deskripsi | Role |
|--------|----------|-----------|------|
| GET | `/api/admin/scoring` | List semua scoring | Admin, Pemerintah |
| POST | `/api/admin/scoring/generate/{umkm_id}` | Generate skor | Admin |
| GET | `/api/admin/scoring/{id}` | Detail scoring | Admin, Bank |
| PUT | `/api/admin/scoring/{id}` | Update scoring | Admin |
| DELETE | `/api/admin/scoring/{id}` | Hapus scoring | Admin |

**Response - Generate Scoring:**
```json
{
  "message": "Credit scoring berhasil digenerate",
  "data": {
    "id": 1,
    "umkm_id": 5,
    "skor": 85.50,
    "kategori": "Sangat Layak",
    "rekomendasi": "Direkomendasikan untuk plafon kredit mikro & bunga preferensial.",
    "created_at": "2024-06-03T10:30:00.000000Z",
    "updated_at": "2024-06-03T10:30:00.000000Z"
  }
}
```

---

## 🗄 Database Schema

### **Users Table**
```sql
CREATE TABLE users (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'umkm', 'pemerintah', 'bank') DEFAULT 'umkm',
    email_verified_at TIMESTAMP NULL,
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

### **UMKM Table**
```sql
CREATE TABLE umkm (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT UNSIGNED NOT NULL,
    nama_usaha VARCHAR(255) NOT NULL,
    pemilik VARCHAR(255) NOT NULL,
    alamat TEXT NOT NULL,
    kecamatan ENUM('Klojen', 'Lowokwaru', 'Blimbing', 'Sukun', 'Kedungkandang') NOT NULL,
    sektor_usaha VARCHAR(100) NOT NULL,
    tahun_berdiri YEAR NOT NULL,
    nomor_qris VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### **Transaksi QRIS Table**
```sql
CREATE TABLE transaksi_qris (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    umkm_id BIGINT UNSIGNED NOT NULL,
    bulan VARCHAR(7) NOT NULL, -- Format: YYYY-MM
    omzet DECIMAL(15, 2) NOT NULL,
    jumlah_transaksi INT NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (umkm_id) REFERENCES umkm(id) ON DELETE CASCADE
);
```

### **Credit Scoring Table**
```sql
CREATE TABLE credit_scoring (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    umkm_id BIGINT UNSIGNED UNIQUE NOT NULL,
    skor DECIMAL(5, 2) NOT NULL,
    kategori VARCHAR(50) NOT NULL,
    rekomendasi TEXT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (umkm_id) REFERENCES umkm(id) ON DELETE CASCADE
);
```

### **Monitoring Table**
```sql
CREATE TABLE monitorings (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    umkm_id BIGINT UNSIGNED NOT NULL,
    status ENUM('Aktif', 'Dipantau', 'Berisiko', 'Disetujui') DEFAULT 'Aktif',
    catatan TEXT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (umkm_id) REFERENCES umkm(id) ON DELETE CASCADE
);
```

---

## 🧮 Algoritma Credit Scoring

### **Formula Perhitungan**

```
Skor Akhir = (Stabilitas × 30) + (Volume × 25) + (Pertumbuhan × 20) + (Risiko × 15) + (Riwayat × 10)
            ───────────────────────────────────────────────────────────────────────────────────────
                                                  100
```

### **Penjelasan Faktor**

#### **1. Stabilitas Pendapatan (Bobot: 30%)**
- **Pengukuran**: Koefisien Variasi (CV) dari omzet bulanan
- **Rumus**: `CV = (Standar Deviasi / Rata-rata) × 100`
- **Skoring**: Semakin kecil CV, semakin stabil (skor maksimal 100)
- **Interpretasi**:
  - CV < 10%: Sangat Stabil (90-100)
  - CV 10-20%: Stabil (70-89)
  - CV 20-30%: Cukup Stabil (50-69)
  - CV > 30%: Tidak Stabil (0-49)

#### **2. Volume Transaksi (Bobot: 25%)**
- **Pengukuran**: Rata-rata omzet bulanan
- **Normalisasi**: Logaritmik untuk menghindari bias
- **Rumus**: `Skor = log10(omzet + 1) × 25`
- **Kategori**:
  - > Rp 50 juta/bulan: Sangat Tinggi (90-100)
  - Rp 20-50 juta/bulan: Tinggi (70-89)
  - Rp 10-20 juta/bulan: Sedang (50-69)
  - < Rp 10 juta/bulan: Rendah (0-49)

#### **3. Pertumbuhan Usaha (Bobot: 20%)**
- **Pengukuran**: Pertumbuhan omzet dari bulan pertama ke terakhir
- **Rumus**: `Pertumbuhan = ((Omzet_Akhir - Omzet_Awal) / Omzet_Awal) × 100`
- **Skoring**:
  - Pertumbuhan > 50%: Sangat Baik (90-100)
  - Pertumbuhan 20-50%: Baik (70-89)
  - Pertumbuhan 0-20%: Cukup (50-69)
  - Pertumbuhan negatif: Perlu Perhatian (0-49)

#### **4. Risiko Wilayah (Bobot: 15%)**
- **Pengukuran**: Berdasarkan kecamatan lokasi UMKM
- **Pertimbangan**: Tingkat ekonomi, infrastruktur, keamanan
- **Skoring Default**:
  - Klojen: 90 (Pusat Kota)
  - Lowokwaru: 85 (Kawasan Pendidikan)
  - Blimbing: 75 (Kawasan Industri)
  - Sukun: 70 (Kawasan Pemukiman)
  - Kedungkandang: 65 (Kawasan Berkembang)

#### **5. Riwayat Kredit (Bobot: 10%)**
- **Pengukuran**: Riwayat pembayaran (jika ada)
- **Default**: 75 (Netral untuk UMKM baru)
- **Integrasi**: Dapat dihubungkan dengan SLIK OJK atau sistem lain

### **Kategori Hasil**

| Skor | Kategori | Interpretasi | Rekomendasi |
|------|----------|--------------|-------------|
| **80-100** | **Sangat Layak** | Risiko sangat rendah, performa excellent | Plafon tinggi, bunga preferensial, proses cepat |
| **60-79** | **Layak** | Risiko rendah, performa baik | Plafon standar, persyaratan normal |
| **40-59** | **Cukup Layak** | Risiko sedang, perlu pendampingan | Plafon terbatas, agunan tambahan |
| **0-39** | **Tidak Layak** | Risiko tinggi, performa buruk | Tidak direkomendasikan, perlu perbaikan |

### **Contoh Perhitungan**

**Data UMKM "Warung Makan Sejahtera":**
- Omzet bulanan: Rp 25.000.000 (rata-rata)
- CV omzet: 15% (stabil)
- Pertumbuhan: 35% (dari Rp 18.5jt ke Rp 25jt)
- Lokasi: Lowokwaru
- Riwayat: Baru (default 75)

**Perhitungan:**
```
Stabilitas:     75 × 30 = 2250
Volume:         85 × 25 = 2125
Pertumbuhan:    80 × 20 = 1600
Risiko:         85 × 15 = 1275
Riwayat:        75 × 10 = 750
                ──────────────
                Total   = 8000

Skor Akhir = 8000 / 100 = 80.00

Kategori: SANGAT LAYAK ✅
```

---

## 📁 Struktur Folder

```
finsmart/
│
├── backend/                          # Laravel Backend
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   ├── AuthController.php
│   │   │   │   ├── DashboardController.php
│   │   │   │   ├── UMKMController.php
│   │   │   │   └── ScoringController.php
│   │   │   ├── Middleware/
│   │   │   │   └── CheckRole.php
│   │   │   └── Requests/
│   │   ├── Models/
│   │   │   ├── User.php
│   │   │   ├── UMKM.php
│   │   │   ├── TransaksiQRIS.php
│   │   │   ├── CreditScoring.php
│   │   │   └── Monitoring.php
│   │   └── Services/
│   │       └── ScoringService.php
│   ├── config/
│   │   ├── app.php
│   │   ├── database.php
│   │   ├── cors.php
│   │   └── sanctum.php
│   ├── database/
│   │   ├── migrations/
│   │   │   ├── 2024_01_01_000000_create_users_table.php
│   │   │   └── 2024_01_01_000001_create_finsmart_tables.php
│   │   └── seeders/
│   ├── routes/
│   │   ├── api.php
│   │   └── web.php
│   ├── .env
│   ├── artisan
│   └── composer.json
│
├── frontend/                         # React Frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Layouts/
│   │   │   │   └── AdminLayout.jsx
│   │   │   ├── Map/
│   │   │   │   └── UMKMDistributionMap.jsx
│   │   │   └── UI/
│   │   │       ├── StatCard.jsx
│   │   │       └── Button.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Admin/
│   │   │   │   ├── DashboardAdmin.jsx
│   │   │   │   ├── DataUMKM.jsx
│   │   │   │   └── CreditScoring.jsx
│   │   │   ├── Auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   ├── Bank/
│   │   │   │   └── DashboardBank.jsx
│   │   │   ├── Pemerintah/
│   │   │   │   └── DashboardPemerintah.jsx
│   │   │   ├── Public/
│   │   │   │   └── Home.jsx
│   │   │   └── UMKM/
│   │   │       └── DashboardUMKM.jsx
│   │   ├── routes/
│   │   │   └── AppRoutes.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
│
└── README.md
```

---

