import { useEffect, useState } from 'react';
import { api } from '../api.js';

const fallbackSettings = {
  founderName: 'Mohd Afzal Salim Ansari',
  founderBio: 'Mohd Afzal Salim Ansari leads 70studio with a focus on modern brand systems, product interfaces, and AI-assisted digital experiences for ambitious teams.',
  email: '70studio.ai@gmail.com',
  phone: '+91 9920988081',
  instagram: '@70studio.ai',
  address: 'Bandra West, Mumbai',
  heroCards: [
    { value: '70', label: 'Brand' },
    { value: '70', label: 'Product' },
    { value: '70', label: 'AI' }
  ]
};

export default function useSettings() {
  const [settings, setSettings] = useState(fallbackSettings);

  useEffect(() => {
    api('/settings').then((data) => setSettings({ ...fallbackSettings, ...data, heroCards: normalizeHeroCards(data.heroCards) })).catch(() => {});
  }, []);

  return settings;
}

function normalizeHeroCards(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      return value.split('\n').map((line) => {
        const [cardValue, label] = line.split('|').map((item) => item?.trim());
        return cardValue && label ? { value: cardValue, label } : null;
      }).filter(Boolean);
    }
  }
  return fallbackSettings.heroCards;
}

export function phoneHref(phone = '') {
  const cleaned = String(phone).replace(/[^\d+]/g, '');
  return cleaned ? `tel:${cleaned}` : '#';
}

export function whatsAppHref(phone = '') {
  const cleaned = String(phone).replace(/\D/g, '');
  return cleaned ? `https://wa.me/${cleaned}` : 'https://wa.me/919920988081';
}

export function instagramHref(instagram = '') {
  const handle = String(instagram).replace('@', '').trim();
  return handle ? `https://instagram.com/${handle}` : 'https://instagram.com/70studio.ai';
}
