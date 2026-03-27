import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Youtube, Facebook, Instagram, BookOpen, X, Play, Mail, ExternalLink } from 'lucide-react';
import { NODES, NodeData, PlanetLink } from './constants';
import { WeatherCanvas } from './components/WeatherCanvas';

const CRMModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="w-full max-w-lg bg-[var(--color-ash)] border border-[var(--color-volt)] p-8 relative"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-[var(--color-mist)] hover:text-[var(--color-white)] transition-colors">
              <X size={24} />
            </button>
            <div className="font-mono text-[0.6rem] tracking-[0.3em] text-[var(--color-volt)] uppercase mb-4">// RESTRICTED CHANNEL OPEN</div>
            <h2 className="font-display text-5xl leading-none tracking-[0.02em] text-[var(--color-white)] uppercase mb-4">
              UNLOCK <br/><span className="text-[var(--color-volt)]">THE VAULT</span>
            </h2>
            {!submitted ? (
              <>
                <p className="font-mono text-[0.7rem] tracking-[0.1em] text-[var(--color-ghost)] leading-[1.6] uppercase mb-8">
                  First access. Unreleased audio. The full archive. One email. Zero noise.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <input
                    type="email"
                    placeholder="ENTER YOUR EMAIL"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[var(--color-void)] border border-[var(--color-wire)] px-4 py-4 font-mono text-[0.8rem] text-[var(--color-white)] placeholder-[var(--color-dim)] focus:outline-none focus:border-[var(--color-volt)] transition-colors"
                  />
                  <button type="submit" className="w-full bg-[var(--color-volt)] text-[var(--color-void)] font-display text-xl tracking-[0.05em] py-4 hover:bg-[var(--color-white)] transition-colors uppercase">
                    Send Me The Code
                  </button>
                </form>
                <p className="font-mono text-[0.5rem] tracking-[0.1em] text-[var(--color-dim)] uppercase mt-4 text-center">
                  No spam. No noise. Unsubscribe any time.
                </p>
              </>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6">
                <div className="bg-[var(--color-void)] border border-[var(--color-wire)] p-6 text-center">
                  <div className="font-mono text-[0.6rem] tracking-[0.2em] text-[var(--color-mist)] uppercase mb-2">YOUR VAULT ACCESS CODE</div>
                  <div className="font-mono text-2xl tracking-[0.2em] text-[var(--color-volt)]">MTI-VLT-8X9</div>
                </div>
                <p className="font-mono text-[0.65rem] tracking-[0.1em] text-[var(--color-ghost)] leading-[1.6] uppercase text-center">
                  CHECK YOUR EMAIL FOR FULL INSTRUCTIONS.
                </p>
                <a
                  href="https://mtiradio.substack.com/s/the-vault"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[var(--color-white)] text-[var(--color-void)] font-display text-xl tracking-[0.05em] py-4 hover:bg-[var(--color-volt)] transition-colors uppercase text-center block"
                  onClick={onClose}
                >
                  Enter The Vault Now
                </a>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case 'YT': return <Youtube size={12} />;
    case 'FB': return <Facebook size={12} />;
    case 'IG': return <Instagram size={12} />;
    case 'SS': return <BookOpen size={12} />;
    case 'EMAIL': return <Mail size={12} />;
    default: return <ExternalLink size={12} />;
  }
};

