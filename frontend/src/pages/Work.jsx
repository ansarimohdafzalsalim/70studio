import { useEffect, useState } from 'react';
import ProjectCard from '../components/ProjectCard.jsx';
import { api } from '../api.js';
import { placeholderProjects } from '../data.js';

const filters = ['All', 'Web Design', 'Branding', 'Mobile App', 'Dashboard', 'AI/Tech'];

export default function Work() {
  const [active, setActive] = useState('All');
  const [projects, setProjects] = useState(placeholderProjects);
  useEffect(() => {
    api(`/projects${active !== 'All' ? `?category=${encodeURIComponent(active)}` : ''}`).then(setProjects).catch(() => setProjects(active === 'All' ? placeholderProjects : placeholderProjects.filter((p) => p.category === active)));
  }, [active]);
  return (
    <section className="container-pad min-h-screen pt-28 pb-16">
      <div className="max-w-4xl">
        <div className="text-sm uppercase text-accent">Portfolio</div>
        <h1 className="mt-3 font-display text-5xl font-bold sm:text-7xl">Case Studies</h1>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">{filters.map((f) => <button key={f} onClick={() => setActive(f)} className={`rounded-full border px-4 py-2 text-sm ${active === f ? 'border-accent bg-accent text-white' : 'border-white/15 text-muted'}`}>{f}</button>)}</div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{projects.map((p) => <ProjectCard key={p.slug} project={p} compact />)}</div>
    </section>
  );
}
