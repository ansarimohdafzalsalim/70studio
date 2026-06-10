import 'dotenv/config';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import User from './models/User.js';
import Project from './models/Project.js';
import Service from './models/Service.js';
import Revenue from './models/Revenue.js';
import Client from './models/Client.js';
import Story from './models/Story.js';
import Subscriber from './models/Subscriber.js';
import TeamMember from './models/TeamMember.js';
import Settings from './models/Settings.js';
import { defaultSettings } from './controllers/settingsController.js';

const projects = [
  {
    title: 'Nava Intelligence',
    category: 'AI/Tech',
    client: 'Nava Labs',
    year: 2025,
    services: ['AI Product Design', 'Web Design'],
    description: '<p>A launch identity and product website for an AI workflow platform.</p>',
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=80',
    images: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80'],
    featured: true,
    order: 1
  },
  {
    title: 'Bandra House',
    category: 'Branding',
    client: 'Bandra House',
    year: 2025,
    services: ['Brand Identity', 'Web Design'],
    description: '<p>An editorial brand system and digital presence for a Mumbai hospitality concept.</p>',
    coverImage: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80',
    images: ['https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=80'],
    featured: true,
    order: 2
  },
  {
    title: 'PulseOps Dashboard',
    category: 'Dashboard',
    client: 'PulseOps',
    year: 2024,
    services: ['UX/UI Design', 'Development'],
    description: '<p>A calm operations dashboard for teams that need faster scanning and action.</p>',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80',
    images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80'],
    featured: true,
    order: 3
  }
];

const services = [
  { title: 'Web Design', icon: 'Layout', category: 'Web Design', description: 'Editorial websites with sharp structure, fast flows, and conversion clarity.', deliverables: ['Responsive website design', 'Landing pages', 'Design systems', 'Conversion sections'], order: 1, isActive: true },
  { title: 'UX/UI Design', icon: 'Figma', category: 'Web Design', description: 'Product interfaces shaped for navigation, trust, and daily use.', deliverables: ['User flows', 'Wireframes', 'High-fidelity UI', 'Interactive prototypes'], order: 2, isActive: true },
  { title: 'Brand Identity', icon: 'Sparkles', category: 'Branding', description: 'Visual systems with tone, restraint, and memorable distinction.', deliverables: ['Logo systems', 'Color and type', 'Brand guidelines', 'Launch assets'], order: 3, isActive: true },
  { title: 'AI Product Design', icon: 'BrainCircuit', category: 'AI/Tech', description: 'AI-native workflows, copilots, dashboards, and automation experiences.', deliverables: ['AI UX strategy', 'Prompt flows', 'SaaS dashboards', 'Prototype systems'], order: 4, isActive: true },
  { title: 'App Design', icon: 'Smartphone', category: 'Mobile App', description: 'Mobile products designed around speed, habit, and polished interaction.', deliverables: ['iOS and Android UI', 'App journeys', 'Design specs', 'Micro-interactions'], order: 5, isActive: true },
  { title: 'Development', icon: 'Code2', category: 'Dashboard', description: 'Production-ready frontends, APIs, admin tools, and CMS integrations.', deliverables: ['React development', 'Node APIs', 'Admin panels', 'Deployment setup'], order: 6, isActive: true }
];

const team = [
  {
    name: 'Mohd Afzal Salim Ansari',
    role: 'Founder & Creative Technologist',
    bio: 'Leads brand, interface, AI product direction, and full-stack delivery for 70studio.',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
    instagram: 'https://instagram.com/70studio.ai',
    order: 1,
    isActive: true
  },
  {
    name: 'Aisha Shaikh',
    role: 'Brand Designer',
    bio: 'Builds identity systems, launch assets, and visual worlds for modern digital brands.',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80',
    order: 2,
    isActive: true
  },
  {
    name: 'Rayan Patel',
    role: 'Product Developer',
    bio: 'Ships React interfaces, Node APIs, admin tools, and production-ready product systems.',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80',
    order: 3,
    isActive: true
  }
];

