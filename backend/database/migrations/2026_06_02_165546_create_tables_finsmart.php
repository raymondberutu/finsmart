<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Modify users table
        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', ['admin', 'umkm', 'pemerintah', 'bank'])->default('umkm')->after('email');
        });

        // UMKM Table
        Schema::create('umkm', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('nama_usaha');
            $table->string('pemilik');
            $table->text('alamat');
            $table->string('kecamatan');
            $table->string('sektor_usaha');
            $table->year('tahun_berdiri');
            $table->string('nomor_qris')->unique();
            $table->timestamps();
        });

        // Transaksi QRIS Table
        Schema::create('transaksi_qris', function (Blueprint $table) {
            $table->id();
            $table->foreignId('umkm_id')->constrained()->onDelete('cascade');
            $table->string('bulan'); // Format: YYYY-MM
            $table->decimal('omzet', 15, 2);
            $table->integer('jumlah_transaksi');
            $table->timestamps();
        });

        // Credit Scoring Table
        Schema::create('credit_scoring', function (Blueprint $table) {
            $table->id();
            $table->foreignId('umkm_id')->unique()->constrained()->onDelete('cascade');
            $table->decimal('skor', 5, 2);
            $table->string('kategori');
            $table->text('rekomendasi')->nullable();
            $table->timestamps();
        });

        // Monitoring Table
        Schema::create('monitorings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('umkm_id')->constrained()->onDelete('cascade');
            $table->enum('status', ['Aktif', 'Dipantau', 'Berisiko', 'Disetujui'])->default('Aktif');
            $table->text('catatan')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('monitorings');
        Schema::dropIfExists('credit_scoring');
        Schema::dropIfExists('transaksi_qris');
        Schema::dropIfExists('umkm');
        
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('role');
        });
    }
};