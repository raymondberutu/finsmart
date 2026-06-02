import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  FaHome, FaBuilding, FaChartLine, FaUsers, FaSignOutAlt, 
  FaBars, FaTimes, FaMoneyBillWave, FaMapMarkedAlt 
} from 'react-icons/fa';

const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const menuItems = {
    admin: [
      { path: '/admin/dashboard', icon: FaHome, label: 'Dashboard' },
      { path: '/admin/umkm', icon: FaBuilding, label: 'Data UMKM' },
      { path: '/admin/scoring', icon: FaChartLine, label: 'Credit Scoring' },
    ],
    pemerintah: [
      { path: '/admin/dashboard', icon: FaHome, label: 'Dashboard' },
      { path: '/admin/umkm', icon: FaBuilding, label: 'Data UMKM' },
      { path: '/pemerintah/dashboard', icon: FaMapMarkedAlt, label: 'Peta Sebaran' },
    ],
    umkm: [
      { path: '/umkm/dashboard', icon: FaHome, label: 'Dashboard' },
    ],
    bank: [
      { path: '/bank/dashboard', icon: FaHome, label: 'Dashboard' },
      { path: '/admin/scoring', icon: FaChartLine, label: 'Credit Scoring' },
    ],
  };

  const currentMenu = menuItems[user?.role] || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-dark w-64`}
      >
        <div className="flex items-center justify-between h-16 px-6 bg-dark border-b border-gray-700">
          <h1 className="text-xl font-bold text-white font-grotesk">FinSmart</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-400 hover:text-white lg:hidden"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {currentMenu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? 'bg-primary text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.name}</p>
              <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all ${sidebarOpen ? 'lg:ml-64' : ''}`}>
        {/* Header */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-600 hover:text-gray-900"
          >
            <FaBars size={20} />
          </button>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {new Date().toLocaleDateString('id-ID', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;