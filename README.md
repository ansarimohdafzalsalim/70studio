# 70studio

Full-stack design studio website for 70studio, built with React, Vite, Tailwind CSS, Framer Motion, Node.js, Express, MongoDB, JWT auth, Multer, Cloudinary, and Nodemailer.

## Setup

```bash
npm run install:all
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Fill in MongoDB, Cloudinary, email, and JWT values in `backend/.env`.

## Environment

Backend:

```env
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_jwt_secret_here
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
EMAIL_USER=70studio.ai@gmail.com
EMAIL_PASS=your_app_password
ADMIN_EMAIL=70studio.ai@gmail.com
FRONTEND_URL=http://localhost:5173
```

Frontend:

```env
VITE_API_URL=http://localhost:5000/api
```

## Run

```bash
npm run dev
```

Frontend runs at `http://localhost:5173`; backend runs at `http://localhost:5000`.

## Seed

```bash
npm run seed
```

Admin login:

- Email: `70studio.ai@gmail.com`
- Password: `admin123`

Admin panel: `http://localhost:5173/admin/login`

## Production

```bash
npm run build
npm start
```
