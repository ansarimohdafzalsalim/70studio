import Message from '../models/Message.js';
import { sendContactEmail } from '../utils/sendEmail.js';

export async function submitContact(req, res) {
  const message = await Message.create(req.body);
  await sendContactEmail(message).catch((err) => console.error('Email failed:', err.message));
  res.status(201).json({ message: 'Message submitted' });
}

export async function listMessages(_req, res) {
  res.json(await Message.find().sort({ createdAt: -1 }));
}

export async function markRead(req, res) {
  const isRead = typeof req.body.isRead === 'boolean' ? req.body.isRead : true;
  const message = await Message.findByIdAndUpdate(req.params.id, { isRead }, { new: true });
  if (!message) return res.status(404).json({ message: 'Message not found' });
  res.json(message);
}

export async function deleteMessage(req, res) {
  const message = await Message.findByIdAndDelete(req.params.id);
  if (!message) return res.status(404).json({ message: 'Message not found' });
  res.json({ message: 'Message deleted' });
}
