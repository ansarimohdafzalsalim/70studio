import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import MagneticLink from './MagneticLink.jsx';
import useSettings, { whatsAppHref } from '../hooks/useSettings.js';

const categories = ['Websites', 'Brand Systems', 'AI Dashboards', 'Mobile Apps', 'Launch Assets', 'Admin Tools'];

const tiles = [
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=80'
];

const logos = ['The Startup Journal', 'Mumbai Design Week', 'SaaS Insider', 'Creator Stack', 'AI India'];

export default function StudioShowcase() {
  const settings = useSettings();
  return (
    <>
      <section className="container-pad border-y border-white/10 py-6">
        <div className="flex flex-wrap gap-3">
          {categories.map((item) => (
            <motion.span key={item} whileHover={{ y: -4, backgroundColor: '#5C4EFF', color: '#fff' }} className="rounded-full border border-white/15 px-4 py-2 text-sm text-muted">
              {item}
            </motion.span>
          ))}
        </div>
      </section>

      <section className="section container-pad">
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div>
            <div className="text-sm uppercase text-accent">Custom build</div>
            <h2 className="mt-3 font-display text-4xl font-bold sm:text-6xl">Make your own digital system.</h2>
            <p className="mt-6 text-lg leading-8 text-muted">
              Inspired by custom fashion drops, we shape a made-for-you website, brand, AI workflow, or product interface around your exact business goal.
            </p>
            <div className="mt-8 grid gap-3 text-sm text-muted">
              <div className="border-t border-white/10 pt-3">01 · Share references, goals, and rough ideas</div>
              <div className="border-t border-white/10 pt-3">02 · Get a direction board and first screen concept</div>
              <div className="border-t border-white/10 pt-3">03 · Launch a polished system with admin control</div>
            </div>
            <MagneticLink to="/contact" className="btn btn-accent mt-8">Start a Custom Build <ArrowRight size={18} /></MagneticLink>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {tiles.map((src, index) => (
              <motion.img
                key={src}
                src={src}
                alt=""
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                whileHover={{ scale: 1.04, rotate: index % 2 ? 1 : -1 }}
                className="aspect-[4/5] rounded-lg object-cover"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-surface/40">
        <div className="container-pad">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="text-sm uppercase text-accent">#BuiltAt70studio</div>
              <h2 className="mt-3 font-display text-4xl font-bold sm:text-6xl">Live from the studio</h2>
            </div>
            <MagneticLink href="https://instagram.com/70studio.ai" className="btn btn-ghost">See More</MagneticLink>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {['Launch pages with bite', 'AI dashboards that feel calm', 'Brands built to be remembered'].map((quote, index) => (
              <motion.div key={quote} whileHover={{ y: -8 }} className="rounded-lg border border-white/10 bg-base p-6">
                <div className="text-accent">0{index + 1}</div>
                <p className="mt-8 font-display text-2xl font-bold">{quote}</p>
                <p className="mt-4 text-sm leading-6 text-muted">A small window into the experiments, screens, systems, and launches moving through the studio.</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-pad py-8">
        <div className="grid gap-6 border-y border-white/10 py-8 lg:grid-cols-[.4fr_1fr] lg:items-center">
          <h2 className="font-display text-2xl font-bold">Featured around the ecosystem</h2>
          <div className="flex flex-wrap gap-x-10 gap-y-4 text-muted">
            {logos.map((logo) => <span key={logo} className="font-display text-xl font-bold">{logo}</span>)}
          </div>
        </div>
      </section>

      <section className="container-pad pb-12">
        <div className="grid gap-6 rounded-lg border border-white/10 bg-surface p-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="font-display text-3xl font-bold">Questions?</h2>
            <p className="mt-2 text-sm text-muted">Message the studio directly. Most project queries are answered within 24 hours.</p>
          </div>
          <MagneticLink href={whatsAppHref(settings.phone)} className="btn btn-accent"><MessageCircle size={18} /> WhatsApp 70studio</MagneticLink>
        </div>
      </section>
    </>
  );
}
