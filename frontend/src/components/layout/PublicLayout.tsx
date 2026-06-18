import { Link, Outlet, useLocation } from 'react-router-dom';
import { Building2, LayoutDashboard, LogIn, Menu, Search, ShieldCheck } from 'lucide-react';
import { appConfig } from '../../config/app';
import { MobileBottomNav } from '../mobile/MobileBottomNav';

export function PublicLayout() {
  const location = useLocation();
  const nav = [
    { to: '/search', label: 'Find Place', icon: Search },
    { to: '/provider', label: 'Provider', icon: Building2 },
    { to: '/admin', label: 'Admin', icon: LayoutDashboard },
  ];

  return (
    <div className="app-shell">
      <nav className="navbar navbar-expand-lg makeja-navbar sticky-top">
        <div className="container-fluid makeja-container">
          <Link className="navbar-brand makeja-brand" to="/">
            <span className="brand-mark">M</span>
            <span>{appConfig.name}</span>
          </Link>
          <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
            <Menu size={24} />
          </button>
          <div className="collapse navbar-collapse" id="nav">
            <div className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
              {nav.map((item) => {
                const Icon = item.icon;
                const active = location.pathname === item.to || location.pathname.startsWith(`${item.to}/`);
                return (
                  <Link key={item.to} className={`nav-link makeja-nav-link ${active ? 'active' : ''}`} to={item.to}>
                    <Icon size={16} /> {item.label}
                  </Link>
                );
              })}
              <Link className="btn btn-makeja-dark btn-sm px-3" to="/login"><LogIn size={16} /> Login</Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="page-content"><Outlet /></main>

      <footer className="makeja-footer">
        <div className="container-fluid makeja-container">
          <div className="row g-3 align-items-center">
            <div className="col-md-4">
              <div className="d-flex align-items-center gap-2 fw-bold"><span className="brand-mark sm">M</span> Makeja</div>
              <div className="text-muted small">Pata place yako. Built for Africa, ready for the world.</div>
            </div>
            <div className="col-md-8">
              <div className="footer-pills justify-content-md-end">
                <span><ShieldCheck size={17} /> Trusted & Verified</span>
                <span>Secure M-Pesa STK</span>
                <span>Map-first discovery</span>
                <span>Mobile & Web</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <MobileBottomNav />
    </div>
  );
}
