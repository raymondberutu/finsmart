import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FaBuilding, FaChartLine, FaMoneyBill } from 'react-icons/fa';

const DashboardUMKM = () => {
  const { user } = useAuth();
  const [umkmData, setUmkmData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data UMKM milik user ini
    fetchUMKMData();
  }, []);

  const fetchUMKMData = async () => {
    try {
      // Nanti diganti dengan API call yang sebenarnya
      // const response = await api.get(`/umkm/user/${user.id}`);
      // setUmkmData(response.data);
      
      // Dummy data untuk sementara
      setUmkmData({
        nama_usaha: 'Contoh UMKM',
        pemilik: user?.name,
        sektor_usaha: 'Kuliner',
        skor: 75.5,
        kategori: 'Layak'
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-dark font-grotesk mb-6">Dashboard UMKM</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="stat-card border-l-primary">
          <div className="flex items-center gap-4">
            <FaBuilding className="text-4xl text-primary" />
            <div>
              <p className="text-gray-500">Nama Usaha</p>
              <h3 className="text-xl font-bold">{umkmData?.nama_usaha || '-'}</h3>
            </div>
          </div>
        </div>

        <div className="stat-card border-l-blue">
          <div className="flex items-center gap-4">
            <FaChartLine className="text-4xl text-blue" />
            <div>
              <p className="text-gray-500">Skor Kredit</p>
              <h3 className="text-xl font-bold">{umkmData?.skor || '-'}</h3>
            </div>
          </div>
        </div>

        <div className="stat-card border-l-amber">
          <div className="flex items-center gap-4">
            <FaMoneyBill className="text-4xl text-amber" />
            <div>
              <p className="text-gray-500">Status</p>
              <h3 className="text-xl font-bold">{umkmData?.kategori || '-'}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="text-xl font-bold mb-4">Informasi Usaha</h3>
        <div className="space-y-2">
          <p><strong>Pemilik:</strong> {umkmData?.pemilik}</p>
          <p><strong>Sektor:</strong> {umkmData?.sektor_usaha}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardUMKM;