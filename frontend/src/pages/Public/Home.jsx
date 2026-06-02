import { Link } from 'react-router-dom';
import { FaRocket, FaChartLine, FaShieldAlt, FaUsers, FaMoneyBillWave } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* REVISI 1: Menambahkan items-center untuk memastikan tombol sejajar vertikal */}
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-2xl font-bold text-primary font-grotesk">FinSmart</h1>
            
            <div className="flex items-center gap-3">
              {/* Login Button */}
              <Link 
                to="/login" 
                className="px-5 py-2.5 border border-primary text-primary font-semibold rounded-lg hover:bg-gray-50 transition-all"
              >
                Login
              </Link>
              
              {/* Daftar Button */}
              <Link 
                to="/register" 
                className="px-5 py-2.5 bg-primary hover:bg-dark text-white font-semibold rounded-lg shadow-md transition-all"
              >
                Daftar
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-blue/5 to-amber/5 py-20 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-dark font-grotesk mb-6">
              Revolusi Credit Scoring Berbasis QRIS<br />
              <span className="text-primary">untuk UMKM Malang</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Platform Financial Technology yang membantu UMKM Kota Malang memperoleh 
              akses pendanaan menggunakan sistem Alternative Credit Scoring berbasis transaksi QRIS.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/register" className="btn-primary text-lg px-8 py-4">
                Simulasi Kredit
              </Link>
              <Link to="/login" className="btn-secondary text-lg px-8 py-4">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="stat-card border-l-primary">
              <FaUsers className="text-4xl text-primary mb-4" />
              <h3 className="text-3xl font-bold text-dark">48.000+</h3>
              <p className="text-gray-600">UMKM Terdaftar</p>
            </div>
            <div className="stat-card border-l-blue">
              <FaChartLine className="text-4xl text-blue mb-4" />
              <h3 className="text-3xl font-bold text-dark">93.16%</h3>
              <p className="text-gray-600">Merchant QRIS</p>
            </div>
            <div className="stat-card border-l-amber">
              <FaMoneyBillWave className="text-4xl text-amber mb-4" />
              <h3 className="text-3xl font-bold text-dark">Rp579T</h3>
              <p className="text-gray-600">Total Transaksi</p>
            </div>
            <div className="stat-card border-l-dark">
              <FaShieldAlt className="text-4xl text-dark mb-4" />
              <h3 className="text-3xl font-bold text-dark">4 Tier</h3>
              <p className="text-gray-600">Credit Scoring</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-dark font-grotesk mb-12">
            Fitur Unggulan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 text-center">
              <FaChartLine className="text-5xl text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-dark mb-2">Alternative Credit Scoring</h3>
              <p className="text-gray-600">
                Penilaian kredit berbasis data transaksi QRIS yang akurat dan real-time.
              </p>
            </div>
            <div className="glass-card p-8 text-center">
              <FaShieldAlt className="text-5xl text-blue mx-auto mb-4" />
              <h3 className="text-xl font-bold text-dark mb-2">Keamanan Data</h3>
              <p className="text-gray-600">
                Sistem keamanan tingkat enterprise dengan enkripsi end-to-end.
              </p>
            </div>
            <div className="glass-card p-8 text-center">
              <FaRocket className="text-5xl text-amber mx-auto mb-4" />
              <h3 className="text-xl font-bold text-dark mb-2">Real Time Analytics</h3>
              <p className="text-gray-600">
                Dashboard analitik dengan update data secara real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* REVISI 2: Mengubah Tahun ke 2026 */}
          <p>&copy; 2026 FinSmart - Smart City Malang. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;