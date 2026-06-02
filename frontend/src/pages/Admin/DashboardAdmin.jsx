import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';
import api from '../../services/api';
import { FaUsers, FaMoneyBillWave, FaCheckCircle, FaChartLine } from 'react-icons/fa';
import Swal from 'sweetalert2';

const COLORS = ['#1D9E75', '#EF9F27', '#185FA5', '#8B5CF6'];

const DashboardAdmin = () => {
  const [stats, setStats] = useState(null);
  const [sectorData, setSectorData] = useState([]);
  const [creditDist, setCreditDist] = useState([]);
  const [growthData, setGrowthData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/dashboard');
      setStats(response.data.stats);
      setSectorData(response.data.sectors);
      setCreditDist(response.data.creditDistribution);
      setGrowthData(response.data.growthData);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Gagal memuat data dashboard',
      });
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
      <h1 className="text-3xl font-bold text-dark font-grotesk mb-6">Dashboard Analitik</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="stat-card border-l-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Total UMKM</p>
              <h3 className="text-3xl font-bold text-dark">{stats?.total_umkm || 0}</h3>
            </div>
            <FaUsers className="text-4xl text-primary" />
          </div>
        </div>

        <div className="stat-card border-l-blue">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Total Transaksi</p>
              <h3 className="text-3xl font-bold text-dark">{stats?.total_transaksi || 0}</h3>
            </div>
            <FaMoneyBillWave className="text-4xl text-blue" />
          </div>
        </div>

        <div className="stat-card border-l-amber">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Kredit Layak</p>
              <h3 className="text-3xl font-bold text-dark">{stats?.kredit_layak || 0}</h3>
            </div>
            <FaCheckCircle className="text-4xl text-amber" />
          </div>
        </div>

        <div className="stat-card border-l-dark">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Rata-rata Skor</p>
              <h3 className="text-3xl font-bold text-dark">{stats?.avg_skor || 0}</h3>
            </div>
            <FaChartLine className="text-4xl text-dark" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-dark mb-4">Volume Transaksi per Sektor</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sectorData}>
              <XAxis dataKey="sektor_usaha" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#1D9E75" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-dark mb-4">Distribusi Kategori Kredit</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={creditDist}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {creditDist.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="text-lg font-bold text-dark mb-4">Pertumbuhan Transaksi (12 Bulan Terakhir)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={growthData}>
            <XAxis dataKey="bulan" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total_omzet" stroke="#1D9E75" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardAdmin;