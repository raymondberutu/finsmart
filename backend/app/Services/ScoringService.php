<?php

namespace App\Services;

use App\Models\UMKM;
use App\Models\TransaksiQRIS;
use App\Models\CreditScoring;

class ScoringService
{
    public function generateScoring($umkmId)
    {
        $umkm = UMKM::findOrFail($umkmId);
        $transaksi = TransaksiQRIS::where('umkm_id', $umkmId)
            ->orderBy('bulan')
            ->get();

        if ($transaksi->isEmpty()) {
            throw new \Exception('Data transaksi belum tersedia untuk UMKM ini.');
        }

        // Calculate metrics
        $omzetAvg = $transaksi->avg('omzet');
        $txnAvg = $transaksi->avg('jumlah_transaksi');
        $growth = $this->calculateGrowth($transaksi);
        $stabilitas = $this->calculateStabilitas($transaksi);
        $risikoWilayah = $this->getRiskScore($umkm->kecamatan);
        $riwayat = 75; // Default, bisa diintegrasikan dengan sistem lain

        // Normalisasi ke skala 0-100
        $volumeScore = min(100, ($omzetAvg > 0 ? log10($omzetAvg + 1) * 25 : 0));
        $pertumbuhanScore = min(100, max(0, $growth));
        $stabilitasScore = min(100, $stabilitas);

        // Hitung skor akhir dengan bobot
        $skorMentah = (
            ($stabilitasScore * 30) +
            ($volumeScore * 25) +
            ($pertumbuhanScore * 20) +
            ($risikoWilayah * 15) +
            ($riwayat * 10)
        ) / 100;

        $skorFinal = round($skorMentah, 2);
        $kategori = $this->getKategori($skorFinal);
        $rekomendasi = $this->getRekomendasi($kategori);

        return CreditScoring::updateOrCreate(
            ['umkm_id' => $umkmId],
            [
                'skor' => $skorFinal,
                'kategori' => $kategori,
                'rekomendasi' => $rekomendasi
            ]
        );
    }

    private function calculateGrowth($transaksi)
    {
        if ($transaksi->count() < 2) return 50;
        
        $first = $transaksi->first()->omzet;
        $last = $transaksi->last()->omzet;
        
        if ($first == 0) return 100;
        
        return (($last - $first) / $first) * 100 + 50;
    }

    private function calculateStabilitas($transaksi)
    {
        if ($transaksi->count() < 2) return 50;
        
        $omzetValues = $transaksi->pluck('omzet')->toArray();
        $avg = array_sum($omzetValues) / count($omzetValues);
        $variance = 0;
        
        foreach ($omzetValues as $value) {
            $variance += pow($value - $avg, 2);
        }
        
        $stdDev = sqrt($variance / count($omzetValues));
        $cv = ($avg > 0) ? ($stdDev / $avg) * 100 : 100;
        
        // Semakin kecil CV, semakin stabil (max 100)
        return max(0, 100 - $cv);
    }

    private function getRiskScore($kecamatan)
    {
        $risikoMap = [
            'Klojen' => 90,
            'Lowokwaru' => 85,
            'Blimbing' => 75,
            'Sukun' => 70,
            'Kedungkandang' => 65,
        ];
        
        return $risikoMap[$kecamatan] ?? 70;
    }

    private function getKategori($skor)
    {
        if ($skor >= 80) return 'Sangat Layak';
        if ($skor >= 60) return 'Layak';
        if ($skor >= 40) return 'Cukup Layak';
        return 'Tidak Layak';
    }

    private function getRekomendasi($kategori)
    {
        $rekomendasi = [
            'Sangat Layak' => 'Direkomendasikan untuk plafon kredit mikro & bunga preferensial. Proses persetujuan dipercepat.',
            'Layak' => 'Cocok untuk pendanaan usaha produktif dengan agunan ringan. Persyaratan standar berlaku.',
            'Cukup Layak' => 'Perlu pendampingan keuangan sebelum pengajuan kredit. Disarankan meningkatkan volume transaksi QRIS.',
            'Tidak Layak' => 'Belum memenuhi threshold risiko minimum. Fokus pada peningkatan stabilitas dan volume transaksi selama 6 bulan ke depan.'
        ];
        
        return $rekomendasi[$kategori] ?? 'Perlu evaluasi lebih lanjut.';
    }
}