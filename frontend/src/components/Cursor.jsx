import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Cursor() {
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 24 });
  const sy = useSpring(y, { stiffness: 180, damping: 24 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine) return;
    setVisible(true);
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);

  if (!visible) return null;
  return (
    <>
      <motion.div className="pointer-events-none fixed left-0 top-0 z-[90] h-3 w-3 rounded-full bg-accent mix-blend-difference" style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }} />
      <motion.div className="pointer-events-none fixed left-0 top-0 z-[89] h-10 w-10 rounded-full border border-white/30" style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }} />
    </>
  );
}
