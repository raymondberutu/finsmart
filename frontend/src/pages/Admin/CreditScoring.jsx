import { useEffect, useState } from 'react';
import api from '../../services/api';
import Swal from 'sweetalert2';
import { FaCalculator, FaChartLine } from 'react-icons/fa';

const CreditScoring = () => {
  const [scoring, setScoring] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchScoring();
  }, []);

  const fetchScoring = async () => {
    try {
      const response = await api.get('/admin/scoring');
      setScoring(response.data.data);
    } catch (error) {
      Swal.fire('Error', 'Gagal memuat data scoring', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async (umkmId) => {
    try {
      const response = await api.post(`/admin/scoring/generate/${umkmId}`);
      Swal.fire({
        icon: 'success',
        title: 'Scoring Berhasil',
        text: `Skor: ${response.data.data.skor} - ${response.data.data.kategori}`,
      });
      fetchScoring();
    } catch (error) {
      Swal.fire('Error', error.response?.data?.error || 'Gagal generate scoring', 'error');
    }
  };

  const getCategoryColor = (kategori) => {
    const colors = {
      'Sangat Layak': 'bg-green-100 text-green-800',
      'Layak': 'bg-blue-100 text-blue-800',
      'Cukup Layak': 'bg-yellow-100 text-yellow-800',
      'Tidak Layak': 'bg-red-100 text-red-800',
    };
    return colors[kategori] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-dark font-grotesk mb-6">Credit Scoring</h1>

      <div className="glass-card p-6 mb-6">
        <h3 className="text-lg font-bold mb-4">Algoritma Credit Scoring</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm">
          <div className="p-3 bg-primary/10 rounded-lg">
            <p className="font-semibold">Stabilitas Pendapatan</p>
            <p className="text-primary font-bold">Bobot 30%</p>
          </div>
          <div className="p-3 bg-blue/10 rounded-lg">
            <p className="font-semibold">Volume Transaksi</p>
            <p className="text-blue font-bold">Bobot 25%</p>
          </div>
          <div className="p-3 bg-amber/10 rounded-lg">
            <p className="font-semibold">Pertumbuhan Usaha</p>
            <p className="text-amber font-bold">Bobot 20%</p>
          </div>
          <div className="p-3 bg-purple-100 rounded-lg">
            <p className="font-semibold">Risiko Wilayah</p>
            <p className="text-purple-700 font-bold">Bobot 15%</p>
          </div>
          <div className="p-3 bg-gray-100 rounded-lg">
            <p className="font-semibold">Riwayat Kredit</p>
            <p className="text-gray-700 font-bold">Bobot 10%</p>
          </div>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Nama Usaha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Skor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Kategori
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Rekomendasi
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {scoring.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {item.umkm?.nama_usaha}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-lg font-bold text-primary">{item.skor}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(item.kategori)}`}>
                        {item.kategori}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-md truncate">
                      {item.rekomendasi}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleGenerate(item.umkm_id)}
                        className="btn-primary flex items-center gap-2 text-sm py-2 px-4"
                      >
                        <FaCalculator /> Generate Ulang
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreditScoring;