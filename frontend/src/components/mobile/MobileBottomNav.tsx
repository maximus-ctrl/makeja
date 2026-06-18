import { Link, useLocation } from 'react-router-dom';
import { Building2, Heart, Home, Search, UserRound } from 'lucide-react';

const items = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/search', label: 'Search', icon: Search },
  { to: '/provider', label: 'Provider', icon: Building2 },
  { to: '/admin', label: 'Admin', icon: Heart },
  { to: '/login', label: 'Profile', icon: UserRound },
];

export function MobileBottomNav() {
  const location = useLocation();
  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
      {items.map((item) => {
        const Icon = item.icon;
        const active = location.pathname === item.to || (item.to !== '/' && location.pathname.startsWith(item.to));
        return (
          <Link key={item.to} to={item.to} className={active ? 'active' : ''}>
            <Icon size={19} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
