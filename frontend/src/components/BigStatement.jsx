import { motion } from 'framer-motion';

export default function BigStatement() {
  return (
    <section className="overflow-hidden border-y border-white/10 py-6">
      <motion.div
        className="flex min-w-max gap-8 font-display text-4xl font-extrabold uppercase leading-none text-white/10 sm:text-5xl lg:text-6xl"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, duration: 26, ease: 'linear' }}
      >
        {[...Array(2)].map((_, index) => (
          <span key={index} className="flex gap-8">
            <span>Strategy</span><span>Design</span><span>AI</span><span>Launch</span><span>Systems</span>
          </span>
        ))}
      </motion.div>
    </section>
  );
}
