import Subscriber from '../models/Subscriber.js';

function normalize(body) {
  return {
    ...body,
    email: String(body.email || '').toLowerCase().trim(),
    interests: Array.isArray(body.interests) ? body.interests : String(body.interests || '').split(',').map((item) => item.trim()).filter(Boolean),
    isActive: body.isActive === undefined ? true : body.isActive === true || body.isActive === 'true' || body.isActive === 'on',
    unsubscribedAt: body.isActive === false || body.isActive === 'false' ? new Date() : undefined
  };
}

export async function subscribe(req, res) {
  const data = normalize(req.body);
  if (!data.email) return res.status(400).json({ message: 'Email is required' });
  const subscriber = await Subscriber.findOneAndUpdate(
    { email: data.email },
    { ...data, isActive: true, unsubscribedAt: null },
    { upsert: true, new: true, runValidators: true }
  );
  res.status(201).json({ message: 'Subscribed', subscriber });
}

export async function listSubscribers(req, res) {
  const query = {};
  if (req.query.status === 'active') query.isActive = true;
  if (req.query.status === 'inactive') query.isActive = false;
  const subscribers = await Subscriber.find(query).sort({ createdAt: -1 });
  res.json(subscribers);
}

export async function updateSubscriber(req, res) {
  const subscriber = await Subscriber.findByIdAndUpdate(req.params.id, normalize(req.body), { new: true, runValidators: true });
  if (!subscriber) return res.status(404).json({ message: 'Subscriber not found' });
  res.json(subscriber);
}

export async function deleteSubscriber(req, res) {
  const subscriber = await Subscriber.findByIdAndDelete(req.params.id);
  if (!subscriber) return res.status(404).json({ message: 'Subscriber not found' });
  res.json({ message: 'Subscriber deleted' });
}
