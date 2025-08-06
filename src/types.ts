export interface TherapistProfile {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  website: string;
  availability: string;
  credentials?: string[];
  aiMatchScore?: number;
}

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
  keywords?: string[];
}