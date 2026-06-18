import { useEffect, useMemo, useRef, useState } from 'react';
import { MapPin, Navigation, SlidersHorizontal } from 'lucide-react';
import { features } from '../../config/features';
import type { Listing } from '../../types/listing.types';

declare global {
  interface Window {
    google?: any;
    __makejaGoogleMapsLoading?: Promise<void>;
  }
}

function loadGoogleMaps(apiKey: string) {
  if (window.google?.maps) return Promise.resolve();
  if (window.__makejaGoogleMapsLoading) return window.__makejaGoogleMapsLoading;
  window.__makejaGoogleMapsLoading = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Google Maps failed to load'));
    document.head.appendChild(script);
  });
  return window.__makejaGoogleMapsLoading;
}

function fallbackPins(listings: Listing[]) {
  const defaults = [
    { x: 24, y: 32 }, { x: 62, y: 44 }, { x: 43, y: 70 }, { x: 76, y: 26 }, { x: 15, y: 63 },
  ];
  return listings.slice(0, 5).map((listing, index) => ({ listing, ...defaults[index % defaults.length] }));
}

export function MakejaMap({ listings = [], compact = false }: { listings?: Listing[]; compact?: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [hasGoogleMap, setHasGoogleMap] = useState(false);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;
  const pins = useMemo(() => fallbackPins(listings), [listings]);

  useEffect(() => {
    if (!features.maps || !apiKey || !ref.current) return;
    let cancelled = false;
    loadGoogleMaps(apiKey)
      .then(() => {
        if (cancelled || !ref.current || !window.google?.maps) return;
        const center = { lat: -1.286389, lng: 36.817223 };
        const map = new window.google.maps.Map(ref.current, {
          center,
          zoom: compact ? 12 : 11,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        });
        listings.forEach((listing) => {
          const lat = Number(listing.property?.latitude);
          const lng = Number(listing.property?.longitude);
          if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;
          new window.google.maps.Marker({
            position: { lat, lng },
            map,
            title: listing.title,
            label: `KES ${Math.round(Number(listing.price) / 1000)}k`,
          });
        });
        setHasGoogleMap(true);
      })
      .catch(() => setHasGoogleMap(false));
    return () => { cancelled = true; };
  }, [apiKey, compact, listings]);

  return (
    <div className={`makeja-map ${compact ? 'makeja-map-compact' : ''}`}>
      <div ref={ref} className={`google-map-layer ${hasGoogleMap ? 'is-visible' : ''}`} />
      {!hasGoogleMap && (
        <div className="map-fallback">
          <div className="map-roads" />
          <div className="map-water" />
          <div className="map-road road-a" />
          <div className="map-road road-b" />
          <div className="map-road road-c" />
          {pins.length ? pins.map(({ listing, x, y }) => (
            <span key={listing.id} className="map-price-pin" style={{ left: `${x}%`, top: `${y}%` }}>
              KES {Math.round(Number(listing.price) / 1000)}k
            </span>
          )) : (
            <>
              <span className="map-price-pin" style={{ left: '26%', top: '31%' }}>KES 8k</span>
              <span className="map-price-pin" style={{ left: '60%', top: '45%' }}>KES 25k</span>
              <span className="map-price-pin" style={{ left: '42%', top: '72%' }}>Shop</span>
            </>
          )}
          <span className="map-current-dot" />
          <div className="map-floating-tools">
            <button className="map-tool" type="button"><Navigation size={16} /></button>
            <button className="map-tool" type="button"><SlidersHorizontal size={16} /></button>
          </div>
          <div className="map-caption"><MapPin size={15} /> Map-ready view. Add Google Maps key for live pins.</div>
        </div>
      )}
    </div>
  );
}
