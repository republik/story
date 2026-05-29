<script lang="ts">
  import { onMount } from 'svelte';
  import type { ActiveService } from './lib/derive.ts';

  interface Props {
    services: ActiveService[];
  }

  let { services }: Props = $props();

  let containerEl: HTMLDivElement;
  let width = $state(700);

  onMount(() => {
    const ro = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect;
      if (rect) width = rect.width;
    });
    ro.observe(containerEl);
    width = containerEl.clientWidth || 700;
    return () => ro.disconnect();
  });

  // ── Region helpers ──────────────────────────────────────────────────────────
  const EU_COUNTRIES = new Set([
    'AT','BE','BG','CY','CZ','DE','DK','EE','ES','FI','FR','GR','HR','HU',
    'IE','IT','LT','LU','LV','MT','NL','PL','PT','RO','SE','SI','SK',
    'CH','NO','IS','LI','GB','AL','BA','ME','MK','RS','XK','MD','UA','GE',
  ]);

  function region(country: string): 'US' | 'EU' | 'other' {
    if (country === 'US') return 'US';
    if (EU_COUNTRIES.has(country)) return 'EU';
    return 'other';
  }

  // Flat colors: US = steel blue, EU/CH = forest green, other = slate
  const REGION_FILL   = { US: '#1a4d8c', EU: '#2d6a4f', other: '#666' };
  const REGION_LIGHT  = { US: '#d0e4f7', EU: '#c8e6d4', other: '#e0e0e0' };
  const REGION_LABEL  = { US: '🇺🇸 USA', EU: '🇪🇺 EU / CH', other: 'Other' };

  // ── Circle packing ──────────────────────────────────────────────────────────
  interface C { cx: number; cy: number; r: number }

  function overlaps(a: C, b: C): boolean {
    const dx = a.cx - b.cx, dy = a.cy - b.cy;
    return Math.sqrt(dx * dx + dy * dy) < a.r + b.r - 0.5;
  }

  function tangentCandidates(a: C, b: C, r: number): [number, number][] {
    const ra = a.r + r, rb = b.r + r;
    const dx = b.cx - a.cx, dy = b.cy - a.cy;
    const D = Math.sqrt(dx * dx + dy * dy);
    if (D > ra + rb + 0.01 || D < Math.abs(ra - rb) - 0.01 || D < 0.01) return [];
    const cosA = Math.max(-1, Math.min(1, (ra * ra + D * D - rb * rb) / (2 * ra * D)));
    const base = Math.atan2(dy, dx), dA = Math.acos(cosA);
    return [
      [a.cx + ra * Math.cos(base + dA), a.cy + ra * Math.sin(base + dA)],
      [a.cx + ra * Math.cos(base - dA), a.cy + ra * Math.sin(base - dA)],
    ];
  }

  function packCircles(radii: number[]): C[] {
    if (radii.length === 0) return [];

    // Sort largest first, track original indices
    const order = radii.map((r, i) => ({ r, i })).sort((a, b) => b.r - a.r);
    const placed: C[] = [];
    const posMap: Record<number, [number, number]> = {};

    for (const { r, i } of order) {
      let best: [number, number] | null = null;
      let bestDist = Infinity;

      if (placed.length === 0) {
        best = [0, 0];
      } else if (placed.length === 1) {
        best = [placed[0].r + r, 0];
      } else {
        // Try every pair of already-placed circles as tangent anchors
        for (let pi = 0; pi < placed.length; pi++) {
          for (let pj = pi + 1; pj < placed.length; pj++) {
            for (const [cx, cy] of tangentCandidates(placed[pi], placed[pj], r)) {
              const c: C = { cx, cy, r };
              if (!placed.some(p => overlaps(c, p))) {
                const d = Math.sqrt(cx * cx + cy * cy);
                if (d < bestDist) { bestDist = d; best = [cx, cy]; }
              }
            }
          }
        }
        // Fallback: sweep angles around each placed circle
        if (!best) {
          for (const p of placed) {
            for (let a = 0; a < Math.PI * 2; a += 0.12) {
              const cx = p.cx + (p.r + r) * Math.cos(a);
              const cy = p.cy + (p.r + r) * Math.sin(a);
              const c: C = { cx, cy, r };
              if (!placed.some(pl => overlaps(c, pl))) {
                const d = Math.sqrt(cx * cx + cy * cy);
                if (d < bestDist) { bestDist = d; best = [cx, cy]; }
              }
            }
          }
        }
      }

      const [cx, cy] = best ?? [0, 0];
      placed.push({ cx, cy, r });
      posMap[i] = [cx, cy];
    }

    return radii.map((r, i) => ({ r, cx: posMap[i]?.[0] ?? 0, cy: posMap[i]?.[1] ?? 0 }));
  }

  function boundingR(circles: C[]): number {
    if (circles.length === 0) return 0;
    return Math.max(...circles.map(c => Math.sqrt(c.cx * c.cx + c.cy * c.cy) + c.r));
  }

  // ── Derived layout ──────────────────────────────────────────────────────────
  interface ServiceDot { service: ActiveService; cx: number; cy: number; r: number }
  interface Group {
    infraId: string; infraName: string; country: string;
    reg: 'US' | 'EU' | 'other'; fill: string; light: string;
    services: ServiceDot[]; totalCHF: number;
    cx: number; cy: number; boundR: number;
  }

  const GROUP_PAD = 10; // breathing room inside each group circle

  const layout = $derived.by(() => {
    if (services.length === 0) return null;

    const maxChf = Math.max(...services.map(s => s.annualCostCHF), 1);
    // sqrt scale: area proportional to CHF
    const MAX_R = Math.min(48, width * 0.06);
    const svcR = (chf: number) => Math.max(5, MAX_R * Math.sqrt(Math.max(chf, 100) / maxChf));

    // Group by primary infra provider
    const gMap = new Map<string, { infra: ActiveService['infra'][0]; svcs: ActiveService[] }>();
    for (const svc of services) {
      const infra = svc.infra[0] ?? svc.vendor;
      if (!gMap.has(infra.id)) gMap.set(infra.id, { infra, svcs: [] });
      gMap.get(infra.id)!.svcs.push(svc);
    }

    // Build raw group data (unpositioned)
    const raw = [...gMap.values()].map(({ infra, svcs }) => {
      const country = infra.hqs[0]?.country ?? 'XX';
      const reg = region(country);
      const totalCHF = svcs.reduce((s, sv) => s + sv.annualCostCHF, 0);
      const radii = svcs.map(sv => svcR(sv.annualCostCHF));
      const inner = packCircles(radii);
      const bR = boundingR(inner) + GROUP_PAD;
      const svcDots: ServiceDot[] = svcs.map((sv, i) => ({
        service: sv, cx: inner[i].cx, cy: inner[i].cy, r: inner[i].r,
      }));
      return { infraId: infra.id, infraName: infra.name, country, reg,
        fill: REGION_FILL[reg], light: REGION_LIGHT[reg],
        services: svcDots, totalCHF, cx: 0, cy: 0, boundR: bR };
    }).sort((a, b) => b.totalCHF - a.totalCHF);

    // Pack groups
    const gCircles = packCircles(raw.map(g => g.boundR));

    // Measure bounding box
    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    for (let i = 0; i < raw.length; i++) {
      const gc = gCircles[i];
      raw[i].cx = gc.cx; raw[i].cy = gc.cy;
      x0 = Math.min(x0, gc.cx - raw[i].boundR);
      x1 = Math.max(x1, gc.cx + raw[i].boundR);
      y0 = Math.min(y0, gc.cy - raw[i].boundR);
      y1 = Math.max(y1, gc.cy + raw[i].boundR);
    }

    const PAD = 32;
    const availW = width - PAD * 2;
    const scale = availW / Math.max(x1 - x0, 1);
    const offsetX = -x0 * scale + PAD;
    const offsetY = -y0 * scale + PAD;
    const svgH = (y1 - y0) * scale + PAD * 2;

    const groups: Group[] = raw.map(g => ({
      ...g,
      cx: g.cx * scale + offsetX,
      cy: g.cy * scale + offsetY,
      boundR: g.boundR * scale,
      services: g.services.map(s => ({
        ...s, cx: s.cx * scale, cy: s.cy * scale, r: s.r * scale,
      })),
    }));

    // Sovereignty totals
    let usTotal = 0, euTotal = 0, otherTotal = 0;
    for (const g of raw) {
      if (g.reg === 'US') usTotal += g.totalCHF;
      else if (g.reg === 'EU') euTotal += g.totalCHF;
      else otherTotal += g.totalCHF;
    }
    const grandTotal = usTotal + euTotal + otherTotal;
    const fmt = (n: number) => n >= 1000 ? (n / 1000).toFixed(0) + 'k' : n.toString();

    return { groups, svgH, usTotal, euTotal, otherTotal, grandTotal, fmt };
  });

  let hoveredId = $state<string | null>(null);

  function formatCHF(n: number): string {
    if (n >= 1000) return (n / 1000).toFixed(0) + 'k CHF/yr';
    return n.toLocaleString('de-CH') + ' CHF/yr';
  }

  let isDark = $state(false);
  onMount(() => {
    const check = () => { isDark = !!document.querySelector('[data-theme="dark"]'); };
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, subtree: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  });

  const textColor   = $derived(isDark ? '#f0f0f0' : '#111');
  const mutedColor  = $derived(isDark ? '#888'    : '#777');
  const borderColor = $derived(isDark ? '#333'    : '#ddd');