// Planet panel — the expanded "world" for each node
const PlanetPanel = ({ node }: { node: NodeData }) => {
  const p = node.planet;
  if (!p) return null;

  return (
    <div className="planet-panel">
      <div className="h-[1px] bg-[var(--color-wire)] my-4" />

      {p.sectionLabel && (
        <p className="font-mono text-[0.5rem] tracking-[0.3em] text-[var(--color-volt)] uppercase mb-4">{p.sectionLabel}</p>
      )}

      {/* Bio */}
      <p className="font-mono text-[0.58rem] tracking-[0.08em] text-[var(--color-ghost)] leading-[1.8] uppercase mb-5">
        {p.bio}
      </p>

      {/* Links */}
      {p.links && p.links.length > 0 && (
        <div className="flex flex-col gap-[1px] bg-[var(--color-wire)] mb-4">
          {p.links.map((link: PlanetLink, i: number) => (
            <a
              key={i}
              href={link.url}
              target={link.url.startsWith('mailto') ? '_self' : '_blank'}
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="planet-link group"
            >
              <span className="flex items-center gap-2 text-[var(--color-mist)]">
                <span className="text-[var(--color-volt)]">{getPlatformIcon(link.platform || '')}</span>
                <span className="font-mono text-[0.45rem] tracking-[0.2em] uppercase">{link.platform}</span>
              </span>
              <span className="font-mono text-[0.58rem] tracking-[0.1em] text-[var(--color-white)] uppercase group-hover:text-[var(--color-volt)] transition-colors flex-1">
                {link.label}
              </span>
              <span className="font-mono text-[0.7rem] text-[var(--color-volt)] opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
            </a>
          ))}
        </div>
      )}

      {/* Media embed */}
      {p.mediaEmbed && (
        <div className="mb-4">
          <p className="font-mono text-[0.45rem] tracking-[0.25em] text-[var(--color-mist)] uppercase mb-2">{p.mediaEmbed.label}</p>
          <div className="relative w-full bg-[var(--color-void)] border border-[var(--color-wire)] overflow-hidden" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={p.mediaEmbed.url}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={p.mediaEmbed.label}
              onClick={(e) => e.stopPropagation()}
            />
            {/* Placeholder overlay when URL is placeholder */}
            {p.mediaEmbed.url.includes('placeholder') && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--color-void)] border border-[var(--color-wire)]">
                <Play size={24} className="text-[var(--color-volt)] mb-2 opacity-40" />
                <span className="font-mono text-[0.45rem] tracking-[0.2em] text-[var(--color-dim)] uppercase">EMBED URL PENDING</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Contact */}
      {p.contact && (
        <a
          href={p.contact.url || '#'}
          target={p.contact.url?.startsWith('mailto') ? '_self' : '_blank'}
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="planet-contact group"
        >
          <div>
            <div className="font-mono text-[0.45rem] tracking-[0.2em] text-[var(--color-dim)] uppercase mb-1">{p.contact.label}</div>
            <div className="font-mono text-[0.6rem] tracking-[0.1em] text-[var(--color-white)] uppercase group-hover:text-[var(--color-volt)] transition-colors">{p.contact.value}</div>
          </div>
          <Mail size={14} className="text-[var(--color-volt)] opacity-50 group-hover:opacity-100 transition-opacity" />
        </a>
      )}
    </div>
  );
};

// Animated sphere SVG for the Collective node
const CollectiveSphere = () => (
  <div className="collective-sphere-wrap" aria-hidden="true">
    <svg className="collective-sphere" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sphereGrad" cx="38%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#2a2a00" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#111100" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.95" />
        </radialGradient>
        <radialGradient id="sphereShine" cx="30%" cy="28%" r="45%">
          <stop offset="0%" stopColor="#d4ff00" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#d4ff00" stopOpacity="0" />
        </radialGradient>
        <clipPath id="sphereClip">
          <circle cx="100" cy="100" r="90" />
        </clipPath>
      </defs>
      {/* Base sphere */}
      <circle cx="100" cy="100" r="90" fill="url(#sphereGrad)" />
      {/* Latitude lines */}
      {[30, 55, 80, 105, 130, 155, 170].map((y, i) => {
        const dy = y - 100;
        const rx = Math.sqrt(Math.max(0, 90 * 90 - dy * dy));
        return rx > 2 ? (
          <ellipse key={i} cx="100" cy={y} rx={rx} ry={rx * 0.28}
            fill="none" stroke="#d4ff00" strokeWidth="0.4" strokeOpacity="0.18"
            clipPath="url(#sphereClip)" />
        ) : null;
      })}
      {/* Longitude lines */}
      {[0, 30, 60, 90, 120, 150].map((angle, i) => (
        <ellipse key={i} cx="100" cy="100" rx={90 * Math.abs(Math.cos(angle * Math.PI / 180))} ry="90"
          fill="none" stroke="#d4ff00" strokeWidth="0.4" strokeOpacity="0.15"
          clipPath="url(#sphereClip)"
          transform={`rotate(${angle}, 100, 100)`} />
      ))}
      {/* Orbital ring */}
      <ellipse cx="100" cy="100" rx="110" ry="22"
        fill="none" stroke="#d4ff00" strokeWidth="0.8" strokeOpacity="0.3"
        strokeDasharray="4 6"
        transform="rotate(-18, 100, 100)" />
      {/* Shine overlay */}
      <circle cx="100" cy="100" r="90" fill="url(#sphereShine)" />
      {/* Rim glow */}
      <circle cx="100" cy="100" r="90" fill="none" stroke="#d4ff00" strokeWidth="1" strokeOpacity="0.25" />
      {/* Node dots on the sphere surface */}
      <circle cx="68" cy="72" r="2.5" fill="#d4ff00" opacity="0.7" />
      <circle cx="130" cy="88" r="2" fill="#00d4ff" opacity="0.6" />
      <circle cx="95" cy="130" r="2" fill="#d4ff00" opacity="0.5" />
      <circle cx="148" cy="118" r="1.5" fill="#ffc800" opacity="0.6" />
      <circle cx="55" cy="115" r="1.5" fill="#00d4ff" opacity="0.5" />
      {/* Connection lines between nodes */}
      <line x1="68" y1="72" x2="130" y2="88" stroke="#d4ff00" strokeWidth="0.4" strokeOpacity="0.2" clipPath="url(#sphereClip)" />
      <line x1="130" y1="88" x2="148" y2="118" stroke="#d4ff00" strokeWidth="0.4" strokeOpacity="0.2" clipPath="url(#sphereClip)" />
      <line x1="55" y1="115" x2="95" y2="130" stroke="#00d4ff" strokeWidth="0.4" strokeOpacity="0.2" clipPath="url(#sphereClip)" />
    </svg>
  </div>
);

