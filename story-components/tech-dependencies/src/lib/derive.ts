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

export interface SankeyVendorBreakdown {
  name: string;
  chf: number;
}

export interface SankeyNode {
  id: string;
  label: string;
  type: 'origin' | 'category' | 'vendor' | 'infra' | 'region';
  totalCHF: number;
  /** Vendor or infra breakdown shown on category/region hover in compact views */
  vendors?: SankeyVendorBreakdown[];
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
  newsletter: 'Newsletter',
  communication: 'Kommunikation',
  productivity: 'Produktivität',
  'dev-tools': 'Entwicklungstools',
  'media-production': 'Produktion',
  payments: 'Zahlungen',
  other: 'Andere',
};

const COUNTRY_NAMES: Record<string, string> = {
  US: '🇺🇸 USA',
  CH: '🇨🇭 Schweiz',
  DE: '🇩🇪 Deutschland',
  NL: '🇳🇱 Niederlande',
  FR: '🇫🇷 Frankreich',
  GB: '🇬🇧 Vereinigtes Königreich',
  SE: '🇸🇪 Schweden',
  DK: '🇩🇰 Dänemark',
  IE: '🇮🇪 Irland',
  CA: '🇨🇦 Kanada',
  AU: '🇦🇺 Australien',
  IT: '🇮🇹 Italien',
};

function countryLabel(code: string): string {
  return COUNTRY_NAMES[code] ?? code;
}

function vendorRegion(country: string): { id: string; label: string } {
  if (country === 'US') return { id: 'region:US', label: '🇺🇸 USA' };
  if (EU_COUNTRIES.has(country)) return { id: 'region:EU', label: '🇪🇺 EU / CH' };
  return { id: 'region:other', label: '🌐 Andere' };
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

/**
 * Builds Sankey data: Republik → Category → Region
 *
 * Same sovereignty grouping as sankeyEdges, but skips the vendor column.
 * Category nodes carry a vendor breakdown for tooltips.
 */
export function sankeyEdgesByCategory(active: ActiveService[]): SankeyData {
  const nodes = new Map<string, SankeyNode>();
  const edgeMap = new Map<string, SankeyEdge>();
  const categoryVendors = new Map<string, Map<string, { name: string; chf: number }>>();

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
    const primaryCountry = svc.vendor.hqs[0]?.country ?? 'XX';
    const region = vendorRegion(primaryCountry);

    ensureNode('republik', 'Republik', 'origin', chf);
    ensureNode(catId, CATEGORY_LABELS[svc.category] ?? svc.category, 'category', chf);
    ensureNode(region.id, region.label, 'region', chf);

    ensureEdge('republik', catId, chf);
    ensureEdge(catId, region.id, chf);

    if (!categoryVendors.has(catId)) categoryVendors.set(catId, new Map());
    const vendorMap = categoryVendors.get(catId)!;
    const existing = vendorMap.get(svc.vendorId);
    if (existing) {
      existing.chf += chf;
    } else {
      vendorMap.set(svc.vendorId, { name: svc.vendor.name, chf });
    }
  }

  for (const [catId, vendorMap] of categoryVendors) {
    const node = nodes.get(catId);
    if (node) {
      node.vendors = [...vendorMap.values()].sort((a, b) => b.chf - a.chf);
    }
  }

  return {
    nodes: [...nodes.values()],
    edges: [...edgeMap.values()].filter((e) => e.valueCHF > 0),
  };
}

const INFRA_OTHER_THRESHOLD_CHF = 5000;
const INFRA_OTHER_ID = 'infra:other';

/** Infra providers whose total attributed spend is below the threshold roll into "Andere". */
function smallInfraIds(active: ActiveService[]): Set<string> {
  const totals = new Map<string, number>();
  for (const svc of active) {
    if (svc.infra.length === 0) continue;
    const chfPerInfra = svc.annualCostCHF / svc.infra.length;
    for (const company of svc.infra) {
      totals.set(company.id, (totals.get(company.id) ?? 0) + chfPerInfra);
    }
  }
  return new Set(
    [...totals.entries()]
      .filter(([, total]) => total < INFRA_OTHER_THRESHOLD_CHF)
      .map(([id]) => id),
  );
}

/**
 * Builds Sankey data: Republik → Category → Region
 *
 * Hosting infrastructure view: skips the infra column and routes category
 * directly to region. Region nodes carry an infra-provider breakdown for tooltips.
 * Infra providers below 5'000 CHF/year are rolled into "Andere".
 * Services with no infraIds fall back to the vendor's country.
 */
