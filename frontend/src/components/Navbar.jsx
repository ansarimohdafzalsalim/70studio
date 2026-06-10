import { Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const links = [
  ['Services', '/services'],
  ['Work', '/work'],
  ['About', '/about'],
  ['Contact', '/contact']
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    return localStorage.getItem('70studio-theme') || document.documentElement.dataset.theme || 'dark';
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('70studio-theme', theme);
  }, [theme]);

  const isLight = theme === 'light';
  const toggleTheme = () => setTheme((value) => (value === 'light' ? 'dark' : 'light'));

  return (
    <header className={`fixed left-0 top-0 z-50 w-full transition ${scrolled ? 'border-b border-ink/10 bg-base/75 backdrop-blur-xl' : 'bg-transparent'}`}>
      <nav className="container-pad flex h-20 items-center justify-between">
        <Link to="/" className="font-display text-2xl font-bold tracking-normal">
          <span className="text-accent">70</span><span>studio</span>
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {links.map(([label, href]) => (
            <NavLink key={href} to={href} className={({ isActive }) => `text-sm transition hover:text-ink ${isActive ? 'text-ink' : 'text-muted'}`}>{label}</NavLink>
          ))}
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-surface/70 text-ink transition hover:border-accent hover:text-accent"
            aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
            title={isLight ? 'Dark mode' : 'Light mode'}
          >
            {isLight ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <Link to="/contact" className="btn btn-accent">Start a Project</Link>
        </div>
        <div className="flex items-center gap-3 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-surface/70 text-ink"
            aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {isLight ? <Moon size={17} /> : <Sun size={17} />}
          </button>
          <button onClick={() => setOpen(true)} aria-label="Open menu"><Menu /></button>
        </div>
      </nav>
      {open && (
        <div className="fixed inset-0 z-[60] bg-base p-6 md:hidden">
          <div className="flex items-center justify-between">
            <Link to="/" onClick={() => setOpen(false)} className="font-display text-2xl font-bold"><span className="text-accent">70</span>studio</Link>
            <button onClick={() => setOpen(false)} aria-label="Close menu"><X /></button>
          </div>
          <div className="mt-16 flex flex-col gap-7">
            {links.map(([label, href]) => (
              <Link key={href} to={href} onClick={() => setOpen(false)} className="font-display text-4xl font-bold">{label}</Link>
            ))}
            <button onClick={toggleTheme} className="mt-4 inline-flex w-fit items-center gap-3 rounded-full border border-ink/10 px-5 py-3 text-sm font-semibold text-ink">
              {isLight ? <Moon size={18} /> : <Sun size={18} />}
              {isLight ? 'Dark mode' : 'Light mode'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
