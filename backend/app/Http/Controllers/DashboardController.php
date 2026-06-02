<?php

namespace App\Http\Controllers;

use App\Models\UMKM;
use App\Models\TransaksiQRIS;
use App\Models\CreditScoring;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * Dashboard Analitik Utama
     */
    public function index(Request $request)
    {
        $totalUMKM = UMKM::count();
        $totalTransaksi = TransaksiQRIS::count();
        $totalOmzet = TransaksiQRIS::sum('omzet');
        
        $skorSangatLayak = CreditScoring::where('kategori', 'Sangat Layak')->count();
        $skorLayak = CreditScoring::where('kategori', 'Layak')->count();
        $skorCukupLayak = CreditScoring::where('kategori', 'Cukup Layak')->count();
        $skorTidakLayak = CreditScoring::where('kategori', 'Tidak Layak')->count();
        
        $avgSkor = CreditScoring::avg('skor') ?? 0;

        $sectorData = UMKM::select('sektor_usaha', DB::raw('COUNT(*) as total'))
            ->groupBy('sektor_usaha')
            ->get();

        $creditDistribution = [
            ['name' => 'Sangat Layak', 'value' => $skorSangatLayak],
            ['name' => 'Layak', 'value' => $skorLayak],
            ['name' => 'Cukup Layak', 'value' => $skorCukupLayak],
            ['name' => 'Tidak Layak', 'value' => $skorTidakLayak],
        ];

        $growthData = TransaksiQRIS::select('bulan', DB::raw('SUM(omzet) as total_omzet'))
            ->groupBy('bulan')
            ->orderBy('bulan')
            ->limit(12)
            ->get();

        return response()->json([
            'stats' => [
                'total_umkm' => $totalUMKM,
                'total_transaksi' => $totalTransaksi,
                'total_omzet' => $totalOmzet,
                'kredit_layak' => $skorSangatLayak + $skorLayak,
                'avg_skor' => round($avgSkor, 2)
            ],
            'sectors' => $sectorData,
            'creditDistribution' => $creditDistribution,
            'growthData' => $growthData
        ]);
    }

    /**
     * Data Transaksi Paginated
     */
    public function transaksi(Request $request)
    {
        $transaksi = TransaksiQRIS::with('umkm')
            ->latest()
            ->paginate(10);
            
        return response()->json($transaksi);
    }

    /**
     * Data Peta Sebaran UMKM per Kecamatan
     */
    public function petaSebaran()
    {
        // Ambil jumlah UMKM per kecamatan
        $umkmByKecamatan = UMKM::select('kecamatan', DB::raw('COUNT(*) as total'))
            ->groupBy('kecamatan')
            ->get();

        // Mapping ke format GeoJSON-like untuk frontend
        $features = $umkmByKecamatan->map(function ($item) {
            return [
                'kecamatan' => $item->kecamatan,
                'total_umkm' => $item->total,
                'coordinates' => $this->getKecamatanCoordinates($item->kecamatan)
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $features
        ]);
    }

    /**
     * Helper: Koordinat Kecamatan di Kota Malang
     */
    private function getKecamatanCoordinates($kecamatan)
    {
        $coordinates = [
            'Klojen'         => ['lat' => -7.9770, 'lng' => 112.6320],
            'Lowokwaru'      => ['lat' => -7.9550, 'lng' => 112.6200],
            'Blimbing'       => ['lat' => -7.9600, 'lng' => 112.6450],
            'Sukun'          => ['lat' => -7.9900, 'lng' => 112.6100],
            'Kedungkandang'  => ['lat' => -7.9950, 'lng' => 112.6500],
        ];

        // Fallback ke pusat kota jika kecamatan tidak dikenali
        return $coordinates[$kecamatan] ?? ['lat' => -7.9770, 'lng' => 112.6300];
    }
}