export function sankeyEdgesInfraByCategory(active: ActiveService[]): SankeyData {
  const nodes = new Map<string, SankeyNode>();
  const edgeMap = new Map<string, SankeyEdge>();
  const rolledUpInfra = smallInfraIds(active);
  const regionInfra = new Map<string, Map<string, { name: string; chf: number }>>();

  function ensureNode(id: string, label: string, type: SankeyNode['type'], chf = 0) {
    if (!nodes.has(id)) nodes.set(id, { id, label, type, totalCHF: 0 });
    nodes.get(id)!.totalCHF += chf;
  }

  function ensureEdge(source: string, target: string, chf: number) {
    const k = `${source}→${target}`;
    if (!edgeMap.has(k)) edgeMap.set(k, { source, target, valueCHF: 0 });
    edgeMap.get(k)!.valueCHF += chf;
  }

  function addRegionInfra(regionId: string, key: string, name: string, chf: number) {
    if (!regionInfra.has(regionId)) regionInfra.set(regionId, new Map());
    const map = regionInfra.get(regionId)!;
    const existing = map.get(key);
    if (existing) existing.chf += chf;
    else map.set(key, { name, chf });
  }

  ensureNode('republik', 'Republik', 'origin');

  for (const svc of active) {
    const chf = svc.annualCostCHF;
    const catId = `cat:${svc.category}`;

    ensureNode('republik', 'Republik', 'origin', chf);
    ensureNode(catId, CATEGORY_LABELS[svc.category] ?? svc.category, 'category', chf);
    ensureEdge('republik', catId, chf);

    if (svc.infra.length > 0) {
      const chfPerInfra = chf / svc.infra.length;
      for (const infraCompany of svc.infra) {
        const rollUp = rolledUpInfra.has(infraCompany.id);
        const infraKey = rollUp ? INFRA_OTHER_ID : infraCompany.id;
        const infraLabel = rollUp ? 'Andere' : infraCompany.name;
        const infraCountry = infraCompany.hqs[0]?.country ?? 'XX';
        const region = vendorRegion(infraCountry);

        ensureNode(region.id, region.label, 'region', chfPerInfra);
        ensureEdge(catId, region.id, chfPerInfra);
        addRegionInfra(region.id, infraKey, infraLabel, chfPerInfra);
      }
    } else {
      const vendorCountry = svc.vendor.hqs[0]?.country ?? 'XX';
      const region = vendorRegion(vendorCountry);
      ensureNode(region.id, region.label, 'region', chf);
      ensureEdge(catId, region.id, chf);
      addRegionInfra(region.id, svc.vendorId, svc.vendor.name, chf);
    }
  }

  for (const [regionId, infraMap] of regionInfra) {
    const node = nodes.get(regionId);
    if (node) {
      node.vendors = [...infraMap.values()].sort((a, b) => b.chf - a.chf);
    }
  }

  return {
    nodes: [...nodes.values()],
    edges: [...edgeMap.values()].filter((e) => e.valueCHF > 0),
  };
}

/**
 * Builds Sankey data: Republik → Company → Hoster → Region
 *
 * Shows which cloud/hosting infrastructure the services actually run on.
 * Services with no infraIds connect the vendor directly to the region column.
 */
export function sankeyEdgesInfra(active: ActiveService[]): SankeyData {
  const nodes = new Map<string, SankeyNode>();
  const edgeMap = new Map<string, SankeyEdge>();

  function ensureNode(id: string, label: string, type: SankeyNode['type'], chf = 0) {
    if (!nodes.has(id)) nodes.set(id, { id, label, type, totalCHF: 0 });
    nodes.get(id)!.totalCHF += chf;
  }

  function ensureEdge(source: string, target: string, chf: number) {
    const k = `${source}→${target}`;
    if (!edgeMap.has(k)) edgeMap.set(k, { source, target, valueCHF: 0 });
    edgeMap.get(k)!.valueCHF += chf;
  }

  ensureNode('republik', 'Republik', 'origin');

  for (const svc of active) {
    const chf = svc.annualCostCHF;
    const vendorId = `vendor:${svc.vendorId}`;

    ensureNode('republik', 'Republik', 'origin', chf);
    ensureNode(vendorId, svc.vendor.name, 'vendor', chf);
    ensureEdge('republik', vendorId, chf);

    if (svc.infra.length > 0) {
      // Split cost equally across infra providers
      const chfPerInfra = chf / svc.infra.length;
      for (const infraCompany of svc.infra) {
        const infraId = `infra:${infraCompany.id}`;
        const infraCountry = infraCompany.hqs[0]?.country ?? 'XX';
        const region = vendorRegion(infraCountry);

        ensureNode(infraId, infraCompany.name, 'infra', chfPerInfra);
        ensureNode(region.id, region.label, 'region', chfPerInfra);
        ensureEdge(vendorId, infraId, chfPerInfra);
        ensureEdge(infraId, region.id, chfPerInfra);
      }
    } else {
      // No known infra — vendor connects directly to region
      const vendorCountry = svc.vendor.hqs[0]?.country ?? 'XX';
      const region = vendorRegion(vendorCountry);
      ensureNode(region.id, region.label, 'region', chf);
      ensureEdge(vendorId, region.id, chf);
    }
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

/**
 * Like computeTotals but sovereignty is measured by the actual hosting
 * infrastructure provider (infra companies), not the direct vendor.
 * Services without explicit infra fall back to the vendor's country.
 */
export function computeTotalsInfra(active: ActiveService[]): Totals {
  const total = active.reduce((s, sv) => s + sv.annualCostCHF, 0);
  const infraIds = new Set<string>();
  let usCHF = 0;
  let euCHF = 0;
  let bigTechCHF = 0;

  for (const svc of active) {
    const chf = svc.annualCostCHF;
    if (svc.infra.length > 0) {
      const share = chf / svc.infra.length;
      for (const company of svc.infra) {
        infraIds.add(company.id);
        const c = company.hqs[0]?.country;
        if (c === 'US') usCHF += share;
        else if (c != null && EU_COUNTRIES.has(c)) euCHF += share;
        if (company.bigTech) bigTechCHF += share;
      }
    } else {
      infraIds.add(svc.vendorId);
      const c = svc.vendor.hqs[0]?.country;
      if (c === 'US') usCHF += chf;
      else if (c != null && EU_COUNTRIES.has(c)) euCHF += chf;
      if (svc.vendor.bigTech) bigTechCHF += chf;
    }
  }

  const otherCHF = total - usCHF - euCHF;
  const pct = (v: number) => (total > 0 ? Math.round((v / total) * 100) : 0);

  return {
    totalCHF: total,
    serviceCount: active.length,
    vendorCount: infraIds.size,
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
