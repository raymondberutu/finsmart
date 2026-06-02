<?php

namespace App\Http\Controllers;

use App\Models\UMKM;
use App\Models\TransaksiQRIS;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UMKMController extends Controller
{
    public function index(Request $request)
    {
        $query = UMKM::with(['user', 'scoring', 'transaksi']);

        // Filter
        if ($request->has('kecamatan')) {
            $query->where('kecamatan', $request->kecamatan);
        }

        if ($request->has('sektor_usaha')) {
            $query->where('sektor_usaha', $request->sektor_usaha);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('nama_usaha', 'like', "%{$search}%")
                  ->orWhere('pemilik', 'like', "%{$search}%")
                  ->orWhere('nomor_qris', 'like', "%{$search}%");
            });
        }

        $umkm = $query->latest()->paginate(10);
        
        return response()->json($umkm);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'nama_usaha' => 'required|string|max:255',
            'pemilik' => 'required|string|max:255',
            'alamat' => 'required|string',
            'kecamatan' => 'required|in:Klojen,Lowokwaru,Blimbing,Sukun,Kedungkandang',
            'sektor_usaha' => 'required|string|max:100',
            'tahun_berdiri' => 'required|year',
            'nomor_qris' => 'required|string|unique:umkm,nomor_qris',
        ]);

        $umkm = UMKM::create($validated);

        return response()->json([
            'message' => 'UMKM berhasil ditambahkan',
            'data' => $umkm
        ], 201);
    }

    public function show($id)
    {
        $umkm = UMKM::with(['user', 'scoring', 'transaksi', 'monitoring'])->findOrFail($id);
        
        return response()->json($umkm);
    }

    public function update(Request $request, $id)
    {
        $umkm = UMKM::findOrFail($id);

        $validated = $request->validate([
            'nama_usaha' => 'sometimes|required|string|max:255',
            'pemilik' => 'sometimes|required|string|max:255',
            'alamat' => 'sometimes|required|string',
            'kecamatan' => 'sometimes|required|in:Klojen,Lowokwaru,Blimbing,Sukun,Kedungkandang',
            'sektor_usaha' => 'sometimes|required|string|max:100',
            'tahun_berdiri' => 'sometimes|required|year',
            'nomor_qris' => ['sometimes', 'required', 'string', Rule::unique('umkm')->ignore($id)],
        ]);

        $umkm->update($validated);

        return response()->json([
            'message' => 'UMKM berhasil diupdate',
            'data' => $umkm
        ]);
    }

    public function destroy($id)
    {
        $umkm = UMKM::findOrFail($id);
        $umkm->delete();

        return response()->json([
            'message' => 'UMKM berhasil dihapus'
        ]);
    }
}