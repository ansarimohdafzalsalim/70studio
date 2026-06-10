import Service from '../models/Service.js';

function normalize(body) {
  return {
    ...body,
    deliverables: Array.isArray(body.deliverables) ? body.deliverables : String(body.deliverables || '').split(',').map((item) => item.trim()).filter(Boolean),
    order: Number(body.order) || 0,
    isActive: body.isActive === true || body.isActive === 'true' || body.isActive === 'on'
  };
}

export async function listServices(_req, res) {
  const services = await Service.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
  res.json(services);
}

export async function listAdminServices(_req, res) {
  const services = await Service.find().sort({ order: 1, createdAt: -1 });
  res.json(services);
}

export async function createService(req, res) {
  const service = await Service.create(normalize(req.body));
  res.status(201).json(service);
}

export async function updateService(req, res) {
  const service = await Service.findByIdAndUpdate(req.params.id, normalize(req.body), { new: true, runValidators: true });
  if (!service) return res.status(404).json({ message: 'Service not found' });
  res.json(service);
}

export async function deleteService(req, res) {
  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service) return res.status(404).json({ message: 'Service not found' });
  res.json({ message: 'Service deleted' });
}
