<script lang="ts">
  import { onMount } from 'svelte';
  import type { SankeyData, SankeyNode } from './lib/derive.ts';

  interface Props {
    data: SankeyData;
    /** Node types that receive a permanent label (others only shown in tooltip) */
    labelTypes?: SankeyNode['type'][];
  }

  let { data, labelTypes = ['origin', 'category', 'region'] }: Props = $props();

  let containerEl: HTMLDivElement;
  let width = $state(800);
  const nodeWidth = 16;
  const nodePadding = 10;
  const minNodeH = 8;

  // Responsive breakpoint — padding and labels adapt below this width
  const isMobile = $derived(width < 520);

  // On mobile: no permanent labels at all — everything via tap
  const effectiveLabelTypes = $derived(isMobile ? [] : labelTypes);

  // Set after layout runs — reflects the actual rendered extent
  let svgHeight = $state(480);

  let mouseX = $state(0);
  let mouseY = $state(0);

  function handleMouseMove(e: MouseEvent) {
    const rect = containerEl.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  }

  function handleTouchNode(e: TouchEvent, node: LayoutNode) {
    e.preventDefault();
    e.stopPropagation();
    const rect = containerEl.getBoundingClientRect();
    const t = e.touches[0];
    mouseX = t.clientX - rect.left;
    mouseY = t.clientY - rect.top;
    hoveredNode = hoveredNode?.id === node.id ? null : node;
    hoveredEdge = null;
  }

  function handleTouchEdge(e: TouchEvent, edge: LayoutEdge) {
    e.preventDefault();
    e.stopPropagation();
    const rect = containerEl.getBoundingClientRect();
    const t = e.touches[0];
    mouseX = t.clientX - rect.left;
    mouseY = t.clientY - rect.top;
    hoveredEdge = hoveredEdge === edge ? null : edge;
    hoveredNode = null;
  }

  function handleContainerTouch() {
    hoveredNode = null;
    hoveredEdge = null;
  }

  interface LayoutNode extends SankeyNode {
    x0: number; x1: number; y0: number; y1: number;
    depth: number;
  }

  interface LayoutEdge {
    source: LayoutNode;
    target: LayoutNode;
    valueCHF: number;
    width: number;
    sy0: number; sy1: number;
    ty0: number; ty1: number;
    path: string;
  }

  let layout = $state<{ nodes: LayoutNode[]; edges: LayoutEdge[] } | null>(null);
  let hoveredEdge = $state<LayoutEdge | null>(null);
  let hoveredNode = $state<LayoutNode | null>(null);

  // Full ordering across both views; unused types are simply absent from the data
  const depthOrder: SankeyNode['type'][] = [
    'origin',
    'category',
    'vendor',
    'infra',
    'region',
  ];

  function computeLayout(w: number) {
    if (!data.nodes.length) return;

    const padding = w < 520
      ? { top: 14, right: 16, bottom: 24, left: 8 }
      : { top: 20, right: 140, bottom: 32, left: 100 };

    const innerW = w - padding.left - padding.right;

    // Use a tall working canvas — we'll measure actual extent afterwards
    const workingH = Math.max(
      600,
      data.nodes.reduce((max, n) => {
        const count = data.nodes.filter((m) => m.type === n.type).length;
        return Math.max(max, count * (minNodeH + nodePadding) + padding.top + padding.bottom);
      }, 0),
    );
    const innerH = workingH - padding.top - padding.bottom;

    const nodeMap = new Map<string, LayoutNode>(
      data.nodes.map((n) => ({
        ...n,
        x0: 0, x1: 0, y0: 0, y1: 0,
        depth: depthOrder.indexOf(n.type),
      })).map((n) => [n.id, n]),
    );

    const depths = [...new Set(data.nodes.map((n) => depthOrder.indexOf(n.type)))].sort(
      (a, b) => a - b,
    );
    const depthCount = depths.length;
    const xStep = depthCount > 1 ? innerW / (depthCount - 1) : 0;

    for (const [, n] of nodeMap) {
      const depthIdx = depths.indexOf(n.depth);
      n.x0 = padding.left + depthIdx * xStep;
      n.x1 = n.x0 + nodeWidth;
    }

    // Compute node heights proportional to CHF
    const byDepth = new Map<number, LayoutNode[]>();
    for (const [, n] of nodeMap) {
      if (!byDepth.has(n.depth)) byDepth.set(n.depth, []);
      byDepth.get(n.depth)!.push(n);
    }

    for (const [, nodes] of byDepth) {
      const totalCHF = nodes.reduce((s, n) => s + n.totalCHF, 0) || 1;
      const totalPad = (nodes.length - 1) * nodePadding;
      const availH = innerH - totalPad;
      let y = padding.top;
      nodes.sort((a, b) => (b.totalCHF || 0) - (a.totalCHF || 0));
      for (const n of nodes) {
        const nodeH = Math.max(minNodeH, (n.totalCHF / totalCHF) * availH);
        n.y0 = y;
        n.y1 = y + nodeH;
        y += nodeH + nodePadding;
      }
    }

    // Measure actual extent so SVG height is never clipped
    const maxY1 = Math.max(...[...nodeMap.values()].map((n) => n.y1));
    svgHeight = maxY1 + padding.bottom;

    // Build edges with offset tracking
    const sourceOffsets = new Map<string, number>();
    const targetOffsets = new Map<string, number>();
    for (const [id, n] of nodeMap) {
      sourceOffsets.set(id, n.y0);
      targetOffsets.set(id, n.y0);
    }

    const edges: LayoutEdge[] = [];
    for (const e of data.edges) {
      const src = nodeMap.get(e.source);
      const tgt = nodeMap.get(e.target);
      if (!src || !tgt) continue;

      const totalForNode = src.totalCHF || 1;
      const edgeH = Math.max(1, ((e.valueCHF / totalForNode) * (src.y1 - src.y0)));

      const sy0 = sourceOffsets.get(e.source)!;
      const sy1 = sy0 + edgeH;
      sourceOffsets.set(e.source, sy1);

      const targetTotal = tgt.totalCHF || 1;
      const tEdgeH = Math.max(1, ((e.valueCHF / targetTotal) * (tgt.y1 - tgt.y0)));
      const ty0 = targetOffsets.get(e.target)!;
      const ty1 = ty0 + tEdgeH;
      targetOffsets.set(e.target, ty1);

      const x0 = src.x1;
      const x1 = tgt.x0;
      const midX = (x0 + x1) / 2;

      const path = `M${x0},${sy0} C${midX},${sy0} ${midX},${ty0} ${x1},${ty0}
                    L${x1},${ty1} C${midX},${ty1} ${midX},${sy1} ${x0},${sy1} Z`;

      edges.push({ source: src, target: tgt, valueCHF: e.valueCHF, width: edgeH, sy0, sy1, ty0, ty1, path });
    }

    layout = { nodes: [...nodeMap.values()], edges };
  }

  onMount(() => {
    const ro = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect;
      if (rect) {
        width = rect.width;
        computeLayout(width);
      }
    });
    ro.observe(containerEl);
    width = containerEl.clientWidth || 800;
    computeLayout(width);
  });

  $effect(() => {
    data;
    computeLayout(width);
  });

  const NODE_COLORS: Record<SankeyNode['type'], string> = {
    origin:   '#1a1a2e',
    category: '#16213e',
    vendor:   '#0f3460',
    infra:    '#1e4d8c',
    region:   '#533483', // fallback; per-node color applied via getNodeColor()
  };

  const REGION_COLORS: Record<string, string> = {
    'region:US':    '#1565c0',
    'region:EU':    '#388e3c',
    'region:other': '#888888',
  };

  function getNodeColor(node: { id: string; type: SankeyNode['type'] }): string {
    if (node.type === 'region') return REGION_COLORS[node.id] ?? NODE_COLORS.region;
    return NODE_COLORS[node.type];
  }

  function formatCHF(n: number): string {
    if (n >= 1000) return (n / 1000).toFixed(0) + 'k CHF/yr';
    return n.toLocaleString('en-CH') + ' CHF/yr';
  }

  const tooltipContent = $derived(
    hoveredNode
      ? { label: hoveredNode.label, chf: hoveredNode.totalCHF }
      : hoveredEdge
        ? { label: `${hoveredEdge.source.label} → ${hoveredEdge.target.label}`, chf: hoveredEdge.valueCHF }
        : null,
  );

  function isHighlighted(edge: LayoutEdge): boolean {
    if (!hoveredNode && !hoveredEdge) return false;
    if (hoveredEdge) return edge === hoveredEdge;
    if (hoveredNode) {
      return (
        edge.source.id === hoveredNode.id || edge.target.id === hoveredNode.id
      );
    }
    return false;
  }
