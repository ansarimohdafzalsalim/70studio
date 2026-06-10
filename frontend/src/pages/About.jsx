import { Instagram } from 'lucide-react';
import { useEffect, useState } from 'react';
import { api, assetFallback } from '../api.js';
import { faqs } from '../data.js';
import useSettings, { instagramHref } from '../hooks/useSettings.js';

export default function About() {
  const settings = useSettings();
  const [team, setTeam] = useState([]);
  const [stories, setStories] = useState([]);
  useEffect(() => {
    api('/team').then(setTeam).catch(() => {});
    api('/stories').then(setStories).catch(() => {});
  }, []);
  return (
    <section className="container-pad pt-28 pb-16">
      <h1 className="max-w-5xl font-display text-5xl font-bold leading-none sm:text-8xl">A Mumbai studio for brands with a point of view.</h1>
      <p className="mt-8 max-w-3xl text-lg leading-8 text-muted">70studio believes design should reduce noise, sharpen decisions, and make digital products easier to trust. We work across identity, web, apps, AI interfaces, and development.</p>
      <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:items-center">
        <img src={settings?.founderPhoto || assetFallback} alt="Mohd Afzal Salim Ansari" className="aspect-[4/5] w-full rounded-lg object-cover" />
        <div>
          <div className="text-sm uppercase text-accent">Founder</div>
          <h2 className="mt-3 font-display text-4xl font-bold">{settings?.founderName || 'Mohd Afzal Salim Ansari'}</h2>
          <p className="mt-6 text-lg leading-8 text-muted">{settings?.founderBio || 'Mohd Afzal Salim Ansari leads 70studio with a focus on modern brand systems, product interfaces, and AI-assisted digital experiences for ambitious teams.'}</p>
          <a href={instagramHref(settings.instagram)} className="btn btn-ghost mt-8"><Instagram size={18} /> {settings.instagram || '@70studio.ai'}</a>
        </div>
      </div>
      <div className="mt-16">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="text-sm uppercase text-accent">Team</div>
            <h2 className="mt-3 font-display text-4xl font-bold sm:text-6xl">People behind the work</h2>
          </div>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {team.map((member) => (
            <div key={member._id} className="rounded-lg border border-white/10 bg-surface p-4">
              <img src={member.photo || assetFallback} alt={member.name} className="aspect-[4/3] w-full rounded-lg object-cover" />
              <h3 className="mt-5 font-display text-2xl font-bold">{member.name}</h3>
              <p className="mt-1 text-sm text-accent">{member.role}</p>
              <p className="mt-4 text-sm leading-6 text-muted">{member.bio}</p>
              <div className="mt-5 flex gap-4 text-sm text-muted">
                {member.instagram && <a href={member.instagram}>Instagram</a>}
                {member.linkedin && <a href={member.linkedin}>LinkedIn</a>}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-14 grid gap-5 md:grid-cols-4">{['Clarity before style', 'Systems over one-offs', 'Motion with restraint', 'Business goals visible'].map((v, i) => <div key={v} className="rounded-lg border border-white/10 bg-surface p-6"><div className="text-accent">0{i + 1}</div><h3 className="mt-8 font-display text-xl font-bold">{v}</h3></div>)}</div>
      {stories.length > 0 && (
        <div className="mt-16 border-y border-white/10 py-10">
          <div className="text-sm uppercase text-accent">Stories</div>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-6xl">How 70studio is being built</h2>
          <div className="mt-8 grid gap-0">
            {stories.map((story) => (
              <div key={story._id} className="grid gap-5 border-t border-white/10 py-7 md:grid-cols-[140px_1fr]">
                <div className="font-display text-2xl font-bold text-accent">{story.year || 'Now'}</div>
                <div>
                  <h3 className="font-display text-2xl font-bold">{story.title}</h3>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">{story.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="mt-14 grid gap-4 md:grid-cols-2">
        {faqs.slice(0, 2).map((faq) => <div key={faq.question} className="rounded-lg border border-white/10 bg-surface p-6"><h3 className="font-display text-xl font-bold">{faq.question}</h3><p className="mt-3 text-sm leading-6 text-muted">{faq.question === 'Where is the studio based?' ? `70studio is based in ${settings.address}, and works with clients remotely across India and beyond.` : faq.answer}</p></div>)}
      </div>
      <div className="mt-14 border-t border-white/10 pt-8"><div className="text-sm uppercase text-muted">Studio location</div><h2 className="mt-3 font-display text-4xl font-bold">{settings.address}</h2></div>
    </section>
  );
}
