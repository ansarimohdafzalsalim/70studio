import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

export default function AmbientBackground() {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 24 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 24 });
  const glowX = useTransform(smoothX, (value) => `${value * 100}%`);
  const glowY = useTransform(smoothY, (value) => `${value * 100}%`);

  useEffect(() => {
    const move = (event) => {
      mouseX.set(event.clientX / window.innerWidth);
      mouseY.set(event.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [mouseX, mouseY]);

  return (
    <div className="theme-ambient pointer-events-none fixed inset-0 z-0 overflow-hidden transition duration-300">
      <motion.div
        className="absolute inset-0 opacity-[0.14]"
        animate={{ backgroundPosition: ['0px 0px', '80px 80px'] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        style={{
          backgroundImage: 'linear-gradient(rgb(var(--color-ink) / .08) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--color-ink) / .08) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }}
      />

      <motion.div
        className="absolute h-[48rem] w-[48rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          left: glowX,
          top: glowY,
          background: 'radial-gradient(circle, rgba(92,78,255,.22), rgba(92,78,255,.08) 35%, transparent 70%)'
        }}
      />

      <motion.div
        className="absolute -right-32 top-20 h-[34rem] w-[34rem] rounded-full border border-accent/10"
        animate={{ rotate: 360, scale: [1, 1.08, 1] }}
        transition={{ rotate: { duration: 42, repeat: Infinity, ease: 'linear' }, scale: { duration: 10, repeat: Infinity, ease: 'easeInOut' } }}
      />
      <motion.div
        className="absolute -left-40 bottom-10 h-[28rem] w-[28rem] rounded-full border border-white/10"
        animate={{ rotate: -360, scale: [1, 1.12, 1] }}
        transition={{ rotate: { duration: 36, repeat: Infinity, ease: 'linear' }, scale: { duration: 12, repeat: Infinity, ease: 'easeInOut' } }}
      />

      <motion.div
        className="absolute left-[-15%] top-[18%] h-px w-[130%] bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{ rotate: [-6, -3, -6], y: [0, 36, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-[-20%] top-[62%] h-px w-[140%] bg-gradient-to-r from-transparent via-accent/20 to-transparent"
        animate={{ rotate: [7, 3, 7], y: [0, -42, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(circle at center, transparent, rgb(var(--color-base) / .7) 70%)' }}
      />
    </div>
  );
}
