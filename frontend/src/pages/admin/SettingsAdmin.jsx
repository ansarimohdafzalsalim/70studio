import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { api } from '../../api.js';

export default function SettingsAdmin() {
  const [form, setForm] = useState({});
  const [heroCardsText, setHeroCardsText] = useState('');
  const [photo, setPhoto] = useState(null);
  useEffect(() => {
    api('/admin/settings').then((data) => {
      setForm(data);
      setHeroCardsText((data.heroCards || []).map((card) => `${card.value} | ${card.label}`).join('\n'));
    }).catch(() => {});
  }, []);
  const save = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      if (k !== 'heroCards') fd.append(k, v || '');
    });
    const heroCards = heroCardsText.split('\n').map((line) => {
      const [value, label] = line.split('|').map((item) => item?.trim());
      return value && label ? { value, label } : null;
    }).filter(Boolean);
    fd.append('heroCards', JSON.stringify(heroCards));
    if (photo) fd.append('founderPhoto', photo);
    try { setForm(await api('/admin/settings', { method: 'PUT', body: fd })); toast.success('Settings saved'); } catch (err) { toast.error(err.message); }
  };
  return (
    <form onSubmit={save} className="max-w-3xl">
      <h1 className="font-display text-4xl font-bold">Settings</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {['founderName', 'email', 'phone', 'instagram', 'address', 'metaTitle', 'metaDescription'].map((k) => <input key={k} placeholder={k} value={form[k] || ''} onChange={(e) => setForm({ ...form, [k]: e.target.value })} className="rounded-lg border border-white/10 bg-surface p-4 outline-none focus:border-accent" />)}
      </div>
      <textarea placeholder="Founder Bio" value={form.founderBio || ''} onChange={(e) => setForm({ ...form, founderBio: e.target.value })} className="mt-4 min-h-40 w-full rounded-lg border border-white/10 bg-surface p-4 outline-none focus:border-accent" />
      <label className="mt-4 block">
        <span className="text-sm text-muted">Hero cards, one per line: value | label</span>
        <textarea placeholder={'70 | Brand\n70 | Product\n70 | AI'} value={heroCardsText} onChange={(e) => setHeroCardsText(e.target.value)} className="mt-2 min-h-28 w-full rounded-lg border border-white/10 bg-surface p-4 outline-none focus:border-accent" />
      </label>
      <input type="file" className="mt-4" onChange={(e) => setPhoto(e.target.files[0])} />
      <button className="btn btn-accent mt-6">Save Settings</button>
    </form>
  );
}
