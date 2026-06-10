import { RefreshCw, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { api } from '../../api.js';

export default function SubscribersAdmin() {
  const [subscribers, setSubscribers] = useState([]);
  const [status, setStatus] = useState('all');
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      setSubscribers(await api(`/admin/subscribers${status !== 'all' ? `?status=${status}` : ''}`));
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [status]);

  const toggle = async (subscriber) => {
    try {
      await api(`/admin/subscribers/${subscriber._id}`, {
        method: 'PUT',
        body: JSON.stringify({ ...subscriber, isActive: !subscriber.isActive })
      });
      toast.success(subscriber.isActive ? 'Subscriber deactivated' : 'Subscriber activated');
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const remove = async (id) => {
    if (!confirm('Delete this subscriber?')) return;
    await api(`/admin/subscribers/${id}`, { method: 'DELETE' });
    toast.success('Subscriber deleted');
    load();
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-bold">Newsletter</h1>
          <p className="mt-2 text-sm text-muted">Emails collected for newsletters, launch updates, and offers.</p>
        </div>
        <button onClick={load} className="btn btn-ghost"><RefreshCw size={16} /> Refresh</button>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {['all', 'active', 'inactive'].map((item) => (
          <button key={item} onClick={() => setStatus(item)} className={`rounded-full border px-4 py-2 text-sm capitalize ${status === item ? 'border-accent bg-accent text-white' : 'border-white/15 text-muted'}`}>{item}</button>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border border-white/10">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-white/5 text-muted">
            <tr><th className="p-4">Email</th><th>Name</th><th>Source</th><th>Interests</th><th>Status</th><th>Date</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {loading && <tr><td className="p-4 text-muted" colSpan="7">Loading subscribers...</td></tr>}
            {!loading && subscribers.length === 0 && <tr><td className="p-8 text-center text-muted" colSpan="7">No subscribers yet.</td></tr>}
            {!loading && subscribers.map((subscriber) => (
              <tr key={subscriber._id} className="border-t border-white/10">
                <td className="p-4"><a href={`mailto:${subscriber.email}`} className="text-accent">{subscriber.email}</a></td>
                <td>{subscriber.name || '-'}</td>
                <td>{subscriber.source || '-'}</td>
                <td>{(subscriber.interests || []).join(', ') || '-'}</td>
                <td><span className={subscriber.isActive ? 'text-accent' : 'text-muted'}>{subscriber.isActive ? 'Active' : 'Inactive'}</span></td>
                <td>{new Date(subscriber.createdAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => toggle(subscriber)} className="mr-3 text-accent">{subscriber.isActive ? 'Deactivate' : 'Activate'}</button>
                  <button onClick={() => remove(subscriber._id)} className="inline-flex items-center gap-1 text-red-400"><Trash2 size={14} /> Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
