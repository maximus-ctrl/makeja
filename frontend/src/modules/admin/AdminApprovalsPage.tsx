import { useEffect, useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { api } from '../../lib/apiClient';
import { demoListings } from '../../data/demoListings';

export function AdminApprovalsPage() {
  const [rows, setRows] = useState<any[]>(demoListings.slice(0, 3));
  async function load() {
    try {
      const r = await api.get('/admin/listings/pending');
      setRows((r.data.data || []).length ? r.data.data : demoListings.slice(0, 3));
    } catch { setRows(demoListings.slice(0, 3)); }
  }
  useEffect(() => { load(); }, []);
  async function approve(id: number) { try { await api.post(`/admin/listings/${id}/approve`); } finally { setRows(rows.filter(r => r.id !== id)); } }
  async function reject(id: number) { try { await api.post(`/admin/listings/${id}/reject`, { reason: 'Not approved' }); } finally { setRows(rows.filter(r => r.id !== id)); } }
  return (
    <div className="container-fluid makeja-container py-4">
      <div className="section-head"><div><span className="section-kicker">Moderation</span><h1>Pending Listings</h1></div></div>
      <div className="panel-card p-0 overflow-hidden">
        <div className="table-responsive">
          <table className="table align-middle table-hover mb-0 approval-table">
            <thead><tr><th>Listing</th><th>Location</th><th>Price</th><th>Trust</th><th className="text-end">Action</th></tr></thead>
            <tbody>
              {rows.map(l => <tr key={l.id}><td><strong>{l.title}</strong><div className="small text-muted">{l.description}</div></td><td>{l.property?.address || 'Kenya'}</td><td>KES {Number(l.price).toLocaleString('en-KE')}</td><td><span className="trust-badge">{String(l.trust_status).replaceAll('_', ' ')}</span></td><td className="text-end"><button onClick={() => approve(l.id)} className="btn btn-sm btn-success me-2"><CheckCircle2 size={15} /> Approve</button><button onClick={() => reject(l.id)} className="btn btn-sm btn-outline-danger"><XCircle size={15} /> Reject</button></td></tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
