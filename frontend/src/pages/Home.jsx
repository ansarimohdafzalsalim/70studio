import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Reveal from '../components/Reveal.jsx';
import KineticText from '../components/KineticText.jsx';
import MagneticLink from '../components/MagneticLink.jsx';
import ParallaxImage from '../components/ParallaxImage.jsx';
import HeroScene from '../components/HeroScene.jsx';
import BigStatement from '../components/BigStatement.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import StatCounter from '../components/StatCounter.jsx';
import StudioShowcase from '../components/StudioShowcase.jsx';
import { api, assetFallback } from '../api.js';
import { faqs, industries, placeholderProjects, process, services, testimonials, trustPoints } from '../data.js';
import { hydrateServices } from '../serviceIcons.jsx';
import useSettings from '../hooks/useSettings.js';
import { useEffect, useState } from 'react';

export default function Home() {
  const [projects, setProjects] = useState(placeholderProjects);
  const [siteServices, setSiteServices] = useState(services);
  const settings = useSettings();
  useEffect(() => {
    api('/projects').then((data) => setProjects(data.filter((p) => p.featured).slice(0, 3).length ? data.filter((p) => p.featured).slice(0, 3) : data.slice(0, 3))).catch(() => {});
    api('/services').then((data) => setSiteServices(hydrateServices(data))).catch(() => {});
  }, []);

  return (
    <>
      <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
        <HeroScene />
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
          style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(92,78,255,.35), transparent 30%)', backgroundSize: '140% 140%' }}
        />
        <motion.div
          className="absolute bottom-10 right-8 hidden h-40 w-40 rounded-full border border-white/10 md:block"
          animate={{ rotate: 360, scale: [1, 1.08, 1] }}
          transition={{ rotate: { duration: 24, repeat: Infinity, ease: 'linear' }, scale: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }}
        />
        <motion.div
          className="absolute right-16 top-32 hidden h-24 w-px bg-gradient-to-b from-transparent via-accent to-transparent md:block"
          animate={{ y: [0, 46, 0], opacity: [0.3, 0.9, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="container-pad relative">
          <div className="max-w-6xl">
            <motion.div className="mb-5 inline-flex rounded-full border border-white/10 bg-base/60 px-4 py-2 text-sm uppercase text-muted backdrop-blur" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>Design & AI agency · Mumbai</motion.div>
            <h1 className="max-w-5xl font-display text-5xl font-extrabold leading-[1] tracking-normal text-balance sm:text-7xl lg:text-8xl">
              <KineticText text="Design that thinks. Brands that convert." />
            </h1>
            <div className="mt-8 grid gap-8 lg:grid-cols-[.55fr_.45fr] lg:items-end">
              <motion.p className="max-w-2xl text-lg leading-8 text-muted" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.65 }}>70studio builds identities, websites, apps, and AI product experiences for teams that care about clarity and momentum.</motion.p>
              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="grid grid-cols-3 gap-3 text-center">
                {(settings.heroCards || []).slice(0, 3).map((item) => <div key={`${item.value}-${item.label}`} className="rounded-lg border border-white/10 bg-base/60 p-4 backdrop-blur"><div className="font-display text-2xl font-bold text-accent">{item.value}</div><div className="mt-1 text-xs uppercase text-muted">{item.label}</div></div>)}
              </motion.div>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <MagneticLink className="btn btn-accent" to="/work">See Our Work <ArrowRight size={18} /></MagneticLink>
              <MagneticLink className="btn btn-ghost bg-base/50 backdrop-blur" to="/contact">Start a Project</MagneticLink>
            </div>
          </div>
        </div>
      </section>

      <BigStatement />

      <div className="overflow-hidden border-y border-white/10 py-5">
        <motion.div className="flex min-w-max gap-16 text-muted" animate={{ x: ['0%', '-50%'] }} transition={{ repeat: Infinity, duration: 22, ease: 'linear' }}>
          {[...Array(2)].flatMap(() => ['Nava Labs', 'Flux AI', 'Bandra House', 'Orbit', 'PulseOps', 'Studio 70']).map((name, i) => <span key={i} className="font-display text-2xl font-bold">{name}</span>)}
        </motion.div>
      </div>

      <section className="section container-pad">
        <Reveal><h2 className="font-display text-4xl font-bold sm:text-6xl">Services built for sharp launches.</h2></Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {siteServices.map((service, i) => <Reveal key={service._id || service.title} delay={i * 0.04}><ServiceCard index={i} {...service} /></Reveal>)}
        </div>
      </section>

      <section className="container-pad pb-12">
        <div className="grid gap-8 border-y border-white/10 py-12 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <div className="text-sm uppercase text-accent">Built for</div>
            <h2 className="mt-3 font-display text-4xl font-bold">Teams that need clarity fast.</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {industries.map((industry, index) => <motion.span key={industry} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.035 }} whileHover={{ y: -4, borderColor: '#5C4EFF', color: '#F5F5F0' }} className="rounded-full border border-white/15 px-4 py-2 text-sm text-muted">{industry}</motion.span>)}
          </div>
        </div>
      </section>

      <StudioShowcase />

      <section className="section bg-surface/40">
        <div className="container-pad">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal><h2 className="font-display text-4xl font-bold sm:text-6xl">Featured work</h2></Reveal>
            <Link to="/work" className="btn btn-ghost">View all</Link>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">{projects.map((p) => <ProjectCard key={p.slug} project={p} />)}</div>
        </div>
      </section>

      <section className="container-pad grid gap-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <StatCounter value={50} suffix="+" label="Projects" /><StatCounter value={4} suffix="+" label="Years" /><StatCounter value={98} suffix="%" label="Satisfaction" /><StatCounter value={12} label="Disciplines" />
      </section>

      <section className="section container-pad grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal><div><h2 className="font-display text-4xl font-bold sm:text-6xl">A compact studio for ambitious digital work.</h2><p className="mt-6 text-lg leading-8 text-muted">Founded by Mohd Afzal Salim Ansari, 70studio combines brand thinking, interface craft, and practical AI systems from Bandra West, Mumbai.</p></div></Reveal>
        <Reveal><div><ParallaxImage src={assetFallback} alt="70studio workspace" className="aspect-[4/3] w-full" /><div className="mt-5 grid gap-3 sm:grid-cols-2">{trustPoints.map((point, index) => <motion.div key={point} whileHover={{ x: 6, borderColor: '#5C4EFF' }} transition={{ type: 'spring', stiffness: 260, damping: 20 }} className="rounded-lg border border-white/10 bg-surface p-4 text-sm text-muted"><span className="mr-3 text-accent">0{index + 1}</span>{point}</motion.div>)}</div></div></Reveal>
      </section>

      <section className="section bg-surface/40">
        <div className="container-pad">
          <h2 className="font-display text-4xl font-bold sm:text-6xl">Process</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-4">{process.map((step, i) => <motion.div key={step.title} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -6 }} className="border-t border-white/15 pt-6"><step.icon className="text-accent" /><div className="mt-8 text-sm text-muted">0{i + 1}</div><h3 className="mt-2 font-display text-2xl font-bold">{step.title}</h3><p className="mt-3 text-sm leading-6 text-muted">{step.text}</p></motion.div>)}</div>
        </div>
      </section>

      <section className="section container-pad">
        <h2 className="font-display text-4xl font-bold sm:text-6xl">Kind words</h2>
        <div className="mt-12 flex snap-x gap-5 overflow-x-auto pb-4">{testimonials.map((t) => <motion.div key={t.name} whileHover={{ y: -6, rotate: -0.4 }} className="min-w-[310px] snap-start rounded-lg border border-white/10 bg-surface p-6 md:min-w-[420px]"><p className="text-lg leading-8">“{t.quote}”</p><div className="mt-8 flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent font-bold">{t.name.split(' ').map((n) => n[0]).join('')}</div><div><div className="font-semibold">{t.name}</div><div className="text-sm text-muted">{t.role}, {t.company}</div></div></div></motion.div>)}</div>
      </section>

      <section className="section bg-surface/40">
        <div className="container-pad">
          <h2 className="font-display text-4xl font-bold sm:text-6xl">Questions before we start</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-lg border border-white/10 bg-base p-6">
                <h3 className="font-display text-xl font-bold">{faq.question}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {faq.question === 'Where is the studio based?'
                    ? `70studio is based in ${settings.address}, and works with clients remotely across India and beyond.`
                    : faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-pad pb-14">
        <div className="rounded-lg bg-accent px-6 py-10 text-center">
          <h2 className="font-display text-4xl font-bold sm:text-6xl">Ready to build something great?</h2>
          <MagneticLink to="/contact" className="btn mt-8 bg-ink text-base hover:bg-base hover:text-ink">Start a Project</MagneticLink>
        </div>
      </section>
    </>
  );
}
