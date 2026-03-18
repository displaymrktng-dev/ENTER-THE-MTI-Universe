import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';

type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';
type Weather = 'clear' | 'rain' | 'cloudy';

export const DynamicBackground = () => {
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('afternoon');
  const [weather, setWeather] = useState<Weather>('clear');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Determine Time of Day
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setTimeOfDay('morning');
    else if (hour >= 12 && hour < 17) setTimeOfDay('afternoon');
    else if (hour >= 17 && hour < 20) setTimeOfDay('evening');
    else setTimeOfDay('night');

    // Attempt to get Weather via Geolocation
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            // Using Open-Meteo (free, no API key required)
            const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
            const data = await res.json();
            const code = data.current_weather.weathercode;
            
            // WMO Weather interpretation codes
            if ([51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96, 99].includes(code)) {
              setWeather('rain');
            } else if ([1, 2, 3, 45, 48].includes(code)) {
              setWeather('cloudy');
            } else {
              setWeather('clear');
            }
          } catch (e) {
            console.error("Failed to fetch weather", e);
          }
        },
        (error) => {
          console.log("Geolocation denied or failed, using default weather.", error);
        }
      );
    }
  }, []);

  // Canvas Effect for "Traveling Stars" at Night or Rain
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: any[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Initialize particles based on condition
    const initParticles = () => {
      particles = [];
      const count = timeOfDay === 'night' ? 200 : weather === 'rain' ? 300 : 0;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: timeOfDay === 'night' ? (Math.random() - 0.5) * 0.5 : (Math.random() * 0.5 + 0.5),
          speedY: timeOfDay === 'night' ? (Math.random() - 0.5) * 0.5 : (Math.random() * 10 + 5),
          opacity: Math.random()
        });
      }
    };
    initParticles();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        ctx.fillStyle = timeOfDay === 'night' 
          ? `rgba(255, 255, 255, ${p.opacity})` 
          : `rgba(150, 200, 255, ${p.opacity * 0.5})`;
        
        ctx.beginPath();
        if (weather === 'rain' && timeOfDay !== 'night') {
          // Draw rain drop
          ctx.fillRect(p.x, p.y, p.size * 0.5, p.size * 4);
        } else {
          // Draw star
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        // Update position
        p.x += p.speedX;
        p.y += p.speedY;

        // Reset if off screen
        if (p.x > canvas.width) p.x = 0;
        if (p.x < 0) p.x = canvas.width;
        if (p.y > canvas.height) p.y = 0;
        if (p.y < 0) p.y = canvas.height;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [timeOfDay, weather]);

  // Determine gradient based on time and weather
  const getBackgroundStyle = () => {
    if (timeOfDay === 'night') return 'bg-[#050505]';
    if (weather === 'rain' || weather === 'cloudy') return 'bg-slate-900';
    if (timeOfDay === 'morning') return 'bg-gradient-to-br from-indigo-900 via-purple-900 to-black';
    if (timeOfDay === 'evening') return 'bg-gradient-to-br from-orange-900 via-red-900 to-black';
    return 'bg-gradient-to-br from-blue-900 via-emerald-900 to-black'; // afternoon
  };

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden transition-colors duration-1000 ${getBackgroundStyle()}`}>
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-60" />
      
      {/* Immersive Disney-style Environmental Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/10 blur-[120px] mix-blend-screen" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 blur-[150px] mix-blend-screen" />
      <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-blue-500/5 blur-[100px] mix-blend-screen" />
      
      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 z-10 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />
    </div>
  );
};
