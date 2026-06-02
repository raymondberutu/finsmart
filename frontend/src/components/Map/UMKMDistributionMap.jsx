import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import api from '../../services/api';
import Swal from 'sweetalert2';

// Fix default marker icon issue in Vite/Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Koordinat Kecamatan di Malang
const KECAMATAN_COORDS = {
  'Klojen': { lat: -7.977, lng: 112.632, color: '#1D9E75' },
  'Lowokwaru': { lat: -7.955, lng: 112.620, color: '#185FA5' },
  'Blimbing': { lat: -7.960, lng: 112.645, color: '#EF9F27' },
  'Sukun': { lat: -7.990, lng: 112.610, color: '#8B5CF6' },
  'Kedungkandang': { lat: -7.995, lng: 112.650, color: '#EC4899' },
};

const UMKMDistributionMap = () => {
  const [umkmData, setUmkmData] = useState([]);
  const [kecamatanStats, setKecamatanStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedKecamatan, setSelectedKecamatan] = useState(null);

  useEffect(() => {
    fetchUMKMData();
  }, []);

  const fetchUMKMData = async () => {
    try {
      const response = await api.get('/admin/umkm');
      const data = response.data.data || response.data;
      
      setUmkmData(data);
      
      // Group by kecamatan
      const stats = {};
      data.forEach(umkm => {
        const kec = umkm.kecamatan;
        if (!stats[kec]) {
          stats[kec] = {
            count: 0,
            totalSkor: 0,
            umkm: []
          };
        }
        stats[kec].count += 1;
        stats[kec].umkm.push(umkm);
        if (umkm.scoring?.skor) {
          stats[kec].totalSkor += umkm.scoring.skor;
        }
      });

      // Calculate average skor
      Object.keys(stats).forEach(kec => {
        if (stats[kec].count > 0) {
          stats[kec].avgSkor = (stats[kec].totalSkor / stats[kec].count).toFixed(2);
        } else {
          stats[kec].avgSkor = 0;
        }
      });

      setKecamatanStats(stats);
    } catch (error) {
      Swal.fire('Error', 'Gagal memuat data peta', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleKecamatanClick = (kecamatan) => {
    setSelectedKecamatan(kecamatan);
  };

  // Custom icon based on count
  const getMarkerIcon = (count) => {
    const size = count > 10 ? 40 : count > 5 ? 30 : 20;
    return L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          background-color: #1D9E75;
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: ${size/2.5}px;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        ">
          ${count}
        </div>
      `,
      iconSize: [size, size],
      iconAnchor: [size/2, size/2]
    });
  };

  if (loading) {
    return (
      <div className="glass-card p-6 h-[500px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Legend */}
      <div className="glass-card p-4">
        <h3 className="font-bold text-dark mb-3">Legenda Kecamatan</h3>
        <div className="flex flex-wrap gap-4">
          {Object.entries(KECAMATAN_COORDS).map(([name, data]) => (
            <div 
              key={name} 
              className="flex items-center gap-2 cursor-pointer hover:opacity-75"
              onClick={() => handleKecamatanClick(name)}
            >
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: data.color }}
              />
              <span className="text-sm font-medium">
                {name} ({kecamatanStats[name]?.count || 0})
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="glass-card p-4">
        <div className="h-[500px] rounded-lg overflow-hidden z-0">
          <MapContainer
            center={[-7.977, 112.630]}
            zoom={12}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={true}
            className="z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Circle Markers for each Kecamatan */}
            {Object.entries(KECAMATAN_COORDS).map(([kecamatan, coords]) => {
              const stats = kecamatanStats[kecamatan] || { count: 0, avgSkor: 0 };
              return (
                <CircleMarker
                  key={kecamatan}
                  center={[coords.lat, coords.lng]}
                  radius={stats.count > 10 ? 40 : stats.count > 5 ? 30 : 20}
                  fillColor={coords.color}
                  color="#fff"
                  weight={2}
                  opacity={1}
                  fillOpacity={0.7}
                  eventHandlers={{
                    click: () => handleKecamatanClick(kecamatan),
                  }}
                >
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-bold text-lg mb-2">{kecamatan}</h3>
                      <div className="space-y-1 text-sm">
                        <p><strong>Total UMKM:</strong> {stats.count}</p>
                        <p><strong>Rata-rata Skor:</strong> {stats.avgSkor}</p>
                        {stats.avgSkor >= 80 && (
                          <p className="text-green-600 font-semibold">Sangat Layak</p>
                        )}
                        {stats.avgSkor >= 60 && stats.avgSkor < 80 && (
                          <p className="text-blue-600 font-semibold">Layak</p>
                        )}
                        {stats.avgSkor >= 40 && stats.avgSkor < 60 && (
                          <p className="text-yellow-600 font-semibold">Cukup Layak</p>
                        )}
                        {stats.avgSkor < 40 && (
                          <p className="text-red-600 font-semibold">Perlu Perhatian</p>
                        )}
                      </div>
                    </div>
                  </Popup>
                </CircleMarker>
              );
            })}

            {/* Individual UMKM Markers (optional - show on zoom) */}
            {umkmData.map((umkm) => {
              const coords = KECAMATAN_COORDS[umkm.kecamatan];
              if (!coords) return null;
              
              // Add slight random offset to avoid marker overlap
              const offsetLat = (Math.random() - 0.5) * 0.01;
              const offsetLng = (Math.random() - 0.5) * 0.01;

              return (
                <Marker
                  key={umkm.id}
                  position={[coords.lat + offsetLat, coords.lng + offsetLng]}
                  icon={getMarkerIcon(1)}
                >
                  <Popup>
                    <div className="p-2 max-w-xs">
                      <h4 className="font-bold text-primary mb-1">{umkm.nama_usaha}</h4>
                      <p className="text-sm text-gray-600 mb-1">Pemilik: {umkm.pemilik}</p>
                      <p className="text-sm text-gray-600 mb-1">Sektor: {umkm.sektor_usaha}</p>
                      {umkm.scoring && (
                        <div className="mt-2 pt-2 border-t">
                          <p className="text-sm">
                            <strong>Skor:</strong> {umkm.scoring.skor}
                          </p>
                          <p className="text-sm">
                            <strong>Kategori:</strong> {umkm.scoring.kategori}
                          </p>
                        </div>
                      )}
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      </div>

      {/* Detail Panel */}
      {selectedKecamatan && kecamatanStats[selectedKecamatan] && (
        <div className="glass-card p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-dark">
              Detail UMKM - {selectedKecamatan}
            </h3>
            <button
              onClick={() => setSelectedKecamatan(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-primary/10 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Total UMKM</p>
              <p className="text-2xl font-bold text-primary">
                {kecamatanStats[selectedKecamatan].count}
              </p>
            </div>
            <div className="bg-blue/10 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Rata-rata Skor</p>
              <p className="text-2xl font-bold text-blue">
                {kecamatanStats[selectedKecamatan].avgSkor}
              </p>
            </div>
            <div className="bg-amber/10 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Status</p>
              <p className="text-lg font-bold text-amber">
                {kecamatanStats[selectedKecamatan].avgSkor >= 60 ? 'Baik' : 'Perlu Perhatian'}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">Nama Usaha</th>
                  <th className="px-4 py-2 text-left">Pemilik</th>
                  <th className="px-4 py-2 text-left">Skor</th>
                  <th className="px-4 py-2 text-left">Kategori</th>
                </tr>
              </thead>
              <tbody>
                {kecamatanStats[selectedKecamatan].umkm.map((umkm) => (
                  <tr key={umkm.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium">{umkm.nama_usaha}</td>
                    <td className="px-4 py-2">{umkm.pemilik}</td>
                    <td className="px-4 py-2">
                      {umkm.scoring?.skor || '-'}
                    </td>
                    <td className="px-4 py-2">
                      {umkm.scoring?.kategori || 'Belum Ada'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default UMKMDistributionMap;