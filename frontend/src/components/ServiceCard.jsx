import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ServiceCard({ index, icon: Icon, title, description }) {
  return (
    <motion.div className="group relative overflow-hidden rounded-lg border border-white/10 bg-surface p-6 transition hover:border-white/20" whileHover={{ y: -8, scale: 1.015 }} transition={{ type: 'spring', stiffness: 280, damping: 22 }}>
      <div className="absolute left-0 top-0 h-full w-1 -translate-x-full bg-accent transition group-hover:translate-x-0" />
      <div className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition duration-500 group-hover:scale-x-100" />
      <div className="flex items-start justify-between">
        <span className="text-sm text-muted">{String(index + 1).padStart(2, '0')}</span>
        {Icon && <Icon className="text-accent" size={24} />}
      </div>
      <h3 className="mt-10 font-display text-2xl font-bold">{title}</h3>
      <p className="mt-3 min-h-12 text-sm leading-6 text-muted">{description}</p>
      <ArrowUpRight className="mt-8 text-white/50 transition group-hover:text-accent" />
    </motion.div>
  );
}
