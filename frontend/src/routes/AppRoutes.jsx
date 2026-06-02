import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// Public Pages
import Home from '../pages/Public/Home';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';

// Admin Pages
import DashboardAdmin from '../pages/Admin/DashboardAdmin';
import DataUMKM from '../pages/Admin/DataUMKM';
import CreditScoring from '../pages/Admin/CreditScoring';

// UMKM Pages
import DashboardUMKM from '../pages/UMKM/DashboardUMKM';

// Pemerintah Pages
import DashboardPemerintah from '../pages/Pemerintah/DashboardPemerintah';

// Bank Pages
import DashboardBank from '../pages/Bank/DashboardBank';

// Layout
import AdminLayout from '../components/Layouts/AdminLayout';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={['admin', 'pemerintah']}>
            <AdminLayout>
              <DashboardAdmin />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/umkm"
        element={
          <ProtectedRoute allowedRoles={['admin', 'pemerintah']}>
            <AdminLayout>
              <DataUMKM />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/scoring"
        element={
          <ProtectedRoute allowedRoles={['admin', 'pemerintah']}>
            <AdminLayout>
              <CreditScoring />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      {/* UMKM Routes */}
      <Route
        path="/umkm/dashboard"
        element={
          <ProtectedRoute allowedRoles={['umkm']}>
            <AdminLayout>
              <DashboardUMKM />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      {/* Pemerintah Routes */}
      <Route
        path="/pemerintah/dashboard"
        element={
          <ProtectedRoute allowedRoles={['pemerintah']}>
            <AdminLayout>
              <DashboardPemerintah />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      {/* Bank Routes */}
      <Route
        path="/bank/dashboard"
        element={
          <ProtectedRoute allowedRoles={['bank']}>
            <AdminLayout>
              <DashboardBank />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      {/* Catch All */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;