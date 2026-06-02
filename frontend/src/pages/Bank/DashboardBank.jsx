import { useEffect, useState } from 'react';
import { FaBuilding, FaChartLine, FaCheckCircle } from 'react-icons/fa';
import api from '../../services/api';
import Swal from 'sweetalert2';

const DashboardBank = () => {
  const [stats, setStats] = useState(null);
  const [umkmList, setUmkmList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/dashboard');
      setStats(response.data.stats);
      
      const umkmRes = await api.get('/bank/umkm');
      setUmkmList(umkmRes.data.data || []);
    } catch (error) {
      Swal.fire('Error', 'Gagal memuat data', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-dark font-grotesk mb-6">Dashboard Lembaga Keuangan</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="stat-card border-l-primary">
          <div className="flex items-center gap-4">
            <FaBuilding className="text-4xl text-primary" />
            <div>
              <p className="text-gray-500">Total UMKM</p>
              <h3 className="text-2xl font-bold">{stats?.total_umkm || 0}</h3>
            </div>
          </div>
        </div>

        <div className="stat-card border-l-blue">
          <div className="flex items-center gap-4">
            <FaChartLine className="text-4xl text-blue" />
            <div>
              <p className="text-gray-500">Rata-rata Skor</p>
              <h3 className="text-2xl font-bold">{stats?.avg_skor || 0}</h3>
            </div>
          </div>
        </div>

        <div className="stat-card border-l-amber">
          <div className="flex items-center gap-4">
            <FaCheckCircle className="text-4xl text-amber" />
            <div>
              <p className="text-gray-500">Layak Kredit</p>
              <h3 className="text-2xl font-bold">{stats?.kredit_layak || 0}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="text-xl font-bold mb-4">Daftar UMKM Potensial</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">Nama Usaha</th>
                <th className="px-4 py-2 text-left">Pemilik</th>
                <th className="px-4 py-2 text-left">Skor</th>
                <th className="px-4 py-2 text-left">Kategori</th>
              </tr>
            </thead>
            <tbody>
              {umkmList.slice(0, 10).map((umkm) => (
                <tr key={umkm.id} className="border-t">
                  <td className="px-4 py-2">{umkm.nama_usaha}</td>
                  <td className="px-4 py-2">{umkm.pemilik}</td>
                  <td className="px-4 py-2">{umkm.scoring?.skor || '-'}</td>
                  <td className="px-4 py-2">{umkm.scoring?.kategori || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardBank;