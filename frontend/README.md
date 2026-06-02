
```markdown
# FinSmart Frontend - React.js Application

Frontend aplikasi untuk FinSmart (Smart City Malang) menggunakan React.js + Vite + Tailwind CSS.

## 🚀 Tech Stack

- **React 18** - UI Library
- **Vite** - Build Tool & Dev Server
- **React Router DOM v6** - Routing
- **Tailwind CSS v3** - Styling
- **Axios** - HTTP Client
- **Recharts** - Chart/Graph Visualization
- **React Icons** - Icon Library
- **SweetAlert2** - Alert Components
- **React Leaflet** - Interactive Maps

## 📦 Instalasi

```bash
# Install dependencies
npm install

# Jalankan development server
npm run dev

# Build untuk production
npm run build

# Preview production build
npm run preview
```

## 🏗 Struktur Folder

```
src/
├── assets/              # Static assets (images, fonts)
├── components/          # Reusable components
│   ├── Layouts/        # Layout components (Sidebar, Header)
│   ├── Map/            # Map components (Leaflet)
│   └── UI/             # UI components (Buttons, Cards)
├── context/            # React Context (Auth, Global State)
├── pages/              # Page components
│   ├── Admin/          # Admin pages
│   ├── Auth/           # Login, Register
│   ├── Bank/           # Bank dashboard
│   ├── Pemerintah/     # Government dashboard
│   ├── Public/         # Public pages (Home)
│   └── UMKM/           # UMKM dashboard
├── routes/             # Route configuration
├── services/           # API services (Axios)
├── App.jsx             # Main App component
├── main.jsx            # Entry point
└── index.css           # Global styles (Tailwind)
```

## 🔧 Konfigurasi Environment

Buat file `.env` di root folder frontend:

```env
VITE_API_URL=http://127.0.0.1:8000/api
VITE_APP_NAME=FinSmart
```

## 📱 Fitur Utama

### 1. **Authentication**
- Login/Register dengan JWT Token
- Role-based access control (Admin, UMKM, Pemerintah, Bank)
- Protected routes

### 2. **Dashboard**
- Real-time analytics dengan Recharts
- Interactive maps (Leaflet) untuk peta sebaran UMKM
- Statistik cards & data visualization

### 3. **CRUD Operations**
- Manajemen data UMKM
- Credit scoring visualization
- Transaksi monitoring

### 4. **UI/UX**
- Responsive design (Mobile-first)
- Glassmorphism effects
- Tailwind CSS utility classes
- Custom components

## 🎨 Custom Tailwind Config

File: `tailwind.config.js`

```javascript
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1D9E75",
        dark: "#085041",
        blue: "#185FA5",
        amber: "#EF9F27",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
        grotesk: ["Space Grotesk", "sans-serif"],
      },
    },
  },
  plugins: [],
}
```

## 🔌 API Integration

File: `src/services/api.js`

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api',
});

// Auto-attach token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

## 📝 Development Scripts

```bash
# Development
npm run dev              # Start dev server (port 5173)

# Build
npm run build           # Build for production
npm run preview         # Preview production build

# Linting
npm run lint            # Run ESLint
```

## 🌐 Deployment

### Build untuk Production:
```bash
npm run build
```

Output akan ada di folder `dist/`. Upload folder ini ke hosting static (Vercel, Netlify, atau server Anda).

### Environment Variables Production:
```env
VITE_API_URL=https://api.finsmart.malangkota.go.id/api
```

