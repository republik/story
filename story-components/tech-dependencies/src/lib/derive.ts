import type { Dataset, Service, Company, Location } from '../types.d.ts';

export type ActiveService = Service & {
  vendor: Company;
  infra: Company[];
};

/** Returns services that were active on the given date */
export function activeServicesAt(dataset: Dataset, date: string): ActiveService[] {
  const companyMap = new Map<string, Company>(dataset.companies.map((c) => [c.id, c]));

  return dataset.services
    .filter((s) => {
      const started = s.from <= date;
      const ended = s.to != null && s.to <= date;
      return started && !ended;
    })
    .map((s) => {
      const vendor = companyMap.get(s.vendorId);
      if (!vendor) throw new Error(`Company not found: ${s.vendorId}`);
      const infra = (s.infraIds ?? []).map((id) => {
        const c = companyMap.get(id);
        if (!c) throw new Error(`Company not found: ${id}`);
        return c;
      });
      return { ...s, vendor, infra };
    });
}

export interface MapDot {
  country: string;
  city: string;
  lat: number;
  lng: number;
  role: Location['role'];
  /** Companies headquartered at this location */
  companies: Company[];
  /** Total direct CHF/year from services whose vendor HQ is this location */
  totalCHF: number;
  /** True if this is an infra provider location (not a direct vendor) */
  infraOnly: boolean;
}

/**
 * Aggregates active services into map dots.
 * Each unique (lat, lng) becomes one dot. Dots are sized by totalCHF.
 * Infrastructure-only locations get a dot but no CHF (they're not direct spend).
 */
export function mapDots(active: ActiveService[]): MapDot[] {
  const dotMap = new Map<string, MapDot>();

  function key(lat: number, lng: number) {
    return `${lat.toFixed(2)},${lng.toFixed(2)}`;
  }

  function upsert(loc: Location, company: Company, chf: number, infraOnly: boolean) {
    const k = key(loc.lat, loc.lng);
    if (!dotMap.has(k)) {
      dotMap.set(k, {
        country: loc.country,
        city: loc.city ?? '',
        lat: loc.lat,
        lng: loc.lng,
        role: loc.role,
        companies: [],
        totalCHF: 0,
        infraOnly,
      });
    }
    const dot = dotMap.get(k)!;
    if (!dot.companies.find((c) => c.id === company.id)) {
      dot.companies.push(company);
    }
    dot.totalCHF += chf;
    if (!infraOnly) dot.infraOnly = false;
  }

  for (const svc of active) {
    for (const loc of svc.vendor.hqs) {
      upsert(loc, svc.vendor, svc.annualCostCHF, false);
    }
    for (const infraCompany of svc.infra) {
      for (const loc of infraCompany.hqs) {
        upsert(loc, infraCompany, 0, true);
      }
    }
  }

  return [...dotMap.values()].sort((a, b) => b.totalCHF - a.totalCHF);
}

export interface SankeyNode {
  id: string;
  label: string;
  type: 'origin' | 'category' | 'vendor' | 'region';
  totalCHF: number;
}

export interface SankeyEdge {
  source: string;
  target: string;
  valueCHF: number;
}

export interface SankeyData {
  nodes: SankeyNode[];
  edges: SankeyEdge[];
}

const CATEGORY_LABELS: Record<string, string> = {
  hosting: 'Hosting',
  infrastructure: 'Infrastructure',
  database: 'Database',
  search: 'Search',
  cdn: 'CDN',
  domains: 'Domains',
  cms: 'CMS',
  email: 'Email',
  newsletter: 'Newsletter',
  communication: 'Communication',
  office: 'Office',
  productivity: 'Productivity',
  'password-manager': 'Passwords',
  auth: 'Auth',
  analytics: 'Analytics',
  monitoring: 'Monitoring',
  'dev-tools': 'Dev Tools',
  'source-control': 'Source Control',
  design: 'Design',
  'media-hosting': 'Media Hosting',
  'media-production': 'Media Production',
  ai: 'AI',
  translation: 'Translation',
  'customer-support': 'Support',
  compliance: 'Compliance',
  payments: 'Payments',
  other: 'Other',
};

const COUNTRY_NAMES: Record<string, string> = {
  US: '🇺🇸 United States',
  CH: '🇨🇭 Switzerland',
  DE: '🇩🇪 Germany',
  NL: '🇳🇱 Netherlands',
  FR: '🇫🇷 France',
  GB: '🇬🇧 United Kingdom',
  SE: '🇸🇪 Sweden',
  DK: '🇩🇰 Denmark',
  IE: '🇮🇪 Ireland',
  CA: '🇨🇦 Canada',
  AU: '🇦🇺 Australia',
  IT: '🇮🇹 Italy',
};

