import mongoose from 'mongoose';
import slugify from 'slugify';

const categories = ['Web Design', 'Branding', 'Mobile App', 'Dashboard', 'AI/Tech'];

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    category: { type: String, enum: categories, required: true },
    client: String,
    year: Number,
    services: [String],
    description: String,
    coverImage: String,
    images: [String],
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

projectSchema.pre('validate', function setSlug(next) {
  if (!this.slug && this.title) this.slug = slugify(this.title, { lower: true, strict: true });
  next();
});

export default mongoose.model('Project', projectSchema);
