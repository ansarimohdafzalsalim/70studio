import mongoose from 'mongoose';

const steps = ['Lead', 'Discovery', 'Proposal', 'Onboarding', 'Active', 'Review', 'Completed', 'Archived'];
const priorities = ['Low', 'Medium', 'High', 'Urgent'];

const clientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    company: String,
    email: { type: String, required: true },
    phone: String,
    instagram: String,
    website: String,
    service: String,
    budget: String,
    step: { type: String, enum: steps, default: 'Lead' },
    priority: { type: String, enum: priorities, default: 'Medium' },
    projectTitle: String,
    projectBrief: String,
    estimatedValue: { type: Number, default: 0 },
    nextAction: String,
    nextFollowUpDate: Date,
    source: String,
    notes: String,
    isArchived: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model('Client', clientSchema);
export { steps, priorities };