function countryLabel(code: string): string {
  return COUNTRY_NAMES[code] ?? code;
}

function vendorRegion(country: string): { id: string; label: string } {
  if (country === 'US') return { id: 'region:US', label: '🇺🇸 USA' };
  if (EU_COUNTRIES.has(country)) return { id: 'region:EU', label: '🇪🇺 EU / CH' };
  return { id: 'region:other', label: '🌐 Other' };
}

/**
 * Builds Sankey data: Republik → Category → Vendor → Region
 *
 * Region collapses individual vendor countries into USA / EU+CH / Other,
 * matching the sovereignty bar in the Totals panel.
 */
export function sankeyEdges(active: ActiveService[]): SankeyData {
  const nodes = new Map<string, SankeyNode>();
  const edgeMap = new Map<string, SankeyEdge>();

  function ensureNode(id: string, label: string, type: SankeyNode['type'], chf = 0) {
    if (!nodes.has(id)) {
      nodes.set(id, { id, label, type, totalCHF: 0 });
    }
    nodes.get(id)!.totalCHF += chf;
  }

  function ensureEdge(source: string, target: string, chf: number) {
    const k = `${source}→${target}`;
    if (!edgeMap.has(k)) {
      edgeMap.set(k, { source, target, valueCHF: 0 });
    }
    edgeMap.get(k)!.valueCHF += chf;
  }

  ensureNode('republik', 'Republik', 'origin');

  for (const svc of active) {
    const chf = svc.annualCostCHF;
    const catId = `cat:${svc.category}`;
    const vendorId = `vendor:${svc.vendorId}`;
    const primaryCountry = svc.vendor.hqs[0]?.country ?? 'XX';
    const region = vendorRegion(primaryCountry);

    ensureNode('republik', 'Republik', 'origin', chf);
    ensureNode(catId, CATEGORY_LABELS[svc.category] ?? svc.category, 'category', chf);
    ensureNode(vendorId, svc.vendor.name, 'vendor', chf);
    ensureNode(region.id, region.label, 'region', chf);

    ensureEdge('republik', catId, chf);
    ensureEdge(catId, vendorId, chf);
    ensureEdge(vendorId, region.id, chf);
  }

  return {
    nodes: [...nodes.values()],
    edges: [...edgeMap.values()].filter((e) => e.valueCHF > 0),
  };
}

// ISO-3166 alpha-2 codes considered "European" for the sovereignty breakdown.
// Includes EU member states, EEA, and other European countries.
const EU_COUNTRIES = new Set([
  'AT','BE','BG','CY','CZ','DE','DK','EE','ES','FI','FR','GR','HR','HU',
  'IE','IT','LT','LU','LV','MT','NL','PL','PT','RO','SE','SI','SK',
  // Non-EU European
  'CH','NO','IS','LI','GB','AL','BA','ME','MK','RS','XK','MD','UA','GE',
]);

export interface Totals {
  totalCHF: number;
  serviceCount: number;
  vendorCount: number;
  /** CHF/year to companies whose primary HQ is in the US */
  usCHF: number;
  usPct: number;
  /** CHF/year to companies whose primary HQ is in Europe (incl. CH) */
  euCHF: number;
  euPct: number;
  /** CHF/year to companies outside US and Europe */
  otherCHF: number;
  otherPct: number;
  /** CHF/year flowing to companies flagged as bigTech */
  bigTechCHF: number;
  bigTechPct: number;
}

export function computeTotals(active: ActiveService[]): Totals {
  const total = active.reduce((s, sv) => s + sv.annualCostCHF, 0);
  const vendorIds = new Set(active.map((s) => s.vendorId));

  const usCHF = active
    .filter((s) => s.vendor.hqs[0]?.country === 'US')
    .reduce((s, sv) => s + sv.annualCostCHF, 0);

  const euCHF = active
    .filter((s) => {
      const c = s.vendor.hqs[0]?.country;
      return c !== 'US' && c != null && EU_COUNTRIES.has(c);
    })
    .reduce((s, sv) => s + sv.annualCostCHF, 0);

  const otherCHF = total - usCHF - euCHF;

  const bigTechCHF = active
    .filter((s) => s.vendor.bigTech === true)
    .reduce((s, sv) => s + sv.annualCostCHF, 0);

  const pct = (v: number) => (total > 0 ? Math.round((v / total) * 100) : 0);

  return {
    totalCHF: total,
    serviceCount: active.length,
    vendorCount: vendorIds.size,
    usCHF,
    usPct: pct(usCHF),
    euCHF,
    euPct: pct(euCHF),
    otherCHF,
    otherPct: pct(otherCHF),
    bigTechCHF,
    bigTechPct: pct(bigTechCHF),
  };
}
