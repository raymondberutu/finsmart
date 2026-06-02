<?php

namespace App\Http\Controllers;

use App\Models\CreditScoring;
use App\Models\UMKM;
use App\Services\ScoringService;
use Illuminate\Http\Request;

class ScoringController extends Controller
{
    protected $scoringService;

    public function __construct(ScoringService $scoringService)
    {
        $this->scoringService = $scoringService;
    }

    public function generate($umkmId)
    {
        try {
            $scoring = $this->scoringService->generateScoring($umkmId);
            
            return response()->json([
                'message' => 'Credit scoring berhasil digenerate',
                'data' => $scoring
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal generate scoring',
                'error' => $e->getMessage()
            ], 400);
        }
    }

    public function index()
    {
        $scoring = CreditScoring::with('umkm')
            ->latest()
            ->paginate(10);
            
        return response()->json($scoring);
    }

    public function show($id)
    {
        $scoring = CreditScoring::with(['umkm.user'])->findOrFail($id);
        
        return response()->json($scoring);
    }

    public function update(Request $request, $id)
    {
        $scoring = CreditScoring::findOrFail($id);
        
        $validated = $request->validate([
            'skor' => 'sometimes|numeric|min:0|max:100',
            'kategori' => 'sometimes|string',
            'rekomendasi' => 'sometimes|string'
        ]);

        $scoring->update($validated);

        return response()->json([
            'message' => 'Scoring berhasil diupdate',
            'data' => $scoring
        ]);
    }

    public function destroy($id)
    {
        $scoring = CreditScoring::findOrFail($id);
        $scoring->delete();

        return response()->json([
            'message' => 'Scoring berhasil dihapus'
        ]);
    }
}