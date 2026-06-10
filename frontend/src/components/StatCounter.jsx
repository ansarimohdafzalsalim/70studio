import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

export default function StatCounter({ value, suffix = '', label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = Number(value);
    const timer = setInterval(() => {
      start += Math.max(1, Math.ceil(end / 32));
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else setCount(start);
    }, 32);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <div ref={ref} className="border-t border-white/10 py-6">
      <div className="font-display text-5xl font-bold">{count}{suffix}</div>
      <div className="mt-2 text-sm text-muted">{label}</div>
    </div>
  );
}
