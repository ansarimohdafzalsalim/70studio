import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { upload } from '../middleware/uploadMiddleware.js';
import { defaultSettings } from '../controllers/settingsController.js';

const router = Router();
const admin = { id: 'dev-admin', email: '70studio.ai@gmail.com', password: 'admin123', role: 'admin' };

let projects = [
  {
    _id: 'dev-project-1',
    title: 'Nava Intelligence',
    slug: 'nava-intelligence',
    category: 'AI/Tech',
    client: 'Nava Labs',
    year: 2025,
    services: ['AI Product Design', 'Web Design'],
    description: '<p>A launch identity and product website for an AI workflow platform.</p>',
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=80',
    images: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80'],
    featured: true,
    order: 1,
    createdAt: new Date().toISOString()
  },
  {
    _id: 'dev-project-2',
    title: 'Bandra House',
    slug: 'bandra-house',
    category: 'Branding',
    client: 'Bandra House',
    year: 2025,
    services: ['Brand Identity', 'Web Design'],
    description: '<p>An editorial brand system and digital presence for a Mumbai hospitality concept.</p>',
    coverImage: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80',
    images: ['https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=80'],
    featured: true,
    order: 2,
    createdAt: new Date().toISOString()
  },
  {
    _id: 'dev-project-3',
    title: 'PulseOps Dashboard',
    slug: 'pulseops-dashboard',
    category: 'Dashboard',
    client: 'PulseOps',
    year: 2024,
    services: ['UX/UI Design', 'Development'],
    description: '<p>A calm operations dashboard for teams that need faster scanning and action.</p>',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80',
    images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80'],
    featured: true,
    order: 3,
    createdAt: new Date().toISOString()
  }
];

