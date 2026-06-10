import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { api } from '../../api.js';
import { getServiceIcon, serviceIconOptions } from '../../serviceIcons.jsx';

const empty = { title: '', icon: 'Layout', category: '', description: '', deliverables: '', order: 0, isActive: true };

export default function ServicesAdmin() {
  const [services, setServices] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const load = () => api('/admin/services').then(setServices).catch((e) => toast.error(e.message));

  useEffect(() => {
    load();
  }, []);

  const open = (service = null) => {
    setEditing(service || {});
    setForm(service ? { ...service, deliverables: (service.deliverables || []).join(', ') } : empty);
  };

  const save = async (e) => {
    e.preventDefault();
    try {
      await api(editing?._id ? `/admin/services/${editing._id}` : '/admin/services', {
        method: editing?._id ? 'PUT' : 'POST',
        body: JSON.stringify(form)
      });
      toast.success('Service saved');
      setEditing(null);
      setForm(empty);
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const remove = async (id) => {
    if (!confirm('Delete this service?')) return;
    await api(`/admin/services/${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-4xl font-bold">Services</h1>
        <button onClick={() => open()} className="btn btn-accent">Add Service</button>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => {
          const Icon = getServiceIcon(service.icon);
          return (
            <div key={service._id} className="rounded-lg border border-white/10 bg-surface p-5">
              <div className="flex items-start justify-between gap-4">
                <Icon className="text-accent" size={28} />
                <span className={`rounded-full px-3 py-1 text-xs ${service.isActive ? 'bg-accent/20 text-accent' : 'bg-white/10 text-muted'}`}>{service.isActive ? 'Active' : 'Hidden'}</span>
              </div>
              <h2 className="mt-8 font-display text-2xl font-bold">{service.title}</h2>
              <p className="mt-2 text-sm text-muted">{service.category}</p>
              <p className="mt-4 text-sm leading-6 text-muted">{service.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {(service.deliverables || []).map((item) => <span key={item} className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted">{item}</span>)}
              </div>
              <div className="mt-6 flex gap-4 text-sm">
                <button onClick={() => open(service)} className="text-accent">Edit</button>
                <button onClick={() => remove(service._id)} className="text-red-400">Delete</button>
              </div>
            </div>
          );
        })}
      </div>

      {editing !== null && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 p-5">
          <form onSubmit={save} className="mx-auto max-w-2xl rounded-lg border border-white/10 bg-surface p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-3xl font-bold">Service</h2>
              <button type="button" onClick={() => setEditing(null)}>Close</button>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Input label="Title" value={form.title} onChange={(value) => setForm({ ...form, title: value })} required />
              <Input label="Category" value={form.category || ''} onChange={(value) => setForm({ ...form, category: value })} />
              <label className="block">
                <span className="text-sm text-muted">Icon</span>
                <select value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="mt-2 w-full rounded-lg border border-white/10 bg-base p-3 outline-none focus:border-accent">
                  {serviceIconOptions.map((option) => <option key={option}>{option}</option>)}
                </select>
              </label>
              <Input label="Order" type="number" value={form.order || 0} onChange={(value) => setForm({ ...form, order: value })} />
              <label className="flex items-center gap-2 rounded-lg border border-white/10 bg-base p-3 text-sm text-muted">
                <input type="checkbox" checked={!!form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
                Show on website
              </label>
            </div>
            <textarea placeholder="Description" required value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} className="mt-4 min-h-28 w-full rounded-lg border border-white/10 bg-base p-3 outline-none focus:border-accent" />
            <textarea placeholder="Deliverables, comma separated" value={form.deliverables || ''} onChange={(e) => setForm({ ...form, deliverables: e.target.value })} className="mt-4 min-h-24 w-full rounded-lg border border-white/10 bg-base p-3 outline-none focus:border-accent" />
            <button className="btn btn-accent mt-6">Save Service</button>
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
