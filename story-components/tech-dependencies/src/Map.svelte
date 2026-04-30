<script lang="ts">
  import { onMount } from 'svelte';
  import worldData from 'world-atlas/countries-110m.json';
  import type { ActiveService } from './lib/derive.ts';

  interface Props {
    services: ActiveService[];
  }

  let { services }: Props = $props();

  // Republik HQ — Sihlhallenstrasse 1, Zürich
  const ORIGIN_LNG = 8.5397;
  const ORIGIN_LAT = 47.3764;

  let svgEl: SVGSVGElement;
  let width = $state(800);
  let height = $state(420);

  // ─── Zoom / Pan ─────────────────────────────────────────────────────────────
  let zoom = $state({ k: 1, x: 0, y: 0 });
  let dragStart = $state<{ x: number; y: number; tx: number; ty: number } | null>(null);

  function handleWheel(e: WheelEvent) {
    e.preventDefault();
    const rect = svgEl.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const delta = e.deltaY > 0 ? 0.85 : 1.18;
    const newK = Math.min(10, Math.max(1, zoom.k * delta));
    zoom = {
      k: newK,
      x: mx - (mx - zoom.x) * (newK / zoom.k),
      y: my - (my - zoom.y) * (newK / zoom.k),
    };
  }

  function handlePointerDown(e: PointerEvent) {
    if (e.button !== 0) return;
    (e.currentTarget as SVGSVGElement).setPointerCapture(e.pointerId);
    dragStart = { x: e.clientX, y: e.clientY, tx: zoom.x, ty: zoom.y };
  }

  function handlePointerMove(e: PointerEvent) {
    if (!dragStart) return;
    zoom = { ...zoom, x: dragStart.tx + e.clientX - dragStart.x, y: dragStart.ty + e.clientY - dragStart.y };
  }

  function handlePointerUp() { dragStart = null; }

  function resetZoom() { zoom = { k: 1, x: 0, y: 0 }; }

  // ─── Projection ──────────────────────────────────────────────────────────────
  let project: ((c: [number, number]) => [number, number] | null) | null = $state(null);
  let countryPaths = $state<string[]>([]);

  let geoMod: typeof import('d3-geo') | null = null;
  let topoFeature: typeof import('topojson-client')['feature'] | null = null;

  function rebuildAll(w: number, h: number) {
    if (!geoMod || !topoFeature) return;
    const proj = geoMod.geoNaturalEarth1().fitSize([w, h], { type: 'Sphere' });
    project = (c) => proj(c);
    const pathGen = geoMod.geoPath(proj);
    const world = worldData as Parameters<typeof topoFeature>[0];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const countries = topoFeature(world, (world as any).objects.countries) as GeoJSON.FeatureCollection;
    countryPaths = countries.features.map((f) => pathGen(f) ?? '');
  }

  onMount(async () => {
    [geoMod, { feature: topoFeature }] = await Promise.all([
      import('d3-geo'),
      import('topojson-client'),
    ]);
    width = svgEl.parentElement!.clientWidth || 800;
    height = Math.round(width * 0.52);
    rebuildAll(width, height);

    const ro = new ResizeObserver((entries) => {
      const r = entries[0]?.contentRect;
      if (r && r.width > 0) {
        width = r.width;
        height = Math.round(r.width * 0.52);
        rebuildAll(width, height);
      }
    });
    ro.observe(svgEl.parentElement!);
  });

  // ─── Arc data ────────────────────────────────────────────────────────────────
  interface VendorArc {
    vendorId: string;
    vendorName: string;
    country: string;
    city: string;
    destLat: number;
    destLng: number;
    totalCHF: number;
    products: string[];
    bigTech: boolean;
    infraOnly: boolean;
  }

  const vendorArcs = $derived<VendorArc[]>(buildArcs(services));

  function buildArcs(svcs: ActiveService[]): VendorArc[] {
    const arcMap = new Map<string, VendorArc>();
    const directIds = new Set<string>();

    for (const svc of svcs) {
      directIds.add(svc.vendorId);
      const loc = svc.vendor.hqs[0];
      if (!loc) continue;
      if (!arcMap.has(svc.vendorId)) {
        arcMap.set(svc.vendorId, {
          vendorId: svc.vendorId,
          vendorName: svc.vendor.name,
          country: loc.country,
          city: loc.city ?? '',
          destLat: loc.lat,
          destLng: loc.lng,
          totalCHF: 0,
          products: [],
          bigTech: svc.vendor.bigTech === true,
          infraOnly: false,
        });
      }
      const a = arcMap.get(svc.vendorId)!;
      a.totalCHF += svc.annualCostCHF;
      if (!a.products.includes(svc.product)) a.products.push(svc.product);
    }

    for (const svc of svcs) {
      for (const infra of svc.infra) {
        if (directIds.has(infra.id) || arcMap.has(infra.id)) continue;
        const loc = infra.hqs[0];
        if (!loc) continue;
        arcMap.set(infra.id, {
          vendorId: infra.id,
          vendorName: infra.name,
          country: loc.country,
          city: loc.city ?? '',
          destLat: loc.lat,
          destLng: loc.lng,
          totalCHF: 0,
          products: [],
          bigTech: infra.bigTech === true,
          infraOnly: true,
        });
      }
    }

    return [...arcMap.values()].sort((a, b) => b.totalCHF - a.totalCHF);
  }

  const maxCHF = $derived(Math.max(...vendorArcs.filter((a) => !a.infraOnly).map((a) => a.totalCHF), 1));

  function maxStrokeWidth(chf: number): number {
    // sqrt scale: Stripe (80k) ~18px, Pingdom (600) ~3px
    return 3 + Math.sqrt(chf / maxCHF) * 16;
  }

  function arcColor(country: string): string {
    if (country === 'US') return '#1e50c8';
    if (country === 'CH') return '#cc1010';
    return '#1a9660';
  }

  // ─── Tapered polygon path ─────────────────────────────────────────────────────
  /**
   * Returns a filled SVG polygon path for a tapered arc from (sx,sy) to (dx,dy).
   * Width: 0 at source → maxW at ~75% → tapers to 0 at destination (pointed tip).
   */
  function taperedPath(sx: number, sy: number, dx: number, dy: number, maxW: number): string {
    const midX = (sx + dx) / 2;
    const midY = (sy + dy) / 2;
    const segLen = Math.sqrt((dx - sx) ** 2 + (dy - sy) ** 2) || 1;
    const lift = Math.min(segLen * 0.32, 90);
    // Perpendicular unit vector
    const perpX = -(dy - sy) / segLen;
    const perpY = (dx - sx) / segLen;
    // Always arc upward (toward negative SVG-y) for a consistent, readable feel
    const ctrlX = midX - perpX * lift;
    const ctrlY = midY - lift * 0.9;

    const N = 36;
    const pts: [number, number][] = [];
    const nrms: [number, number][] = [];

    for (let i = 0; i <= N; i++) {
      const t = i / N;
      const bx = (1 - t) * (1 - t) * sx + 2 * (1 - t) * t * ctrlX + t * t * dx;
      const by = (1 - t) * (1 - t) * sy + 2 * (1 - t) * t * ctrlY + t * t * dy;
      // Tangent (derivative of quadratic bezier)
      const tdx = 2 * (1 - t) * (ctrlX - sx) + 2 * t * (dx - ctrlX);
      const tdy = 2 * (1 - t) * (ctrlY - sy) + 2 * t * (dy - ctrlY);
      const tl = Math.sqrt(tdx * tdx + tdy * tdy) || 1;
      pts.push([bx, by]);
      nrms.push([-tdy / tl, tdx / tl]); // left-hand normal
    }

    // Width profile: ramp up then taper at the tip for a pointed end
    function w(i: number): number {
      const t = i / N;
      const ramp = Math.pow(Math.min(t / 0.75, 1), 0.6); // ease-in ramp
      const taper = t > 0.82 ? 1 - (t - 0.82) / 0.18 : 1; // taper to 0
      return (maxW / 2) * ramp * taper;
    }

    const left: string[] = [];
    const right: string[] = [];
    for (let i = 0; i <= N; i++) {
      const hw = w(i);
      const [px, py] = pts[i];
      const [nx, ny] = nrms[i];
      left.push(`${(px + nx * hw).toFixed(2)},${(py + ny * hw).toFixed(2)}`);
      right.push(`${(px - nx * hw).toFixed(2)},${(py - ny * hw).toFixed(2)}`);
    }

    // Forward along left side, backward along right side
    return `M${sx.toFixed(2)},${sy.toFixed(2)} L${left.join(' L')} L${right.slice().reverse().join(' L')} Z`;
  }

  // ─── Projected arcs ───────────────────────────────────────────────────────────
  interface ProjectedArc extends VendorArc {
    sx: number; sy: number;
    dx: number; dy: number;
    tapPath: string;
  }

  const originPx = $derived(project ? project([ORIGIN_LNG, ORIGIN_LAT]) : null);

  const projectedArcs = $derived<ProjectedArc[]>(
    project && originPx
      ? vendorArcs
          .map((arc) => {
            const src = project!([ORIGIN_LNG, ORIGIN_LAT]);
            const dst = project!([arc.destLng, arc.destLat]);
            if (!src || !dst) return null;
            const mw = arc.infraOnly ? 0 : maxStrokeWidth(arc.totalCHF);
            return {
              ...arc,
              sx: src[0], sy: src[1],
              dx: dst[0], dy: dst[1],
              tapPath: taperedPath(src[0], src[1], dst[0], dst[1], mw),
            };
          })
          .filter(Boolean as unknown as <T>(v: T | null) => v is T)
      : [],
  );

  // ─── Interaction ──────────────────────────────────────────────────────────────
  let hovered = $state<ProjectedArc | null>(null);

  // Tooltip position in SVG screen-space (outside zoom group)
  const tooltipPos = $derived(
    hovered
      ? {
          x: hovered.dx * zoom.k + zoom.x,
          y: hovered.dy * zoom.k + zoom.y,
        }
      : null,
  );

  function fmt(n: number): string {
    if (n >= 1000) return (n / 1000).toFixed(0) + "'000 CHF/J";
    return n.toLocaleString('de-CH') + ' CHF/J';
  }
