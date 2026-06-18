import { type FormEvent, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LockKeyhole, Mail, ShieldCheck } from 'lucide-react';
import { api, setAuthToken } from '../../lib/apiClient';

export function LoginPage() {
  const [email, setEmail] = useState('admin@makeja.test');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  async function submit(e: FormEvent) {
    e.preventDefault();
    setError('');
    try {
      const r = await api.post('/auth/login', { email, password });
      setAuthToken(r.data.token);
      const role = r.data.user.role;
      navigate(role.includes('admin') ? '/admin' : role === 'provider' ? '/provider' : '/search');
    } catch (err: any) { setError(err.response?.data?.message || 'Login failed'); }
  }
  return (
    <div className="auth-page container-fluid makeja-container py-5">
      <div className="auth-shell">
        <div className="auth-side"><span className="brand-mark">M</span><h1>Welcome back to Makeja.</h1><p>Find, connect and manage properties from one simple system.</p><div><ShieldCheck size={18} /> Secure provider/client access</div></div>
        <div className="auth-card card"><div className="card-body p-4 p-md-5"><h2>Login</h2><p className="text-muted">Use your demo admin account or your own user credentials.</p>{error && <div className="alert alert-danger">{error}</div>}<form onSubmit={submit}><label className="form-label">Email</label><div className="auth-input"><Mail size={18} /><input value={email} onChange={e => setEmail(e.target.value)} /></div><label className="form-label">Password</label><div className="auth-input"><LockKeyhole size={18} /><input type="password" value={password} onChange={e => setPassword(e.target.value)} /></div><button className="btn btn-success w-100 btn-lg mt-3">Login</button></form><p className="small mt-3 mb-0">No account? <Link to="/register">Register</Link></p></div></div>
      </div>
    </div>
  );
}
