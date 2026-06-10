import { BrainCircuit, Code2, Figma, Layout, Smartphone, Sparkles } from 'lucide-react';

export const serviceIconOptions = ['Layout', 'Figma', 'Sparkles', 'BrainCircuit', 'Smartphone', 'Code2'];

const icons = {
  Layout,
  Figma,
  Sparkles,
  BrainCircuit,
  Smartphone,
  Code2
};

export function getServiceIcon(iconName) {
  return icons[iconName] || Layout;
}

export function hydrateServices(services) {
  return services.map((service) => ({ ...service, icon: getServiceIcon(service.icon) }));
}