const revenue = [
  { clientName: 'Nava Labs', projectName: 'Nava Intelligence', service: 'AI Product Design', amount: 240000, currency: 'INR', status: 'Paid', paymentMethod: 'Bank Transfer', invoiceNumber: '70S-2025-001', invoiceDate: new Date('2025-01-10'), dueDate: new Date('2025-01-20'), paidDate: new Date('2025-01-18'), taxAmount: 43200, platformFee: 0, notes: 'Website and AI UX launch package.' },
  { clientName: 'Bandra House', projectName: 'Bandra House Identity', service: 'Brand Identity', amount: 180000, currency: 'INR', status: 'Pending', paymentMethod: 'UPI', invoiceNumber: '70S-2025-002', invoiceDate: new Date('2025-02-02'), dueDate: new Date('2025-02-12'), taxAmount: 32400, platformFee: 0, notes: 'Identity and launch assets.' },
  { clientName: 'PulseOps', projectName: 'PulseOps Dashboard', service: 'Development', amount: 320000, currency: 'INR', status: 'Paid', paymentMethod: 'Bank Transfer', invoiceNumber: '70S-2025-003', invoiceDate: new Date('2025-03-05'), dueDate: new Date('2025-03-15'), paidDate: new Date('2025-03-14'), taxAmount: 57600, platformFee: 0, notes: 'Dashboard UX and React build.' }
];

const clients = [
  { name: 'Aarav Mehta', company: 'Nava Labs', email: 'aarav@navalabs.ai', phone: '+91 98765 43210', service: 'AI Product Design', budget: '₹3L - ₹8L', step: 'Active', priority: 'High', projectTitle: 'Nava Intelligence Launch', projectBrief: 'AI product website and dashboard UX.', estimatedValue: 240000, nextAction: 'Share dashboard prototype', nextFollowUpDate: new Date('2025-03-20'), source: 'Referral', notes: 'High-fit AI SaaS client.' },
  { name: 'Sana Khan', company: 'Bandra House', email: 'sana@bandrahouse.in', phone: '+91 99887 77665', service: 'Brand Identity', budget: '₹1L - ₹3L', step: 'Proposal', priority: 'Medium', projectTitle: 'Bandra House Brand System', projectBrief: 'Identity, launch page, and social kit.', estimatedValue: 180000, nextAction: 'Follow up on proposal', nextFollowUpDate: new Date('2025-03-18'), source: 'Instagram', notes: 'Waiting on final budget approval.' },
  { name: 'Rohan Shah', company: 'PulseOps', email: 'rohan@pulseops.io', phone: '+91 91234 56780', service: 'Development', budget: '₹3L - ₹8L', step: 'Completed', priority: 'High', projectTitle: 'PulseOps Dashboard', projectBrief: 'Ops dashboard design and React build.', estimatedValue: 320000, nextAction: 'Ask for testimonial', nextFollowUpDate: new Date('2025-03-25'), source: 'LinkedIn', notes: 'Completed project, good case study candidate.' }
];

const stories = [
  { title: 'Started with sharper digital launches', year: '2021', body: '70studio began with a simple belief: good design should make a business easier to understand, easier to trust, and easier to choose.', order: 1, isActive: true },
  { title: 'Moved from visuals to systems', year: '2023', body: 'The studio expanded from identity and websites into product UI, admin systems, and repeatable launch frameworks for growing teams.', order: 2, isActive: true },
  { title: 'Design and AI under one roof', year: '2025', body: 'Today, 70studio blends brand thinking, UX craft, AI workflows, and full-stack delivery for ambitious digital businesses.', order: 3, isActive: true }
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  await User.deleteMany({});
  await Project.deleteMany({});
  await Service.deleteMany({});
  await Revenue.deleteMany({});
  await Client.deleteMany({});
  await Story.deleteMany({});
  await Subscriber.deleteMany({});
  await TeamMember.deleteMany({});
  await Settings.deleteMany({});

  await User.create({
    email: '70studio.ai@gmail.com',
    passwordHash: await bcrypt.hash('admin123', 10),
    role: 'admin'
  });
  await Project.insertMany(projects);
  await Service.insertMany(services);
  await Revenue.insertMany(revenue);
  await Client.insertMany(clients);
  await Story.insertMany(stories);
  await TeamMember.insertMany(team);
  await Settings.create(defaultSettings());
  console.log('Seed complete. Admin: 70studio.ai@gmail.com / admin123');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
