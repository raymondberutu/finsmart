import { useEffect, useState } from 'react';
import { FaMapMarkedAlt, FaChartLine, FaBuilding, FaUsers } from 'react-icons/fa';
import UMKMDistributionMap from '../../components/Map/UMKMDistributionMap';
import api from '../../services/api';
import Swal from 'sweetalert2';

const DashboardPemerintah = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/dashboard');
      setStats(response.data.stats);
    } catch (error) {
      Swal.fire('Error', 'Gagal memuat data dashboard', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-dark font-grotesk mb-2">
          Dashboard Pemerintah Kota Malang
        </h1>
        <p className="text-gray-600">
          Monitoring dan Analisis Sebaran UMKM Berbasis QRIS
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="stat-card border-l-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Total UMKM</p>
              <h3 className="text-3xl font-bold text-dark">{stats?.total_umkm || 0}</h3>
            </div>
            <FaBuilding className="text-4xl text-primary" />
          </div>
        </div>

        <div className="stat-card border-l-blue">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Total Transaksi</p>
              <h3 className="text-3xl font-bold text-dark">{stats?.total_transaksi || 0}</h3>
            </div>
            <FaChartLine className="text-4xl text-blue" />
          </div>
        </div>

        <div className="stat-card border-l-amber">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Kredit Layak</p>
              <h3 className="text-3xl font-bold text-dark">{stats?.kredit_layak || 0}</h3>
            </div>
            <FaUsers className="text-4xl text-amber" />
          </div>
        </div>

        <div className="stat-card border-l-dark">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Rata-rata Skor</p>
              <h3 className="text-3xl font-bold text-dark">{stats?.avg_skor || 0}</h3>
            </div>
            <FaMapMarkedAlt className="text-4xl text-dark" />
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-dark mb-4 flex items-center gap-2">
          <FaMapMarkedAlt className="text-primary" />
          Peta Sebaran UMKM per Kecamatan
        </h2>
        <UMKMDistributionMap />
      </div>
    </div>
  );
};

export default DashboardPemerintah;