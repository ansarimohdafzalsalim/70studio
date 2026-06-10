import { ChevronUp, Dribbble, Instagram, Linkedin, X } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { api } from '../api.js';
import useSettings, { instagramHref, phoneHref } from '../hooks/useSettings.js';

export default function Footer() {
  const settings = useSettings();
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [details, setDetails] = useState({ name: '', interests: ['Newsletter', 'Offers'] });

  const toggleInterest = (interest) => {
    setDetails((current) => ({
      ...current,
      interests: current.interests.includes(interest)
        ? current.interests.filter((item) => item !== interest)
        : [...current.interests, interest]
    }));
  };

  const requestDetails = (event) => {
    event.preventDefault();
    setOpen(true);
  };

  const subscribe = async (event) => {
    event.preventDefault();
    try {
      await api('/subscribe', {
        method: 'POST',
        body: JSON.stringify({ email, name: details.name, source: 'Floating Footer', interests: details.interests })
      });
      toast.success('Subscribed for updates and offers.');
      setEmail('');
      setDetails({ name: '', interests: ['Newsletter', 'Offers'] });
      setOpen(false);
      setDetailsOpen(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      {detailsOpen && (
        <div className="theme-glass fixed bottom-24 left-1/2 z-[85] w-[min(92vw,760px)] -translate-x-1/2 rounded-lg border border-ink/10 bg-base/95 p-5 shadow-2xl shadow-black/50 backdrop-blur-xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Link to="/" className="font-display text-2xl font-bold"><span className="text-accent">70</span>studio</Link>
              <p className="mt-2 max-w-lg text-sm leading-6 text-muted">Design and AI agency in Mumbai shaping sharper brands, web experiences, and intelligent products.</p>
            </div>
            <button type="button" onClick={() => setDetailsOpen(false)} aria-label="Close footer details" className="text-muted hover:text-ink"><X size={18} /></button>
          </div>
          <div className="mt-5 grid gap-6 md:grid-cols-3">
            <div>
              <div className="font-display font-bold">Navigate</div>
              <div className="mt-3 grid gap-2 text-sm text-muted">
                <Link to="/services">Services</Link><Link to="/work">Work</Link><Link to="/about">About</Link><Link to="/contact">Contact</Link>
              </div>
            </div>
            <div>
              <div className="font-display font-bold">Contact</div>
              <div className="mt-3 grid gap-2 text-sm text-muted">
                <a href={`mailto:${settings.email}`}>{settings.email}</a>
                <a href={phoneHref(settings.phone)}>{settings.phone}</a>
                <span>{settings.address}</span>
              </div>
            </div>
            <div>
              <div className="font-display font-bold">Newsletter</div>
              <form onSubmit={requestDetails} className="mt-3 flex overflow-hidden rounded-full border border-ink/10 bg-surface">
                <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm outline-none" />
                <button className="bg-accent px-4 text-sm font-semibold text-white">Next</button>
              </form>
            </div>
          </div>
        </div>
      )}

      <footer className="fixed bottom-5 left-1/2 z-[80] w-[min(92vw,860px)] -translate-x-1/2">
        <div className="theme-glass flex items-center justify-between gap-4 rounded-full border border-ink/10 bg-base/85 px-4 py-3 shadow-2xl shadow-black/40 backdrop-blur-xl">
          <Link to="/" className="shrink-0 font-display text-lg font-bold"><span className="text-accent">70</span>studio</Link>
          <div className="hidden items-center gap-5 text-sm text-muted md:flex">
            <Link to="/services">Services</Link>
            <Link to="/work">Work</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="flex items-center gap-3">
            <a aria-label="Instagram" href={instagramHref(settings.instagram)} className="text-muted hover:text-ink"><Instagram size={17} /></a>
            <a aria-label="Dribbble" href="https://dribbble.com" className="hidden text-muted hover:text-ink sm:block"><Dribbble size={17} /></a>
            <a aria-label="LinkedIn" href="https://linkedin.com" className="hidden text-muted hover:text-ink sm:block"><Linkedin size={17} /></a>
            <button type="button" onClick={() => setDetailsOpen((value) => !value)} className="inline-flex items-center gap-1 rounded-full bg-ink/5 px-3 py-2 text-xs text-muted hover:text-ink">
              More <ChevronUp size={14} className={`transition ${detailsOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
        <div className="mt-2 text-center text-[10px] text-muted">© 2026 70studio · All rights reserved</div>
      </footer>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-5">
          <form onSubmit={subscribe} className="w-full max-w-md rounded-lg border border-ink/10 bg-surface p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-3xl font-bold">Almost in.</h2>
                <p className="mt-2 text-sm leading-6 text-muted">Tell us what you want to receive from 70studio.</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="text-sm text-muted hover:text-ink">Close</button>
            </div>
            <label className="mt-6 block">
              <span className="text-sm text-muted">Name</span>
              <input value={details.name} onChange={(event) => setDetails({ ...details, name: event.target.value })} placeholder="Your name" className="mt-2 w-full rounded-lg border border-ink/10 bg-base p-3 text-sm outline-none focus:border-accent" />
            </label>
            <div className="mt-5">
              <div className="text-sm text-muted">I’m interested in</div>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {['Newsletter', 'Offers', 'Case Studies', 'AI Ideas'].map((interest) => (
                  <label key={interest} className="flex items-center gap-2 rounded-lg border border-ink/10 bg-base p-3 text-sm text-muted">
                    <input type="checkbox" checked={details.interests.includes(interest)} onChange={() => toggleInterest(interest)} />
                    {interest}
                  </label>
                ))}
              </div>
            </div>
            <button className="btn btn-accent mt-6 w-full">Subscribe</button>
          </form>
        </div>
      )}
    </>
  );
}
