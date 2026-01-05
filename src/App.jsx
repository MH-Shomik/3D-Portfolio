import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { AnimatePresence } from 'framer-motion';
import ParticleNetwork from './components/ParticleNetwork';
import HUD from './components/HUD';
import OverlayContent from './components/OverlayContent';
import CameraController from './components/CameraController';
import Loader from './components/Loader';
import Hero from './components/Hero';

function App() {
  const [activeSection, setActiveSection] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleNavigate = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="relative w-full h-screen bg-void-black text-white overflow-hidden selection:bg-neon-cyan selection:text-black">

      {/* Loader */}
      <AnimatePresence>
        {!isLoaded && <Loader onComplete={() => setIsLoaded(true)} />}
      </AnimatePresence>

      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <Suspense fallback={null}>
            <CameraController activeSection={activeSection} />
            <ParticleNetwork />
          </Suspense>
        </Canvas>
      </div>

      {/* Animated corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-neon-cyan/30 pointer-events-none"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 2px, 2px 2px, 2px 100%, 0 100%)' }} />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-electric-purple/30 pointer-events-none"
        style={{ clipPath: 'polygon(100% 100%, 0 100%, 0 calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 0, 100% 0)' }} />

      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none z-[60] opacity-5">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-cyan to-transparent h-1 animate-scan" />
      </div>

      {/* Noise Overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>

      {/* UI Overlay */}
      <div className={`relative z-10 w-full h-full pointer-events-none transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <Hero isVisible={isLoaded && !activeSection} />
        <HUD activeSection={activeSection} onNavigate={handleNavigate} />
        <OverlayContent activeSection={activeSection} onClose={() => setActiveSection(null)} />
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        .animate-scan {
          animation: scan 8s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default App;
