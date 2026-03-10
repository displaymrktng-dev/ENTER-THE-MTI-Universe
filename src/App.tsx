/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, memo, Suspense, lazy } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Share2, 
  Info, 
  Gamepad2, 
  Battery, 
  Wifi, 
  Signal,
  Volume2,
  Maximize2,
  ExternalLink
} from 'lucide-react';
import { BRANDS, BrandNode } from './constants';

const DynamicBackground = lazy(() => import('./components/DynamicBackground').then(module => ({ default: module.DynamicBackground })));

const GameboyNode = memo(({ brand, isSelected, onClick }: { brand: BrandNode, isSelected: boolean, onClick: () => void }) => {
  
  // Facilitate seamless keyboard navigation to ensure maximum accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <motion.div
      layoutId={`node-${brand.id}`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      className={`relative flex-shrink-0 w-64 h-80 rounded-2xl cursor-pointer transition-[transform,box-shadow] duration-500 overflow-hidden focus:outline-none focus:ring-4 focus:ring-white/40 ${
        isSelected ? 'ring-4 ring-white/20 scale-105' : 'hover:scale-105'
      }`}
      style={{ backgroundColor: brand.color }}
    >
      {/* Gameboy Device Aesthetic */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      
      {/* Screen Area */}
      <div 
        className="absolute top-6 left-6 right-6 bottom-24 rounded-sm border-4 border-[#306230]/30 flex flex-col items-center justify-center p-4 overflow-hidden shadow-inner bg-cover bg-center group"
        style={{ 
          backgroundColor: brand.color,
          backgroundImage: brand.imageUrl ? `url(${brand.imageUrl})` : 'none'
        }}
      >
        {/* Dark overlay to ensure the frosted glass pops */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
        
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none bg-[radial-gradient(circle,transparent_20%,#000_20%,#000_40%,transparent_40%,transparent_60%,#000_60%,#000_80%,transparent_80%)] bg-[length:4px_4px]" />
        
        {/* Optimized Animation: Only run when in view */}
        <motion.div 
          whileInView={{ y: [0, -2, 0] }}
          viewport={{ once: false, margin: "0px" }}
          transition={{ duration: 2, repeat: Infinity }}
          className="relative z-10 flex flex-col items-center text-center bg-white/90 backdrop-blur-md p-5 rounded-2xl border border-white/20 shadow-2xl w-full max-w-[95%] transform group-hover:scale-105 transition-transform duration-500"
        >
          <div className="mb-2 text-black">{brand.icon}</div>
          <div className="text-2xl md:text-3xl leading-none font-display font-black uppercase tracking-tighter text-black">{brand.name}</div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-black/60 mt-1">{brand.subtitle}</div>
          
          {/* Interactive Prompt */}
          <div className="mt-4 px-4 py-1.5 rounded-full bg-black text-[9px] font-bold uppercase tracking-widest text-white animate-pulse shadow-lg">
            Tap to Explore
          </div>
        </motion.div>
      </div>

      {/* Controls Area */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-white/10 backdrop-blur-md flex items-center justify-between px-6">
        <div className="flex flex-col gap-1">
          <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-black/40" />
          </div>
          <div className="text-[8px] uppercase tracking-widest opacity-50 font-bold">Action</div>
        </div>
        <div className="flex gap-2">
          <div className="w-6 h-2 rounded-full bg-black/20 rotate-[-25deg]" />
          <div className="w-6 h-2 rounded-full bg-black/20 rotate-[-25deg]" />
        </div>
      </div>
    </motion.div>
  );
});

GameboyNode.displayName = 'GameboyNode';

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const selectedBrand = BRANDS.find(b => b.id === selectedId);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'ENTER THE MTI UNIVERSE',
      text: 'Explore the future of culture, music, and digital innovation in the MTI Universe.',
      url: window.location.href, // Dynamically use the current URL (important for when deployed to a custom domain)
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(shareData.url);
        showToast('Link copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy:', err);
        showToast('Failed to copy link.');
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#050505] font-sans selection:bg-white selection:text-black">
      <Suspense fallback={null}>
        <DynamicBackground />
      </Suspense>

      {/* Status Bar (Google Efficiency) */}
      <header className="fixed top-0 left-0 right-0 h-14 px-6 flex items-center justify-between z-50 glass-panel border-none bg-transparent">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <motion.div 
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"
            />
            <span className="text-[10px] font-bold tracking-[0.2em] text-emerald-500 uppercase">Live</span>
          </div>
          <a href="https://instagram.com/displayMRKTNG" target="_blank" rel="noopener noreferrer" className="text-sm font-bold tracking-tighter uppercase hover:text-white/80 transition-colors">displayMRKTNG</a>
          <div className="h-4 w-[1px] bg-white/20" />
          <div className="text-[10px] font-mono opacity-50 uppercase tracking-widest">MTI Universe</div>
        </div>
        
        <div className="flex items-center gap-4 text-white/60">
          <div className="flex items-center gap-1">
            <Signal size={12} />
            <Wifi size={12} />
            <Battery size={12} className="rotate-90" />
          </div>
          <div className="text-xs font-mono">22:40</div>
        </div>
      </header>

      <main className="relative pt-24 pb-12 px-6 md:px-12 max-w-[1800px] mx-auto">
        {/* Hero Section (Kanye Minimalism) */}
        <div className="mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tighter leading-[0.85] uppercase mb-4"
          >
            Enter the<br />MTI Universe
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base max-w-xl font-medium tracking-tight"
          >
            A media brand ecosystem housing the future of culture, music, and digital innovation. 
            Transform your device into our world.
          </motion.p>
        </div>

        {/* Vertical Arcade Style Menu */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-24">
          {BRANDS.map((brand) => (
            <div key={brand.id} className="flex justify-center">
              <GameboyNode 
                brand={brand} 
                isSelected={selectedId === brand.id}
                onClick={() => setSelectedId(brand.id)}
              />
            </div>
          ))}
        </div>

        {/* Brand Details Overlay (Apple Arcade Style) */}
        <AnimatePresence>
          {selectedId && selectedBrand && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/80 backdrop-blur-2xl"
              onClick={() => setSelectedId(null)}
            >
              <motion.div
                layoutId={`node-${selectedBrand.id}`}
                className="relative w-full max-w-4xl bg-[#111] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="grid md:grid-cols-2 h-full">
                  {/* Visual Side */}
                  <div 
                    className="relative h-64 md:h-auto flex flex-col items-center justify-center p-12 bg-cover bg-center"
                    style={{ 
                      backgroundColor: selectedBrand.color,
                      backgroundImage: selectedBrand.imageUrl ? `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url(${selectedBrand.imageUrl})` : 'none'
                    }}
                  >
                    <div className="absolute top-6 left-6 text-[10px] font-bold uppercase tracking-widest text-white/40">
                      SYSTEM_ACTIVE // {selectedBrand.category}
                    </div>
                    
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-[#8bac0f] p-8 rounded-xl border-8 border-[#306230]/30 shadow-2xl"
                    >
                      <div className="text-[#0f380f] scale-[2]">
                        {selectedBrand.icon}
                      </div>
                    </motion.div>

                    <div className="mt-12 text-center text-white">
                      <h2 className="text-4xl font-display font-bold uppercase tracking-tighter">{selectedBrand.name}</h2>
                      <p className="text-white/60 uppercase tracking-widest text-xs mt-2">{selectedBrand.subtitle}</p>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="p-8 md:p-12 flex flex-col justify-between bg-zinc-900">
                    <div>
                      <div className="flex items-center gap-2 mb-6">
                        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-wider text-white/60">
                          {selectedBrand.category}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-wider text-white/60">
                          Verified Brand
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-display font-medium mb-4">About the Innovator</h3>
                      <p className="text-white/60 leading-relaxed mb-8">
                        {selectedBrand.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                          <div className="text-[10px] uppercase text-white/40 mb-1">Retention</div>
                          <div className="text-xl font-mono">98.4%</div>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                          <div className="text-[10px] uppercase text-white/40 mb-1">Status</div>
                          <div className="text-xl font-mono text-emerald-500">LIVE</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      {selectedBrand.link ? (
                        <a 
                          href={selectedBrand.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-4 rounded-2xl bg-white text-black font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                        >
                          Enter Experience <ExternalLink size={18} />
                        </a>
                      ) : (
                        <button className="w-full py-4 rounded-2xl bg-white text-black font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 opacity-50 cursor-not-allowed">
                          Coming Soon <ChevronRight size={18} />
                        </button>
                      )}
                      
                      {selectedBrand.secondaryLinks && (
                        <div className="flex gap-3">
                          {selectedBrand.secondaryLinks.map((sl, idx) => (
                            <a 
                              key={idx}
                              href={sl.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 py-3 rounded-2xl bg-white/10 border border-white/20 text-[10px] font-bold uppercase tracking-widest hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
                            >
                              {sl.name} <ExternalLink size={14} />
                            </a>
                          ))}
                        </div>
                      )}

                      <div className="flex gap-3 mt-2">
                        <button 
                          onClick={handleShare}
                          className="flex-1 py-4 rounded-2xl bg-white/5 border border-white/10 font-bold uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                        >
                          <Share2 size={18} /> Share
                        </button>
                        <button 
                          onClick={() => setSelectedId(null)}
                          className="flex-1 py-4 rounded-2xl bg-white/5 border border-white/10 font-bold uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Navigation (Google Efficiency) */}
      <footer className="fixed bottom-0 left-0 right-0 h-20 px-6 md:px-12 flex items-center justify-between z-40 glass-panel border-none">
        <div className="flex items-center gap-8">
          <button className="flex flex-col items-center gap-1 group">
            <div className="p-2 rounded-xl bg-white text-black group-hover:scale-110 transition-transform">
              <Gamepad2 size={20} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest">Universe</span>
          </button>
          <button className="flex flex-col items-center gap-1 group opacity-40 hover:opacity-100 transition-opacity">
            <div className="p-2 rounded-xl">
              <Volume2 size={20} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest">Audio</span>
          </button>
          <button className="flex flex-col items-center gap-1 group opacity-40 hover:opacity-100 transition-opacity">
            <div className="p-2 rounded-xl">
              <Maximize2 size={20} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest">Full</span>
          </button>
        </div>

        <div className="hidden md:flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
          <span>Privacy</span>
          <span>Terms</span>
          <span>© 2026 displayMRKTNG</span>
        </div>

        <button 
          onClick={handleShare}
          className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
        >
          <Share2 size={20} />
        </button>
      </footer>

      {/* Global Audio Visualizer (Subtle) */}
      <div className="fixed bottom-24 left-6 flex items-end gap-1 h-12 pointer-events-none opacity-20">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ height: [4, Math.random() * 40 + 8, 4] }}
            transition={{ duration: 0.5 + Math.random(), repeat: Infinity }}
            className="w-1 bg-white rounded-full"
          />
        ))}
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[200] px-6 py-3 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-full shadow-2xl"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
