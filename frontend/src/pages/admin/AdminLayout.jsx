import { LogOut } from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const links = [['Dashboard', '/admin/dashboard'], ['Clients', '/admin/clients'], ['Revenue', '/admin/revenue'], ['Services', '/admin/services'], ['Projects', '/admin/projects'], ['Team', '/admin/team'], ['Stories', '/admin/stories'], ['Newsletter', '/admin/subscribers'], ['Messages', '/admin/messages'], ['Settings', '/admin/settings']];

export default function AdminLayout() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };
  return (
    <div className="min-h-screen bg-base text-ink">
      <aside className="fixed left-0 top-0 hidden h-full w-64 border-r border-white/10 bg-surface p-6 md:block">
        <div className="font-display text-2xl font-bold"><span className="text-accent">70</span>admin</div>
        <nav className="mt-10 grid gap-2">
          {links.map(([label, href]) => <NavLink key={href} to={href} className={({ isActive }) => `rounded-lg px-4 py-3 text-sm ${isActive ? 'bg-accent text-white' : 'text-muted hover:bg-white/5'}`}>{label}</NavLink>)}
          <button onClick={logout} className="mt-4 flex items-center gap-2 rounded-lg px-4 py-3 text-left text-sm text-muted hover:bg-white/5"><LogOut size={16} /> Logout</button>
        </nav>
      </aside>
      <header className="fixed left-0 top-0 z-40 w-full border-b border-white/10 bg-base/90 px-4 py-3 backdrop-blur md:hidden">
        <div className="font-display text-xl font-bold"><span className="text-accent">70</span>admin</div>
        <nav className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {links.map(([label, href]) => (
            <NavLink key={href} to={href} className={({ isActive }) => `shrink-0 rounded-full px-3 py-2 text-xs ${isActive ? 'bg-accent text-white' : 'bg-white/5 text-muted'}`}>{label}</NavLink>
          ))}
          <button onClick={logout} className="shrink-0 rounded-full bg-white/5 px-3 py-2 text-xs text-muted">Logout</button>
        </nav>
      </header>
      <main className="p-5 pt-24 md:ml-64 md:p-8"><Outlet /></main>
    </div>
  );
}
