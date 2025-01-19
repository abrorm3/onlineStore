export type tokenType = string | number | null;

export interface Profile {
  type?: 'furniture' | 'equipment' | 'stationary' | 'part' | string;
  available?: boolean;
  backlog?: number;
  [key: string]: any;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  sku: string;
  cost: number;
  profile: Profile;
}
