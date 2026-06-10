import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import revenueRoutes from './routes/revenueRoutes.js';
import clientRoutes from './routes/clientRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import storyRoutes from './routes/storyRoutes.js';
import subscriberRoutes from './routes/subscriberRoutes.js';
import devMemoryRoutes from './routes/devMemoryRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  process.env.FRONTEND_URL,
  'https://70studio.vercel.app',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174'
].filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || /^http:\/\/localhost:\d+$/.test(origin)) {
      return callback(null, true);
    }
    callback(new Error(`CORS blocked origin: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (_req, res) => res.json({ ok: true, service: '70studio-api' }));

const isPlaceholderMongo = !process.env.MONGODB_URI || process.env.MONGODB_URI.includes('...');

if (isPlaceholderMongo) {
  console.warn('Using in-memory dev API because MONGODB_URI is not configured.');
  app.use('/api', devMemoryRoutes);
} else {
  app.use('/api/auth', authRoutes);
  app.use('/api', projectRoutes);
  app.use('/api', serviceRoutes);
  app.use('/api', revenueRoutes);
  app.use('/api', clientRoutes);
  app.use('/api', storyRoutes);
  app.use('/api', subscriberRoutes);
  app.use('/api', teamRoutes);
  app.use('/api', contactRoutes);
  app.use('/api/settings', settingsRoutes);
  app.use('/api/admin/settings', settingsRoutes);
}

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

if (isPlaceholderMongo) {
  app.listen(PORT, () => console.log(`70studio dev API running on ${PORT}`));
} else {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => app.listen(PORT, () => console.log(`70studio API running on ${PORT}`)))
    .catch((err) => {
      console.error('MongoDB connection failed:', err.message);
      process.exit(1);
    });
}
