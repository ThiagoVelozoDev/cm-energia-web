import { BrowserRouter, useLocation } from 'react-router-dom';
import { SiteDataProvider } from './context/SiteDataContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppButton from './components/layout/WhatsAppButton';
import AppRoutes from './routes';

function SiteShell() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Navbar />}
      <AppRoutes />
      {!isAdmin && <Footer />}
      {!isAdmin && <WhatsAppButton />}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <SiteDataProvider>
        <BrowserRouter>
          <SiteShell />
        </BrowserRouter>
      </SiteDataProvider>
    </AuthProvider>
  );
}
