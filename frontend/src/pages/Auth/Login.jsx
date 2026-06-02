import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await login(formData.email, formData.password);

    if (result.success) {
      Swal.fire({
        icon: 'success',
        title: 'Login Berhasil',
        text: 'Selamat datang di FinSmart!',
        timer: 1500,
        showConfirmButton: false,
      });

      const role = result.user.role;
      if (role === 'admin' || role === 'pemerintah') {
        navigate('/admin/dashboard');
      } else if (role === 'umkm') {
        navigate('/umkm/dashboard');
      } else if (role === 'bank') {
        navigate('/bank/dashboard');
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Login Gagal',
        text: result.message,
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-blue/5 to-amber/5">
      <div className="glass-card w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-dark font-grotesk">FinSmart</h1>
          <p className="text-gray-600 mt-2">Silakan login ke akun Anda</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
              placeholder="nama@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input-field"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3"
          >
            {loading ? 'Memproses...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Belum punya akun?{' '}
            <Link to="/register" className="text-primary font-semibold hover:underline">
              Daftar sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;