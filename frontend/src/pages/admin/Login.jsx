import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { api } from '../../api.js';

export default function Login() {
  const [email, setEmail] = useState('70studio.ai@gmail.com');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    try {
      const data = await api('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
      localStorage.setItem('token', data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <section className="flex min-h-screen items-center justify-center bg-base p-5">
      <form onSubmit={submit} className="w-full max-w-md rounded-lg border border-white/10 bg-surface p-8">
        <h1 className="font-display text-4xl font-bold"><span className="text-accent">70</span>studio admin</h1>
        <label className="mt-8 block"><span className="text-sm text-muted">Email</span><input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-lg border border-white/10 bg-base p-4 outline-none focus:border-accent" /></label>
        <label className="mt-5 block"><span className="text-sm text-muted">Password</span><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded-lg border border-white/10 bg-base p-4 outline-none focus:border-accent" /></label>
        <button className="btn btn-accent mt-7 w-full">Login</button>
      </form>
    </section>
  );
}
