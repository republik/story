import type { Annotation, Group, InputData, PopulationPoint } from "./src/types";

const groups: Group[] = ["Referenz", "Hoch", "Tief"];

const groupColors: Record<Group, string> = {
  Referenz: "#3A6EA5",
  Hoch: "#4FB08A",
  Tief: "#C97A3A",
};

// Source: BFS — Bevölkerungsszenarien 2025–2075 (© BFS).
// Annual Bevölkerungswachstum (%) per scenario, applied from 2026 onward.
// 2025 is the anchor year (no prior-year change applied).
const growthRates: Record<Group, number[]> = {
  Referenz: [
    0.8, 0.78, 0.76, 0.74, 0.72, 0.7, 0.65, 0.61, 0.56, 0.52, 0.49, 0.46, 0.44,
    0.42, 0.4, 0.39, 0.38, 0.37, 0.36, 0.35, 0.34, 0.34, 0.33, 0.32, 0.31, 0.3,
    0.29, 0.28, 0.27, 0.26, 0.25, 0.24, 0.24, 0.24, 0.23, 0.23, 0.23, 0.23,
    0.23, 0.23, 0.23, 0.23, 0.23, 0.23, 0.22, 0.22, 0.22, 0.21, 0.21, 0.21,
  ],
  Hoch: [
    1.16, 1.15, 1.13, 1.12, 1.1, 1.07, 1.03, 0.98, 0.94, 0.9, 0.86, 0.82, 0.79,
    0.76, 0.73, 0.72, 0.71, 0.7, 0.69, 0.68, 0.67, 0.66, 0.65, 0.64, 0.63, 0.62,
    0.61, 0.6, 0.59, 0.59, 0.58, 0.58, 0.57, 0.57, 0.57, 0.57, 0.56, 0.56, 0.56,
    0.56, 0.56, 0.55, 0.55, 0.55, 0.55, 0.54, 0.54, 0.54, 0.53, 0.53,
  ],
  Tief: [
    0.43, 0.4, 0.38, 0.35, 0.33, 0.31, 0.25, 0.21, 0.15, 0.11, 0.09, 0.07, 0.05,
    0.04, 0.03, 0.02, 0.01, 0, -0.01, -0.02, -0.03, -0.04, -0.05, -0.06, -0.07,
    -0.08, -0.09, -0.1, -0.11, -0.12, -0.13, -0.14, -0.14, -0.15, -0.15, -0.16,
    -0.16, -0.16, -0.16, -0.16, -0.16, -0.17, -0.17, -0.17, -0.18, -0.18, -0.19,
    -0.19, -0.19, -0.2,
  ],
};

const startYear = 2025;
const endYear = 2075;

// Anchor: ständige Wohnbevölkerung der Schweiz Anfang 2025.
const startPopulation = 9_100_000;

function compoundPopulation(rates: number[]): number[] {
  const values = [startPopulation];
  for (const r of rates) values.push(values[values.length - 1] * (1 + r / 100));
  return values;
}

// Combined dataset: each year row holds the absolute population for all
// three scenarios, so the chart can plot all three lines at once.
const population: PopulationPoint[] = (() => {
  const series: Record<Group, number[]> = {
    Referenz: compoundPopulation(growthRates.Referenz),
    Hoch: compoundPopulation(growthRates.Hoch),
    Tief: compoundPopulation(growthRates.Tief),
  };
  return series.Referenz.map((_, i) => ({
    year: startYear + i,
    Referenz: Math.round(series.Referenz[i]),
    Hoch: Math.round(series.Hoch[i]),
    Tief: Math.round(series.Tief[i]),
  }));
})();

const xDomain: [number, number] = [startYear, endYear];
const yDomain: [number, number] = [9_000_000, 13_000_000];

// First year each scenario crosses the 10M mark (null if it never does).
const tenMillionCrossing: Record<Group, number | null> = (() => {
  const out = {} as Record<Group, number | null>;
  for (const g of groups) {
    const hit = population.find((p) => p[g] >= 10_000_000);
    out[g] = hit ? hit.year : null;
  }
  return out;
})();

function annotationsFor(...selected: Group[]): Annotation[] {
  return selected
    .map((g) => ({ year: tenMillionCrossing[g], group: g }))
    .filter((a): a is Annotation => a.year !== null);
}

export const scrollyData1: InputData = {
  lineSteps: [
    {
      id: "s1",
      text: "Das Referenzszenario A-00-2025 des Bundesamts für Statistik zeichnet die mittlere Annahme: das Bevölkerungswachstum schwächt sich kontinuierlich ab.",
      state: {
        chart: "line",
        scenarioId: "combined",
        highlight: ["Referenz"],
        xDomain,
        yDomain,
        annotations: annotationsFor("Referenz"),
      },
    },
    {
      id: "s2",
      text: "Im 'hohen' Szenario B-00-2025 bleibt das Wachstum über den ganzen Zeitraum spürbar stärker und sinkt bis 2075 nur langsam auf rund 0,5 %.",
      state: {
        chart: "line",
        scenarioId: "combined",
        highlight: ["Hoch"],
        xDomain,
        yDomain,
        annotations: annotationsFor("Referenz", "Hoch"),
      },
    },
    {
      id: "s3",
      text: "Im 'tiefen' Szenario C-00-2025 dreht das Wachstum ab Mitte der 2040er ins Negative — die Bevölkerung schrumpft.",
      state: {
        chart: "line",
        scenarioId: "combined",
        highlight: ["Tief"],
        xDomain,
        yDomain,
        annotations: annotationsFor("Referenz", "Hoch", "Tief"),
      },
    },
  ],
  scenarios: {
    combined: {
      id: "combined",
      label: "Bevölkerungswachstum nach Szenario",
      population,
    },
  },
  groups,
  groupColors,
};
