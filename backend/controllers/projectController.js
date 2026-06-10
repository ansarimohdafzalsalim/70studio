import Project from '../models/Project.js';
import { uploadBuffer } from '../utils/cloudinary.js';

const normalize = (body) => ({
  ...body,
  services: Array.isArray(body.services) ? body.services : String(body.services || '').split(',').map((s) => s.trim()).filter(Boolean),
  featured: body.featured === true || body.featured === 'true' || body.featured === 'on',
  year: Number(body.year) || undefined,
  order: Number(body.order) || 0
});

export async function listProjects(req, res) {
  const query = req.query.category ? { category: req.query.category } : {};
  const projects = await Project.find(query).sort({ order: 1, createdAt: -1 });
  res.json(projects);
}

export async function getProject(req, res) {
  const project = await Project.findOne({ slug: req.params.slug });
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json(project);
}

export async function createProject(req, res) {
  const data = normalize(req.body);
  if (req.files?.coverImage?.[0]) data.coverImage = await uploadBuffer(req.files.coverImage[0].buffer);
  if (req.files?.images?.length) data.images = await Promise.all(req.files.images.map((file) => uploadBuffer(file.buffer)));
  const project = await Project.create(data);
  res.status(201).json(project);
}

export async function updateProject(req, res) {
  const data = normalize(req.body);
  if (req.files?.coverImage?.[0]) data.coverImage = await uploadBuffer(req.files.coverImage[0].buffer);
  if (req.files?.images?.length) data.images = await Promise.all(req.files.images.map((file) => uploadBuffer(file.buffer)));
  const project = await Project.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json(project);
}

export async function deleteProject(req, res) {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json({ message: 'Project deleted' });
}
