import { MessageCircle } from 'lucide-react';
import useSettings, { whatsAppHref } from '../hooks/useSettings.js';

export default function WhatsAppButton() {
  const settings = useSettings();
  return (
    <a
      href={whatsAppHref(settings.phone)}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-ink/10 bg-accent text-white shadow-2xl shadow-black/40 transition hover:-translate-y-1 hover:bg-ink hover:text-base"
    >
      <MessageCircle size={20} />
    </a>
  );
}
