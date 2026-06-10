import { Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { api } from '../../api.js';

const empty = { title: '', year: '', body: '', order: 0, isActive: true };

export default function StoriesAdmin() {
  const [stories, setStories] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);

  const load = () => api('/admin/stories').then(setStories).catch((err) => toast.error(err.message));

  useEffect(() => {
    load();
  }, []);

  const open = (story = null) => {
    setEditing(story || {});
    setForm(story || empty);
  };

  const save = async (e) => {
    e.preventDefault();
    try {
      await api(editing?._id ? `/admin/stories/${editing._id}` : '/admin/stories', {
        method: editing?._id ? 'PUT' : 'POST',
        body: JSON.stringify(form)
      });
      toast.success('Story saved');
      setEditing(null);
      setForm(empty);
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const remove = async (id) => {
    if (!confirm('Delete this story?')) return;
    await api(`/admin/stories/${id}`, { method: 'DELETE' });
    toast.success('Story deleted');
    load();
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-bold">About Stories</h1>
          <p className="mt-2 text-sm text-muted">Minimal timeline stories shown on the About page.</p>
        </div>
        <button onClick={() => open()} className="btn btn-accent"><Plus size={16} /> Add Story</button>
      </div>

      <div className="mt-8 grid gap-4">
        {stories.map((story) => (
          <div key={story._id} className="grid gap-4 rounded-lg border border-white/10 bg-surface p-5 md:grid-cols-[120px_1fr_auto] md:items-start">
            <div>
              <div className="font-display text-2xl font-bold text-accent">{story.year || 'Now'}</div>
              <div className="mt-2 text-xs text-muted">Order {story.order || 0}</div>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-display text-2xl font-bold">{story.title}</h2>
                <span className={`rounded-full px-3 py-1 text-xs ${story.isActive ? 'bg-accent/15 text-accent' : 'bg-white/10 text-muted'}`}>{story.isActive ? 'Visible' : 'Hidden'}</span>
              </div>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">{story.body}</p>
            </div>
            <div className="flex gap-4 text-sm">
              <button onClick={() => open(story)} className="text-accent">Edit</button>
              <button onClick={() => remove(story._id)} className="inline-flex items-center gap-1 text-red-400"><Trash2 size={14} /> Delete</button>
            </div>
          </div>
        ))}
      </div>

      {editing !== null && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 p-5">
          <form onSubmit={save} className="mx-auto max-w-2xl rounded-lg border border-white/10 bg-surface p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-3xl font-bold">Story</h2>
              <button type="button" onClick={() => setEditing(null)}>Close</button>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Input label="Title" value={form.title} onChange={(value) => setForm({ ...form, title: value })} required />
              <Input label="Year / Label" value={form.year} onChange={(value) => setForm({ ...form, year: value })} />
              <Input label="Order" type="number" value={form.order} onChange={(value) => setForm({ ...form, order: value })} />
              <label className="flex items-center gap-2 rounded-lg border border-white/10 bg-base p-3 text-sm text-muted">
                <input type="checkbox" checked={!!form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
                Show on About page
              </label>
            </div>
            <textarea required placeholder="Short story" value={form.body || ''} onChange={(e) => setForm({ ...form, body: e.target.value })} className="mt-4 min-h-36 w-full rounded-lg border border-white/10 bg-base p-3 outline-none focus:border-accent" />
            <button className="btn btn-accent mt-6">Save Story</button>
          </form>
        </div>
      )}
    </div>
  );
}

function Input({ label, value, onChange, type = 'text', required }) {
  return (
    <label className="block">
      <span className="text-sm text-muted">{label}</span>
      <input required={required} type={type} value={value || ''} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-lg border border-white/10 bg-base p-3 outline-none focus:border-accent" />
    </label>
  );
}
