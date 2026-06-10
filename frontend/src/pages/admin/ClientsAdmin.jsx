import { ArrowLeft, ArrowRight, FolderPlus, Plus, RefreshCw, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { api } from '../../api.js';

const steps = ['All', 'Lead', 'Discovery', 'Proposal', 'Onboarding', 'Active', 'Review', 'Completed', 'Archived'];
const pipelineSteps = steps.filter((step) => step !== 'All');
const priorities = ['Low', 'Medium', 'High', 'Urgent'];
const empty = {
  name: '',
  company: '',
  email: '',
  phone: '',
  instagram: '',
  website: '',
  service: '',
  budget: '',
  step: 'Lead',
  priority: 'Medium',
  projectTitle: '',
  projectBrief: '',
  estimatedValue: 0,
  nextAction: '',
  nextFollowUpDate: '',
  source: '',
  notes: '',
  isArchived: false
};

export default function ClientsAdmin() {
  const [clients, setClients] = useState([]);
  const [boardClients, setBoardClients] = useState([]);
  const [summary, setSummary] = useState({});
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(true);

  const load = async (overrides = {}) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      const activeFilter = overrides.filter ?? filter;
      const activeSearch = overrides.search ?? search;
      if (activeFilter !== 'All') params.set('step', activeFilter);
      if (activeSearch) params.set('search', activeSearch);
      const [data, boardData] = await Promise.all([
        api(`/admin/clients${params.toString() ? `?${params}` : ''}`),
        api('/admin/clients')
      ]);
      setClients(data.clients || []);
      setBoardClients(boardData.clients || []);
      setSummary(data.summary || {});
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [filter]);

  const grouped = useMemo(() => {
    return pipelineSteps.reduce((acc, step) => ({ ...acc, [step]: boardClients.filter((client) => client.step === step) }), {});
  }, [boardClients]);

  const open = (client = null) => {
    setEditing(client || {});
    setForm(client ? toForm(client) : empty);
  };

  const save = async (e) => {
    e.preventDefault();
    try {
      await api(editing?._id ? `/admin/clients/${editing._id}` : '/admin/clients', {
        method: editing?._id ? 'PUT' : 'POST',
        body: JSON.stringify(form)
      });
      toast.success('Client saved');
      setEditing(null);
      setForm(empty);
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const moveStep = async (client, direction) => {
    const index = pipelineSteps.indexOf(client.step);
    const nextStep = pipelineSteps[Math.min(Math.max(index + direction, 0), pipelineSteps.length - 1)];
    if (!nextStep || nextStep === client.step) return;
    try {
      const archived = nextStep === 'Archived';
      await api(`/admin/clients/${client._id}`, {
        method: 'PUT',
        body: JSON.stringify({ ...client, step: nextStep, isArchived: archived })
      });
      toast.success(`Moved to ${nextStep}`);
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const remove = async (id) => {
    if (!confirm('Delete this client?')) return;
    try {
      await api(`/admin/clients/${id}`, { method: 'DELETE' });
      toast.success('Client deleted');
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const categoryFromService = (service = '') => {
    const text = service.toLowerCase();
    if (text.includes('brand')) return 'Branding';
    if (text.includes('app')) return 'Mobile App';
    if (text.includes('dashboard') || text.includes('development')) return 'Dashboard';
    if (text.includes('ai')) return 'AI/Tech';
    return 'Web Design';
  };

  const createProjectFromClient = async (client) => {
    try {
      await api('/admin/projects', {
        method: 'POST',
        body: JSON.stringify({
          title: client.projectTitle || `${client.company || client.name} Project`,
          category: categoryFromService(client.service),
          client: client.company || client.name,
          year: new Date().getFullYear(),
          services: client.service || '',
          description: `<p>${client.projectBrief || client.notes || 'Project created from client pipeline.'}</p>`,
          featured: false,
          order: 0
        })
      });
      await api(`/admin/clients/${client._id}`, {
        method: 'PUT',
        body: JSON.stringify({ ...client, step: client.step === 'Lead' || client.step === 'Proposal' ? 'Onboarding' : client.step, nextAction: 'Create project brief and kickoff assets' })
      });
      toast.success('Project created from client');
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const clearSearch = () => {
    setSearch('');
    load({ search: '' });
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-bold">Clients</h1>
          <p className="mt-2 text-sm text-muted">Step-wise client pipeline from first lead to completed project.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={load} className="btn btn-ghost"><RefreshCw size={16} /> Refresh</button>
          <button onClick={() => open()} className="btn btn-accent"><Plus size={16} /> Add Client</button>
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        <Stat label="Total Clients" value={summary.total || 0} />
        <Stat label="Active Pipeline" value={summary.active || 0} />
        <Stat label="Completed" value={summary.completed || 0} />
        <Stat label="Archived" value={summary.archived || 0} />
        <Stat label="Pipeline Value" value={money(summary.pipelineValue)} />
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_auto]">
        <input value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && load()} placeholder="Search by name, company, email, or project" className="rounded-lg border border-white/10 bg-surface p-3 outline-none focus:border-accent" />
        <div className="flex gap-3">
          <button onClick={load} className="btn btn-ghost">Search</button>
          {search && <button onClick={clearSearch} className="btn btn-ghost">Clear</button>}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        {steps.map((step) => (
          <button key={step} onClick={() => setFilter(step)} className={`rounded-full border px-4 py-2 text-sm ${filter === step ? 'border-accent bg-accent text-white' : 'border-white/15 text-muted'}`}>
            {step} {step !== 'All' && <span className="ml-1 text-xs opacity-70">{summary.byStep?.[step] || 0}</span>}
          </button>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <h2 className="font-display text-2xl font-bold">Pipeline board</h2>
        <p className="text-sm text-muted">Board always shows all clients. Filters below affect the table.</p>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-4">
        {pipelineSteps.slice(0, 4).map((step) => <StepColumn key={step} step={step} clients={grouped[step] || []} open={open} moveStep={moveStep} />)}
      </div>
      <div className="mt-4 grid gap-4 xl:grid-cols-4">
        {pipelineSteps.slice(4).map((step) => <StepColumn key={step} step={step} clients={grouped[step] || []} open={open} moveStep={moveStep} />)}
      </div>

      <div className="mt-8 overflow-x-auto rounded-lg border border-white/10">
        <table className="w-full min-w-[1100px] text-left text-sm">
          <thead className="bg-white/5 text-muted">
            <tr><th className="p-4">Client</th><th>Project</th><th>Step</th><th>Priority</th><th>Value</th><th>Next Action</th><th>Follow-up</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {loading && <tr><td className="p-4 text-muted" colSpan="8">Loading clients...</td></tr>}
            {!loading && clients.length === 0 && <tr><td className="p-8 text-center text-muted" colSpan="8">No clients found.</td></tr>}
            {!loading && clients.map((client) => (
              <tr key={client._id} className="border-t border-white/10">
                <td className="p-4"><div className="font-medium">{client.name}</div><div className="text-xs text-muted">{client.company || client.email}</div></td>
                <td>{client.projectTitle || '-'}</td>
                <td><span className="rounded-full bg-accent/15 px-3 py-1 text-xs text-accent">{client.step}</span></td>
                <td>{client.priority}</td>
                <td>{money(client.estimatedValue)}</td>
                <td>{client.nextAction || '-'}</td>
                <td>{date(client.nextFollowUpDate)}</td>
                <td>
                  <button onClick={() => open(client)} className="mr-3 text-accent">Edit</button>
                  <button onClick={() => createProjectFromClient(client)} className="mr-3 inline-flex items-center gap-1 text-emerald-400"><FolderPlus size={14} /> Project</button>
                  <button onClick={() => moveStep(client, -1)} className="mr-3 text-muted">Prev</button>
                  <button onClick={() => moveStep(client, 1)} className="mr-3 text-emerald-400">Next</button>
                  <button onClick={() => remove(client._id)} className="inline-flex items-center gap-1 text-red-400"><Trash2 size={14} /> Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing !== null && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 p-5">
          <form onSubmit={save} className="mx-auto max-w-5xl rounded-lg border border-white/10 bg-surface p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-3xl font-bold">Client Details</h2>
              <button type="button" onClick={() => setEditing(null)}>Close</button>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <Input label="Client Name" value={form.name} onChange={(value) => setForm({ ...form, name: value })} required />
              <Input label="Company" value={form.company} onChange={(value) => setForm({ ...form, company: value })} />
              <Input label="Email" type="email" value={form.email} onChange={(value) => setForm({ ...form, email: value })} required />
              <Input label="Phone" value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} />
              <Input label="Instagram" value={form.instagram} onChange={(value) => setForm({ ...form, instagram: value })} />
              <Input label="Website" value={form.website} onChange={(value) => setForm({ ...form, website: value })} />
              <Input label="Service" value={form.service} onChange={(value) => setForm({ ...form, service: value })} />
              <Input label="Budget" value={form.budget} onChange={(value) => setForm({ ...form, budget: value })} />
              <Input label="Project Title" value={form.projectTitle} onChange={(value) => setForm({ ...form, projectTitle: value })} />
              <Select label="Step" value={form.step} onChange={(value) => setForm({ ...form, step: value, isArchived: value === 'Archived' })} options={pipelineSteps} />
              <Select label="Priority" value={form.priority} onChange={(value) => setForm({ ...form, priority: value })} options={priorities} />
              <Input label="Estimated Value" type="number" value={form.estimatedValue} onChange={(value) => setForm({ ...form, estimatedValue: value })} />
              <Input label="Next Action" value={form.nextAction} onChange={(value) => setForm({ ...form, nextAction: value })} />
              <Input label="Next Follow-up" type="date" value={form.nextFollowUpDate} onChange={(value) => setForm({ ...form, nextFollowUpDate: value })} />
              <Input label="Source" value={form.source} onChange={(value) => setForm({ ...form, source: value })} />
              <label className="flex items-center gap-2 rounded-lg border border-white/10 bg-base p-3 text-sm text-muted">
                <input type="checkbox" checked={!!form.isArchived} onChange={(e) => setForm({ ...form, isArchived: e.target.checked, step: e.target.checked ? 'Archived' : form.step === 'Archived' ? 'Lead' : form.step })} />
                Archive client
              </label>
            </div>
            <textarea placeholder="Project brief" value={form.projectBrief || ''} onChange={(e) => setForm({ ...form, projectBrief: e.target.value })} className="mt-4 min-h-28 w-full rounded-lg border border-white/10 bg-base p-3 outline-none focus:border-accent" />
            <textarea placeholder="Internal notes" value={form.notes || ''} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="mt-4 min-h-24 w-full rounded-lg border border-white/10 bg-base p-3 outline-none focus:border-accent" />
            <button className="btn btn-accent mt-6">Save Client</button>
          </form>
        </div>
      )}
    </div>
  );
}

function StepColumn({ step, clients, open, moveStep }) {
  return (
    <div className="rounded-lg border border-white/10 bg-surface p-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-bold">{step}</h2>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-muted">{clients.length}</span>
      </div>
      <div className="mt-4 grid gap-3">
        {clients.slice(0, 4).map((client) => (
          <div key={client._id} className="rounded-lg bg-base p-3">
            <button onClick={() => open(client)} className="text-left font-medium hover:text-accent">{client.name}</button>
            <div className="mt-1 text-xs text-muted">{client.company || client.projectTitle}</div>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span>{money(client.estimatedValue)}</span>
              <div className="flex gap-2">
                <button onClick={() => moveStep(client, -1)} className="inline-flex items-center gap-1 text-muted"><ArrowLeft size={12} /> Prev</button>
                <button onClick={() => createProjectFromClient(client)} className="inline-flex items-center gap-1 text-emerald-400"><FolderPlus size={12} /> Project</button>
                <button onClick={() => moveStep(client, 1)} className="inline-flex items-center gap-1 text-accent">Next <ArrowRight size={12} /></button>
              </div>
            </div>
          </div>
        ))}
        {clients.length === 0 && <div className="rounded-lg border border-dashed border-white/10 p-4 text-sm text-muted">No clients</div>}
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return <div className="rounded-lg border border-white/10 bg-surface p-5"><div className="font-display text-3xl font-bold">{value}</div><div className="mt-2 text-sm text-muted">{label}</div></div>;
}

function Input({ label, value, onChange, type = 'text', required }) {
  return (
    <label className="block">
      <span className="text-sm text-muted">{label}</span>
      <input required={required} type={type} value={value || ''} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-lg border border-white/10 bg-base p-3 outline-none focus:border-accent" />
    </label>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <label className="block">
      <span className="text-sm text-muted">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-lg border border-white/10 bg-base p-3 outline-none focus:border-accent">
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}

function money(value = 0) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(value) || 0);
}

function date(value) {
  return value ? new Date(value).toLocaleDateString() : '-';
}

function toForm(client) {
  return { ...client, nextFollowUpDate: client.nextFollowUpDate ? new Date(client.nextFollowUpDate).toISOString().slice(0, 10) : '' };
}
