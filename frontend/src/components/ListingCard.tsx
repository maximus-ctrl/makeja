import { Link } from 'react-router-dom';
import { Bath, BedDouble, Heart, MapPin, ShieldCheck } from 'lucide-react';
import type { Listing } from '../types/listing.types';

function trustLabel(status: string) {
  return status.replaceAll('_', ' ');
}

export function ListingCard({ listing, featured = false }: { listing: Listing; featured?: boolean }) {
  const price = Number(listing.price).toLocaleString('en-KE');
  const cover = listing.images?.[0]?.url;
  return (
    <div className={`listing-card card h-100 ${featured ? 'featured' : ''}`}>
      <div className="listing-image-wrap">
        {cover ? <img src={cover} className="listing-image" alt={listing.title} /> : <div className="listing-image no-image">No image</div>}
        <span className="listing-pill intent">{listing.listing_intent.replace('_', ' ')}</span>
        <button className="save-chip" aria-label="Save listing"><Heart size={17} /></button>
      </div>
      <div className="card-body">
        <div className="d-flex justify-content-between gap-2">
          <h5 className="card-title mb-1">{listing.title}</h5>
          <span className="trust-badge"><ShieldCheck size={14} /> {trustLabel(listing.trust_status)}</span>
        </div>
        <p className="location-line"><MapPin size={14} /> {listing.property?.address || 'Location available on request'}</p>
        <div className="price-line">KES {price}<span>{listing.listing_intent === 'buy' ? '' : ' / month'}</span></div>
        <div className="mini-specs">
          <span><BedDouble size={15} /> {listing.unit?.unit_type || 'Unit'}</span>
          <span><Bath size={15} /> {listing.amenities?.[1] || 'Ready'}</span>
        </div>
        <p className="card-text small text-muted two-line">{listing.description}</p>
        <Link to={`/listings/${listing.id}`} className="btn btn-outline-success w-100">View Details</Link>
      </div>
    </div>
  );
}
