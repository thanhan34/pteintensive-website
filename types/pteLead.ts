export type PteLead = {
  id?: string;
  name: string;
  phone: string;
  target: string;
  source: 'reviews_cta';
  createdAt?: unknown;
  status?: 'new' | 'contacted' | 'converted';
};