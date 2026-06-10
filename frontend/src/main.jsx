import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import Work from './pages/Work.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import Contact from './pages/Contact.jsx';
import Login from './pages/admin/Login.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import ClientsAdmin from './pages/admin/ClientsAdmin.jsx';
import RevenueAdmin from './pages/admin/RevenueAdmin.jsx';
import ServicesAdmin from './pages/admin/ServicesAdmin.jsx';
import ProjectsAdmin from './pages/admin/ProjectsAdmin.jsx';
import TeamAdmin from './pages/admin/TeamAdmin.jsx';
import StoriesAdmin from './pages/admin/StoriesAdmin.jsx';
import SubscribersAdmin from './pages/admin/SubscribersAdmin.jsx';
import MessagesAdmin from './pages/admin/MessagesAdmin.jsx';
import SettingsAdmin from './pages/admin/SettingsAdmin.jsx';
import AdminLayout from './pages/admin/AdminLayout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Toaster position="top-right" toastOptions={{ style: { background: '#111', color: '#F5F5F0', border: '1px solid #27272a' } }} />
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<ProjectDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ErrorBoundary>
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            </ErrorBoundary>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="clients" element={<ClientsAdmin />} />
          <Route path="revenue" element={<RevenueAdmin />} />
          <Route path="services" element={<ServicesAdmin />} />
          <Route path="projects" element={<ProjectsAdmin />} />
          <Route path="team" element={<TeamAdmin />} />
          <Route path="stories" element={<StoriesAdmin />} />
          <Route path="subscribers" element={<SubscribersAdmin />} />
          <Route path="messages" element={<MessagesAdmin />} />
          <Route path="settings" element={<SettingsAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