</script>

<div bind:this={containerEl} class="ip-wrap">
  <h3 class="ip-title">Cloud-Infrastruktur nach Anbieter</h3>
  <p class="ip-subtitle">
    Dienste gruppiert nach ihrem primären Cloud-Infrastruktur-Anbieter.
    Punktgrösse = Jahresbudget (Fläche proportional zu CHF — Wurzelskala).
  </p>

  {#if layout}
    <!-- Sovereignty bar -->
    <div class="sov-bar">
      {#each [
        { reg: 'US', total: layout.usTotal, label: REGION_LABEL.US, fill: REGION_FILL.US },
        { reg: 'EU', total: layout.euTotal, label: REGION_LABEL.EU, fill: REGION_FILL.EU },
        ...(layout.otherTotal > 0 ? [{ reg: 'other', total: layout.otherTotal, label: REGION_LABEL.other, fill: REGION_FILL.other }] : [])
      ] as seg}
        <div class="sov-seg" style="flex: {seg.total}; background: {seg.fill};">
          <span class="sov-label">
            {seg.label} · {layout.fmt(seg.total)} CHF
            ({layout.grandTotal > 0 ? Math.round(seg.total / layout.grandTotal * 100) : 0}%)
          </span>
        </div>
      {/each}
    </div>

    <!-- Circle packing SVG -->
    <div class="ip-chart" style="position: relative;">
      <svg {width} height={layout.svgH} class="ip-svg">
        {#each layout.groups as g (g.infraId)}
          <!-- Group background circle -->
          <circle
            cx={g.cx} cy={g.cy} r={g.boundR}
            fill={g.light}
            fill-opacity="0.35"
            stroke={g.fill}
            stroke-width="1.5"
            stroke-opacity="0.5"
          />

          <!-- Service dots -->
          {#each g.services as dot (dot.service.id)}
            {@const hovered = hoveredId === dot.service.id}
            <circle
              cx={g.cx + dot.cx}
              cy={g.cy + dot.cy}
              r={dot.r}
              fill={g.fill}
              fill-opacity={hovered ? 1 : 0.65}
              stroke={hovered ? g.fill : 'none'}
              stroke-width={hovered ? 2 : 0}
              style="cursor: default;"
              role="img"
              aria-label={dot.service.product}
              onmouseenter={() => (hoveredId = dot.service.id)}
              onmouseleave={() => (hoveredId = null)}
            />
            <!-- Label inside large enough dots -->
            {#if dot.r >= 16}
              <text
                x={g.cx + dot.cx}
                y={g.cy + dot.cy + 1}
                text-anchor="middle"
                dominant-baseline="middle"
                font-size={Math.min(dot.r * 0.38, 11)}
                font-weight="500"
                fill="#fff"
                fill-opacity="0.9"
                pointer-events="none"
              >{dot.service.product}</text>
            {/if}
          {/each}

          <!-- Group label -->
          <text
            x={g.cx}
            y={g.cy + g.boundR + 14}
            text-anchor="middle"
            font-size="11"
            font-weight="600"
            fill={g.fill}
          >{g.infraName}</text>
          <text
            x={g.cx}
            y={g.cy + g.boundR + 26}
            text-anchor="middle"
            font-size="9"
            fill={mutedColor}
          >{formatCHF(g.totalCHF)}</text>
        {/each}
      </svg>

      <!-- Tooltip -->
      {#if hoveredId && layout}
        {@const found = layout.groups.flatMap(g => g.services.map(s => ({ ...s, group: g }))).find(s => s.service.id === hoveredId)}
        {#if found}
          <div
            class="ip-tooltip"
            style="left: {Math.min(found.group.cx + found.cx + found.r + 10, width - 210)}px; top: {Math.max(4, found.group.cy + found.cy - 48)}px;"
          >
            <span class="ip-tt-name">{found.service.product}</span>
            {#if found.service.description}
              <span class="ip-tt-desc">{found.service.description}</span>
            {/if}
            <span class="ip-tt-meta">Infra: {found.group.infraName} ({found.group.country})</span>
            {#if found.service.annualCostCHF > 0}
              <span class="ip-tt-cost">{formatCHF(found.service.annualCostCHF)}</span>
            {/if}
          </div>
        {/if}
      {/if}
    </div>

    <!-- Legend -->
    <div class="ip-legend">
      {#each Object.entries(REGION_FILL) as [reg, fill]}
        <div class="ip-legend-item">
          <span class="ip-legend-dot" style="background: {fill};"></span>
          <span>{REGION_LABEL[reg as keyof typeof REGION_LABEL]}</span>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .ip-wrap { width: 100%; }

  .ip-title {
    font-size: 0.8rem;
    font-weight: 600;
    margin: 0 0 4px;
    color: #333;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .ip-subtitle {
    font-size: 0.82rem;
    color: #666;
    margin: 0 0 16px;
    line-height: 1.5;
  }

  /* Sovereignty bar */
  .sov-bar {
    display: flex;
    height: 32px;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 24px;
    gap: 2px;
  }

  .sov-seg {
    display: flex;
    align-items: center;
    padding: 0 10px;
    min-width: 0;
    overflow: hidden;
  }

  .sov-label {
    font-size: 0.75rem;
    font-weight: 600;
    color: #fff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Chart */
  .ip-chart { width: 100%; }
  .ip-svg { display: block; width: 100%; overflow: visible; }

  /* Tooltip */
  .ip-tooltip {
    position: absolute;
    pointer-events: none;
    background: rgba(20, 20, 30, 0.9);
    color: #fff;
    padding: 7px 10px;
    border-radius: 5px;
    font-size: 0.78rem;
    display: flex;
    flex-direction: column;
    gap: 2px;
    max-width: 210px;
    z-index: 10;
  }
  .ip-tt-name { font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .ip-tt-desc { font-size: 0.72rem; color: #ccc; line-height: 1.3; }
  .ip-tt-meta { font-size: 0.7rem; color: #aaa; margin-top: 2px; }
  .ip-tt-cost { font-size: 0.7rem; color: #bbb; font-variant-numeric: tabular-nums; }

  /* Legend */
  .ip-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 12px 24px;
    margin-top: 16px;
  }
  .ip-legend-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.78rem;
    color: #666;
  }
  .ip-legend-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  /* Dark mode */
  :global([data-theme="dark"]) .ip-title { color: #ccc; }
  :global([data-theme="dark"]) .ip-subtitle,
  :global([data-theme="dark"]) .ip-legend-item { color: #888; }
</style>
