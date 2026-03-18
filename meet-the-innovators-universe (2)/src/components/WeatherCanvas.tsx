import React, { useEffect, useRef } from 'react';

export const WeatherCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0;
    let particles: any[] = [];
    let animFrame: number;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Default to CLEAR_NIGHT for the cool aesthetic
    const buildParticles = (n: number) => {
      particles = [];
      for (let i = 0; i < n; i++) {
        particles.push({
          x: Math.random() * W, y: Math.random() * H * 0.85,
          r: Math.random() * 1.2 + 0.2,
          baseAlpha: Math.random() * 0.6 + 0.2,
          alpha: 0,
          twinkleSpeed: Math.random() * 0.015 + 0.003,
          twinkleOffset: Math.random() * Math.PI * 2,
          color: Math.random() > 0.85 ? 'rgba(180,220,255,' : 'rgba(255,255,255,'
        });
      }
    };

    let shootingStars: any[] = [];
    const spawnShootingStar = () => {
      shootingStars.push({
        x: Math.random() * W * 0.8 + W * 0.1,
        y: Math.random() * H * 0.4,
        len: Math.random() * 150 + 80,
        speed: Math.random() * 10 + 12,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
        alpha: 1.0,
        fade: 0.015
      });
    };

    const drawShootingStars = () => {
      shootingStars = shootingStars.filter(s => s.alpha > 0);
      shootingStars.forEach(s => {
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.angle);
        const g = ctx.createLinearGradient(-s.len, 0, 0, 0);
        g.addColorStop(0, 'rgba(255,255,255,0)');
        g.addColorStop(0.8, `rgba(212,255,0,${s.alpha * 0.5})`); // Volt color hint
        g.addColorStop(1, `rgba(255,255,255,${s.alpha})`);
        ctx.strokeStyle = g;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-s.len, 0);
        ctx.lineTo(0, 0);
        ctx.stroke();
        
        // Add a glowing head to the shooting star
        ctx.beginPath();
        ctx.arc(0, 0, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
        ctx.fill();
        ctx.restore();
        
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.alpha -= s.fade;
      });
    };

    buildParticles(window.innerWidth < 768 ? 150 : 350);

    const drawTechGalaxy = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
      const isMobile = W < 768;
      const gx = isMobile ? W * 0.5 : W * 0.75;
      const gy = isMobile ? H * 0.3 : H * 0.4;
      const baseRadius = isMobile ? 100 : 160;

      ctx.save();
      ctx.translate(gx, gy);

      // 1. Ambient Deep Space Glow
      const ambientGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, baseRadius * 3.5);
      ambientGlow.addColorStop(0, 'rgba(60, 20, 120, 0.25)'); // Deep purple
      ambientGlow.addColorStop(0.3, 'rgba(20, 60, 160, 0.15)'); // Deep blue
      ambientGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = ambientGlow;
      ctx.beginPath();
      ctx.arc(0, 0, baseRadius * 3.5, 0, Math.PI * 2);
      ctx.fill();

      // 2. Central Spiral Galaxy Core
      ctx.save();
      ctx.rotate(t * 0.2);
      const spiralArms = 3;
      for (let i = 0; i < spiralArms; i++) {
        ctx.beginPath();
        for (let r = 0; r < baseRadius * 0.8; r += 2) {
          const angle = (r * 0.06) + (i * Math.PI * 2 / spiralArms);
          const x = Math.cos(angle) * r;
          const y = Math.sin(angle) * r;
          if (r === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(0, 212, 255, ${0.3 + 0.2 * Math.sin(t + i)})`;
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }
      ctx.restore();

      // 3. Circuit Nodes
      const numNodes = 9;
      for (let i = 0; i < numNodes; i++) {
        const speed = 0.08 * (i % 2 === 0 ? 1 : -0.6);
        const angle = (i / numNodes) * Math.PI * 2 + (t * speed);
        const dist = baseRadius * 0.6 + (i * baseRadius * 0.18);
        
        const nx = Math.cos(angle) * dist;
        const ny = Math.sin(angle) * dist;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        
        const midDist = dist * 0.4;
        const bendAngle = angle + (Math.PI / 6) * (i % 2 === 0 ? 1 : -1);
        const bx = Math.cos(bendAngle) * midDist;
        const by = Math.sin(bendAngle) * midDist;
        
        ctx.lineTo(bx, by);
        ctx.lineTo(nx, ny);
        
        const lineAlpha = 0.15 + 0.1 * Math.sin(t * 2 + i);
        ctx.strokeStyle = `rgba(100, 180, 255, ${lineAlpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        const isVault = i === 0;
        const nodeColor = isVault ? '212, 255, 0' : (i % 3 === 0 ? '255, 200, 0' : '0, 212, 255'); 
        
        ctx.beginPath();
        ctx.arc(nx, ny, isVault ? 4 : 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${nodeColor})`;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(nx, ny, isVault ? 12 : 8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${nodeColor}, ${0.3 + 0.2 * Math.sin(t * 4 + i)})`;
        ctx.fill();
      }

      ctx.restore();
    };

    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      const t = Date.now() / 1000;
      
      drawTechGalaxy(ctx, W, H, t);
      
      particles.forEach(p => {
        p.alpha = p.baseAlpha * (0.5 + 0.5 * Math.sin(t * p.twinkleSpeed * 60 + p.twinkleOffset));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ')';
        ctx.fill();
      });
      
      // Significantly increased frequency for more dynamic sky
      if (Math.random() < 0.015) spawnShootingStar();
      drawShootingStars();
      
      animFrame = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-100 transition-opacity duration-2000"
    />
  );
};
