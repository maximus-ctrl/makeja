export type Listing = {
  id: number;
  title: string;
  description?: string;
  listing_intent: 'rent' | 'buy' | 'short_stay' | 'lease';
  price: string | number;
  deposit?: string | number;
  currency: string;
  status: string;
  trust_status: string;
  contact_name?: string;
  contact_phone?: string;
  contact_whatsapp?: string;
  property?: {
    title: string;
    address?: string;
    latitude?: string | number;
    longitude?: string | number;
  };
  unit?: { unit_name: string; unit_type: string; status: string };
  images?: Array<{ id: number; url: string; is_cover: boolean }>;
  amenities?: string[];
};
