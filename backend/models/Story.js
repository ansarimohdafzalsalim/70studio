import mongoose from 'mongoose';

const storySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    year: String,
    body: { type: String, required: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model('Story', storySchema);
