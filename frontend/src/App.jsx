
import { AuthProvider, useAuth } from './context/AuthContext';
import { Link, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import About from './pages/About';
import Gigs from './pages/Gigs';
import PostGig from './pages/PostGig';
import GigBids from './pages/GigBids';
import BidForm from './pages/BidForm';
import ForgotPassword from './pages/ForgotPassword';
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="flex items-center justify-center min-h-screen">
    <span className="loading loading-spinner loading-lg text-primary"></span>
  </div>;

  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <AuthProvider>
      <div className="drawer">
        <input id="sidebar" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <Navbar />
          <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />

              <Route path="/" element={<ProtectedRoute><Gigs /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/post-gig" element={<ProtectedRoute><PostGig /></ProtectedRoute>} />
              <Route path="/gigs/:gigId/bid" element={<ProtectedRoute><BidForm /></ProtectedRoute>} />
              <Route path="/gigs/:gigId/bids" element={<ProtectedRoute><GigBids /></ProtectedRoute>} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>

        <div className="drawer-side">
          <label htmlFor="sidebar" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/post-gig">Post Gig</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;