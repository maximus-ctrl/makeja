import { type FormEvent, useEffect, useState } from 'react';
import { Building2, MapPin, Plus } from 'lucide-react';
import { api } from '../../lib/apiClient';

const demoProperties = [
  { id: 1, title: 'Kilimani Heights', address: 'Kilimani, Nairobi', units_count: 12, available_units_count: 4, claim_status: 'owner_claimed' },
  { id: 2, title: 'South B Court', address: 'South B, Nairobi', units_count: 18, available_units_count: 7, claim_status: 'approved' },
  { id: 3, title: 'CBD Mall Shops', address: 'Moi Avenue, Nairobi', units_count: 9, available_units_count: 2, claim_status: 'makeja_managed' },
];

export function ProviderPropertiesPage() {
  const [properties, setProperties] = useState<any[]>(demoProperties);
  const [title, setTitle] = useState('');
  async function load() {
    try {
      const r = await api.get('/provider/properties');
      setProperties((r.data.data || []).length ? r.data.data : demoProperties);
    } catch { setProperties(demoProperties); }
  }
  useEffect(() => { load(); }, []);
  async function add(e: FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    try { await api.post('/provider/properties', { title, address: 'Kenya' }); } catch { setProperties([{ id: Date.now(), title, address: 'Kenya', units_count: 0, available_units_count: 0, claim_status: 'draft' }, ...properties]); }
    setTitle('');
    load();
  }
  return (
    <div className="container-fluid makeja-container py-4">
      <div className="section-head"><div><span className="section-kicker">Provider</span><h1>Properties</h1></div></div>
      <form onSubmit={add} className="create-property-box">
        <Building2 size={24} />
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Property title e.g. Kilimani Heights" />
        <button className="btn btn-success"><Plus size={18} /> Add</button>
      </form>
      <div className="row g-3 mt-1">
        {properties.map(p => (
          <div className="col-md-6 col-xl-4" key={p.id}>
            <div className="property-manage-card">
              <div className="property-icon"><Building2 size={28} /></div>
              <h3>{p.title}</h3>
              <p><MapPin size={15} /> {p.address}</p>
              <div className="unit-counts"><span>{p.units_count ?? 0} units</span><span>{p.available_units_count ?? 0} available</span></div>
              <div className="trust-badge mt-3">{String(p.claim_status || 'draft').replaceAll('_', ' ')}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
