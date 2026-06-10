import mongoose from 'mongoose';

const subscriberSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: String,
    source: { type: String, default: 'Footer' },
    interests: [String],
    isActive: { type: Boolean, default: true },
    unsubscribedAt: Date
  },
  { timestamps: true }
);

export default mongoose.model('Subscriber', subscriberSchema);
