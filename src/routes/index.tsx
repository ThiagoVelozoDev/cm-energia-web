import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Projects from '../pages/Projects';
import AdminLogin from '../pages/admin/AdminLogin';
import AdminLayout from '../pages/admin/AdminLayout';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminLogo from '../pages/admin/AdminLogo';
import AdminTeam from '../pages/admin/AdminTeam';
import AdminStats from '../pages/admin/AdminStats';
import AdminServices from '../pages/admin/AdminServices';
import AdminProjects from '../pages/admin/AdminProjects';
import AdminTestimonials from '../pages/admin/AdminTestimonials';
import AdminContact from '../pages/admin/AdminContact';
import AdminMessages from '../pages/admin/AdminMessages';
import ProtectedRoute from '../components/admin/ProtectedRoute';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projetos" element={<Projects />} />

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      <Route
        path="/admin"
        element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="logo" element={<AdminLogo />} />
        <Route path="team" element={<AdminTeam />} />
        <Route path="stats" element={<AdminStats />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="projects" element={<AdminProjects />} />
        <Route path="testimonials" element={<AdminTestimonials />} />
        <Route path="contact" element={<AdminContact />} />
        <Route path="messages" element={<AdminMessages />} />
      </Route>
    </Routes>
  );
}
