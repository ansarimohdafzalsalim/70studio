import { Mail, Phone, RefreshCw, Trash2, UserPlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { api } from '../../api.js';

export default function MessagesAdmin() {
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      setMessages(await api('/admin/messages'));
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const toggleRead = async (message) => {
    try {
      await api(`/admin/messages/${message._id}/read`, {
        method: 'PUT',
        body: JSON.stringify({ isRead: !message.isRead })
      });
      setMessages((items) => items.map((item) => item._id === message._id ? { ...item, isRead: !message.isRead } : item));
    } catch (err) {
      toast.error(err.message);
    }
  };

  const remove = async (id) => {
    if (!confirm('Delete this message?')) return;
    try {
      await api(`/admin/messages/${id}`, { method: 'DELETE' });
      setMessages((items) => items.filter((item) => item._id !== id));
      if (open === id) setOpen(null);
      toast.success('Message deleted');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const convertToClient = async (message) => {
    try {
      await api('/admin/clients', {
        method: 'POST',
        body: JSON.stringify({
          name: message.name,
          email: message.email,
          phone: message.phone,
          service: message.service,
          budget: message.budget,
          step: 'Lead',
          priority: 'Medium',
          projectTitle: `${message.service || 'New'} enquiry`,
          projectBrief: message.brief,
          source: 'Contact form',
          nextAction: 'Schedule discovery call',
          notes: `Converted from message submitted ${new Date(message.createdAt).toLocaleString()}`
        })
      });
      if (!message.isRead) await api(`/admin/messages/${message._id}/read`, { method: 'PUT', body: JSON.stringify({ isRead: true }) });
      toast.success('Lead converted to client');
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const unreadCount = messages.filter((message) => !message.isRead).length;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-bold">Messages</h1>
          <p className="mt-2 text-sm text-muted">{unreadCount} unread · {messages.length} total</p>
        </div>
        <button onClick={load} className="btn btn-ghost"><RefreshCw size={16} /> Refresh</button>
      </div>

      <div className="mt-8 overflow-hidden rounded-lg border border-white/10">
        <div className="hidden grid-cols-[1fr_1fr_1fr_.8fr_.8fr_.7fr_1fr] gap-3 bg-white/5 px-4 py-3 text-xs uppercase text-muted lg:grid">
          <span>Name</span>
          <span>Email</span>
          <span>Phone</span>
          <span>Service</span>
          <span>Budget</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {loading && <div className="p-6 text-sm text-muted">Loading messages...</div>}

        {!loading && messages.length === 0 && (
          <div className="p-8 text-center">
            <h2 className="font-display text-2xl font-bold">No messages yet</h2>
            <p className="mt-2 text-sm text-muted">Contact form submissions will appear here.</p>
          </div>
        )}

        {!loading && messages.map((message) => (
          <div key={message._id} className="border-t border-white/10">
            <div className="grid gap-3 p-4 text-sm lg:grid-cols-[1fr_1fr_1fr_.8fr_.8fr_.7fr_1fr] lg:items-center">
              <button onClick={() => setOpen(open === message._id ? null : message._id)} className="text-left font-medium hover:text-accent">{message.name}</button>
              <a className="text-muted hover:text-white" href={`mailto:${message.email}`}>{message.email}</a>
              <a className="text-muted hover:text-white" href={message.phone ? `tel:${message.phone}` : undefined}>{message.phone || 'No phone'}</a>
              <span>{message.service || 'Not selected'}</span>
              <span>{message.budget || 'Not selected'}</span>
              <span className={message.isRead ? 'text-muted' : 'text-accent'}>{message.isRead ? 'Read' : 'Unread'}</span>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => convertToClient(message)} className="inline-flex items-center gap-1 text-emerald-400"><UserPlus size={14} /> Client</button>
                <button onClick={() => toggleRead(message)} className="text-accent">{message.isRead ? 'Mark unread' : 'Mark read'}</button>
                <button onClick={() => remove(message._id)} className="inline-flex items-center gap-1 text-red-400"><Trash2 size={14} /> Delete</button>
              </div>
            </div>

            {open === message._id && (
              <div className="mx-4 mb-4 rounded-lg bg-base p-5">
                <div className="flex flex-wrap gap-3 text-sm">
                  <a href={`mailto:${message.email}`} className="btn btn-ghost py-2"><Mail size={16} /> Email</a>
                  {message.phone && <a href={`tel:${message.phone}`} className="btn btn-ghost py-2"><Phone size={16} /> Call</a>}
                  <button onClick={() => convertToClient(message)} className="btn btn-accent py-2"><UserPlus size={16} /> Convert to Client</button>
                </div>
                <div className="mt-5 text-xs uppercase text-muted">Project brief</div>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-muted">{message.brief}</p>
                <div className="mt-5 text-xs text-muted">Submitted {new Date(message.createdAt).toLocaleString()}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