let messages = [];
let subscribers = [];
let settings = { _id: 'dev-settings', ...defaultSettings() };
let stories = [
  { _id: 'dev-story-1', title: 'Started with sharper digital launches', year: '2021', body: '70studio began with a simple belief: good design should make a business easier to understand, easier to trust, and easier to choose.', order: 1, isActive: true, createdAt: new Date().toISOString() },
  { _id: 'dev-story-2', title: 'Moved from visuals to systems', year: '2023', body: 'The studio expanded from identity and websites into product UI, admin systems, and repeatable launch frameworks for growing teams.', order: 2, isActive: true, createdAt: new Date().toISOString() },
  { _id: 'dev-story-3', title: 'Design and AI under one roof', year: '2025', body: 'Today, 70studio blends brand thinking, UX craft, AI workflows, and full-stack delivery for ambitious digital businesses.', order: 3, isActive: true, createdAt: new Date().toISOString() }
];
let revenue = [
  { _id: 'dev-revenue-1', clientName: 'Nava Labs', projectName: 'Nava Intelligence', service: 'AI Product Design', amount: 240000, currency: 'INR', status: 'Paid', paymentMethod: 'Bank Transfer', invoiceNumber: '70S-2025-001', invoiceDate: '2025-01-10', dueDate: '2025-01-20', paidDate: '2025-01-18', taxAmount: 43200, platformFee: 0, notes: 'Website and AI UX launch package.', createdAt: new Date().toISOString() },
  { _id: 'dev-revenue-2', clientName: 'Bandra House', projectName: 'Bandra House Identity', service: 'Brand Identity', amount: 180000, currency: 'INR', status: 'Pending', paymentMethod: 'UPI', invoiceNumber: '70S-2025-002', invoiceDate: '2025-02-02', dueDate: '2025-02-12', paidDate: '', taxAmount: 32400, platformFee: 0, notes: 'Identity and launch assets.', createdAt: new Date().toISOString() },
  { _id: 'dev-revenue-3', clientName: 'PulseOps', projectName: 'PulseOps Dashboard', service: 'Development', amount: 320000, currency: 'INR', status: 'Paid', paymentMethod: 'Bank Transfer', invoiceNumber: '70S-2025-003', invoiceDate: '2025-03-05', dueDate: '2025-03-15', paidDate: '2025-03-14', taxAmount: 57600, platformFee: 0, notes: 'Dashboard UX and React build.', createdAt: new Date().toISOString() }
];
const clientSteps = ['Lead', 'Discovery', 'Proposal', 'Onboarding', 'Active', 'Review', 'Completed', 'Archived'];
let clients = [
  { _id: 'dev-client-1', name: 'Aarav Mehta', company: 'Nava Labs', email: 'aarav@navalabs.ai', phone: '+91 98765 43210', instagram: '', website: 'https://navalabs.ai', service: 'AI Product Design', budget: '₹3L - ₹8L', step: 'Active', priority: 'High', projectTitle: 'Nava Intelligence Launch', projectBrief: 'AI product website and dashboard UX.', estimatedValue: 240000, nextAction: 'Share dashboard prototype', nextFollowUpDate: '2025-03-20', source: 'Referral', notes: 'High-fit AI SaaS client.', isArchived: false, createdAt: new Date().toISOString() },
  { _id: 'dev-client-2', name: 'Sana Khan', company: 'Bandra House', email: 'sana@bandrahouse.in', phone: '+91 99887 77665', instagram: '@bandrahouse', website: '', service: 'Brand Identity', budget: '₹1L - ₹3L', step: 'Proposal', priority: 'Medium', projectTitle: 'Bandra House Brand System', projectBrief: 'Identity, launch page, and social kit.', estimatedValue: 180000, nextAction: 'Follow up on proposal', nextFollowUpDate: '2025-03-18', source: 'Instagram', notes: 'Waiting on final budget approval.', isArchived: false, createdAt: new Date().toISOString() },
  { _id: 'dev-client-3', name: 'Rohan Shah', company: 'PulseOps', email: 'rohan@pulseops.io', phone: '+91 91234 56780', instagram: '', website: 'https://pulseops.io', service: 'Development', budget: '₹3L - ₹8L', step: 'Completed', priority: 'High', projectTitle: 'PulseOps Dashboard', projectBrief: 'Ops dashboard design and React build.', estimatedValue: 320000, nextAction: 'Ask for testimonial', nextFollowUpDate: '2025-03-25', source: 'LinkedIn', notes: 'Completed project, good case study candidate.', isArchived: false, createdAt: new Date().toISOString() }
];
let services = [
  { _id: 'dev-service-1', title: 'Web Design', icon: 'Layout', category: 'Web Design', description: 'Editorial websites with sharp structure, fast flows, and conversion clarity.', deliverables: ['Responsive website design', 'Landing pages', 'Design systems', 'Conversion sections'], order: 1, isActive: true, createdAt: new Date().toISOString() },
  { _id: 'dev-service-2', title: 'UX/UI Design', icon: 'Figma', category: 'Web Design', description: 'Product interfaces shaped for navigation, trust, and daily use.', deliverables: ['User flows', 'Wireframes', 'High-fidelity UI', 'Interactive prototypes'], order: 2, isActive: true, createdAt: new Date().toISOString() },
  { _id: 'dev-service-3', title: 'Brand Identity', icon: 'Sparkles', category: 'Branding', description: 'Visual systems with tone, restraint, and memorable distinction.', deliverables: ['Logo systems', 'Color and type', 'Brand guidelines', 'Launch assets'], order: 3, isActive: true, createdAt: new Date().toISOString() },
  { _id: 'dev-service-4', title: 'AI Product Design', icon: 'BrainCircuit', category: 'AI/Tech', description: 'AI-native workflows, copilots, dashboards, and automation experiences.', deliverables: ['AI UX strategy', 'Prompt flows', 'SaaS dashboards', 'Prototype systems'], order: 4, isActive: true, createdAt: new Date().toISOString() },
  { _id: 'dev-service-5', title: 'App Design', icon: 'Smartphone', category: 'Mobile App', description: 'Mobile products designed around speed, habit, and polished interaction.', deliverables: ['iOS and Android UI', 'App journeys', 'Design specs', 'Micro-interactions'], order: 5, isActive: true, createdAt: new Date().toISOString() },
  { _id: 'dev-service-6', title: 'Development', icon: 'Code2', category: 'Dashboard', description: 'Production-ready frontends, APIs, admin tools, and CMS integrations.', deliverables: ['React development', 'Node APIs', 'Admin panels', 'Deployment setup'], order: 6, isActive: true, createdAt: new Date().toISOString() }
];
let team = [
  {
    _id: 'dev-team-1',
    name: 'Mohd Afzal Salim Ansari',
    role: 'Founder & Creative Technologist',
    bio: 'Leads brand, interface, AI product direction, and full-stack delivery for 70studio.',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
    instagram: 'https://instagram.com/70studio.ai',
    linkedin: '',
    order: 1,
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    _id: 'dev-team-2',
    name: 'Aisha Shaikh',
    role: 'Brand Designer',
    bio: 'Builds identity systems, launch assets, and visual worlds for modern digital brands.',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80',
    instagram: '',
    linkedin: '',
    order: 2,
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    _id: 'dev-team-3',
    name: 'Rayan Patel',
    role: 'Product Developer',
    bio: 'Ships React interfaces, Node APIs, admin tools, and production-ready product systems.',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80',
    instagram: '',
    linkedin: '',
    order: 3,
    isActive: true,
    createdAt: new Date().toISOString()
  }
];

