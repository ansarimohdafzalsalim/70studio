import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { api, assetFallback } from '../../api.js';

const empty = { name: '', role: '', bio: '', instagram: '', linkedin: '', order: 0, isActive: true };

export default function TeamAdmin() {
  const [team, setTeam] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [photo, setPhoto] = useState(null);
  const load = () => api('/admin/team').then(setTeam).catch((e) => toast.error(e.message));

  useEffect(() => {
    load();
  }, []);

  const open = (member = null) => {
    setEditing(member || {});
    setForm(member || empty);
    setPhoto(null);
  };

  const save = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([key, value]) => fd.append(key, value));
    if (photo) fd.append('photo', photo);

    try {
      await api(editing?._id ? `/admin/team/${editing._id}` : '/admin/team', {
        method: editing?._id ? 'PUT' : 'POST',
        body: fd
      });
      toast.success('Team member saved');
      setEditing(null);
      setForm(empty);
      setPhoto(null);
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const remove = async (id) => {
    if (!confirm('Delete this team member?')) return;
    await api(`/admin/team/${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-4xl font-bold">Team</h1>
        <button onClick={() => open()} className="btn btn-accent">Add Team Member</button>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {team.map((member) => (
          <div key={member._id} className="rounded-lg border border-white/10 bg-surface p-4">
            <img src={member.photo || assetFallback} alt={member.name} className="aspect-[4/3] w-full rounded-lg object-cover" />
            <div className="mt-4 flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl font-bold">{member.name}</h2>
                <p className="text-sm text-accent">{member.role}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs ${member.isActive ? 'bg-accent/20 text-accent' : 'bg-white/10 text-muted'}`}>{member.isActive ? 'Active' : 'Hidden'}</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted">{member.bio}</p>
            <div className="mt-5 flex gap-4 text-sm">
              <button onClick={() => open(member)} className="text-accent">Edit</button>
              <button onClick={() => remove(member._id)} className="text-red-400">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {editing !== null && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 p-5">
          <form onSubmit={save} className="mx-auto max-w-2xl rounded-lg border border-white/10 bg-surface p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-3xl font-bold">Team Member</h2>
              <button type="button" onClick={() => setEditing(null)}>Close</button>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Input label="Name" value={form.name} onChange={(value) => setForm({ ...form, name: value })} required />
              <Input label="Role" value={form.role} onChange={(value) => setForm({ ...form, role: value })} required />
              <Input label="Instagram URL" value={form.instagram || ''} onChange={(value) => setForm({ ...form, instagram: value })} />
              <Input label="LinkedIn URL" value={form.linkedin || ''} onChange={(value) => setForm({ ...form, linkedin: value })} />
              <Input label="Order" type="number" value={form.order || 0} onChange={(value) => setForm({ ...form, order: value })} />
              <label className="flex items-center gap-2 rounded-lg border border-white/10 bg-base p-3 text-sm text-muted">
                <input type="checkbox" checked={!!form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
                Show on website
              </label>
            </div>
            <textarea placeholder="Short bio" value={form.bio || ''} onChange={(e) => setForm({ ...form, bio: e.target.value })} className="mt-4 min-h-32 w-full rounded-lg border border-white/10 bg-base p-3 outline-none focus:border-accent" />
            <input type="file" className="mt-4" onChange={(e) => setPhoto(e.target.files[0])} />
            <button className="btn btn-accent mt-6">Save Member</button>
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
      <input required={required} type={type} value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-lg border border-white/10 bg-base p-3 outline-none focus:border-accent" />
    </label>
  );
}
