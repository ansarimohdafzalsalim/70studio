import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../api.js';

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [messages, setMessages] = useState([]);
  const [team, setTeam] = useState([]);
  const [revenue, setRevenue] = useState({});
  const [clients, setClients] = useState({});
  useEffect(() => {
    api('/admin/projects').then(setProjects).catch(() => {});
    api('/admin/services').then(setServices).catch(() => {});
    api('/admin/messages').then(setMessages).catch(() => {});
    api('/admin/team').then(setTeam).catch(() => {});
    api('/admin/revenue/summary').then(setRevenue).catch(() => {});
    api('/admin/clients/summary').then(setClients).catch(() => {});
  }, []);
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4"><h1 className="font-display text-4xl font-bold">Dashboard</h1><Link className="btn btn-accent" to="/admin/projects">Add Project</Link></div>
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <Stat label="Paid Revenue" value={money(revenue.totalPaid)} /><Stat label="Pending Revenue" value={money(revenue.totalPending)} /><Stat label="Client Pipeline" value={clients.active || 0} /><Stat label="Pipeline Value" value={money(clients.pipelineValue)} /><Stat label="Net Revenue" value={money(revenue.netRevenue)} /><Stat label="Total Projects" value={projects.length} /><Stat label="Services" value={services.length} /><Stat label="Unread Messages" value={messages.filter((m) => !m.isRead).length} /><Stat label="Team Members" value={team.length} />
      </div>
      <h2 className="mt-10 font-display text-2xl font-bold">Recent messages</h2>
      <div className="mt-4 overflow-hidden rounded-lg border border-white/10">{messages.slice(0, 5).map((m) => <div key={m._id} className="grid gap-2 border-b border-white/10 p-4 text-sm md:grid-cols-4"><span>{m.name}</span><span className="text-muted">{m.email}</span><span>{m.service}</span><span className={m.isRead ? 'text-muted' : 'text-accent'}>{m.isRead ? 'Read' : 'Unread'}</span></div>)}</div>
    </div>
  );
}

function Stat({ label, value }) {
  return <div className="rounded-lg border border-white/10 bg-surface p-6"><div className="font-display text-3xl font-bold">{value}</div><div className="mt-2 text-sm text-muted">{label}</div></div>;
}

function money(value = 0) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(value) || 0);
}
