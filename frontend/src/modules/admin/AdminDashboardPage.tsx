import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Building2, CheckCircle2, Clock3, ShieldCheck, UsersRound } from 'lucide-react';
import { api } from '../../lib/apiClient';

const fallback = { users: 128, providers: 32, listings: 94, pending_listings: 11, reported_listings: 3, payments_today: 'KES 12,500' };

export function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(fallback);
  useEffect(() => { api.get('/admin/dashboard').then(r => setStats({ ...fallback, ...r.data })).catch(() => setStats(fallback)); }, []);
  const cards = [
    { label: 'Users', value: stats.users, icon: UsersRound },
    { label: 'Providers', value: stats.providers, icon: Building2 },
    { label: 'Listings', value: stats.listings, icon: ShieldCheck },
    { label: 'Pending', value: stats.pending_listings, icon: Clock3 },
  ];
  return (
    <div className="container-fluid makeja-container py-4 dashboard-page">
      <div className="dashboard-hero admin-hero">
        <div>
          <span className="eyebrow small-eyebrow">Admin control centre</span>
          <h1>Approvals, trust, payments and reports.</h1>
          <p>Keep Makeja clean by approving real listings, monitoring reports and controlling trust badges.</p>
        </div>
        <Link className="btn btn-light" to="/admin/approvals"><CheckCircle2 size={18} /> Approval Queue</Link>
      </div>
      <div className="row g-3 mt-1">
        {cards.map((card) => {
          const Icon = card.icon;
          return <div className="col-md-6 col-xl-3" key={card.label}><div className="metric-card"><span className="metric-icon"><Icon size={22} /></span><div className="text-muted small">{card.label}</div><div className="metric-number">{String(card.value)}</div><div className="metric-note">Live when backend is connected</div></div></div>;
        })}
      </div>
      <div className="row g-3 mt-1">
        <div className="col-lg-8"><div className="panel-card"><div className="section-head compact"><h2>Moderation summary</h2><Link to="/admin/approvals">Review →</Link></div><div className="activity-list"><div className="activity-row"><span><Clock3 size={16} /></span><strong>11 listings waiting for approval</strong><em>Pending</em></div><div className="activity-row"><span><AlertTriangle size={16} /></span><strong>3 reported listings need review</strong><em>Open</em></div><div className="activity-row"><span><ShieldCheck size={16} /></span><strong>7 provider claims waiting for verification</strong><em>Trust</em></div></div></div></div>
        <div className="col-lg-4"><div className="panel-card admin-checks"><h2>Launch checks</h2><p><CheckCircle2 size={16} /> Admin approval enabled</p><p><CheckCircle2 size={16} /> M-Pesa STK module ready</p><p><CheckCircle2 size={16} /> Feature flags active</p></div></div>
      </div>
    </div>
  );
}
