<svelte:options customElement={{
  tag: 'tech-dependencies',
  shadow: 'open',
}} />

<script lang="ts">
  import { onMount } from 'svelte';
  import fontsCSS from '@story/theme/fonts.css?inline';
  import stylesCSS from '@story/theme/styles.css?inline';

  import Timeline from './Timeline.svelte';
  import Sankey from './Sankey.svelte';
  import Totals from './Totals.svelte';
  import Quadrant from './Quadrant.svelte';

  import rawData from './data.json';
  import type { Dataset } from './types.d.ts';
  import {
    activeServicesAt,
    sankeyEdges,
    sankeyEdgesInfra,
    computeTotals,
    computeTotalsInfra,
  } from './lib/derive.ts';

  const dataset = rawData as unknown as Dataset;

  let shadowRoot = $host()?.shadowRoot;
  let theme = $state<string | null>(null);
  let currentDate = $state(dataset.asOfMin);
  let sankeyView = $state<'category' | 'infra'>('category');

  const active = $derived(activeServicesAt(dataset, currentDate));
  const sankeyCat = $derived(sankeyEdges(active));
  const sankeyInfra = $derived(sankeyEdgesInfra(active));
  const totals = $derived(
    sankeyView === 'infra' ? computeTotalsInfra(active) : computeTotals(active)
  );

  onMount(() => {
    const ID = 'story-components-theme';
    if (shadowRoot && !shadowRoot.getElementById(ID)) {
      const node = document.createElement('style');
      node.id = ID;
      const hostOverride =
        ':host{display:block;box-sizing:border-box;contain:layout paint;-webkit-font-smoothing:auto;-moz-osx-font-smoothing:auto;}' +
        '.story-component{box-sizing:border-box;width:100%;}*,*::before,*::after{box-sizing:border-box;}';
      node.textContent = fontsCSS + stylesCSS + hostOverride;
      shadowRoot.appendChild(node);
    }

    const themeSource = document.querySelector('[data-theme]');
    if (themeSource) {
      theme = themeSource.getAttribute('data-theme');
      const observer = new MutationObserver(() => {
        theme = themeSource.getAttribute('data-theme');
      });
      observer.observe(themeSource, { attributes: true, attributeFilter: ['data-theme'] });
      return () => observer.disconnect();
    }
  });
</script>

<div id="story-component" class="story-component" data-theme={theme}>
  <div class="tech-dep">
    <header class="td-header">
      <h2 class="td-title">Republik Tech Abhängigkeiten</h2>
      <p class="td-subtitle">
        Welche Unternehmen und Länder sind wir für unsere digitale Infrastruktur abhängig — und wohin fliesst unser Geld?
      </p>
    </header>

    <!-- KPI strip -->
    <section class="td-section">
      <Totals {totals} />
    </section>

    <!-- Money flow with view toggle -->
    <section class="td-section td-sankey">
      <div class="view-toggle">
        <button
          class="toggle-btn"
          class:active={sankeyView === 'category'}
          onclick={() => (sankeyView = 'category')}
        >Firmensitz</button>
        <button
          class="toggle-btn"
          class:active={sankeyView === 'infra'}
          onclick={() => (sankeyView = 'infra')}
        >Hosting-Infrastruktur</button>
      </div>
      {#if sankeyView === 'category'}
        <Sankey
          data={sankeyCat}
          labelTypes={['origin', 'category', 'vendor', 'region']}
        />
      {:else}
        <Sankey
          data={sankeyInfra}
          labelTypes={['origin', 'vendor', 'infra', 'region']}
        />
      {/if}
    </section>

    <!-- Centrality / lock-in quadrant -->
    <section class="td-section">
      <Quadrant services={active} />
    </section>

    <!-- Sticky timeline bar -->
    <div class="timeline-sticky">
      <Timeline
        minDate={dataset.asOfMin}
        {currentDate}
        events={dataset.events}
        onDateChange={(d) => (currentDate = d)}
      />
    </div>

    <footer class="td-footer">
      <p>
        Kosten sind Schätzungen in CHF/Jahr (Stand: {new Date(currentDate).toLocaleDateString('de-CH', { month: 'long', year: 'numeric' })}).
        Nutzungsbasierte Dienste (Stripe, Heroku) sind als Jahresdurchschnitt ausgewiesen.
      </p>
    </footer>
  </div>
</div>

<style>
  .tech-dep {
    font-family: inherit;
    max-width: 960px;
    margin: 0 auto;
    padding: 24px 16px;
    color: #111;
  }

  @media (max-width: 520px) {
    .tech-dep {
      padding: 16px 4px;
    }
  }

  .td-header {
    margin-bottom: 24px;
  }

  .td-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 0 6px;
    line-height: 1.2;
  }

  .td-subtitle {
    font-size: 0.9rem;
    color: #555;
    margin: 0;
    line-height: 1.5;
  }

  .td-section {
    margin-bottom: 32px;
  }

  /* Extra bottom space so Sankey isn't hidden behind the sticky bar */
  .td-sankey {
    padding-bottom: 90px;
  }

  .view-toggle {
    display: flex;
    gap: 4px;
    margin-bottom: 16px;
  }

  .toggle-btn {
    padding: 5px 14px;
    border: 1.5px solid #ccc;
    border-radius: 20px;
    background: #fff;
    font-size: 0.82rem;
    cursor: pointer;
    color: #555;
    transition: border-color 0.15s, color 0.15s, background 0.15s;
  }
  .toggle-btn:hover { border-color: #999; color: #222; }
  .toggle-btn.active {
    background: #111;
    border-color: #111;
    color: #fff;
  }

  .timeline-sticky {
    position: sticky;
    bottom: 0;
    background: #fff;
    border-top: 1px solid #eee;
    margin: 0 -16px;
    padding: 0 16px 8px;
    z-index: 20;
  }

  .td-section-title {
    font-size: 1rem;
    font-weight: 600;
    margin: 0 0 12px;
    color: #333;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    font-size: 0.8rem;
  }


  .td-footer {
    border-top: 1px solid #eee;
    padding-top: 12px;
  }

  .td-footer p {
    font-size: 0.75rem;
    color: #888;
    margin: 0;
    line-height: 1.5;
  }

  /* Dark mode via data-theme="dark" */
  [data-theme="dark"] .tech-dep {
    color: #f0f0f0;
  }
  [data-theme="dark"] .td-subtitle,
  [data-theme="dark"] .td-section-title,
  [data-theme="dark"] .tab-desc,
  [data-theme="dark"] .td-footer p {
    color: #aaa;
  }
  [data-theme="dark"] .td-footer { border-top-color: #333; }
  [data-theme="dark"] .timeline-sticky {
    background: #111;
    border-top-color: #333;
  }
</style>
