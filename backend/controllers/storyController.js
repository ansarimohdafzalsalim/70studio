import Story from '../models/Story.js';

function normalize(body) {
  return {
    ...body,
    order: Number(body.order) || 0,
    isActive: body.isActive === true || body.isActive === 'true' || body.isActive === 'on'
  };
}

export async function listStories(_req, res) {
  const stories = await Story.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
  res.json(stories);
}

export async function listAdminStories(_req, res) {
  const stories = await Story.find().sort({ order: 1, createdAt: -1 });
  res.json(stories);
}

export async function createStory(req, res) {
  const story = await Story.create(normalize(req.body));
  res.status(201).json(story);
}

export async function updateStory(req, res) {
  const story = await Story.findByIdAndUpdate(req.params.id, normalize(req.body), { new: true, runValidators: true });
  if (!story) return res.status(404).json({ message: 'Story not found' });
  res.json(story);
}

export async function deleteStory(req, res) {
  const story = await Story.findByIdAndDelete(req.params.id);
  if (!story) return res.status(404).json({ message: 'Story not found' });
  res.json({ message: 'Story deleted' });
}
