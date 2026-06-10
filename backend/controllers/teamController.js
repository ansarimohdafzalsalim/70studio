import TeamMember from '../models/TeamMember.js';
import { uploadBuffer } from '../utils/cloudinary.js';

function normalize(body) {
  return {
    ...body,
    order: Number(body.order) || 0,
    isActive: body.isActive === true || body.isActive === 'true' || body.isActive === 'on'
  };
}

export async function listTeam(_req, res) {
  const team = await TeamMember.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
  res.json(team);
}

export async function listAdminTeam(_req, res) {
  const team = await TeamMember.find().sort({ order: 1, createdAt: -1 });
  res.json(team);
}

export async function createTeamMember(req, res) {
  const data = normalize(req.body);
  if (req.file) data.photo = await uploadBuffer(req.file.buffer, '70studio/team');
  const member = await TeamMember.create(data);
  res.status(201).json(member);
}

export async function updateTeamMember(req, res) {
  const data = normalize(req.body);
  if (req.file) data.photo = await uploadBuffer(req.file.buffer, '70studio/team');
  const member = await TeamMember.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
  if (!member) return res.status(404).json({ message: 'Team member not found' });
  res.json(member);
}

export async function deleteTeamMember(req, res) {
  const member = await TeamMember.findByIdAndDelete(req.params.id);
  if (!member) return res.status(404).json({ message: 'Team member not found' });
  res.json({ message: 'Team member deleted' });
}