</script>

<div
  bind:this={containerEl}
  class="sankey-container"
  onmousemove={handleMouseMove}
  ontouchstart={handleContainerTouch}
  role="presentation"
>
  <svg {width} height={svgHeight} class="sankey-svg">
    <!-- Edges -->
    <g class="edges">
      {#if layout}
        {#each layout.edges as edge}
          <path
            d={edge.path}
            fill={getNodeColor(edge.source)}
            opacity={hoveredNode || hoveredEdge
              ? isHighlighted(edge) ? 0.75 : 0.08
              : 0.3}
            class="edge"
            role="img"
            aria-label="{edge.source.label} → {edge.target.label}"
            onmouseenter={() => (hoveredEdge = edge)}
            onmouseleave={() => (hoveredEdge = null)}
            ontouchstart={(e) => handleTouchEdge(e, edge)}
          />
        {/each}
      {/if}
    </g>

    <!-- Nodes -->
    <g class="nodes">
      {#if layout}
        {#each layout.nodes as node}
          {@const midY = (node.y0 + node.y1) / 2}
          <g
            class="node-group"
            onmouseenter={() => (hoveredNode = node)}
            onmouseleave={() => (hoveredNode = null)}
            ontouchstart={(e) => handleTouchNode(e, node)}
            role="listitem"
          >
            <rect
              x={node.x0}
              y={node.y0}
              width={node.x1 - node.x0}
              height={Math.max(2, node.y1 - node.y0)}
              fill={getNodeColor(node)}
              rx="2"
            />

            <!-- Labels — hidden on mobile (tap tooltip used instead) -->
            {#if effectiveLabelTypes.includes(node.type)}
              {#if node.type === 'origin'}
                <text x={node.x1 + 6} y={midY} text-anchor="start" dominant-baseline="middle" font-size="12" font-weight="600" fill="#111">{node.label}</text>
                <text x={node.x1 + 6} y={midY + 13} text-anchor="start" dominant-baseline="middle" font-size="10" fill="#777">{formatCHF(node.totalCHF)}</text>
              {:else if node.type === 'region'}
                <text x={node.x1 + 6} y={midY - 5} text-anchor="start" dominant-baseline="middle" font-size="11" fill="#222">{node.label}</text>
                <text x={node.x1 + 6} y={midY + 6} text-anchor="start" dominant-baseline="middle" font-size="9" fill="#888">{formatCHF(node.totalCHF)}</text>
              {:else if node.type === 'vendor' && labelTypes.includes('category')}
                <!-- vendor in category view — label on the right, in gap before region -->
                <text x={node.x1 + 6} y={midY} text-anchor="start" dominant-baseline="middle" font-size="10" fill="#222">{node.label}</text>
              {:else}
                <!-- category / vendor (infra view) / infra — left side -->
                <text x={node.x0 - 6} y={midY} text-anchor="end" dominant-baseline="middle" font-size="11" fill="#222">{node.label}</text>
              {/if}
            {/if}
          </g>
        {/each}
      {/if}
    </g>
  </svg>

  <!-- Floating tooltip -->
  {#if tooltipContent}
    <div
      class="tooltip"
      style="left: {Math.min(mouseX + 14, width - 180)}px; top: {Math.max(4, mouseY - 36)}px;"
    >
      <span class="tooltip-label">{tooltipContent.label}</span>
      {#if tooltipContent.chf > 0}
        <span class="tooltip-chf">{formatCHF(tooltipContent.chf)}</span>
      {/if}
    </div>
  {/if}

</div>

<style>
  .sankey-container {
    width: 100%;
    position: relative;
    overflow: hidden;
  }

  .sankey-svg {
    display: block;
    width: 100%;
    height: auto;
    overflow: hidden;
  }

  .edge {
    cursor: pointer;
    transition: opacity 0.15s;
  }

  .node-group {
    cursor: default;
  }

  .tooltip {
    position: absolute;
    pointer-events: none;
    background: rgba(20, 20, 30, 0.88);
    color: #fff;
    padding: 6px 10px;
    border-radius: 6px;
    font-size: 0.8rem;
    display: flex;
    flex-direction: column;
    gap: 2px;
    max-width: 180px;
    white-space: nowrap;
    box-shadow: 0 2px 8px rgba(0,0,0,0.25);
    z-index: 10;
  }


  .tooltip-label {
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .tooltip-chf {
    font-size: 0.72rem;
    color: #bbb;
    font-variant-numeric: tabular-nums;
  }

</style>
