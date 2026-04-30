export type ISODate = string; // 'YYYY-MM-DD'
export type CountryCode = string; // ISO-3166 alpha-2

export type CompanySize = 'micro' | 'small' | 'medium' | 'large' | 'mega';
export type LegalStructure =
  | 'for-profit'
  | 'cooperative'
  | 'non-profit'
  | 'foundation'
  | 'public';

export interface Location {
  country: CountryCode;
  city?: string;
  lat: number;
  lng: number;
  /** Role of this location for the company */
  role?: 'primary-hq' | 'secondary-hq' | 'data-center' | 'legal-entity';
}

export interface Company {
  id: string;
  name: string;
  /** Points to parent company id (e.g. heroku -> salesforce) */
  parentId?: string;
  /** Multi-HQ supported (e.g. Elastic: NL + SF) */
  hqs: Location[];
  size?: CompanySize;
  employees?: number;
  publiclyTraded?: boolean;
  legalStructure?: LegalStructure;
  /** Curated flag for FAANG-tier companies — not derived from other fields */
  bigTech?: boolean;
  url?: string;
  notes?: string;
}

export type Category =
  | 'hosting'
  | 'infrastructure'
  | 'database'
  | 'search'
  | 'cdn'
  | 'domains'
  | 'cms'
  | 'email'
  | 'newsletter'
  | 'communication'
  | 'office'
  | 'productivity'
  | 'password-manager'
  | 'auth'
  | 'analytics'
  | 'monitoring'
  | 'dev-tools'
  | 'source-control'
  | 'design'
  | 'media-hosting'
  | 'media-production'
  | 'ai'
  | 'translation'
  | 'customer-support'
  | 'compliance'
  | 'payments'
  | 'other';

export interface Service {
  id: string;
  category: Category;
  /** Human-readable product name, e.g. "Heroku" or "Google Workspace (Gmail)" */
  product: string;
  /** FK -> Company.id */
  vendorId: string;
  /** FK[] -> Company.id — the underlying infrastructure providers */
  infraIds?: string[];
  /** Groups multi-category products under one contract, e.g. "gws-2026" */
  bundleId?: string;
  /** ISO-3166 alpha-2 country codes where Republik's data physically lives */
  dataResidency?: CountryCode[];
  /** Invoice destination country — may differ from vendor HQ */
  paymentRecipientCountry?: CountryCode;
  annualCostCHF: number;
  costModel?: 'flat' | 'per-seat' | 'usage';
  seats?: number;
  deployment?: 'saas' | 'self-hosted' | 'managed';
  /** True if the underlying software is open source */
  openSource?: boolean;
  /** Date when Republik started using this service */
  from: ISODate;
  /** Date when Republik stopped using this service; undefined = still active */
  to?: ISODate;
  /** Service id that replaced this one */
  replacedById?: string;
  /** Service id that this one replaced */
  replacesId?: string;
  description?: string;
  url?: string;
}

export interface MigrationEvent {
  id: string;
  date: ISODate;
  title: string;
  description?: string;
  /** Service ids being retired in this event */
  fromServiceIds: string[];
  /** Service ids being introduced in this event */
  toServiceIds: string[];
  /** Net cost change in CHF/year; can be derived from service records but explicit is clearer */
  costDeltaCHF?: number;
}

export interface Dataset {
  organization: { name: string; country: CountryCode };
  /** Earliest date in the dataset */
  asOfMin: ISODate;
  /** Latest date in the dataset (today or the most recent event date) */
  asOfMax: ISODate;
  companies: Company[];
  services: Service[];
  events: MigrationEvent[];
}
