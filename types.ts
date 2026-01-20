export enum UserRole {
  GUEST = 'GUEST',
  SCHOLAR = 'SCHOLAR',
  PROVIDER = 'PROVIDER',
  ADMIN = 'ADMIN'
}

export enum ServiceOption {
  JUST_HANG = 'JUST_HANG', // Provide poster to me onsite
  PRINT_AND_HANG = 'PRINT_AND_HANG', // I print and hang
  DESIGN_PRINT_HANG = 'DESIGN_PRINT_HANG' // I design, print, and hang
}

export interface Conference {
  id: string;
  name: string;
  acronym: string;
  location: string;
  dates: string;
  tags: string[];
  imageUrl: string;
  providerCount: number;
  basePrice: number; // The lowest fee usually
}

export interface ServiceListing {
  id: string;
  providerName: string;
  conferenceId: string;
  fee: number;
  canPrint: boolean;
  canDesign: boolean;
  maxSlots: number;
  rating: number;
}

export interface OrderDraft {
  conferenceId: string;
  providerId?: string;
  needsPrinting: boolean;
  needsDesign: boolean;
  deliveryMethod: 'MAIL_TO_VENUE' | 'PRINT_LOCAL';
  totalPrice: number;
  contactName: string;
  contactEmail: string;
}

export interface ProviderProfile {
  name: string;
  institution: string;
  verified: boolean;
  listings: ServiceListing[];
}