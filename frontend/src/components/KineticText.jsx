import { motion } from 'framer-motion';

export default function KineticText({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.075 } } }}
    >
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="mr-4 inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '110%', opacity: 0, rotate: 2 },
              show: { y: '0%', opacity: 1, rotate: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } }
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
