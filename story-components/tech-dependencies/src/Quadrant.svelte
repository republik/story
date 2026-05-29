<script lang="ts">
  import { onMount } from 'svelte';
  import type { Service } from './types.d.ts';

  interface Props {
    services: Service[];
  }

  let { services }: Props = $props();

  let containerEl: HTMLDivElement;
  let width = $state(700);

  const PAD = { top: 40, right: 24, bottom: 52, left: 52 };
  const HEIGHT = 520;

  onMount(() => {
    const ro = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect;
      if (rect) width = rect.width;
    });
    ro.observe(containerEl);
    width = containerEl.clientWidth || 700;
    return () => ro.disconnect();
  });

  // Only include services that have centrality + lockIn scores
  const scored = $derived(
    services.filter((s) => s.centrality != null && s.lockIn != null),
  );

  const plotW = $derived(width - PAD.left - PAD.right);
  const plotH = HEIGHT - PAD.top - PAD.bottom;

  const toX = $derived((lockIn: number) => PAD.left + lockIn * plotW);
  const toY = (centrality: number) => PAD.top + (1 - centrality) * plotH;

  const midX = $derived(PAD.left + plotW / 2);
  const midY = PAD.top + plotH / 2;

  // Log-scaled radius: map CHF [100..200000] → r [4..18]
  const MIN_R = 4;
  const MAX_R = 18;
  const LOG_MIN = Math.log(100);
  const LOG_MAX = Math.log(200000);
  function dotRadius(cost: number): number {
    const clamped = Math.max(100, Math.min(200000, cost || 100));
    return MIN_R + ((Math.log(clamped) - LOG_MIN) / (LOG_MAX - LOG_MIN)) * (MAX_R - MIN_R);
  }

  let hoveredId = $state<string | null>(null);

  const QUADRANT_LABELS = [
    { label: 'Zentral & Flexibel', x: 0.01, y: 0.01, anchor: 'start' as const },
    { label: 'Zentral & Risiko', x: 0.99, y: 0.01, anchor: 'end' as const },
    { label: 'Ersatzbar', x: 0.01, y: 0.99, anchor: 'start' as const },
    { label: 'Lock-in', x: 0.99, y: 0.99, anchor: 'end' as const },
  ];

  function formatCHF(n: number): string {
    if (n >= 1000) return (n / 1000).toFixed(0) + 'k CHF/yr';
    return n.toLocaleString('de-CH') + ' CHF/yr';
  }

  // Detect dark theme from parent data-theme attribute
  let isDark = $state(false);
  onMount(() => {
    const check = () => {
      isDark = document.documentElement.getAttribute('data-theme') === 'dark'
        || !!document.querySelector('[data-theme="dark"]');
    };
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, subtree: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  });

  /** Grey (0) → red (1) for data sensitivity */
  function sensitivityColor(value: number): string {
    const t = Math.max(0, Math.min(1, value));
    const grey = isDark ? [160, 160, 160] : [120, 120, 120];
    const red = [220, 38, 38];
    const r = Math.round(grey[0] + (red[0] - grey[0]) * t);
    const g = Math.round(grey[1] + (red[1] - grey[1]) * t);
    const b = Math.round(grey[2] + (red[2] - grey[2]) * t);
    return `rgb(${r}, ${g}, ${b})`;
  }

  const color = $derived({
    text: isDark ? '#f0f0f0' : '#111',
    muted: isDark ? '#888' : '#777',
    border: isDark ? '#333' : '#ddd',
    bg: isDark ? '#111' : '#fff',
    quadBl: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.025)',
    quadRisk: isDark ? 'rgba(220,38,38,0.07)' : 'rgba(220,38,38,0.05)',
    quadTrap: isDark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.05)',
    dotFallback: isDark ? '#c0c0c0' : '#555',
  });

  // Simple collision nudge: for dots near same pixel, offset labels
  const LABEL_OFFSETS: [number, number][] = [
    [0, -1],   // above
    [1, 0],    // right
    [-1, 0],   // left
    [0, 1],    // below
    [1, -1],
    [-1, -1],
    [1, 1],
    [-1, 1],
  ];

  interface DotInfo {
    service: Service;
    cx: number;
    cy: number;
    r: number;
    labelX: number;
    labelY: number;
    anchor: 'start' | 'middle' | 'end';
    fill: string;
    sensitivity: number;
  }

  const dots = $derived((): DotInfo[] => {
    const BUCKET = 0.06;
    const bucketCount: Record<string, number> = {};

    return scored.map((s) => {
      const cx = toX(s.lockIn!);
      const cy = toY(s.centrality!);
      const r = dotRadius(s.annualCostCHF);

      const key = `${Math.round(s.lockIn! / BUCKET)},${Math.round(s.centrality! / BUCKET)}`;
      const slot = bucketCount[key] ?? 0;
      bucketCount[key] = slot + 1;

      const [odx, ody] = LABEL_OFFSETS[slot % LABEL_OFFSETS.length];
      const labelPad = r + 3;
      const labelX = cx + odx * labelPad + (odx === 0 ? 0 : odx * 2);
      const labelY = cy + ody * labelPad + (ody >= 0 ? 10 : -3);
      const anchor: 'start' | 'middle' | 'end' =
        odx > 0 ? 'start' : odx < 0 ? 'end' : 'middle';

      const sensitivity = s.sensitivity ?? 0;
      const fill = sensitivityColor(sensitivity);

      return { service: s, cx, cy, r, labelX, labelY, anchor, fill, sensitivity };
    });
  });
