import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';

const MotionLink = motion(Link);

export default function MagneticLink({ to, href, children, className = '' }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 16 });
  const springY = useSpring(y, { stiffness: 180, damping: 16 });
  const Component = to ? MotionLink : motion.a;

  const move = (event) => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.22);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.35);
  };

  const leave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Component
      to={to}
      href={href}
      onMouseMove={move}
      onMouseLeave={leave}
      whileTap={{ scale: 0.96 }}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </Component>
  );
}
