import { motion, useScroll, useTransform } from 'framer-motion';

export default function ParallaxGridLayers() {
  const { scrollYProgress } = useScroll();
  const fineY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);
  const wideY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const diagonalY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);

  return (
    <div className="theme-ambient pointer-events-none fixed inset-0 z-[1] overflow-hidden opacity-35 transition duration-300">
      <motion.div
        className="absolute -inset-24 opacity-[0.12]"
        style={{
          y: fineY,
          backgroundImage: 'linear-gradient(rgb(var(--color-ink) / .12) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--color-ink) / .12) 1px, transparent 1px)',
          backgroundSize: '36px 36px'
        }}
      />
      <motion.div
        className="absolute -inset-32 opacity-[0.1]"
        style={{
          y: wideY,
          backgroundImage: 'linear-gradient(rgba(92,78,255,.24) 1px, transparent 1px), linear-gradient(90deg, rgba(92,78,255,.24) 1px, transparent 1px)',
          backgroundSize: '144px 144px'
        }}
      />
      <motion.div
        className="absolute -inset-40 opacity-[0.05]"
        style={{
          y: diagonalY,
          rotate: -8,
          backgroundImage: 'linear-gradient(90deg, transparent 49%, rgb(var(--color-ink) / .18) 50%, transparent 51%)',
          backgroundSize: '220px 220px'
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(circle at 50% 30%, transparent, rgb(var(--color-base) / .76) 72%)' }}
      />
    </div>
  );
}