</script>

<div bind:this={containerEl} class="quadrant-wrap">
  <h3 class="q-title">Zentralität vs. Lock-in</h3>
  <p class="q-subtitle">
    Wie zentral ist ein Dienst für den Betrieb — und wie aufwändig wäre ein Wechsel?
    Punktgrösse entspricht dem Jahresbudget (logarithmisch).
  </p>

  <div class="quadrant-chart" style="position: relative;">
    <svg {width} height={HEIGHT} class="quadrant-svg">
      <!-- Quadrant backgrounds -->
      <!-- top-left: core & flexible (neutral) -->
      <rect x={PAD.left} y={PAD.top} width={plotW / 2} height={plotH / 2} fill={color.quadBl} />
      <!-- top-right: strategic risk (red tint) -->
      <rect x={midX} y={PAD.top} width={plotW / 2} height={plotH / 2} fill={color.quadRisk} />
      <!-- bottom-left: easily dropped (neutral) -->
      <rect x={PAD.left} y={midY} width={plotW / 2} height={plotH / 2} fill={color.quadBl} />
      <!-- bottom-right: lock-in trap (amber tint) -->
      <rect x={midX} y={midY} width={plotW / 2} height={plotH / 2} fill={color.quadTrap} />

      <!-- Plot border -->
      <rect x={PAD.left} y={PAD.top} width={plotW} height={plotH}
        fill="none" stroke={color.border} stroke-width="1" />

      <!-- Midlines -->
      <line x1={midX} y1={PAD.top} x2={midX} y2={PAD.top + plotH}
        stroke={color.border} stroke-width="1" stroke-dasharray="4 3" />
      <line x1={PAD.left} y1={midY} x2={PAD.left + plotW} y2={midY}
        stroke={color.border} stroke-width="1" stroke-dasharray="4 3" />

      <!-- Quadrant corner labels -->
      {#each QUADRANT_LABELS as q}
        {@const qx = PAD.left + q.x * plotW}
        {@const qy = PAD.top + q.y * plotH}
        {@const dy = q.y < 0.5 ? 14 : -6}
        <text x={qx} y={qy + dy}
          text-anchor={q.anchor}
          font-size="9"
          font-weight="600"
          letter-spacing="0.4"
          fill={color.muted}
          style="text-transform: uppercase;"
        >{q.label}</text>
      {/each}

      <!-- X axis ticks + label -->
      {#each [0, 0.25, 0.5, 0.75, 1] as v}
        {@const tx = toX(v)}
        <line x1={tx} y1={PAD.top + plotH} x2={tx} y2={PAD.top + plotH + 4}
          stroke={color.border} stroke-width="1" />
        <text x={tx} y={PAD.top + plotH + 14} text-anchor="middle"
          font-size="9" fill={color.muted}>{v.toFixed(2)}</text>
      {/each}
      <text x={PAD.left + plotW / 2} y={HEIGHT - 4}
        text-anchor="middle" font-size="10" font-weight="500" fill={color.muted}>
        Lock-in →
      </text>

      <!-- Y axis ticks + label -->
      {#each [0, 0.25, 0.5, 0.75, 1] as v}
        {@const ty = toY(v)}
        <line x1={PAD.left - 4} y1={ty} x2={PAD.left} y2={ty}
          stroke={color.border} stroke-width="1" />
        <text x={PAD.left - 6} y={ty + 3} text-anchor="end"
          font-size="9" fill={color.muted}>{v.toFixed(2)}</text>
      {/each}
      <text
        x={14}
        y={PAD.top + plotH / 2}
        text-anchor="middle"
        font-size="10"
        font-weight="500"
        fill={color.muted}
        transform="rotate(-90, 14, {PAD.top + plotH / 2})"
      >↑ Zentralität</text>

      <!-- Dots + labels -->
      {#each dots() as d (d.service.id)}
        {@const hovered = hoveredId === d.service.id}
        <g
          role="img"
          aria-label={d.service.product}
          onmouseenter={() => (hoveredId = d.service.id)}
          onmouseleave={() => (hoveredId = null)}
          style="cursor: default;"
        >
          <circle
            cx={d.cx}
            cy={d.cy}
            r={d.r}
            fill={d.fill}
            fill-opacity={hovered ? 1 : 0.55 + d.sensitivity * 0.35}
            stroke={hovered ? d.fill : 'none'}
            stroke-width={hovered ? 1.5 : 0}
          />
          <text
            x={d.labelX}
            y={d.labelY}
            text-anchor={d.anchor}
            font-size={d.sensitivity >= 0.7 ? 10 : 9}
            font-weight={d.sensitivity >= 0.7 || hovered ? 600 : 400}
            fill={hovered || d.sensitivity >= 0.7 ? color.text : color.muted}
          >{d.service.product}</text>
        </g>
      {/each}
    </svg>

    <!-- Tooltip -->
    {#if hoveredId}
      {@const d = dots().find((x) => x.service.id === hoveredId)}
      {#if d}
        <div
          class="q-tooltip"
          style="left: {Math.min(d.cx + 14, width - 200)}px; top: {Math.max(4, d.cy - 48)}px;"
        >
          <span class="q-tt-name">{d.service.product}</span>
          {#if d.service.description}
            <span class="q-tt-desc">{d.service.description}</span>
          {/if}
          <span class="q-tt-meta">
            Zentralität {d.service.centrality?.toFixed(2)} · Lock-in {d.service.lockIn?.toFixed(2)} · Sensibilität {d.service.sensitivity?.toFixed(2) ?? '—'}
          </span>
          {#if d.service.annualCostCHF > 0}
            <span class="q-tt-cost">{formatCHF(d.service.annualCostCHF)}</span>
          {/if}
        </div>
      {/if}
    {/if}
  </div>

  <!-- Legend -->
  <div class="q-legend">
    <div class="q-legend-item">
      <svg width="72" height="12" aria-hidden="true">
        <defs>
          <linearGradient id="q-sensitivity-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color={sensitivityColor(0)} />
            <stop offset="100%" stop-color={sensitivityColor(1)} />
          </linearGradient>
        </defs>
        <rect x="0" y="2" width="72" height="8" rx="4" fill="url(#q-sensitivity-gradient)" />
      </svg>
      <span>Farbe = Datensensibilität (grau → rot)</span>
    </div>
    <div class="q-legend-item">
      <svg width="28" height="12" aria-hidden="true">
        <circle cx="4" cy="6" r="4" fill={color.dotFallback} fill-opacity="0.55" />
        <circle cx="20" cy="6" r="8" fill={color.dotFallback} fill-opacity="0.55" />
      </svg>
      <span>Punktgrösse = Jahresbudget (log)</span>
    </div>
  </div>
</div>

<style>
  .quadrant-wrap {
    width: 100%;
  }

  .q-title {
    font-size: 1rem;
    font-weight: 600;
    margin: 0 0 4px;
    color: #333;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    font-size: 0.8rem;
  }

  .q-subtitle {
    font-size: 0.82rem;
    color: #666;
    margin: 0 0 16px;
    line-height: 1.5;
  }

  .quadrant-chart {
    width: 100%;
  }

  .quadrant-svg {
    display: block;
    width: 100%;
    overflow: visible;
  }

  .q-tooltip {
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

  .q-tt-name {
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .q-tt-desc {
    font-size: 0.72rem;
    color: #ccc;
    line-height: 1.3;
    white-space: normal;
  }

  .q-tt-meta {
    font-size: 0.7rem;
    color: #aaa;
    font-variant-numeric: tabular-nums;
    margin-top: 2px;
  }

  .q-tt-cost {
    font-size: 0.7rem;
    color: #bbb;
    font-variant-numeric: tabular-nums;
  }

  .q-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 12px 24px;
    margin-top: 12px;
  }

  .q-legend-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.78rem;
    color: #666;
  }

  /* Dark mode */
  :global([data-theme="dark"]) .q-title {
    color: #ccc;
  }

  :global([data-theme="dark"]) .q-subtitle,
  :global([data-theme="dark"]) .q-legend-item {
    color: #888;
  }
</style>
