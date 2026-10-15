import React, { useEffect, useRef, useState } from 'react';

export type SurfaceColorTheme = 'champagne-gold' | 'royal-cognac' | 'imperial-emerald' | 'midnight-sapphire';

interface SurfaceThemeConfig {
  id: SurfaceColorTheme;
  label: string;
  metalName: string;
  baseGradient: string;
  radialCenter: string;
  glowColor: string;
  spotlightCenter: string;
  spotlightMid: string;
  accentGold: string;
  particleColors: string[];
}

export const SURFACE_THEMES: Record<SurfaceColorTheme, SurfaceThemeConfig> = {
  'champagne-gold': {
    id: 'champagne-gold',
    label: 'CHAMPAGNE GOLD',
    metalName: '18K Solid Yellow & Champagne Gold',
    baseGradient: 'linear-gradient(180deg, #3D1E0D 0%, #5C3015 28%, #3F1C08 65%, #1C0902 100%)',
    radialCenter: 'rgba(235, 185, 105, 0.40)',
    glowColor: 'rgba(231, 197, 138, 0.45)',
    spotlightCenter: 'rgba(255, 245, 215, 0.70)',
    spotlightMid: 'rgba(235, 180, 95, 0.42)',
    accentGold: '#E7C58A',
    particleColors: ['#FFFFFF', '#FFFDF0', '#F5E2B3', '#E7C58A', '#D4AF37', '#FFD899'],
  },
  'royal-cognac': {
    id: 'royal-cognac',
    label: 'ROYAL COGNAC',
    metalName: '24K Burnished Amber & Rose Gold',
    baseGradient: 'linear-gradient(180deg, #441C0C 0%, #682B13 28%, #421807 65%, #1D0802 100%)',
    radialCenter: 'rgba(240, 145, 70, 0.40)',
    glowColor: 'rgba(225, 125, 60, 0.45)',
    spotlightCenter: 'rgba(255, 230, 195, 0.70)',
    spotlightMid: 'rgba(235, 135, 65, 0.42)',
    accentGold: '#E8985E',
    particleColors: ['#FFFFFF', '#FFE8D6', '#F5BA88', '#E8985E', '#D97746', '#FFB085'],
  },
  'imperial-emerald': {
    id: 'imperial-emerald',
    label: 'IMPERIAL EMERALD',
    metalName: 'Colombian Emerald & Solid Gold',
    baseGradient: 'linear-gradient(180deg, #0E2A1E 0%, #164532 28%, #0F2F21 65%, #05140E 100%)',
    radialCenter: 'rgba(52, 175, 125, 0.40)',
    glowColor: 'rgba(46, 200, 135, 0.45)',
    spotlightCenter: 'rgba(225, 255, 240, 0.70)',
    spotlightMid: 'rgba(60, 190, 140, 0.42)',
    accentGold: '#6EE7B7',
    particleColors: ['#FFFFFF', '#E6FFFA', '#A7F3D0', '#6EE7B7', '#E7C58A', '#D4AF37'],
  },
  'midnight-sapphire': {
    id: 'midnight-sapphire',
    label: 'MIDNIGHT SAPPHIRE',
    metalName: 'Ceylon Royal Sapphire & Platinum',
    baseGradient: 'linear-gradient(180deg, #0F1C33 0%, #192F56 28%, #101F37 65%, #050B16 100%)',
    radialCenter: 'rgba(75, 140, 240, 0.40)',
    glowColor: 'rgba(96, 170, 255, 0.45)',
    spotlightCenter: 'rgba(230, 245, 255, 0.70)',
    spotlightMid: 'rgba(96, 170, 255, 0.42)',
    accentGold: '#93C5FD',
    particleColors: ['#FFFFFF', '#EFF6FF', '#BFDBFE', '#93C5FD', '#E7C58A', '#D4AF37'],
  },
};

interface SurfaceParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  color: string;
  twinklePhase: number;
  trail: { x: number; y: number; alpha: number }[];
}

interface SurfaceRipple {
  x: number;
  y: number;
  currentR: number;
  maxR: number;
  alpha: number;
  speed: number;
  color: string;
}

interface StardustSpark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  maxAlpha: number;
  color: string;
  life: number;
  maxLife: number;
}