function requireDevAuth(req, res, next) {
  const token = req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.split(' ')[1] : null;
  if (!token) return res.status(401).json({ message: 'Not authorized' });
  try {
    jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
    next();
  } catch {
    res.status(401).json({ message: 'Not authorized' });
  }
}

function slugifyTitle(title) {
  return String(title || 'untitled-project').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function normalizeProject(body) {
  return {
    ...body,
    slug: body.slug || slugifyTitle(body.title),
    services: Array.isArray(body.services) ? body.services : String(body.services || '').split(',').map((item) => item.trim()).filter(Boolean),
    featured: body.featured === true || body.featured === 'true' || body.featured === 'on',
    year: Number(body.year) || new Date().getFullYear(),
    order: Number(body.order) || 0
  };
}

function normalizeTeam(body) {
  return {
    ...body,
    order: Number(body.order) || 0,
    isActive: body.isActive === true || body.isActive === 'true' || body.isActive === 'on'
  };
}

function normalizeService(body) {
  return {
    ...body,
    deliverables: Array.isArray(body.deliverables) ? body.deliverables : String(body.deliverables || '').split(',').map((item) => item.trim()).filter(Boolean),
    order: Number(body.order) || 0,
    isActive: body.isActive === true || body.isActive === 'true' || body.isActive === 'on'
  };
}

function normalizeStory(body) {
  return {
    ...body,
    order: Number(body.order) || 0,
    isActive: body.isActive === true || body.isActive === 'true' || body.isActive === 'on'
  };
}

function normalizeSubscriber(body) {
  return {
    ...body,
    email: String(body.email || '').toLowerCase().trim(),
    interests: Array.isArray(body.interests) ? body.interests : String(body.interests || '').split(',').map((item) => item.trim()).filter(Boolean),
    isActive: body.isActive === undefined ? true : body.isActive === true || body.isActive === 'true' || body.isActive === 'on'
  };
}

function normalizeSettings(body) {
  const data = { ...body };
  if (typeof data.heroCards === 'string') {
    try {
      data.heroCards = JSON.parse(data.heroCards);
    } catch {
      data.heroCards = data.heroCards.split('\n').map((line) => {
        const [value, label] = line.split('|').map((item) => item?.trim());
        return value && label ? { value, label } : null;
      }).filter(Boolean);
    }
  }
  return data;
}

function normalizeRevenue(body) {
  return {
    ...body,
    amount: Number(body.amount) || 0,
    taxAmount: Number(body.taxAmount) || 0,
    platformFee: Number(body.platformFee) || 0
  };
}

function normalizeClient(body) {
  return {
    ...body,
    estimatedValue: Number(body.estimatedValue) || 0,
    isArchived: body.isArchived === true || body.isArchived === 'true' || body.isArchived === 'on'
  };
}

function clientSummary(records) {
  const byStep = clientSteps.reduce((acc, step) => ({ ...acc, [step]: 0 }), {});
  records.forEach((client) => {
    byStep[client.step] = (byStep[client.step] || 0) + 1;
  });
  return {
    total: records.length,
    active: records.filter((client) => !client.isArchived && client.step !== 'Completed' && client.step !== 'Archived').length,
    completed: records.filter((client) => client.step === 'Completed').length,
    archived: records.filter((client) => client.isArchived || client.step === 'Archived').length,
    pipelineValue: records.filter((client) => !client.isArchived && !['Completed', 'Archived'].includes(client.step)).reduce((sum, client) => sum + (client.estimatedValue || 0), 0),
    byStep
  };
}

function revenueSummary(records) {
  const paid = records.filter((item) => item.status === 'Paid');
  const pending = records.filter((item) => item.status === 'Pending' || item.status === 'Overdue');
  const refunded = records.filter((item) => item.status === 'Refunded');
  return {
    totalPaid: paid.reduce((sum, item) => sum + item.amount, 0),
    totalPending: pending.reduce((sum, item) => sum + item.amount, 0),
    totalRefunded: refunded.reduce((sum, item) => sum + item.amount, 0),
    netRevenue: paid.reduce((sum, item) => sum + item.amount - (item.taxAmount || 0) - (item.platformFee || 0), 0),
    count: records.length
  };
}

function fileDataUrl(file) {
  return file ? `data:${file.mimetype};base64,${file.buffer.toString('base64')}` : undefined;
}

router.post('/auth/login', (req, res) => {
  if (req.body.email?.toLowerCase() !== admin.email || req.body.password !== admin.password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: admin.id, role: admin.role }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' });
  res.json({ token, user: { email: admin.email, role: admin.role } });
});

router.get('/projects', (req, res) => {
  const filtered = req.query.category ? projects.filter((project) => project.category === req.query.category) : projects;
  res.json([...filtered].sort((a, b) => a.order - b.order));
});

router.get('/projects/:slug', (req, res) => {
  const project = projects.find((item) => item.slug === req.params.slug);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json(project);
});

router.get('/team', (_req, res) => {
  res.json(team.filter((member) => member.isActive).sort((a, b) => a.order - b.order));
});

router.get('/services', (_req, res) => {
  res.json(services.filter((service) => service.isActive).sort((a, b) => a.order - b.order));
});

router.get('/stories', (_req, res) => {
  res.json(stories.filter((story) => story.isActive).sort((a, b) => a.order - b.order));
});

router.post('/contact', (req, res) => {
  messages.unshift({ _id: `dev-message-${Date.now()}`, ...req.body, isRead: false, createdAt: new Date().toISOString() });
  res.status(201).json({ message: 'Message submitted' });
});

router.post('/subscribe', (req, res) => {
  const data = normalizeSubscriber(req.body);
  if (!data.email) return res.status(400).json({ message: 'Email is required' });
  const existing = subscribers.find((subscriber) => subscriber.email === data.email);
  if (existing) {
    Object.assign(existing, data, { isActive: true, unsubscribedAt: null });
    return res.status(201).json({ message: 'Subscribed', subscriber: existing });
  }
  const subscriber = { _id: `dev-subscriber-${Date.now()}`, source: 'Footer', ...data, createdAt: new Date().toISOString() };
  subscribers.unshift(subscriber);
  res.status(201).json({ message: 'Subscribed', subscriber });
});

router.get('/admin/projects', requireDevAuth, (_req, res) => res.json(projects));
router.post('/admin/projects', requireDevAuth, upload.fields([{ name: 'coverImage', maxCount: 1 }, { name: 'images', maxCount: 8 }]), (req, res) => {
  const project = {
    _id: `dev-project-${Date.now()}`,
    ...normalizeProject(req.body),
    coverImage: fileDataUrl(req.files?.coverImage?.[0]) || '',
    images: (req.files?.images || []).map(fileDataUrl),
    createdAt: new Date().toISOString()
  };
  projects.unshift(project);
  res.status(201).json(project);
});

router.put('/admin/projects/:id', requireDevAuth, upload.fields([{ name: 'coverImage', maxCount: 1 }, { name: 'images', maxCount: 8 }]), (req, res) => {
  const index = projects.findIndex((project) => project._id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Project not found' });
  const coverImage = fileDataUrl(req.files?.coverImage?.[0]) || projects[index].coverImage;
  const images = req.files?.images?.length ? req.files.images.map(fileDataUrl) : projects[index].images;
  projects[index] = { ...projects[index], ...normalizeProject(req.body), coverImage, images };
  res.json(projects[index]);
});

router.delete('/admin/projects/:id', requireDevAuth, (req, res) => {
  projects = projects.filter((project) => project._id !== req.params.id);
  res.json({ message: 'Project deleted' });
});

router.get('/admin/team', requireDevAuth, (_req, res) => res.json([...team].sort((a, b) => a.order - b.order)));
router.post('/admin/team', requireDevAuth, upload.single('photo'), (req, res) => {
  const member = {
    _id: `dev-team-${Date.now()}`,
    ...normalizeTeam(req.body),
    photo: fileDataUrl(req.file) || '',
    createdAt: new Date().toISOString()
  };
  team.unshift(member);
  res.status(201).json(member);
});

router.put('/admin/team/:id', requireDevAuth, upload.single('photo'), (req, res) => {
  const index = team.findIndex((member) => member._id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Team member not found' });
  team[index] = { ...team[index], ...normalizeTeam(req.body), photo: fileDataUrl(req.file) || team[index].photo };
  res.json(team[index]);
});

router.delete('/admin/team/:id', requireDevAuth, (req, res) => {
  team = team.filter((member) => member._id !== req.params.id);
  res.json({ message: 'Team member deleted' });
});

router.get('/admin/services', requireDevAuth, (_req, res) => res.json([...services].sort((a, b) => a.order - b.order)));
router.post('/admin/services', requireDevAuth, (req, res) => {
  const service = {
    _id: `dev-service-${Date.now()}`,
    ...normalizeService(req.body),
    createdAt: new Date().toISOString()
  };
  services.unshift(service);
  res.status(201).json(service);
});

router.put('/admin/services/:id', requireDevAuth, (req, res) => {
  const index = services.findIndex((service) => service._id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Service not found' });
  services[index] = { ...services[index], ...normalizeService(req.body) };
  res.json(services[index]);
});

router.delete('/admin/services/:id', requireDevAuth, (req, res) => {
  services = services.filter((service) => service._id !== req.params.id);
  res.json({ message: 'Service deleted' });
});

router.get('/admin/stories', requireDevAuth, (_req, res) => res.json([...stories].sort((a, b) => a.order - b.order)));

router.post('/admin/stories', requireDevAuth, (req, res) => {
  const story = {
    _id: `dev-story-${Date.now()}`,
    ...normalizeStory(req.body),
    createdAt: new Date().toISOString()
  };
  stories.unshift(story);
  res.status(201).json(story);
});

router.put('/admin/stories/:id', requireDevAuth, (req, res) => {
  const index = stories.findIndex((story) => story._id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Story not found' });
  stories[index] = { ...stories[index], ...normalizeStory(req.body) };
  res.json(stories[index]);
});

router.delete('/admin/stories/:id', requireDevAuth, (req, res) => {
  stories = stories.filter((story) => story._id !== req.params.id);
  res.json({ message: 'Story deleted' });
});

router.get('/admin/revenue', requireDevAuth, (req, res) => {
  const filtered = req.query.status && req.query.status !== 'All' ? revenue.filter((record) => record.status === req.query.status) : revenue;
  res.json({ records: filtered, summary: revenueSummary(filtered) });
});

router.get('/admin/revenue/summary', requireDevAuth, (_req, res) => {
  res.json(revenueSummary(revenue));
});

router.post('/admin/revenue', requireDevAuth, (req, res) => {
  const record = {
    _id: `dev-revenue-${Date.now()}`,
    ...normalizeRevenue(req.body),
    createdAt: new Date().toISOString()
  };
  revenue.unshift(record);
  res.status(201).json(record);
});

router.put('/admin/revenue/:id', requireDevAuth, (req, res) => {
  const index = revenue.findIndex((record) => record._id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Revenue record not found' });
  revenue[index] = { ...revenue[index], ...normalizeRevenue(req.body) };
  res.json(revenue[index]);
});

router.delete('/admin/revenue/:id', requireDevAuth, (req, res) => {
  revenue = revenue.filter((record) => record._id !== req.params.id);
  res.json({ message: 'Revenue record deleted' });
});

router.get('/admin/clients', requireDevAuth, (req, res) => {
  let filtered = [...clients];
  if (req.query.step && req.query.step !== 'All') filtered = filtered.filter((client) => client.step === req.query.step);
  if (req.query.search) {
    const search = String(req.query.search).toLowerCase();
    filtered = filtered.filter((client) => [client.name, client.company, client.email, client.projectTitle].some((value) => String(value || '').toLowerCase().includes(search)));
  }
  res.json({ clients: filtered, summary: clientSummary(clients) });
});

router.get('/admin/clients/summary', requireDevAuth, (_req, res) => {
  res.json(clientSummary(clients));
});

router.post('/admin/clients', requireDevAuth, (req, res) => {
  const client = {
    _id: `dev-client-${Date.now()}`,
    ...normalizeClient(req.body),
    createdAt: new Date().toISOString()
  };
  clients.unshift(client);
  res.status(201).json(client);
});

router.put('/admin/clients/:id', requireDevAuth, (req, res) => {
  const index = clients.findIndex((client) => client._id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Client not found' });
  clients[index] = { ...clients[index], ...normalizeClient(req.body) };
  res.json(clients[index]);
});

router.delete('/admin/clients/:id', requireDevAuth, (req, res) => {
  clients = clients.filter((client) => client._id !== req.params.id);
  res.json({ message: 'Client deleted' });
});

router.get('/admin/subscribers', requireDevAuth, (req, res) => {
  let filtered = [...subscribers];
  if (req.query.status === 'active') filtered = filtered.filter((subscriber) => subscriber.isActive);
  if (req.query.status === 'inactive') filtered = filtered.filter((subscriber) => !subscriber.isActive);
  res.json(filtered);
});

router.put('/admin/subscribers/:id', requireDevAuth, (req, res) => {
  const index = subscribers.findIndex((subscriber) => subscriber._id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Subscriber not found' });
  subscribers[index] = { ...subscribers[index], ...normalizeSubscriber(req.body), unsubscribedAt: req.body.isActive === false ? new Date().toISOString() : subscribers[index].unsubscribedAt };
  res.json(subscribers[index]);
});

router.delete('/admin/subscribers/:id', requireDevAuth, (req, res) => {
  subscribers = subscribers.filter((subscriber) => subscriber._id !== req.params.id);
  res.json({ message: 'Subscriber deleted' });
});

router.get('/admin/messages', requireDevAuth, (_req, res) => res.json(messages));
router.put('/admin/messages/:id/read', requireDevAuth, (req, res) => {
  const message = messages.find((item) => item._id === req.params.id);
  if (!message) return res.status(404).json({ message: 'Message not found' });
  message.isRead = typeof req.body.isRead === 'boolean' ? req.body.isRead : true;
  res.json(message);
});

router.delete('/admin/messages/:id', requireDevAuth, (req, res) => {
  messages = messages.filter((message) => message._id !== req.params.id);
  res.json({ message: 'Message deleted' });
});

router.get('/settings', (_req, res) => res.json(settings));
router.get('/admin/settings', (_req, res) => res.json(settings));
router.put('/admin/settings', requireDevAuth, upload.single('founderPhoto'), (req, res) => {
  const data = normalizeSettings(req.body);
  settings = { ...settings, ...data, founderPhoto: fileDataUrl(req.file) || req.body.founderPhoto || settings.founderPhoto };
  res.json(settings);
});

export default router;
