import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Cursor from './components/Cursor.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';
import AmbientBackground from './components/AmbientBackground.jsx';
import ParallaxGridLayers from './components/ParallaxGridLayers.jsx';

export default function App() {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-base text-ink">
      <ScrollProgress />
      <AmbientBackground />
      <ParallaxGridLayers />
      <Cursor />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="relative z-10"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <WhatsAppButton />
      <Footer />
    </div>
  );
}
