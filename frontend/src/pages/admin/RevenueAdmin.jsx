import { CheckCircle2, IndianRupee, Plus, RefreshCw, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { api } from '../../api.js';

const empty = {
  clientName: '',
  projectName: '',
  service: '',
  amount: '',
  currency: 'INR',
  status: 'Pending',
  paymentMethod: 'Bank Transfer',
  invoiceNumber: '',
  invoiceDate: '',
  dueDate: '',
  paidDate: '',
  taxAmount: 0,
  platformFee: 0,
  notes: ''
};

const statuses = ['All', 'Paid', 'Pending', 'Overdue', 'Refunded', 'Cancelled'];
const paymentMethods = ['UPI', 'Bank Transfer', 'Cash', 'Card', 'PayPal', 'Other'];

export default function RevenueAdmin() {
  const [records, setRecords] = useState([]);
  const [summary, setSummary] = useState({});
  const [filter, setFilter] = useState('All');
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const data = await api(`/admin/revenue${filter !== 'All' ? `?status=${encodeURIComponent(filter)}` : ''}`);
      setRecords(data.records || []);
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

  const open = (record = null) => {
    setEditing(record || {});
    setForm(record ? toForm(record) : empty);
  };

  const save = async (e) => {
    e.preventDefault();
    try {
      await api(editing?._id ? `/admin/revenue/${editing._id}` : '/admin/revenue', {
        method: editing?._id ? 'PUT' : 'POST',
        body: JSON.stringify(form)
      });
      toast.success('Revenue record saved');
      setEditing(null);
      setForm(empty);
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const markPaid = async (record) => {
    try {
      await api(`/admin/revenue/${record._id}`, {
        method: 'PUT',
        body: JSON.stringify({ ...record, status: 'Paid', paidDate: new Date().toISOString().slice(0, 10) })
      });
      toast.success('Marked as paid');
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const remove = async (id) => {
    if (!confirm('Delete this revenue record?')) return;
    await api(`/admin/revenue/${id}`, { method: 'DELETE' });
    toast.success('Revenue record deleted');
    load();
  };

  const projected = useMemo(() => (summary.totalPaid || 0) + (summary.totalPending || 0), [summary]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-bold">Revenue</h1>
          <p className="mt-2 text-sm text-muted">Track invoices, payments, pending revenue, refunds, tax, and net income.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={load} className="btn btn-ghost"><RefreshCw size={16} /> Refresh</button>
          <button onClick={() => open()} className="btn btn-accent"><Plus size={16} /> Add Revenue</button>
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        <Stat label="Paid" value={money(summary.totalPaid)} />
        <Stat label="Pending" value={money(summary.totalPending)} />
        <Stat label="Projected" value={money(projected)} />
        <Stat label="Net Revenue" value={money(summary.netRevenue)} />
        <Stat label="Records" value={summary.count || 0} />
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {statuses.map((status) => (
          <button key={status} onClick={() => setFilter(status)} className={`rounded-full border px-4 py-2 text-sm ${filter === status ? 'border-accent bg-accent text-white' : 'border-white/15 text-muted'}`}>{status}</button>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border border-white/10">
        <table className="w-full min-w-[1100px] text-left text-sm">
          <thead className="bg-white/5 text-muted">
            <tr>
              <th className="p-4">Client</th>
              <th>Project</th>
              <th>Service</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Invoice</th>
              <th>Due</th>
              <th>Paid</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td className="p-4 text-muted" colSpan="9">Loading revenue...</td></tr>}
            {!loading && records.length === 0 && <tr><td className="p-8 text-center text-muted" colSpan="9">No revenue records found.</td></tr>}
            {!loading && records.map((record) => (
              <tr key={record._id} className="border-t border-white/10">
                <td className="p-4 font-medium">{record.clientName}</td>
                <td>{record.projectName}</td>
                <td className="text-muted">{record.service}</td>
                <td>{money(record.amount, record.currency)}</td>
                <td><span className={statusClass(record.status)}>{record.status}</span></td>
                <td>{record.invoiceNumber || '-'}</td>
                <td>{date(record.dueDate)}</td>
                <td>{date(record.paidDate)}</td>
                <td>
                  <button onClick={() => open(record)} className="mr-3 text-accent">Edit</button>
                  {record.status !== 'Paid' && <button onClick={() => markPaid(record)} className="mr-3 inline-flex items-center gap-1 text-emerald-400"><CheckCircle2 size={14} /> Paid</button>}
                  <button onClick={() => remove(record._id)} className="inline-flex items-center gap-1 text-red-400"><Trash2 size={14} /> Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing !== null && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 p-5">
          <form onSubmit={save} className="mx-auto max-w-4xl rounded-lg border border-white/10 bg-surface p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-3xl font-bold">Revenue Record</h2>
              <button type="button" onClick={() => setEditing(null)}>Close</button>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <Input label="Client Name" value={form.clientName} onChange={(value) => setForm({ ...form, clientName: value })} required />
              <Input label="Project Name" value={form.projectName} onChange={(value) => setForm({ ...form, projectName: value })} required />
              <Input label="Service" value={form.service} onChange={(value) => setForm({ ...form, service: value })} />
              <Input label="Amount" type="number" value={form.amount} onChange={(value) => setForm({ ...form, amount: value })} required />
              <Input label="Currency" value={form.currency} onChange={(value) => setForm({ ...form, currency: value })} />
              <Select label="Status" value={form.status} onChange={(value) => setForm({ ...form, status: value })} options={statuses.filter((item) => item !== 'All')} />
              <Select label="Payment Method" value={form.paymentMethod} onChange={(value) => setForm({ ...form, paymentMethod: value })} options={paymentMethods} />
              <Input label="Invoice Number" value={form.invoiceNumber} onChange={(value) => setForm({ ...form, invoiceNumber: value })} />
              <Input label="Invoice Date" type="date" value={form.invoiceDate} onChange={(value) => setForm({ ...form, invoiceDate: value })} />
              <Input label="Due Date" type="date" value={form.dueDate} onChange={(value) => setForm({ ...form, dueDate: value })} />
              <Input label="Paid Date" type="date" value={form.paidDate} onChange={(value) => setForm({ ...form, paidDate: value })} />
              <Input label="Tax Amount" type="number" value={form.taxAmount} onChange={(value) => setForm({ ...form, taxAmount: value })} />
              <Input label="Platform Fee" type="number" value={form.platformFee} onChange={(value) => setForm({ ...form, platformFee: value })} />
            </div>
            <textarea placeholder="Notes" value={form.notes || ''} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="mt-4 min-h-28 w-full rounded-lg border border-white/10 bg-base p-3 outline-none focus:border-accent" />
            <button className="btn btn-accent mt-6"><IndianRupee size={16} /> Save Revenue</button>
          </form>
        </div>
      )}
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

function money(value = 0, currency = 'INR') {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency, maximumFractionDigits: 0 }).format(Number(value) || 0);
}

function date(value) {
  return value ? new Date(value).toLocaleDateString() : '-';
}

function toForm(record) {
  const pickDate = (value) => value ? new Date(value).toISOString().slice(0, 10) : '';
  return { ...record, invoiceDate: pickDate(record.invoiceDate), dueDate: pickDate(record.dueDate), paidDate: pickDate(record.paidDate) };
}

function statusClass(status) {
  const base = 'rounded-full px-3 py-1 text-xs ';
  if (status === 'Paid') return `${base}bg-emerald-500/15 text-emerald-300`;
  if (status === 'Pending') return `${base}bg-yellow-500/15 text-yellow-300`;
  if (status === 'Overdue') return `${base}bg-red-500/15 text-red-300`;
  if (status === 'Refunded') return `${base}bg-blue-500/15 text-blue-300`;
  return `${base}bg-white/10 text-muted`;
}
