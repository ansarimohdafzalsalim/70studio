import { BrainCircuit, Code2, Figma, Layers3, Layout, Smartphone, Sparkles, Target, Wand2, Workflow } from 'lucide-react';

export const services = [
  { title: 'Web Design', icon: Layout, category: 'Web Design', description: 'Editorial websites with sharp structure, fast flows, and conversion clarity.', deliverables: ['Responsive website design', 'Landing pages', 'Design systems', 'Conversion sections'] },
  { title: 'UX/UI Design', icon: Figma, category: 'Web Design', description: 'Product interfaces shaped for navigation, trust, and daily use.', deliverables: ['User flows', 'Wireframes', 'High-fidelity UI', 'Interactive prototypes'] },
  { title: 'Brand Identity', icon: Sparkles, category: 'Branding', description: 'Visual systems with tone, restraint, and memorable distinction.', deliverables: ['Logo systems', 'Color and type', 'Brand guidelines', 'Launch assets'] },
  { title: 'AI Product Design', icon: BrainCircuit, category: 'AI/Tech', description: 'AI-native workflows, copilots, dashboards, and automation experiences.', deliverables: ['AI UX strategy', 'Prompt flows', 'SaaS dashboards', 'Prototype systems'] },
  { title: 'App Design', icon: Smartphone, category: 'Mobile App', description: 'Mobile products designed around speed, habit, and polished interaction.', deliverables: ['iOS and Android UI', 'App journeys', 'Design specs', 'Micro-interactions'] },
  { title: 'Development', icon: Code2, category: 'Dashboard', description: 'Production-ready frontends, APIs, admin tools, and CMS integrations.', deliverables: ['React development', 'Node APIs', 'Admin panels', 'Deployment setup'] }
];

export const process = [
  { title: 'Discover', icon: Target, text: 'We map the business goal, audience, offer, and current friction.' },
  { title: 'Define', icon: Workflow, text: 'We turn insight into scope, architecture, flows, and creative direction.' },
  { title: 'Design', icon: Wand2, text: 'We craft the interface, identity, content rhythm, and interaction language.' },
  { title: 'Deliver', icon: Layers3, text: 'We launch, test, refine, and hand over a system ready to scale.' }
];

export const testimonials = [
  { name: 'Aarav Mehta', role: 'Founder', company: 'Nava Labs', quote: '70studio brought structure and taste to a messy product idea. The final website felt premium from day one.' },
  { name: 'Sana Khan', role: 'Marketing Lead', company: 'Orbit Fintech', quote: 'They understood both design and conversion. Our demo requests improved within the first month.' },
  { name: 'Rohan Shah', role: 'CEO', company: 'Flux AI', quote: 'The AI dashboard was complex, but the interface feels calm and obvious. That is rare.' }
];

export const industries = ['AI & SaaS', 'Real Estate', 'Hospitality', 'Finance', 'Creators', 'Education', 'Health & Wellness', 'Local Brands'];

export const faqs = [
  {
    question: 'How quickly can we start?',
    answer: 'Most projects begin with a discovery call, scope confirmation, and a first direction within the first week.'
  },
  {
    question: 'Can 70studio handle design and development?',
    answer: 'Yes. We can deliver strategy, identity, UI design, React frontends, Node APIs, admin panels, and deployment-ready builds.'
  },
  {
    question: 'Do you work with early-stage founders?',
    answer: 'Yes. We often help founders shape a clear launch site, product prototype, or AI workflow before scaling the full system.'
  },
  {
    question: 'Where is the studio based?',
    answer: '70studio is based in Bandra West, Mumbai, and works with clients remotely across India and beyond.'
  }
];

export const trustPoints = [
  'Conversion-focused page structure',
  'Reusable design systems',
  'Admin-editable content',
  'Production-ready handoff'
];

export const placeholderProjects = [
  {
    title: 'Nava Intelligence',
    slug: 'nava-intelligence',
    category: 'AI/Tech',
    client: 'Nava Labs',
    year: 2025,
    services: ['AI Product Design', 'Web Design'],
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=80',
    description: '<p>An AI product launch system combining brand clarity, product storytelling, and a polished interface.</p>'
  },
  {
    title: 'Bandra House',
    slug: 'bandra-house',
    category: 'Branding',
    client: 'Bandra House',
    year: 2025,
    services: ['Brand Identity', 'Web Design'],
    coverImage: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80',
    description: '<p>A refined identity and editorial website for a Mumbai hospitality concept.</p>'
  },
  {
    title: 'PulseOps Dashboard',
    slug: 'pulseops-dashboard',
    category: 'Dashboard',
    client: 'PulseOps',
    year: 2024,
    services: ['UX/UI Design', 'Development'],
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80',
    description: '<p>A data-heavy operations dashboard redesigned for scanning, action, and decision speed.</p>'
  }
];
