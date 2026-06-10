import Client, { steps } from '../models/Client.js';

function normalize(body) {
  return {
    ...body,
    estimatedValue: Number(body.estimatedValue) || 0,
    isArchived: body.isArchived === true || body.isArchived === 'true' || body.isArchived === 'on',
    nextFollowUpDate: body.nextFollowUpDate || undefined
  };
}

function summarize(clients) {
  const byStep = steps.reduce((acc, step) => ({ ...acc, [step]: 0 }), {});
  clients.forEach((client) => {
    byStep[client.step] = (byStep[client.step] || 0) + 1;
  });
  return {
    total: clients.length,
    active: clients.filter((client) => !client.isArchived && client.step !== 'Completed' && client.step !== 'Archived').length,
    completed: clients.filter((client) => client.step === 'Completed').length,
    archived: clients.filter((client) => client.isArchived || client.step === 'Archived').length,
    pipelineValue: clients.filter((client) => !client.isArchived && !['Completed', 'Archived'].includes(client.step)).reduce((sum, client) => sum + (client.estimatedValue || 0), 0),
    byStep
  };
}

export async function listClients(req, res) {
  const query = {};
  if (req.query.step && req.query.step !== 'All') query.step = req.query.step;
  if (req.query.search) {
    const search = new RegExp(req.query.search, 'i');
    query.$or = [{ name: search }, { company: search }, { email: search }, { projectTitle: search }];
  }
  const clients = await Client.find(query).sort({ nextFollowUpDate: 1, createdAt: -1 });
  res.json({ clients, summary: summarize(await Client.find()) });
}

export async function createClient(req, res) {
  const client = await Client.create(normalize(req.body));
  res.status(201).json(client);
}

export async function updateClient(req, res) {
  const client = await Client.findByIdAndUpdate(req.params.id, normalize(req.body), { new: true, runValidators: true });
  if (!client) return res.status(404).json({ message: 'Client not found' });
  res.json(client);
}

export async function deleteClient(req, res) {
  const client = await Client.findByIdAndDelete(req.params.id);
  if (!client) return res.status(404).json({ message: 'Client not found' });
  res.json({ message: 'Client deleted' });
}

export async function getClientSummary(_req, res) {
  const clients = await Client.find();
  res.json(summarize(clients));
}
