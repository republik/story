<script lang="ts">
  import type { Totals } from './lib/derive.ts';

  interface Props {
    totals: Totals;
  }

  let { totals }: Props = $props();

  function formatCHF(n: number): string {
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + ' Mio. CHF';
    if (n >= 1_000) return (n / 1_000).toFixed(0) + "'000 CHF";
    return n.toLocaleString('de-CH') + ' CHF';
  }
</script>

<div class="totals">
  <div class="kpi-grid">
    <div class="kpi">
      <div class="kpi-value">{formatCHF(totals.totalCHF)}</div>
      <div class="kpi-label">Total / Jahr</div>
    </div>
    <div class="kpi">
      <div class="kpi-value">{totals.serviceCount}</div>
      <div class="kpi-label">Dienste aktiv</div>
    </div>
  </div>

  <!-- Sovereignty bar: USA / EU+CH / Other -->
  <div class="sovereignty-bar-wrap">
    <div class="sovereignty-bar" aria-label="Spending by region">
      <div
        class="bar-segment bar-us"
        style="width: {totals.usPct}%"
        title="USA: {totals.usPct}%"
      ></div>
      <div
        class="bar-segment bar-eu"
        style="width: {totals.euPct}%"
        title="EU / CH: {totals.euPct}%"
      ></div>
      <div
        class="bar-segment bar-other"
        style="width: {totals.otherPct}%"
        title="Andere: {totals.otherPct}%"
      ></div>
    </div>
    <div class="bar-legend">
      <span class="bar-dot bar-us-dot"></span>USA ({totals.usPct}%)
      <span class="bar-dot bar-eu-dot"></span>EU / CH ({totals.euPct}%)
      {#if totals.otherPct > 0}
        <span class="bar-dot bar-other-dot"></span>Andere ({totals.otherPct}%)
      {/if}
    </div>
  </div>
</div>

<style>
  .totals {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .kpi-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
    gap: 12px;
  }

  .kpi {
    background: #f5f5f5;
    border-radius: 8px;
    padding: 12px 16px;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .kpi--us       { background: #e8eef9; }
  .kpi--us.kpi--high { background: #fde8e8; }
  .kpi--eu       { background: #e8f5e9; }
  .kpi--other    { background: #f5f5f5; }
  .kpi--warn     { background: #fff8e1; }
  .kpi--warn.kpi--high { background: #fde8e8; }

  .kpi-value {
    font-size: 1.35rem;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    line-height: 1;
  }

  .kpi-label {
    font-size: 0.75rem;
    color: #555;
    margin-top: 2px;
  }

  .kpi-sub {
    font-size: 0.7rem;
    color: #888;
    font-variant-numeric: tabular-nums;
  }

  .sovereignty-bar-wrap {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .sovereignty-bar {
    display: flex;
    height: 14px;
    border-radius: 7px;
    overflow: hidden;
    background: #eee;
  }

  .bar-segment { height: 100%; transition: width 0.5s ease; }
  .bar-us    { background: #1565c0; }
  .bar-eu    { background: #388e3c; }
  .bar-other { background: #888; }

  .bar-legend {
    display: flex;
    gap: 12px;
    font-size: 0.72rem;
    color: #555;
    align-items: center;
  }

  .bar-dot {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 3px;
  }
  .bar-us-dot    { background: #1565c0; }
  .bar-eu-dot    { background: #388e3c; }
  .bar-other-dot { background: #888; }
</style>
