import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, CheckCircle2, Home, MessageSquare, Plus, TrendingUp, Wrench } from 'lucide-react';
import { api } from '../../lib/apiClient';

const fallbackStats = { properties: 24, units: 85, available_units: 61, occupied_units: 24 };

export function ProviderDashboardPage() {
  const [stats, setStats] = useState<any>(fallbackStats);
  useEffect(() => { api.get('/provider/dashboard').then(r => setStats({ ...fallbackStats, ...r.data })).catch(() => setStats(fallbackStats)); }, []);

  const cards = [
    { key: 'properties', label: 'Properties', icon: Building2, note: '+2 this month' },
    { key: 'units', label: 'Total units', icon: Home, note: 'All managed units' },
    { key: 'available_units', label: 'Available units', icon: CheckCircle2, note: 'Ready to list' },
    { key: 'occupied_units', label: 'Occupied units', icon: TrendingUp, note: 'Tracked in dashboard' },
  ];

  return (
    <div className="container-fluid makeja-container py-4 dashboard-page">
      <div className="dashboard-hero provider-hero">
        <div>
          <span className="eyebrow small-eyebrow">Provider workspace</span>
          <h1>Manage properties, units and inquiries from one place.</h1>
          <p>Track available units, provider claims, maintenance and client interest with a simple owner dashboard.</p>
        </div>
        <Link className="btn btn-light" to="/provider/properties"><Plus size={18} /> Add Property</Link>
      </div>

      <div className="row g-3 mt-1">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div className="col-md-6 col-xl-3" key={card.key}>
              <div className="metric-card">
                <span className="metric-icon"><Icon size={22} /></span>
                <div className="text-muted small">{card.label}</div>
                <div className="metric-number">{stats[card.key] ?? 0}</div>
                <div className="metric-note">{card.note}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="row g-3 mt-1">
        <div className="col-lg-7">
          <div className="panel-card">
            <div className="section-head compact"><h2>Recent unit activity</h2><Link to="/provider/properties">Manage →</Link></div>
            <div className="activity-list">
              {['2 Bedroom Apartment · Kilimani · Available', 'Bedsitter · South B · Pending approval', 'Retail Shop · CBD · Makeja Managed', '1/8 Acre Plot · Machakos · Approved'].map((item, i) => (
                <div key={item} className="activity-row"><span>{i + 1}</span><strong>{item}</strong><em>{i % 2 ? 'Pending' : 'Ready'}</em></div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="panel-card">
            <div className="section-head compact"><h2>Management tools</h2></div>
            <div className="tool-grid">
              <Link to="/provider/properties"><Building2 size={22} /> Properties</Link>
              <Link to="/provider/properties"><Home size={22} /> Units</Link>
              <Link to="/provider"><MessageSquare size={22} /> Inquiries</Link>
              <Link to="/provider"><Wrench size={22} /> Maintenance</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
