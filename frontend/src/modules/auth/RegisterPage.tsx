import { type FormEvent, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, UserRound } from 'lucide-react';
import { api, setAuthToken } from '../../lib/apiClient';

export function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: 'password123', role: 'client', business_name: '' });
  const nav = useNavigate();
  const [error, setError] = useState('');
  const set = (k: string, v: string) => setForm({ ...form, [k]: v });
  async function submit(e: FormEvent) {
    e.preventDefault();
    setError('');
    try { const r = await api.post('/auth/register', form); setAuthToken(r.data.token); nav(form.role === 'provider' ? '/provider' : '/search'); }
    catch (err: any) { setError(err.response?.data?.message || 'Registration failed'); }
  }
  return (
    <div className="auth-page container-fluid makeja-container py-5">
      <div className="auth-card card mx-auto"><div className="card-body p-4 p-md-5"><h1>Create Account</h1><p className="text-muted">Choose client access for finding places or provider access to list/manage property.</p>{error && <div className="alert alert-danger">{error}</div>}<form onSubmit={submit}><div className="row g-2 mb-3"><div className="col-6"><button type="button" className={`role-tile ${form.role === 'client' ? 'active' : ''}`} onClick={() => set('role', 'client')}><UserRound size={22} /> Client/User</button></div><div className="col-6"><button type="button" className={`role-tile ${form.role === 'provider' ? 'active' : ''}`} onClick={() => set('role', 'provider')}><Building2 size={22} /> Provider</button></div></div><input className="form-control mb-2" placeholder="Name" value={form.name} onChange={e => set('name', e.target.value)} /><input className="form-control mb-2" placeholder="Email" value={form.email} onChange={e => set('email', e.target.value)} /><input className="form-control mb-2" placeholder="Phone" value={form.phone} onChange={e => set('phone', e.target.value)} />{form.role === 'provider' && <input className="form-control mb-2" placeholder="Business/Provider Name" value={form.business_name} onChange={e => set('business_name', e.target.value)} />}<input className="form-control mb-3" type="password" value={form.password} onChange={e => set('password', e.target.value)} /><button className="btn btn-success w-100 btn-lg">Register</button></form><p className="small mt-3 mb-0">Already registered? <Link to="/login">Login</Link></p></div></div>
    </div>
  );
}
