import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Building2, Home, Hotel, Landmark, ListFilter, Search, Store } from 'lucide-react';
import { api } from '../../lib/apiClient';
import { ListingCard } from '../../components/ListingCard';
import { MakejaMap } from '../../components/maps/MakejaMap';
import { demoListings } from '../../data/demoListings';
import type { Listing } from '../../types/listing.types';

const filters = [
  { label: 'Homes', icon: Home },
  { label: 'Short Stay', icon: Hotel },
  { label: 'Business Spaces', icon: Store },
  { label: 'Land', icon: Landmark },
];

export function SearchPage() {
  const [params] = useSearchParams();
  const [listings, setListings] = useState<Listing[]>(demoListings);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(params.get('search') || '');
  const [category, setCategory] = useState(params.get('category') || '');
  const [maxPrice, setMaxPrice] = useState('');

  async function load() {
    setLoading(true);
    try {
      const res = await api.get('/listings', { params: { search, max_price: maxPrice || undefined } });
      const data = res.data.data || [];
      setListings(data.length ? data : demoListings);
    } catch {
      setListings(demoListings);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return listings.filter((listing) => {
      const haystack = `${listing.title} ${listing.description} ${listing.property?.address} ${listing.unit?.unit_type}`.toLowerCase();
      const withinTerm = !term || haystack.includes(term);
      const withinPrice = !maxPrice || Number(listing.price) <= Number(maxPrice);
      return withinTerm && withinPrice;
    });
  }, [listings, maxPrice, search]);

  return (
    <div className="container-fluid makeja-container py-4 search-page">
      <div className="search-top-panel">
        <div>
          <span className="eyebrow small-eyebrow"><Building2 size={15} /> Find. Compare. Contact.</span>
          <h1>Find available places near you.</h1>
          <p>Search houses, stays, shops, land and spaces with map-first discovery.</p>
        </div>
        <div className="search-box-row">
          <div className="search-input-wrap"><Search size={19} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search area, estate, town, landmark..." /></div>
          <input className="price-input" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="Max KES" />
          <button onClick={load} className="btn btn-success"><ListFilter size={18} /> Apply</button>
        </div>
      </div>

      <div className="filter-chips">
        <button className={!category ? 'active' : ''} onClick={() => setCategory('')}>All</button>
        {filters.map((item) => {
          const Icon = item.icon;
          return <button key={item.label} onClick={() => setCategory(item.label)} className={category === item.label ? 'active' : ''}><Icon size={16} /> {item.label}</button>;
        })}
      </div>

      <div className="row g-4 align-items-start">
        <div className="col-lg-7 order-2 order-lg-1">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div><strong>{filtered.length}</strong> listings found</div>
            <span className="small text-muted">Demo listings show when API has no data.</span>
          </div>
          {loading ? <div className="loader-card">Loading listings...</div> : (
            <div className="row g-3">
              {filtered.map(l => <div key={l.id} className="col-md-6"><ListingCard listing={l} /></div>)}
            </div>
          )}
          {!loading && filtered.length === 0 && <div className="alert alert-info">No listings match your filters.</div>}
        </div>
        <div className="col-lg-5 order-1 order-lg-2">
          <div className="sticky-map-panel">
            <MakejaMap listings={filtered.length ? filtered : demoListings} />
          </div>
        </div>
      </div>
    </div>
  );
}
