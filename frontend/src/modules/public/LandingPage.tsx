import { Link, useNavigate } from 'react-router-dom';
import { type FormEvent, useState } from 'react';
import { Building2, CheckCircle2, Home, Hotel, Landmark, MapPin, Navigation, ShieldCheck, Store, WalletCards } from 'lucide-react';
import { ListingCard } from '../../components/ListingCard';
import { MakejaMap } from '../../components/maps/MakejaMap';
import { demoListings } from '../../data/demoListings';

const categories = [
  { label: 'Homes', icon: Home, hint: 'Bedsitters, apartments, maisonettes' },
  { label: 'Short Stay', icon: Hotel, hint: 'Hotels, motels, lodging, stays' },
  { label: 'Business Spaces', icon: Store, hint: 'Offices, shops, go-downs, grounds' },
  { label: 'Land', icon: Landmark, hint: 'Plots, acres, farm rentals' },
];

export function LandingPage() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const submit = (e: FormEvent) => {
    e.preventDefault();
    navigate(`/search?search=${encodeURIComponent(search)}`);
  };

  return (
    <>
      <section className="hero-section premium-hero">
        <div className="container-fluid makeja-container py-4 py-lg-5">
          <div className="row align-items-center g-4">
            <div className="col-lg-6">
              <span className="eyebrow"><span>🇰🇪</span> Kenyan built · globally useful</span>
              <h1 className="hero-title">Find your next home, space, stay, or land.</h1>
              <p className="hero-text">Makeja keeps property discovery simple: check available places near you, compare costs, and contact the responsible owner/provider.</p>
              <form onSubmit={submit} className="hero-search shadow-soft">
                <MapPin size={20} />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search area, estate, town, landmark..." />
                <button className="btn btn-success">Search</button>
              </form>
              <div className="hero-actions">
                <Link to="/search" className="btn btn-makeja-dark"><Navigation size={18} /> Search near me</Link>
                <Link to="/provider" className="btn btn-outline-success"><Building2 size={18} /> List property</Link>
              </div>
              <div className="trust-row">
                <span><ShieldCheck size={16} /> Owner claimed</span>
                <span><WalletCards size={16} /> M-Pesa STK</span>
                <span><CheckCircle2 size={16} /> Admin approved</span>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-device-panel">
                <MakejaMap listings={demoListings} />
                <div className="provider-mini-card">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <strong>Provider Dashboard</strong>
                    <Link to="/provider">View all</Link>
                  </div>
                  <div className="row g-2">
                    <div className="col-4"><div><b>24</b><span>Properties</span></div></div>
                    <div className="col-4"><div><b>85</b><span>Units</span></div></div>
                    <div className="col-4"><div><b>61</b><span>Available</span></div></div>
                  </div>
                  <Link to="/provider/properties" className="btn btn-success w-100 mt-3">Manage Properties</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-fluid makeja-container section-pad pt-3">
        <div className="category-grid">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link key={cat.label} to={`/search?category=${encodeURIComponent(cat.label)}`} className="category-tile text-decoration-none">
                <Icon size={28} />
                <strong>{cat.label}</strong>
                <span>{cat.hint}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="container-fluid makeja-container section-pad">
        <div className="section-head">
          <div>
            <span className="section-kicker">Popular Listings Near You</span>
            <h2>Simple choices, clear prices.</h2>
          </div>
          <Link to="/search" className="view-link">View all listings →</Link>
        </div>
        <div className="row g-3">
          {demoListings.map((listing) => (
            <div key={listing.id} className="col-md-6 col-xl-3"><ListingCard listing={listing} featured /></div>
          ))}
        </div>
      </section>

      <section className="container-fluid makeja-container pb-5">
        <div className="value-strip">
          <div><ShieldCheck size={28} /><strong>Trusted & Verified</strong><span>Owner verified properties</span></div>
          <div><WalletCards size={28} /><strong>Secure Payments</strong><span>M-Pesa powered STK</span></div>
          <div><MapPin size={28} /><strong>Map First</strong><span>Discover near you</span></div>
          <div><Home size={28} /><strong>For Everyone</strong><span>Simple for all ages</span></div>
        </div>
      </section>
    </>
  );
}
