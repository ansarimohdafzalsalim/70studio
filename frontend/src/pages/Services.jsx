import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { services } from '../data.js';
import { api } from '../api.js';
import { hydrateServices } from '../serviceIcons.jsx';

export default function Services() {
  const [siteServices, setSiteServices] = useState(services);
  useEffect(() => {
    api('/services').then((data) => setSiteServices(hydrateServices(data))).catch(() => {});
  }, []);
  return (
    <section className="container-pad pt-28 pb-16">
      <h1 className="font-display text-6xl font-bold sm:text-8xl">Services</h1>
      <div className="mt-12 grid gap-6">
        {siteServices.map((s) => (
          <div key={s._id || s.title} className="grid gap-6 border-t border-white/10 py-8 lg:grid-cols-[.8fr_1.2fr]">
            <div><s.icon className="text-accent" size={34} /><h2 className="mt-5 font-display text-4xl font-bold">{s.title}</h2></div>
            <div><p className="text-lg leading-8 text-muted">{s.description}</p><div className="mt-6 flex flex-wrap gap-3">{s.deliverables.map((d) => <span key={d} className="rounded-full border border-white/15 px-4 py-2 text-sm text-muted">{d}</span>)}</div><Link to="/contact" className="btn btn-accent mt-8">Start this project</Link></div>
          </div>
        ))}
      </div>
    </section>
  );
}
