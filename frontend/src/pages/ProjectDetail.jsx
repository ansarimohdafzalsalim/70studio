import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api, assetFallback } from '../api.js';
import { placeholderProjects } from '../data.js';

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [all, setAll] = useState(placeholderProjects);
  useEffect(() => {
    api(`/projects/${slug}`).then(setProject).catch(() => setProject(placeholderProjects.find((p) => p.slug === slug) || placeholderProjects[0]));
    api('/projects').then(setAll).catch(() => {});
  }, [slug]);
  if (!project) return <div className="container-pad min-h-screen pt-28">Loading...</div>;
  const idx = all.findIndex((p) => p.slug === project.slug);
  const prev = all[(idx - 1 + all.length) % all.length];
  const next = all[(idx + 1) % all.length];
  return (
    <article className="pt-24">
      <img src={project.coverImage || assetFallback} alt={project.title} className="h-[70vh] w-full object-cover" />
      <div className="container-pad py-12">
        <h1 className="font-display text-5xl font-bold sm:text-7xl">{project.title}</h1>
        <div className="mt-10 grid gap-6 border-y border-white/10 py-8 md:grid-cols-4">
          <Meta label="Client" value={project.client} /><Meta label="Category" value={project.category} /><Meta label="Year" value={project.year} /><Meta label="Services" value={(project.services || []).join(', ')} />
        </div>
        <div className="prose prose-invert mt-12 max-w-3xl text-lg leading-8 text-muted" dangerouslySetInnerHTML={{ __html: project.description || '' }} />
        <div className="mt-14 grid gap-5 md:grid-cols-2">{(project.images?.length ? project.images : [project.coverImage, assetFallback]).map((img, i) => <img key={i} src={img || assetFallback} alt="" className="aspect-[4/3] w-full rounded-lg object-cover" />)}</div>
        <div className="mt-16 flex justify-between border-t border-white/10 pt-8">
          {prev && <Link to={`/work/${prev.slug}`} className="btn btn-ghost"><ArrowLeft size={18} /> Prev</Link>}
          {next && <Link to={`/work/${next.slug}`} className="btn btn-accent">Next <ArrowRight size={18} /></Link>}
        </div>
      </div>
    </article>
  );
}

function Meta({ label, value }) {
  return <div><div className="text-xs uppercase text-muted">{label}</div><div className="mt-2 font-medium">{value}</div></div>;
}
