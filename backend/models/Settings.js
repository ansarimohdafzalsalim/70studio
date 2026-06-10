import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema(
  {
    founderName: String,
    founderBio: String,
    founderPhoto: String,
    email: String,
    phone: String,
    instagram: String,
    address: String,
    heroCards: [
      {
        value: String,
        label: String
      }
    ],
    metaTitle: String,
    metaDescription: String
  },
  { timestamps: true }
);

export default mongoose.model('Settings', settingsSchema);
