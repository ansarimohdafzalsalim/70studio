import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { api, assetFallback } from '../../api.js';

const empty = { title: '', slug: '', category: 'Web Design', client: '', year: new Date().getFullYear(), services: '', description: '', featured: false, order: 0 };

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [cover, setCover] = useState(null);
  const [images, setImages] = useState([]);
  const load = () => api('/admin/projects').then(setProjects).catch((e) => toast.error(e.message));
  useEffect(() => {
    load();
  }, []);
  const open = (project = null) => {
    setEditing(project || {});
    setForm(project ? { ...project, services: (project.services || []).join(', ') } : empty);
  };
  const save = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (cover) fd.append('coverImage', cover);
    [...images].forEach((img) => fd.append('images', img));
    try {
      await api(editing?._id ? `/admin/projects/${editing._id}` : '/admin/projects', { method: editing?._id ? 'PUT' : 'POST', body: fd });
      toast.success('Project saved');
      setEditing(null); setForm(empty); setCover(null); setImages([]); load();
    } catch (err) { toast.error(err.message); }
  };
  const remove = async (id) => {
    if (!confirm('Delete this project?')) return;
    await api(`/admin/projects/${id}`, { method: 'DELETE' });
    load();
  };
  return (
    <div>
      <div className="flex items-center justify-between"><h1 className="font-display text-4xl font-bold">Projects</h1><button onClick={() => open()} className="btn btn-accent">Add New Project</button></div>
      <div className="mt-8 overflow-x-auto rounded-lg border border-white/10">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-white/5 text-muted"><tr><th className="p-4">Thumbnail</th><th>Title</th><th>Category</th><th>Featured</th><th>Date</th><th>Actions</th></tr></thead>
          <tbody>{projects.map((p) => <tr key={p._id} className="border-t border-white/10"><td className="p-4"><img src={p.coverImage || assetFallback} className="h-14 w-20 rounded object-cover" /></td><td>{p.title}</td><td>{p.category}</td><td>{p.featured ? 'Yes' : 'No'}</td><td>{new Date(p.createdAt).toLocaleDateString()}</td><td><button onClick={() => open(p)} className="mr-3 text-accent">Edit</button><button onClick={() => remove(p._id)} className="text-red-400">Delete</button></td></tr>)}</tbody>
        </table>
      </div>
      {editing !== null && <ProjectModal form={form} setForm={setForm} setEditing={setEditing} save={save} setCover={setCover} setImages={setImages} />}
    </div>
  );
}

function ProjectModal({ form, setForm, setEditing, save, setCover, setImages }) {
  const set = (k, v) => setForm({ ...form, [k]: v, ...(k === 'title' && !form.slug ? { slug: v.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') } : {}) });
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 p-5">
      <form onSubmit={save} className="mx-auto max-w-3xl rounded-lg border border-white/10 bg-surface p-6">
        <div className="flex justify-between"><h2 className="font-display text-3xl font-bold">Project</h2><button type="button" onClick={() => setEditing(null)}>Close</button></div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {['title', 'slug', 'client', 'year', 'services', 'order'].map((k) => <input key={k} placeholder={k} value={form[k] || ''} onChange={(e) => set(k, e.target.value)} className="rounded-lg border border-white/10 bg-base p-3 outline-none focus:border-accent" />)}
          <select value={form.category} onChange={(e) => set('category', e.target.value)} className="rounded-lg border border-white/10 bg-base p-3"><option>Web Design</option><option>Branding</option><option>Mobile App</option><option>Dashboard</option><option>AI/Tech</option></select>
          <label className="flex items-center gap-2"><input type="checkbox" checked={!!form.featured} onChange={(e) => set('featured', e.target.checked)} /> Featured</label>
        </div>
        <textarea placeholder="Description HTML or markdown" value={form.description || ''} onChange={(e) => set('description', e.target.value)} className="mt-4 min-h-36 w-full rounded-lg border border-white/10 bg-base p-3 outline-none focus:border-accent" />
        <div className="mt-4 grid gap-4 md:grid-cols-2"><input type="file" onChange={(e) => setCover(e.target.files[0])} /><input type="file" multiple onChange={(e) => setImages(e.target.files)} /></div>
        <button className="btn btn-accent mt-6">Save Project</button>
      </form>
    </div>
  );
}