</script>

<div class="map-wrap">
  <svg
    bind:this={svgEl}
    {width}
    {height}
    class="map-svg"
    class:dragging={dragStart !== null}
    role="img"
    aria-label="Karte der Anbieter-Standorte"
    onwheel={handleWheel}
    onpointerdown={handlePointerDown}
    onpointermove={handlePointerMove}
    onpointerup={handlePointerUp}
    onpointerleave={handlePointerUp}
    onclick={() => (hovered = null)}
  >
    <defs>
      <!-- Per-arc linear gradients in world-space (recreated when projection changes) -->
      {#if originPx}
        {#each projectedArcs.filter((a) => !a.infraOnly) as arc (arc.vendorId)}
          <linearGradient
            id="grad-{arc.vendorId}"
            x1={originPx[0]}
            y1={originPx[1]}
            x2={arc.dx}
            y2={arc.dy}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stop-color={arcColor(arc.country)} stop-opacity="0" />
            <stop offset="55%" stop-color={arcColor(arc.country)} stop-opacity="0.55" />
            <stop offset="100%" stop-color={arcColor(arc.country)} stop-opacity="0.92" />
          </linearGradient>
        {/each}
      {/if}
    </defs>

    <!-- Zoomable content group -->
    <g transform="translate({zoom.x},{zoom.y}) scale({zoom.k})">

      <!-- Ocean -->
      <rect x="0" y="0" {width} {height} fill="#d8e8f2" />

      <!-- Countries -->
      {#each countryPaths as d}
        <path {d} fill="#e6eff7" stroke="#c0d4e6" stroke-width={0.6 / zoom.k} />
      {/each}

      <!-- Infra-only dashed connections (behind main arcs) -->
      {#each projectedArcs.filter((a) => a.infraOnly) as arc}
        {@const ctrl = `Q${((arc.sx + arc.dx) / 2).toFixed(1)},${(Math.min(arc.sy, arc.dy) - 40).toFixed(1)}`}
        <g
          role="button"
          tabindex="0"
          aria-label={arc.vendorName}
          onmouseenter={() => (hovered = arc)}
          onmouseleave={() => (hovered = null)}
          onclick={(e) => { e.stopPropagation(); hovered = arc; }}
          onkeydown={(e) => e.key === 'Enter' && (hovered = arc)}
        >
          <path
            d="M{arc.sx.toFixed(1)},{arc.sy.toFixed(1)} {ctrl} {arc.dx.toFixed(1)},{arc.dy.toFixed(1)}"
            fill="none"
            stroke="#99b4cc"
            stroke-width={1.2 / zoom.k}
            stroke-dasharray="{5 / zoom.k},{3 / zoom.k}"
            opacity="0.5"
          />
          <circle cx={arc.dx} cy={arc.dy} r={4 / zoom.k} fill="#99b4cc" stroke="#fff" stroke-width={1 / zoom.k} opacity="0.7" />
        </g>
      {/each}

      <!-- Tapered arcs — rendered largest first so smaller are on top -->
      {#each projectedArcs.filter((a) => !a.infraOnly) as arc}
        {@const isHov = hovered?.vendorId === arc.vendorId}
        <g
          role="button"
          tabindex="0"
          aria-label="{arc.vendorName} — {fmt(arc.totalCHF)}"
          onmouseenter={() => (hovered = arc)}
          onmouseleave={() => (hovered = null)}
          onclick={(e) => { e.stopPropagation(); hovered = arc; }}
          onkeydown={(e) => e.key === 'Enter' && (hovered = arc)}
        >
          <path
            d={arc.tapPath}
            fill="url(#grad-{arc.vendorId})"
            opacity={hovered && !isHov ? 0.12 : isHov ? 1 : 0.82}
            class="tapered-arc"
          />
        </g>
      {/each}

      <!-- Destination dots (on top of arcs) -->
      {#each projectedArcs.filter((a) => !a.infraOnly) as arc}
        {@const isHov = hovered?.vendorId === arc.vendorId}
        <g
          role="button"
          tabindex="0"
          aria-label={arc.vendorName}
          onmouseenter={() => (hovered = arc)}
          onmouseleave={() => (hovered = null)}
          onclick={(e) => { e.stopPropagation(); hovered = arc; }}
          onkeydown={(e) => e.key === 'Enter' && (hovered = arc)}
        >
          <circle
            cx={arc.dx}
            cy={arc.dy}
            r={isHov ? 6 / zoom.k : 4 / zoom.k}
            fill={arcColor(arc.country)}
            stroke="#fff"
            stroke-width={1.5 / zoom.k}
            opacity={hovered && !isHov ? 0.2 : 1}
            class="dest-dot"
          />
        </g>
      {/each}

      <!-- Zürich origin marker -->
      {#if originPx}
        <g transform="translate({originPx[0]},{originPx[1]})">
          <circle r={10 / zoom.k} fill="rgba(0,0,0,0.06)" />
          <circle r={5 / zoom.k} fill="#111" stroke="#fff" stroke-width={2 / zoom.k} />
          <text
            y={-(13 / zoom.k)}
            text-anchor="middle"
            font-size={10 / zoom.k}
            font-weight="600"
            fill="#111"
            stroke="#fff"
            stroke-width={3 / zoom.k}
            paint-order="stroke"
          >Zürich</text>
        </g>
      {/if}
    </g>

    <!-- Tooltip — outside zoom group, positioned in screen space -->
    {#if hovered && tooltipPos}
      {@const tx = Math.min(tooltipPos.x + 14, width - 220)}
      {@const ty = Math.max(tooltipPos.y - 14, 8)}
      <foreignObject x={tx} y={ty} width="215" height="180" style="overflow:visible; pointer-events:none;">
        <div class="tooltip">
          <div class="tt-loc">{hovered.city}{hovered.city ? ', ' : ''}{hovered.country}</div>
          <div class="tt-name">{hovered.vendorName}</div>
          {#if hovered.products.length}
            <div class="tt-products">{hovered.products.join(' · ')}</div>
          {/if}
          {#if hovered.totalCHF > 0}
            <div class="tt-chf">{fmt(hovered.totalCHF)}</div>
          {:else}
            <div class="tt-chf tt-chf--muted">Infrastruktur-Abhängigkeit</div>
          {/if}
          {#if hovered.bigTech}
            <span class="tt-badge">Big Tech</span>
          {/if}
        </div>
      </foreignObject>
    {/if}

    <!-- Zoom reset button -->
    {#if zoom.k > 1.05}
      <foreignObject x={width - 80} y={8} width="72" height="28" style="overflow:visible;">
        <button class="zoom-reset" onclick={resetZoom}>↺ Reset</button>
      </foreignObject>
    {/if}
  </svg>

  <!-- Legend -->
  <div class="legend">
    <div class="leg">
      <svg width="32" height="12">
        <ellipse cx="16" cy="6" rx="14" ry="5" fill="#1e50c8" opacity="0.8"/>
      </svg>
      USA
    </div>
    <div class="leg">
      <svg width="32" height="12">
        <ellipse cx="16" cy="6" rx="14" ry="5" fill="#cc1010" opacity="0.8"/>
      </svg>
      Schweiz
    </div>
    <div class="leg">
      <svg width="32" height="12">
        <ellipse cx="16" cy="6" rx="14" ry="5" fill="#1a9660" opacity="0.8"/>
      </svg>
      Europa / andere
    </div>
    <div class="leg">
      <svg width="32" height="10">
        <line x1="2" y1="5" x2="30" y2="5" stroke="#99b4cc" stroke-width="2" stroke-dasharray="4 3"/>
      </svg>
      Nur Infrastruktur
    </div>
    <div class="leg leg--size">
      <svg width="52" height="12">
        <!-- thin tapered shape -->
        <path d="M2,6 L12,3 L28,1 L28,11 L12,9 Z" fill="#555" opacity="0.7"/>
      </svg>
      Breite = CHF/Jahr
    </div>
    <div class="leg leg--hint">Scroll zum Zoomen · Ziehen zum Verschieben</div>
  </div>
</div>

<style>
  .map-wrap { width: 100%; user-select: none; }

  .map-svg {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 8px;
    cursor: grab;
    overflow: hidden;
    touch-action: none;
  }

  .map-svg.dragging { cursor: grabbing; }

  .tapered-arc {
    cursor: pointer;
    transition: opacity 0.12s;
  }

  .dest-dot {
    cursor: pointer;
    transition: opacity 0.12s, r 0.1s;
  }

  .tooltip {
    background: rgba(255,255,255,0.97);
    border: 1px solid #ccc;
    border-radius: 7px;
    padding: 9px 12px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.15);
    font-size: 0.78rem;
    line-height: 1.5;
  }

  .tt-loc {
    font-size: 0.68rem;
    color: #999;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .tt-name { font-weight: 700; font-size: 0.88rem; }
  .tt-products { color: #555; font-size: 0.73rem; }
  .tt-chf {
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    color: #111;
    margin-top: 4px;
  }
  .tt-chf--muted { font-weight: normal; color: #888; }
  .tt-badge {
    display: inline-block;
    margin-top: 4px;
    font-size: 0.65rem;
    padding: 1px 6px;
    border-radius: 10px;
    background: #f0c040;
    color: #333;
  }

  .zoom-reset {
    font-size: 0.72rem;
    padding: 3px 8px;
    background: rgba(255,255,255,0.9);
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    white-space: nowrap;
  }
  .zoom-reset:hover { background: #fff; }

  .legend {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 18px;
    padding: 8px 0;
    font-size: 0.75rem;
    color: #555;
    align-items: center;
  }

  .leg {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .leg--hint {
    font-size: 0.68rem;
    color: #aaa;
    margin-left: auto;
  }
</style>
