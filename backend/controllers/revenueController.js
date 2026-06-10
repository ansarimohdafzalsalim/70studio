import Revenue from '../models/Revenue.js';

function normalize(body) {
  return {
    ...body,
    amount: Number(body.amount) || 0,
    taxAmount: Number(body.taxAmount) || 0,
    platformFee: Number(body.platformFee) || 0,
    invoiceDate: body.invoiceDate || undefined,
    dueDate: body.dueDate || undefined,
    paidDate: body.paidDate || undefined
  };
}

function summarize(records) {
  const paid = records.filter((item) => item.status === 'Paid');
  const pending = records.filter((item) => item.status === 'Pending' || item.status === 'Overdue');
  const refunded = records.filter((item) => item.status === 'Refunded');
  const totalPaid = paid.reduce((sum, item) => sum + item.amount, 0);
  const totalPending = pending.reduce((sum, item) => sum + item.amount, 0);
  const totalRefunded = refunded.reduce((sum, item) => sum + item.amount, 0);
  const netRevenue = paid.reduce((sum, item) => sum + item.amount - (item.taxAmount || 0) - (item.platformFee || 0), 0);
  return { totalPaid, totalPending, totalRefunded, netRevenue, count: records.length };
}

export async function listRevenue(req, res) {
  const query = {};
  if (req.query.status && req.query.status !== 'All') query.status = req.query.status;
  const records = await Revenue.find(query).sort({ invoiceDate: -1, createdAt: -1 });
  res.json({ records, summary: summarize(records) });
}

export async function createRevenue(req, res) {
  const record = await Revenue.create(normalize(req.body));
  res.status(201).json(record);
}

export async function updateRevenue(req, res) {
  const record = await Revenue.findByIdAndUpdate(req.params.id, normalize(req.body), { new: true, runValidators: true });
  if (!record) return res.status(404).json({ message: 'Revenue record not found' });
  res.json(record);
}

export async function deleteRevenue(req, res) {
  const record = await Revenue.findByIdAndDelete(req.params.id);
  if (!record) return res.status(404).json({ message: 'Revenue record not found' });
  res.json({ message: 'Revenue record deleted' });
}

export async function getRevenueSummary(_req, res) {
  const records = await Revenue.find();
  res.json(summarize(records));
}
