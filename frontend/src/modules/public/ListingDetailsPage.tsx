import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Bath, BedDouble, CalendarCheck2, CheckCircle2, Heart, MapPin, MessageCircle, Phone, Share2, ShieldCheck, WalletCards } from 'lucide-react';
import { api } from '../../lib/apiClient';
import type { Listing } from '../../types/listing.types';
import { features } from '../../config/features';
import { demoListings } from '../../data/demoListings';
import { MakejaMap } from '../../components/maps/MakejaMap';

export function ListingDetailsPage() {
  const { id } = useParams();
  const [listing, setListing] = useState<Listing | null>(null);

  useEffect(() => {
    const fallback = demoListings.find(item => String(item.id) === String(id)) || demoListings[0];
    api.get(`/listings/${id}`).then(r => setListing(r.data.listing || fallback)).catch(() => setListing(fallback));
  }, [id]);

  const amenities = useMemo(() => listing?.amenities || ['Parking', 'Water 24/7', 'Secure area', 'Ready now'], [listing]);
  if (!listing) return <div className="container py-5">Loading...</div>;

  const phone = listing.contact_whatsapp || listing.contact_phone;
  const cover = listing.images?.[0]?.url;

  return (
    <div className="container-fluid makeja-container py-4 detail-page">
      <Link to="/search" className="back-link">← Back to search</Link>
      <div className="row g-4 mt-1">
        <div className="col-lg-8">
          <div className="detail-gallery">
            {cover ? <img src={cover} alt={listing.title} /> : <div className="gallery-placeholder">Image gallery</div>}
            <span className="gallery-count">1 / 12</span>
            <div className="gallery-actions">
              <button><Heart size={18} /></button>
              <button><Share2 size={18} /></button>
            </div>
          </div>
          <div className="detail-card mt-3">
            <div className="d-flex flex-wrap justify-content-between gap-3">
              <div>
                <span className="trust-badge large"><ShieldCheck size={16} /> {listing.trust_status.replaceAll('_', ' ')}</span>
                <h1>{listing.title}</h1>
                <p className="location-line"><MapPin size={16} /> {listing.property?.address}</p>
              </div>
              <div className="price-box">KES {Number(listing.price).toLocaleString('en-KE')}<span>{listing.listing_intent === 'buy' ? '' : ' / month'}</span></div>
            </div>
            <div className="spec-grid mt-3">
              <span><BedDouble size={18} /> {listing.unit?.unit_type || 'Property'}</span>
              <span><Bath size={18} /> {amenities[1] || 'Water'}</span>
              <span><CalendarCheck2 size={18} /> Available now</span>
              <span><CheckCircle2 size={18} /> Admin approved</span>
            </div>
            <h2>Description</h2>
            <p className="text-muted">{listing.description}</p>
            <h2>Amenities</h2>
            <div className="amenity-grid">
              {amenities.map((item) => <span key={item}><CheckCircle2 size={16} /> {item}</span>)}
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <aside className="contact-panel">
            <div className="provider-card">
              <div className="avatar">{listing.contact_name?.[0] || 'M'}</div>
              <div><strong>{listing.contact_name || 'Makeja Provider'}</strong><span>Verified provider</span></div>
            </div>
            <div className="d-grid gap-2 mt-3">
              {phone && <a href={`tel:${phone}`} className="btn btn-success btn-lg"><Phone size={18} /> Call Provider</a>}
              {features.whatsapp && phone && <a href={`https://wa.me/${phone.replace(/\D/g, '')}`} className="btn btn-outline-success btn-lg"><MessageCircle size={18} /> WhatsApp</a>}
            </div>
            {features.mpesaStk && (
              <div className="mpesa-box mt-3">
                <WalletCards size={20} />
                <div><strong>Pay securely with M-Pesa</strong><span>STK prompt available for enabled units.</span></div>
                <Link to="/pay/mpesa" className="btn btn-light btn-sm">Send STK Prompt</Link>
              </div>
            )}
            <div className="mini-map mt-3"><MakejaMap listings={[listing]} compact /></div>
            <div className="small text-muted mt-3">Listed by {listing.contact_name || 'Makeja'} · Response time usually within 1 hour.</div>
          </aside>
        </div>
      </div>
    </div>
  );
}
