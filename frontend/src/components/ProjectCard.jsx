import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { assetFallback } from '../api.js';

export default function ProjectCard({ project, compact = false }) {
  return (
    <motion.div whileHover={{ y: -8, rotateX: 1.5, rotateY: -1.5 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }} className="h-full">
      <Link to={`/work/${project.slug}`} className="group block h-full overflow-hidden rounded-lg border border-white/10 bg-surface">
      <div className={`relative overflow-hidden ${compact ? 'aspect-[4/3]' : 'aspect-[16/10]'}`}>
        <img src={project.coverImage || assetFallback} alt={project.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-full bg-base/80 px-3 py-1 text-xs text-ink backdrop-blur">{project.category}</span>
        <div className="absolute inset-0 flex items-center justify-center bg-accent/70 opacity-0 transition duration-500 group-hover:opacity-100">
          <span className="translate-y-4 font-display text-2xl font-bold transition duration-500 group-hover:translate-y-0">View →</span>
        </div>
      </div>
      <div className={`flex items-center justify-between ${compact ? 'p-4' : 'p-5'}`}>
        <h3 className={`font-display font-bold ${compact ? 'text-lg' : 'text-xl'}`}>{project.title}</h3>
        <ArrowUpRight className="text-accent transition group-hover:translate-x-1 group-hover:-translate-y-1" />
      </div>
      </Link>
    </motion.div>
  );
}