// Collective sub-brands panel
const CollectivePanel = ({ node }: { node: NodeData }) => (
  <div className="mt-4">
    <div className="h-[1px] bg-[var(--color-wire)] my-4" />
    <p className="font-mono text-[0.5rem] tracking-[0.3em] text-[var(--color-mist)] uppercase mb-3">// NETWORK BRANDS</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1px] bg-[var(--color-wire)]">
      {node.subBrands?.map((brand) => (
        <a
          key={brand.id}
          href={brand.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`brand-tile group ${brand.id === 'tse' ? 'sm:col-span-2 bg-[#110000] hover:bg-[#220000]' : ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-2 mb-[0.2rem]">
            <span style={{ color: brand.color, opacity: 1 }}>{getPlatformIcon(brand.platform)}</span>
            <span className="font-mono text-[0.6rem] tracking-[0.25em]" style={{ color: brand.color, opacity: 1 }}>{brand.platform}</span>
          </div>
          <div className={`font-display tracking-[0.06em] text-[var(--color-white)] uppercase leading-[1.1] group-hover:text-[var(--color-volt)] transition-colors ${brand.id === 'tse' ? 'text-2xl md:text-3xl text-[var(--color-volt)]' : 'text-[1.15rem]'}`}>
            {brand.name}
          </div>
          <div className="font-mono text-[0.62rem] tracking-[0.1em] text-[var(--color-ghost)] leading-[1.6] uppercase mt-1">{brand.description}</div>
          <div className="brand-arrow font-mono text-[0.8rem] text-[var(--color-volt)] mt-2">↗</div>
        </a>
      ))}
    </div>
  </div>
);

const NodeCard = ({ node, onClick }: { node: NodeData, onClick?: (e: React.MouseEvent) => void }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  if (node.isExpandable) {
    return (
      <div
        className={`mti-card ${isExpanded ? 'after:!bg-[var(--color-volt)]' : ''} ${node.isCollective ? 'collective' : ''}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {node.isCollective && <CollectiveSphere />}
        <div className="flex items-center justify-between mb-auto">
          <span className="font-mono text-[0.55rem] text-[var(--color-dim)] tracking-[0.2em]">{node.index} / {node.category}</span>
          <div
            className={`w-6 h-6 border flex items-center justify-center cursor-crosshair transition-colors ${isExpanded ? 'border-[var(--color-volt)] bg-[var(--color-volt)]' : 'border-[var(--color-wire)]'}`}
            onClick={handleToggle}
          >
            <span className={`font-mono text-[0.85rem] leading-none transition-all duration-300 ${isExpanded ? 'text-[var(--color-void)] rotate-45' : 'text-[var(--color-mist)]'}`}>+</span>
          </div>
        </div>

        <div className={`transition-opacity duration-200 ${isExpanded ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
          <div className="font-display text-[clamp(1.4rem,2.5vw,2.2rem)] leading-none tracking-[0.04em] text-[var(--color-white)] uppercase mt-8 transition-colors group-hover:text-[var(--color-volt)]">
            {node.title}
          </div>
          <div className="font-mono text-[0.6rem] text-[var(--color-mist)] tracking-[0.12em] leading-[1.7] uppercase mt-2">
            {node.description}
          </div>
          <div className="card-arrow text-[0.9rem] mt-5 text-[var(--color-volt)] font-mono">
            {node.action}
          </div>
        </div>

        <div className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isExpanded ? 'max-h-[1200px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
          {node.planet ? (
            <PlanetPanel node={node} />
          ) : node.subBrands ? (
            <CollectivePanel node={node} />
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <a
      href={node.url}
      target={node.url.startsWith('http') ? '_blank' : '_self'}
      rel={node.url.startsWith('http') ? 'noopener noreferrer' : ''}
      className={`mti-card group ${node.isVault ? 'vault' : ''}`}
      onClick={onClick}
    >
      <div>
        <span className={`font-mono text-[0.55rem] tracking-[0.2em] ${node.isVault ? 'text-[var(--color-mist)]' : 'text-[var(--color-dim)]'}`}>
          {node.index} / {node.category}
        </span>
        {node.isVault && (
          <div className="inline-block bg-[var(--color-volt)] text-[var(--color-void)] font-mono text-[0.5rem] tracking-[0.2em] px-2 py-1 uppercase font-bold mt-2 ml-2">
            ◈ RESTRICTED ACCESS
          </div>
        )}
      </div>
      <div>
        <div className={`font-display text-[clamp(1.4rem,2.5vw,2.2rem)] leading-none tracking-[0.04em] uppercase mt-8 transition-colors ${node.isVault ? 'text-[var(--color-volt)]' : 'text-[var(--color-white)] group-hover:text-[var(--color-volt)]'}`}>
          {node.title}
        </div>
        <div className="font-mono text-[0.6rem] text-[var(--color-mist)] tracking-[0.12em] leading-[1.7] uppercase mt-2">
          {node.description}
        </div>
        <div className="card-arrow text-[0.9rem] mt-5 text-[var(--color-volt)] font-mono">
          {node.action}
        </div>
      </div>
    </a>
  );
};

const UniverseLogo = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3 flex-shrink-0">
    <circle cx="12" cy="12" r="3" fill="#00d4ff" className="animate-pulse" />
    <circle cx="12" cy="12" r="5" fill="rgba(0, 212, 255, 0.3)" className="animate-ping" />
    <circle cx="12" cy="12" r="8" stroke="#d4ff00" strokeWidth="1" strokeDasharray="2 4" className="animate-[spin_4s_linear_infinite]" />
    <circle cx="12" cy="12" r="11" stroke="#ffc800" strokeWidth="0.5" strokeDasharray="4 4" className="animate-[spin_6s_linear_infinite_reverse]" />
    <circle cx="12" cy="4" r="1.5" fill="#d4ff00" />
    <circle cx="20" cy="12" r="1.5" fill="#00d4ff" />
    <circle cx="4" cy="12" r="1.5" fill="#ffc800" />
  </svg>
);

export default function App() {
  const [sessionId, setSessionId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let id = 'MTI-';
    for (let i = 0; i < 8; i++) id += chars[Math.floor(Math.random() * chars.length)];
    setSessionId(id);
  }, []);

  const handleNodeClick = (e: React.MouseEvent, node: NodeData) => {
    if (node.isVault) {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative z-10">
      <WeatherCanvas />
      <CRMModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Header */}
      <header className="flex items-center justify-between px-6 md:px-10 py-6 border-b border-[var(--color-wire)] relative z-10">
        <a href="/" className="flex items-center font-display text-lg tracking-[0.3em] text-[var(--color-volt)] uppercase decoration-none cursor-crosshair">
          <UniverseLogo />
          MTI UNIVERSE
        </a>
        <div className="flex items-center gap-6">
          <span className="font-mono text-[0.6rem] tracking-[0.2em] text-[var(--color-mist)] uppercase hidden sm:inline-block">
            displayMRKTNG
          </span>
          <span className="font-mono text-[0.5rem] text-[var(--color-ember)] tracking-[0.2em] border border-[var(--color-ember)] px-2 py-0.5 opacity-40">
            VAR:B
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 md:px-10 pt-14 pb-8 relative overflow-hidden z-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-[0.6rem] tracking-[0.4em] text-[var(--color-ember)] uppercase mb-3"
        >
          // TRANSMISSION ACTIVE — SELECT YOUR NODE
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-[clamp(3.5rem,10vw,8rem)] leading-[0.9] tracking-[0.02em] text-[var(--color-white)] uppercase"
        >
          ENTER<span className="text-[var(--color-volt)] block">THE MTI</span>UNIVERSE
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-mono text-[0.7rem] tracking-[0.2em] text-[var(--color-ghost)] mt-5 max-w-[480px] leading-[1.8] uppercase"
        >
          Nine nodes. One vault. The architecture is not neutral — the path forward is already encoded. Navigate with intent.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-mono text-[0.55rem] text-[var(--color-dim)] tracking-[0.15em] mt-4 uppercase"
        >
          SESSION — {sessionId}
        </motion.p>
      </section>

      {/* Grid */}
      <section className="px-6 md:px-10 py-8 pb-16 flex-grow relative z-10">
        <div className="grid-a">
          {NODES.map((node, i) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={node.isVault ? 'row-span-2' : ''}
              style={node.isVault ? { gridRow: '1 / 3' } : {}}
            >
              <NodeCard node={node} onClick={(e) => handleNodeClick(e, node)} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--color-wire)] px-6 md:px-10 py-6 flex justify-between items-center relative z-10">
        <span className="font-mono text-[0.55rem] text-[var(--color-dim)] tracking-[0.15em] uppercase">
          © MTI UNIVERSE — DISPLAYMRKTNG — ALL TRANSMISSIONS MONITORED
        </span>
        <span className="font-mono text-[0.55rem] text-[var(--color-volt)] tracking-[0.15em] uppercase flex items-center gap-2">
          <motion.span
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-[var(--color-volt)] rounded-full"
          />
          LIVE
        </span>
      </footer>
    </div>
  );
}

