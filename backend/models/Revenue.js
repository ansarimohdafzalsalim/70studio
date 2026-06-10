import mongoose from 'mongoose';

const revenueSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true },
    projectName: { type: String, required: true },
    service: String,
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    status: { type: String, enum: ['Paid', 'Pending', 'Overdue', 'Refunded', 'Cancelled'], default: 'Pending' },
    paymentMethod: { type: String, enum: ['UPI', 'Bank Transfer', 'Cash', 'Card', 'PayPal', 'Other'], default: 'Bank Transfer' },
    invoiceNumber: String,
    invoiceDate: Date,
    dueDate: Date,
    paidDate: Date,
    taxAmount: { type: Number, default: 0 },
    platformFee: { type: Number, default: 0 },
    notes: String
  },
  { timestamps: true }
);

export default mongoose.model('Revenue', revenueSchema);
