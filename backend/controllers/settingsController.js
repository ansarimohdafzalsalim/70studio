import Settings from '../models/Settings.js';
import { uploadBuffer } from '../utils/cloudinary.js';

export async function getSettings(_req, res) {
  let settings = await Settings.findOne();
  if (!settings) settings = await Settings.create(defaultSettings());
  res.json(settings);
}

export async function updateSettings(req, res) {
  const data = { ...req.body };
  if (typeof data.heroCards === 'string') {
    try {
      data.heroCards = JSON.parse(data.heroCards);
    } catch {
      data.heroCards = String(data.heroCards).split('\n').map((line) => {
        const [value, label] = line.split('|').map((item) => item?.trim());
        return value && label ? { value, label } : null;
      }).filter(Boolean);
    }
  }
  if (req.file) data.founderPhoto = await uploadBuffer(req.file.buffer, '70studio/settings');
  const settings = await Settings.findOneAndUpdate({}, data, { upsert: true, new: true, runValidators: true });
  res.json(settings);
}

export function defaultSettings() {
  return {
    founderName: 'Mohd Afzal Salim Ansari',
    founderBio: 'Founder of 70studio, focused on brand systems, product interfaces, AI workflows, and polished digital launches from Mumbai.',
    email: '70studio.ai@gmail.com',
    phone: '+91 9920988081',
    instagram: '@70studio.ai',
    address: 'Bandra West, Mumbai',
    heroCards: [
      { value: '70', label: 'Brand' },
      { value: '70', label: 'Product' },
      { value: '70', label: 'AI' }
    ],
    metaTitle: '70studio | Design & AI Agency',
    metaDescription: '70studio is a design and AI agency in Mumbai building brands, websites, apps, and intelligent product experiences.'
  };
}
