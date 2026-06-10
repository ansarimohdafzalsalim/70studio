import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { api } from '../api.js';
import { services } from '../data.js';
import useSettings, { instagramHref, phoneHref } from '../hooks/useSettings.js';

export default function Contact() {
  const initialForm = { name: '', email: '', phone: '', service: 'Web Design', budget: '₹50k - ₹1L', brief: '' };
  const [form, setForm] = useState(initialForm);
  const [serviceOptions, setServiceOptions] = useState(services.map((service) => service.title));
  const settings = useSettings();
  useEffect(() => {
    api('/services').then((data) => {
      if (data.length) setServiceOptions(data.map((service) => service.title));
    }).catch(() => {});
  }, []);
  const submit = async (e) => {
    e.preventDefault();
    try {
      await api('/contact', { method: 'POST', body: JSON.stringify(form) });
      toast.success('Message sent. We will get back to you soon.');
      setForm(initialForm);
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <section className="container-pad grid min-h-screen gap-10 pt-28 pb-16 lg:grid-cols-[.8fr_1.2fr]">
      <div>
        <h1 className="font-display text-6xl font-bold sm:text-8xl">Start a project</h1>
        <div className="mt-10 grid gap-4 text-muted">
          <a href={`mailto:${settings.email}`}>{settings.email}</a>
          <a href={phoneHref(settings.phone)}>{settings.phone}</a>
          <span>{settings.address}</span>
          <a href={instagramHref(settings.instagram)}>{settings.instagram}</a>
        </div>
      </div>
      <form onSubmit={submit} className="rounded-lg border border-white/10 bg-surface p-6">
        <Field label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
        <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
        <Field label="Contact Number" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} required />
        <Select label="Service" value={form.service} onChange={(v) => setForm({ ...form, service: v })} options={serviceOptions} />
        <Select label="Budget" value={form.budget} onChange={(v) => setForm({ ...form, budget: v })} options={['₹50k - ₹1L', '₹1L - ₹3L', '₹3L - ₹8L', '₹8L+']} />
        <label className="mb-5 block"><span className="text-sm text-muted">Project Brief</span><textarea required value={form.brief} onChange={(e) => setForm({ ...form, brief: e.target.value })} className="mt-2 min-h-40 w-full rounded-lg border border-white/10 bg-base p-4 outline-none focus:border-accent" /></label>
        <button className="btn btn-accent w-full">Send Message</button>
      </form>
    </section>
  );
}

function Field({ label, value, onChange, type = 'text', required }) {
  return <label className="mb-5 block"><span className="text-sm text-muted">{label}</span><input required={required} type={type} value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-lg border border-white/10 bg-base p-4 outline-none focus:border-accent" /></label>;
}

function Select({ label, value, onChange, options }) {
  return <label className="mb-5 block"><span className="text-sm text-muted">{label}</span><select value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-lg border border-white/10 bg-base p-4 outline-none focus:border-accent">{options.map((o) => <option key={o}>{o}</option>)}</select></label>;
}
