import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const nodes = [
  { x: '64%', y: '18%', label: 'AI' },
  { x: '78%', y: '54%', label: 'WEB' },
  { x: '24%', y: '70%', label: 'UX' }
];

export default function HeroScene() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.25]);

  return (
    <motion.div ref={ref} style={{ y, opacity }} className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute left-[68%] top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/15"
        animate={{ rotate: 360 }}
        transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute left-[68%] top-1/2 h-[15rem] w-[15rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"
        animate={{ rotate: -360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      />
      <svg className="absolute inset-0 h-full w-full opacity-50" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path
          d="M24 70 C42 48, 55 36, 64 18 M64 18 C72 30, 76 42, 78 54"
          fill="none"
          stroke="rgba(92,78,255,.28)"
          strokeWidth=".18"
          strokeDasharray="1 1.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, ease: 'easeOut' }}
        />
      </svg>
      {nodes.map((node, index) => (
        <motion.div
          key={node.label}
          className="absolute hidden rounded-full border border-white/10 bg-base/60 px-3 py-1.5 text-[10px] font-semibold tracking-[.18em] text-white/80 backdrop-blur md:block"
          style={{ left: node.x, top: node.y }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: [1, 1.08, 1] }}
          transition={{ opacity: { delay: 0.6 + index * 0.12 }, scale: { duration: 4, repeat: Infinity, delay: index * 0.3 } }}
        >
          {node.label}
        </motion.div>
      ))}
    </motion.div>
  );
}
