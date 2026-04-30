<script lang="ts">
  import type { MigrationEvent } from './types.d.ts';

  interface Props {
    minDate: string;
    currentDate: string;
    events: MigrationEvent[];
    onDateChange: (date: string) => void;
  }

  let { minDate, currentDate, events, onDateChange }: Props = $props();

  type Step = { date: string; label: string; sublabel: string; event: MigrationEvent | null };

  const steps = $derived<Step[]>([
    { date: minDate, label: 'Start', sublabel: formatDate(minDate), event: null },
    ...events.map((e) => ({ date: e.date, label: e.title, sublabel: formatDate(e.date), event: e })),
  ]);

  const activeIdx = $derived(steps.findIndex((s) => s.date === currentDate) ?? 0);
  const activeStep = $derived(steps[activeIdx] ?? steps[0]);

  function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('en-CH', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  function stepPct(i: number): number {
    return steps.length <= 1 ? 0 : (i / (steps.length - 1)) * 100;
  }

  function goTo(idx: number) {
    if (idx >= 0 && idx < steps.length) onDateChange(steps[idx].date);
  }

  // Hover / tap card state
  let hoveredIdx = $state<number | null>(null);
  let cardDismissed = $state(false);

  // Show card for: whatever is hovered (desktop), or active event step (after tap)
  const cardIdx = $derived(
    hoveredIdx !== null ? hoveredIdx
      : (!cardDismissed && activeStep?.event) ? activeIdx
      : null,
  );
  const cardStep = $derived(cardIdx !== null ? steps[cardIdx] : null);

  // Reset dismissed state when navigating to a new step
  $effect(() => { activeIdx; cardDismissed = false; });

  // Clamp card so it doesn't overflow the track-wrap
  const CARD_W = 260;
  const cardLeft = $derived(
    cardIdx !== null
      ? `max(0px, min(calc(${stepPct(cardIdx)}% - ${CARD_W / 2}px), calc(100% - ${CARD_W}px)))`
      : '0px',
  );

  // Play
  let playing = $state(false);
  let playTimeout: ReturnType<typeof setTimeout> | null = null;

  function clearPlay() {
    if (playTimeout) { clearTimeout(playTimeout); playTimeout = null; }
    playing = false;
  }

  function scheduleNext(fromIdx: number) {
    const next = fromIdx + 1;
    if (next >= steps.length) { playing = false; return; }
    playTimeout = setTimeout(() => {
      if (!playing) return;
      onDateChange(steps[next].date);
      scheduleNext(next);
    }, 1400);
  }

  function togglePlay() {
    if (playing) { clearPlay(); return; }
    const start = activeIdx >= steps.length - 1 ? 0 : activeIdx;
    onDateChange(steps[start].date);
    playing = true;
    scheduleNext(start);
  }

  $effect(() => { if (playing && activeIdx === steps.length - 1) clearPlay(); });
</script>

<div class="timeline">
  <div class="stepper-row">
    <!-- Prev -->
    <button
      class="nav-btn"
      onclick={() => { clearPlay(); goTo(activeIdx - 1); }}
      disabled={activeIdx === 0}
      aria-label="Previous"
    >‹</button>

    <!-- Track -->
    <div class="track-wrap">
      <div class="track-bg"></div>
      <div class="track-fill" style="width: {stepPct(activeIdx)}%"></div>

      <!-- Step nodes -->
      {#each steps as step, i}
        {@const isActive = i === activeIdx}
        <button
          class="step-node"
          class:active={isActive}
          style="left: {stepPct(i)}%"
          onclick={() => { clearPlay(); goTo(i); cardDismissed = false; }}
          onmouseenter={() => (hoveredIdx = i)}
          onmouseleave={() => (hoveredIdx = null)}
          aria-label="{step.label} — {step.sublabel}"
          aria-current={isActive ? 'step' : undefined}
        >
          <div class="node-dot"></div>
          <div class="node-label">{step.label}</div>
          <div class="node-date">{step.sublabel}</div>
        </button>
      {/each}

      <!-- Floating event card — appears above the dot -->
      {#if cardStep?.event}
        {@const ev = cardStep.event}
        <div class="event-card" style="left: {cardLeft}; width: {CARD_W}px">
          <button class="card-close" onclick={() => (cardDismissed = true)} aria-label="Close">✕</button>
          <strong class="card-title">{ev.title}</strong>
          <span class="card-date">{formatDate(ev.date)}</span>
          {#if ev.description}<p class="card-desc">{ev.description}</p>{/if}
          {#if ev.costDeltaCHF != null}
            <span class="card-delta" class:negative={ev.costDeltaCHF < 0}>
              {ev.costDeltaCHF > 0 ? '+' : ''}{ev.costDeltaCHF.toLocaleString('en-CH')} CHF/year
            </span>
          {/if}
        </div>
      {/if}
    </div>

    <!-- Next -->
    <button
      class="nav-btn"
      onclick={() => { clearPlay(); goTo(activeIdx + 1); }}
      disabled={activeIdx === steps.length - 1}
      aria-label="Next"
    >›</button>

    <!-- Play -->
    <button class="play-btn" onclick={togglePlay} aria-label={playing ? 'Pause' : 'Play'}>
      {#if playing}
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><rect x="3" y="2" width="4" height="12" rx="1"/><rect x="9" y="2" width="4" height="12" rx="1"/></svg>
      {:else}
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M4 2l10 6-10 6V2z"/></svg>
      {/if}
    </button>
  </div>
</div>

<style>
  .timeline {
    padding: 12px 0 4px;
  }

  .stepper-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  /* Nav / Play buttons */
  .nav-btn, .play-btn {
    flex-shrink: 0;
    width: 30px;
    height: 30px;
    border: 1.5px solid #ccc;
    border-radius: 50%;
    background: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #333;
    font-size: 1.1rem;
    transition: border-color 0.15s, color 0.15s;
  }
  .nav-btn:hover:not(:disabled),
  .play-btn:hover { border-color: #000; color: #000; }
  .nav-btn:disabled { opacity: 0.3; cursor: default; }

  /* Track */
  .track-wrap {
    position: relative;
    flex: 1;
    height: 60px;
    display: flex;
    align-items: center;
    overflow: visible; /* cards float above */
  }

  .track-bg, .track-fill {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    height: 3px;
    border-radius: 2px;
    pointer-events: none;
  }
  .track-bg  { width: 100%; background: #ddd; z-index: 0; }
  .track-fill { background: var(--color-primary, #000); z-index: 1; transition: width 0.4s ease; }

  /* Step nodes */
  .step-node {
    position: absolute;
    transform: translateX(-50%);
    z-index: 2;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    top: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 28px;
  }

  .node-dot {
    width: 13px;
    height: 13px;
    border-radius: 50%;
    border: 2.5px solid #aaa;
    background: #fff;
    flex-shrink: 0;
    transition: border-color 0.2s, background 0.2s, transform 0.2s;
    z-index: 3;
    position: relative;
  }
  .step-node.active .node-dot {
    border-color: var(--color-primary, #000);
    background: var(--color-primary, #000);
    transform: scale(1.3);
  }
  .step-node:hover .node-dot { border-color: var(--color-primary, #000); }

  .node-label {
    position: absolute;
    top: 2px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.68rem;
    font-weight: 600;
    white-space: nowrap;
    color: #555;
  }
  .step-node.active .node-label { color: #000; }

  .node-date {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.62rem;
    white-space: nowrap;
    color: #999;
    font-variant-numeric: tabular-nums;
  }

  /* Floating event card */
  .event-card {
    position: absolute;
    bottom: calc(100% + 12px);
    z-index: 50;
    background: #fff;
    border: 1px solid #e0e0e0;
    border-left: 3px solid var(--color-primary, #000);
    border-radius: 0 8px 8px 0;
    padding: 10px 12px 10px 12px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 0.82rem;
    animation: pop-up 0.18s ease;
    pointer-events: all;
  }

  /* Downward arrow */
  .event-card::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 20px;
    border: 6px solid transparent;
    border-top-color: #e0e0e0;
  }
  .event-card::before {
    content: '';
    position: absolute;
    top: 100%;
    left: 21px;
    border: 5px solid transparent;
    border-top-color: #fff;
    z-index: 1;
  }

  @keyframes pop-up {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .card-close {
    position: absolute;
    top: 6px;
    right: 8px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 0.75rem;
    color: #aaa;
    padding: 2px 4px;
    line-height: 1;
    transition: color 0.15s;
  }
  .card-close:hover { color: #333; }

  .card-title { font-size: 0.88rem; font-weight: 700; padding-right: 18px; }
  .card-date  { font-size: 0.73rem; color: #888; }
  .card-desc  { margin: 2px 0 0; color: #444; line-height: 1.4; }

  .card-delta { font-size: 0.78rem; font-weight: 600; color: #888; margin-top: 2px; }
  .card-delta.negative { color: #2a7d4f; }
</style>