interface InteractiveSurfaceEnvironmentProps {
  className?: string;
  enableFloorCaustic?: boolean;
  theme?: SurfaceColorTheme;
  onThemeChange?: (theme: SurfaceColorTheme) => void;
  showFloatingThemeSelector?: boolean;
}

export const InteractiveSurfaceEnvironment: React.FC<InteractiveSurfaceEnvironmentProps> = ({
  className = '',
  enableFloorCaustic = true,
  theme: controlledTheme,
  onThemeChange,
  showFloatingThemeSelector = false,
}) => {
  const [internalTheme, setInternalTheme] = useState<SurfaceColorTheme>('champagne-gold');
  const currentTheme = controlledTheme || internalTheme;
  const setCurrentTheme = onThemeChange || setInternalTheme;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const surfaceContainerRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<SurfaceThemeConfig>(SURFACE_THEMES[currentTheme]);

  useEffect(() => {
    themeRef.current = SURFACE_THEMES[currentTheme];
  }, [currentTheme]);

  const stateRef = useRef<{
    x: number;
    y: number;
    targetX: number;
    targetY: number;
    prevX: number;
    prevY: number;
    speed: number;
    isLowerHovered: boolean;
    hoverIntensity: number;
    lastRippleTime: number;
    lastTrailTime: number;
    lastAmbientRippleTime: number;
  }>({
    x: typeof window !== 'undefined' ? window.innerWidth * 0.5 : 500,
    y: typeof window !== 'undefined' ? window.innerHeight * 0.70 : 500,
    targetX: typeof window !== 'undefined' ? window.innerWidth * 0.5 : 500,
    targetY: typeof window !== 'undefined' ? window.innerHeight * 0.70 : 500,
    prevX: typeof window !== 'undefined' ? window.innerWidth * 0.5 : 500,
    prevY: typeof window !== 'undefined' ? window.innerHeight * 0.70 : 500,
    speed: 0,
    isLowerHovered: false,
    hoverIntensity: 0.28,
    lastRippleTime: 0,
    lastTrailTime: 0,
    lastAmbientRippleTime: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.parentElement?.clientWidth || window.innerWidth;
    let height = canvas.parentElement?.clientHeight || window.innerHeight;

    const setupCanvas = () => {
      if (!canvas) return;
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    setupCanvas();
    window.addEventListener('resize', setupCanvas);

    // =========================================================================
    // PARTICLES INITIALIZATION (Free-floating diamond stardust across lower surface)
    // =========================================================================
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const particleCount = isMobile ? 26 : 65;
    const particles: SurfaceParticle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: height * 0.48 + Math.random() * (height * 0.52),
      vx: (Math.random() - 0.5) * 0.45,
      vy: -0.12 - Math.random() * 0.28,
      size: 0.9 + Math.random() * 2.0,
      baseAlpha: 0.28 + Math.random() * 0.50,
      color: themeRef.current.particleColors[Math.floor(Math.random() * themeRef.current.particleColors.length)],
      twinklePhase: Math.random() * Math.PI * 2,
      trail: [],
    }));

    const ripples: SurfaceRipple[] = [];
    const stardustSparks: StardustSpark[] = [];

    // =========================================================================
    // MOUSE TRACKING & SURFACE INTERACTION
    // =========================================================================
    let canvasRect = canvas.getBoundingClientRect();
    const updateCanvasRect = () => {
      if (canvas) canvasRect = canvas.getBoundingClientRect();
    };
    window.addEventListener('resize', updateCanvasRect, { passive: true });
    window.addEventListener('scroll', updateCanvasRect, { passive: true });

    const handleMouseMove = (e: MouseEvent) => {
      const st = stateRef.current;
      const mouseX = e.clientX - canvasRect.left;
      const mouseY = e.clientY - canvasRect.top;

      st.targetX = mouseX;
      st.targetY = mouseY;

      const isInsideHero =
        e.clientX >= canvasRect.left &&
        e.clientX <= canvasRect.right &&
        e.clientY >= canvasRect.top &&
        e.clientY <= canvasRect.bottom;

      // Distinguishable Boundary: Horizon divides upper atmosphere and lower surface at ~48% height
      const horizonY = height * 0.48;
      const isOverLowerSurface = isInsideHero && mouseY >= horizonY - 20;

      st.isLowerHovered = isOverLowerSurface;

      // Interactive mouse ripple and stardust emissions on hover
      if (isOverLowerSurface) {
        const now = performance.now();

        // Dynamic ripples
        if (now - st.lastRippleTime > 180 && st.speed > 1.2) {
          st.lastRippleTime = now;
          if (ripples.length < 12) {
            ripples.push({
              x: mouseX,
              y: mouseY,
              currentR: 15,
              maxR: Math.min(width * 0.40, 300),
              alpha: 0.70,
              speed: 2.6,
              color: themeRef.current.accentGold,
            });
          }
        }

        // Diamond stardust sparks
        if (now - st.lastTrailTime > 50 && st.speed > 0.7) {
          st.lastTrailTime = now;
          if (stardustSparks.length < 40) {
            stardustSparks.push({
              x: mouseX + (Math.random() - 0.5) * 24,
              y: mouseY + (Math.random() - 0.5) * 16,
              vx: (Math.random() - 0.5) * 0.8,
              vy: -0.2 - Math.random() * 0.6,
              size: 0.8 + Math.random() * 2.0,
              alpha: 0.95,
              maxAlpha: 0.95,
              color: Math.random() > 0.4 ? '#FFFFFF' : themeRef.current.accentGold,
              life: 0,
              maxLife: 42 + Math.random() * 28,
            });
          }
        }
      }
    };

    const handleMouseLeave = () => {
      const st = stateRef.current;
      st.isLowerHovered = false;
      st.targetX = width * 0.5;
      st.targetY = height * 0.70;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    let time = 0;
    let isVisible = true;

    // IntersectionObserver to pause rAF when scrolled away
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationFrameId) {
          animationFrameId = requestAnimationFrame(render);
        }
      },
      { rootMargin: '100px' }
    );
    observer.observe(canvas);

    // =========================================================================
    // 60FPS RENDERING ENGINE & CSS VARIABLE INJECTION
    // =========================================================================
    const render = () => {
      if (!isVisible) {
        animationFrameId = 0;
        return;
      }

      time += 0.02;
      const st = stateRef.current;
      const th = themeRef.current;

      // Inertia lerp tracking
      st.prevX = st.x;
      st.prevY = st.y;
      st.x += (st.targetX - st.x) * 0.085;
      st.y += (st.targetY - st.y) * 0.085;

      const dx = st.x - st.prevX;
      const dy = st.y - st.prevY;
      const instantSpeed = Math.sqrt(dx * dx + dy * dy);
      st.speed += (instantSpeed - st.speed) * 0.15;

      // Hover intensity smoothly ramps up to 1.0 when over lower surface
      const targetIntensity = st.isLowerHovered ? 1.0 : 0.28;
      st.hoverIntensity += (targetIntensity - st.hoverIntensity) * 0.08;

      const horizonY = height * 0.48;

      // LIVE CSS VARIABLE INJECTION: Powering the DOM surface color & spotlight
      if (surfaceContainerRef.current) {
        const relativeMouseY = Math.max(0, st.y - horizonY);
        const mouseAngle = 75 + (st.x / Math.max(1, width)) * 60; // 75° to 135° sheen angle
        surfaceContainerRef.current.style.setProperty('--mouse-x', `${st.x}px`);
        surfaceContainerRef.current.style.setProperty('--mouse-y', `${relativeMouseY}px`);
        surfaceContainerRef.current.style.setProperty('--mouse-angle', `${mouseAngle}deg`);
        surfaceContainerRef.current.style.setProperty('--hover-intensity', `${st.hoverIntensity}`);
      }

      // Ambient breathing ripple across the floor
      const now = performance.now();
      if (now - st.lastAmbientRippleTime > 3200) {
        st.lastAmbientRippleTime = now;
        if (ripples.length < 10) {
          ripples.push({
            x: width * 0.5,
            y: height * 0.68,
            currentR: 20,
            maxR: Math.min(width * 0.45, 420),
            alpha: 0.35 * st.hoverIntensity,
            speed: 1.6,
            color: th.accentGold,
          });
        }
      }

      ctx.clearRect(0, 0, width, height);

      const intensity = st.hoverIntensity;

      // =======================================================================
      // A. THE HORIZON SPECULAR GLINT (Sweeps with mouse X position)
      // =======================================================================
      if (intensity > 0.3) {
        ctx.save();
        const glintX = st.x;
        const glintAlpha = (intensity - 0.3) * 1.4;

        const glintGrad = ctx.createLinearGradient(glintX - 130, horizonY, glintX + 130, horizonY);
        glintGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        glintGrad.addColorStop(0.5, `rgba(255, 255, 255, ${0.95 * glintAlpha})`);
        glintGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.strokeStyle = glintGrad;
        ctx.lineWidth = 2.8;
        ctx.beginPath();
        ctx.moveTo(glintX - 130, horizonY);
        ctx.lineTo(glintX + 130, horizonY);
        ctx.stroke();

        // 4-Point Specular Star at the glint center
        const starSize = 6.0 * glintAlpha;
        ctx.fillStyle = `rgba(255, 255, 255, ${glintAlpha})`;
        ctx.beginPath();
        ctx.moveTo(glintX, horizonY - starSize * 2.2);
        ctx.lineTo(glintX + starSize * 0.4, horizonY);
        ctx.lineTo(glintX, horizonY + starSize * 2.2);
        ctx.lineTo(glintX - starSize * 0.4, horizonY);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(glintX - starSize * 2.2, horizonY);
        ctx.lineTo(glintX, horizonY + starSize * 0.4);
        ctx.lineTo(glintX + starSize * 2.2, horizonY);
        ctx.lineTo(glintX - starSize * 0.4, horizonY);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      }

      // =======================================================================
      // B. DYNAMIC CAUSTIC SPOTLIGHT FOLLOWING CURSOR ON THE SURFACE
      // =======================================================================
      if (st.isLowerHovered && intensity > 0.05) {
        ctx.save();
        ctx.translate(st.x, st.y);
        ctx.scale(1, 0.35);

        const spotRadius = Math.min(width * 0.34, 280);
        const spotGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, spotRadius);
        spotGrad.addColorStop(0, `rgba(255, 250, 235, ${0.55 * intensity})`);
        spotGrad.addColorStop(0.35, `rgba(243, 216, 168, ${0.30 * intensity})`);
        spotGrad.addColorStop(0.70, `rgba(201, 154, 84, ${0.12 * intensity})`);
        spotGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = spotGrad;
        ctx.beginPath();
        ctx.arc(0, 0, spotRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      // =======================================================================
      // C. LIQUID COLOR RIPPLE WAVES EXPANDING ACROSS THE SURFACE
      // =======================================================================
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.currentR += rp.speed;
        rp.alpha *= 0.965;

        if (rp.alpha < 0.01 || rp.currentR > rp.maxR) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(rp.x, rp.y);
        ctx.scale(1, 0.32);

        ctx.beginPath();
        ctx.arc(0, 0, rp.currentR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 235, 190, ${rp.alpha})`;
        ctx.lineWidth = 2.0;
        ctx.stroke();

        ctx.restore();
      }

      // =======================================================================
      // D. FLOATING DIAMOND PARTICLES ACROSS THE LOWER SURFACE
      // =======================================================================
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Smooth drift
        p.x += p.vx;
        p.y += p.vy;

        // Proximity flare when near cursor on the surface
        const pDx = p.x - st.x;
        const pDy = p.y - st.y;
        const distToCursor = Math.sqrt(pDx * pDx + pDy * pDy);

        let alpha =
          (p.baseAlpha + Math.sin(time * 3.2 + p.twinklePhase) * 0.30) * Math.max(0.40, intensity);

        if (distToCursor < 160) {
          const flare = 1 - distToCursor / 160;
          alpha = Math.min(1.0, alpha + flare * 0.70);
        }

        // Boundary wrap: keep particles on the lower surface plane (y >= horizonY)
        if (p.y < horizonY) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -15) p.x = width + 15;
        if (p.x > width + 15) p.x = -15;

        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
        ctx.fillStyle = p.color;

        // Diamond 4-point star when near cursor or prominent
        if (p.size > 1.5 && (i % 3 === 0 || distToCursor < 140)) {
          const s = p.size * (distToCursor < 140 ? 2.8 : 2.2);
          ctx.beginPath();
          ctx.moveTo(p.x, p.y - s);
          ctx.lineTo(p.x + s * 0.24, p.y);
          ctx.lineTo(p.x, p.y + s);
          ctx.lineTo(p.x - s * 0.24, p.y);
          ctx.closePath();
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(p.x - s, p.y);
          ctx.lineTo(p.x, p.y + s * 0.24);
          ctx.lineTo(p.x + s, p.y);
          ctx.lineTo(p.x, p.y - s * 0.24);
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      // =======================================================================
      // E. STARDUST TRAIL SPARKS (Mouse cursor trail)
      // =======================================================================
      for (let i = stardustSparks.length - 1; i >= 0; i--) {
        const spark = stardustSparks[i];
        spark.life++;
        spark.x += spark.vx;
        spark.y += spark.vy;
        const progress = spark.life / spark.maxLife;
        spark.alpha = spark.maxAlpha * (1 - progress);

        if (spark.life >= spark.maxLife) {
          stardustSparks.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, spark.alpha);
        ctx.fillStyle = spark.color;
        const sSize = spark.size * (1 - progress * 0.3);

        ctx.beginPath();
        ctx.moveTo(spark.x, spark.y - sSize * 2.2);
        ctx.lineTo(spark.x + sSize * 0.25, spark.y);
        ctx.lineTo(spark.x, spark.y + sSize * 2.2);
        ctx.lineTo(spark.x - sSize * 0.25, spark.y);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(spark.x - sSize * 2.2, spark.y);
        ctx.lineTo(spark.x, spark.y + sSize * 0.25);
        ctx.lineTo(spark.x + sSize * 2.2, spark.y);
        ctx.lineTo(spark.x, spark.y - sSize * 0.25);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', setupCanvas);
      window.removeEventListener('resize', updateCanvasRect);
      window.removeEventListener('scroll', updateCanvasRect);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [enableFloorCaustic]);

  const activeTheme = SURFACE_THEMES[currentTheme];

  return (
    <div className={`absolute inset-0 pointer-events-none w-full h-full overflow-hidden z-10 ${className}`}>
      {/* ===================================================================== */}
      {/* 1. UPPER ATMOSPHERE (Top 48% - Nocturnal Atelier Ceiling)             */}
      {/* ===================================================================== */}
      <div className="absolute inset-x-0 top-0 h-[48%] pointer-events-none">
        {/* Soft Ceiling Spotlight Cone */}
        <div className="absolute top-0 inset-x-0 h-full bg-[radial-gradient(ellipse_75%_65%_at_50%_0%,rgba(201,154,84,0.14)_0%,transparent_75%)]" />
        {/* Deep Nocturnal Espresso Tone */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#120804]/90 via-[#160B06]/60 to-transparent" />
        {/* Subtle Architectural Grid */}
        <div className="absolute inset-0 opacity-[0.025] bg-[radial-gradient(#C99A54_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      {/* ===================================================================== */}
      {/* 2. THE DISTINGUISHABLE SURFACE HORIZON SEAM (Boundary Line at 48%)    */}
      {/* ===================================================================== */}
      <div className="absolute inset-x-0 top-[48%] -translate-y-1/2 pointer-events-none z-20">
        {/* Horizon Ambient Light Haze */}
        <div className="absolute -top-12 inset-x-0 h-24 bg-gradient-to-b from-transparent via-[#C99A54]/18 to-transparent blur-lg" />
        {/* Horizon Soft Glow Bar */}
        <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-[#C99A54]/45 to-transparent blur-[2px]" />
        {/* Razor-Sharp Specular Horizon Seam */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#F3D8A8] to-transparent opacity-95" />

        {/* Center Horizon Atelier Coordinates & Status Badge */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-0.5 bg-[#170C06]/90 backdrop-blur-md border border-[#C99A54]/45 rounded-full flex items-center space-x-2 shadow-[0_0_20px_rgba(201,154,84,0.22)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E7C58A] animate-pulse" />
          <span className="text-[8px] font-mono tracking-[0.35em] uppercase text-[#E7C58A]/90">
            ATELIER EXHIBITION SURFACE • {activeTheme.label}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#E7C58A] animate-pulse" />
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 3. THE DISTINGUISHABLE LOWER SURFACE PLANE (Bottom 52% Height)        */}
      {/*    Dynamic Real-Time Color & Mouse Interaction                        */}
      {/* ===================================================================== */}
      <div
        ref={surfaceContainerRef}
        style={{ background: activeTheme.baseGradient }}
        className="absolute inset-x-0 top-[48%] bottom-0 pointer-events-none overflow-hidden transition-colors duration-700"
      >
        {/* Dynamic Interactive Mouse Radial Color Spotlight */}
        <div
          style={{
            background: `radial-gradient(circle 460px at var(--mouse-x, 50%) var(--mouse-y, 50%), ${activeTheme.spotlightCenter} 0%, ${activeTheme.spotlightMid} 35%, ${activeTheme.glowColor} 65%, transparent 95%)`,
            opacity: 'calc(0.45 + 0.55 * var(--hover-intensity, 0.28))',
          }}
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 will-change-[background]"
        />

        {/* Dynamic Metallic Specular Sheen Angle (Rotating with cursor position) */}
        <div
          style={{
            background: `linear-gradient(var(--mouse-angle, 105deg), transparent 0%, rgba(255, 245, 220, calc(0.10 * var(--hover-intensity, 0.28))) 45%, rgba(255, 255, 255, calc(0.20 * var(--hover-intensity, 0.28))) 50%, rgba(255, 245, 220, calc(0.10 * var(--hover-intensity, 0.28))) 55%, transparent 100%)`,
          }}
          className="absolute inset-0 pointer-events-none will-change-[background]"
        />

        {/* Radial Exhibition Floor Spotlight Centered on the Stage */}
        <div
          style={{
            background: `radial-gradient(ellipse 85% 65% at 50% 35%, ${activeTheme.radialCenter} 0%, rgba(25, 12, 6, 0.75) 60%, transparent 100%)`,
          }}
          className="absolute inset-0 pointer-events-none"
        />

        {/* Luxury Perspective Floor Grid / Horological Guilloché Pattern */}
        <div className="absolute inset-0 opacity-[0.055] bg-[radial-gradient(circle_at_50%_35%,#E7C58A_1.2px,transparent_1.2px)] [background-size:24px_24px] pointer-events-none" />

        {/* Surface Sheen Reflection Plane */}
        <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-[#E7C58A]/14 via-[#C99A54]/6 to-transparent blur-md pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/85 to-transparent pointer-events-none" />
      </div>

      {/* ===================================================================== */}
      {/* 4. HARDWARE ACCELERATED 60FPS INTERACTIVE CANVAS                      */}
      {/* ===================================================================== */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full will-change-transform z-20 pointer-events-none" />

      {/* ===================================================================== */}
      {/* 5. INTERACTIVE SURFACE COLOR THEME SELECTOR PILL (Optional Floating) */}
      {/* ===================================================================== */}
      {showFloatingThemeSelector && (
        <div className="absolute bottom-5 right-6 sm:right-12 z-40 pointer-events-auto flex items-center space-x-1.5 sm:space-x-2 bg-[#1A0B05]/90 backdrop-blur-md border border-[#C99A54]/45 px-3 py-1.5 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          <span className="text-[8px] sm:text-[9px] font-mono tracking-widest uppercase text-[#C99A54]/90 hidden md:inline">
            SURFACE TONE:
          </span>
          {(Object.keys(SURFACE_THEMES) as SurfaceColorTheme[]).map((themeKey) => {
            const th = SURFACE_THEMES[themeKey];
            const isSelected = currentTheme === themeKey;
            return (
              <button
                key={themeKey}
                onClick={() => setCurrentTheme(themeKey)}
                className={`px-2.5 py-1 rounded-full text-[8px] sm:text-[9px] font-mono tracking-wider uppercase transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#E7C58A] text-[#170C06] font-bold shadow-[0_0_12px_#C99A54]'
                    : 'text-[#F8F2E9]/70 hover:text-white hover:bg-white/10'
                }`}
                title={th.metalName}
              >
                {th.label.split(' ')[0]}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
