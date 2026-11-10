export type AdType = 'lost' | 'found';
export type AdStatus = 'active' | 'found' | 'closed';

export interface Ad {
  id: string;
  type: AdType;
  species: string;
  name: string;
  description: string;
  location: string;
  date: string;
  status: AdStatus;
  photos: string[];
  contacts: { phone: string; name: string };
}

export interface AdFilters {
  type: AdType | 'all';
  species: string | 'all';
}

export interface AdFormValues {
  type: AdType;
  species: string;
  name: string;
  description: string;
  location: string;
  date: string;
  contact_phone: string;
  contact_name: string;
}