import type {
  Group,
  InputData,
  PopulationPoint,
  Scenario,
  ShareRow,
} from "./src/types";

const groups: Group[] = ["Bevölkerungswachstum"];

const groupColors: Record<Group, string> = {
  "Bevölkerungswachstum": "#3A6EA5",
  "Ausländeranteil": "#C97A3A",
  "Unter 15-Jährige": "#4FB08A",
  "65-Jährige und Ältere": "#8B5A8C",
};

// Source: BFS — Bevölkerungsszenarien 2025–2075 (© BFS).
// Flat value array, ordered: scenario × year × metric.
// 3 scenarios × 52 years (2024–2075) × 4 metrics = 624 values.
// Metric order: Bevölkerungswachstum (%), Ausländeranteil (%),
// Unter 15-Jährige (%), 65-Jährige und Ältere (%).
const rawValues: number[] = [
  0.85, 27.23, 14.92, 19.59, 0.81, 27.48, 14.83, 19.89, 0.8, 27.72, 14.75,
  20.21, 0.78, 27.97, 14.65, 20.55, 0.76, 28.21, 14.56, 20.92, 0.74, 28.45,
  14.44, 21.31, 0.72, 28.7, 14.33, 21.66, 0.7, 28.94, 14.2, 21.99, 0.65,
  29.16, 14.08, 22.29, 0.61, 29.37, 13.97, 22.56, 0.56, 29.56, 13.87, 22.82,
  0.52, 29.74, 13.77, 23.03, 0.49, 29.91, 13.65, 23.23, 0.46, 30.07, 13.6,
  23.39, 0.44, 30.22, 13.57, 23.51, 0.42, 30.37, 13.51, 23.63, 0.4, 30.51,
  13.45, 23.72, 0.39, 30.65, 13.39, 23.81, 0.38, 30.79, 13.34, 23.91, 0.37,
  30.93, 13.3, 24, 0.36, 31.06, 13.27, 24.1, 0.35, 31.2, 13.24, 24.23, 0.34,
  31.33, 13.22, 24.35, 0.34, 31.46, 13.21, 24.48, 0.33, 31.59, 13.21, 24.58,
  0.32, 31.73, 13.21, 24.7, 0.31, 31.86, 13.21, 24.82, 0.3, 31.98, 13.22,
  24.94, 0.29, 32.11, 13.23, 25.05, 0.28, 32.24, 13.24, 25.19, 0.27, 32.37,
  13.25, 25.32, 0.26, 32.49, 13.26, 25.46, 0.25, 32.62, 13.26, 25.6, 0.24,
  32.74, 13.26, 25.73, 0.24, 32.86, 13.25, 25.84, 0.24, 32.98, 13.25, 25.94,
  0.23, 33.09, 13.24, 26.03, 0.23, 33.2, 13.22, 26.13, 0.23, 33.31, 13.2,
  26.21, 0.23, 33.42, 13.18, 26.29, 0.23, 33.52, 13.16, 26.36, 0.23, 33.62,
  13.14, 26.43, 0.23, 33.72, 13.11, 26.48, 0.23, 33.81, 13.09, 26.52, 0.23,
  33.9, 13.06, 26.55, 0.23, 33.99, 13.04, 26.6, 0.22, 34.08, 13.02, 26.65,
  0.22, 34.16, 13, 26.7, 0.22, 34.25, 12.98, 26.75, 0.21, 34.33, 12.97,
  26.8, 0.21, 34.41, 12.95, 26.87, 0.21, 34.49, 12.94, 26.93, 1.19, 27.3,
  14.97, 19.56, 1.17, 27.62, 14.94, 19.83, 1.16, 27.93, 14.92, 20.12, 1.15,
  28.24, 14.89, 20.44, 1.13, 28.55, 14.86, 20.78, 1.12, 28.85, 14.81, 21.14,
  1.1, 29.15, 14.76, 21.46, 1.07, 29.45, 14.7, 21.76, 1.03, 29.74, 14.65,
  22.03, 0.98, 30, 14.61, 22.28, 0.94, 30.25, 14.58, 22.5, 0.9, 30.47,
  14.55, 22.69, 0.86, 30.69, 14.5, 22.86, 0.82, 30.89, 14.51, 23, 0.79,
  31.07, 14.55, 23.12, 0.76, 31.25, 14.51, 23.22, 0.73, 31.4, 14.45, 23.31,
  0.72, 31.56, 14.4, 23.4, 0.71, 31.71, 14.35, 23.49, 0.7, 31.86, 14.31,
  23.58, 0.69, 32.01, 14.27, 23.68, 0.68, 32.16, 14.24, 23.8, 0.67, 32.3,
  14.21, 23.92, 0.66, 32.45, 14.19, 24.05, 0.65, 32.59, 14.17, 24.17, 0.64,
  32.73, 14.15, 24.29, 0.63, 32.87, 14.14, 24.41, 0.62, 33.01, 14.13, 24.54,
  0.61, 33.15, 14.12, 24.66, 0.6, 33.29, 14.11, 24.81, 0.59, 33.43, 14.1,
  24.96, 0.59, 33.56, 14.09, 25.11, 0.58, 33.69, 14.08, 25.26, 0.58, 33.82,
  14.07, 25.4, 0.57, 33.95, 14.06, 25.52, 0.57, 34.08, 14.05, 25.64, 0.57,
  34.2, 14.05, 25.75, 0.57, 34.32, 14.03, 25.86, 0.56, 34.43, 14.02, 25.97,
  0.56, 34.55, 14.01, 26.06, 0.56, 34.65, 14, 26.16, 0.56, 34.76, 13.99,
  26.25, 0.56, 34.86, 13.98, 26.32, 0.55, 34.96, 13.96, 26.39, 0.55, 35.06,
  13.95, 26.45, 0.55, 35.15, 13.93, 26.52, 0.55, 35.25, 13.92, 26.6, 0.54,
  35.33, 13.9, 26.67, 0.54, 35.42, 13.89, 26.75, 0.54, 35.5, 13.87, 26.83,
  0.53, 35.58, 13.85, 26.92, 0.53, 35.66, 13.84, 27.01, 0.51, 27.16, 14.87,
  19.62, 0.45, 27.33, 14.72, 19.94, 0.43, 27.51, 14.57, 20.29, 0.4, 27.69,
  14.41, 20.65, 0.38, 27.86, 14.25, 21.05, 0.35, 28.04, 14.07, 21.47, 0.33,
  28.22, 13.88, 21.86, 0.31, 28.4, 13.68, 22.22, 0.25, 28.56, 13.49, 22.55,
  0.21, 28.7, 13.29, 22.86, 0.15, 28.83, 13.12, 23.14, 0.11, 28.94, 12.95,
  23.39, 0.09, 29.05, 12.74, 23.61, 0.07, 29.16, 12.61, 23.79, 0.05, 29.28,
  12.51, 23.94, 0.04, 29.39, 12.43, 24.07, 0.03, 29.5, 12.35, 24.17, 0.02,
  29.62, 12.29, 24.27, 0.01, 29.73, 12.23, 24.38, 0, 29.84, 12.19, 24.48,
  -0.01, 29.95, 12.16, 24.59, -0.02, 30.06, 12.13, 24.72, -0.03, 30.17,
  12.12, 24.85, -0.04, 30.28, 12.12, 24.98, -0.05, 30.38, 12.13, 25.09,
  -0.06, 30.49, 12.15, 25.21, -0.07, 30.59, 12.17, 25.32, -0.08, 30.69,
  12.2, 25.44, -0.09, 30.79, 12.23, 25.55, -0.1, 30.89, 12.26, 25.69, -0.11,
  30.99, 12.29, 25.82, -0.12, 31.08, 12.32, 25.96, -0.13, 31.18, 12.34,
  26.09, -0.14, 31.27, 12.36, 26.21, -0.14, 31.37, 12.36, 26.31, -0.15,
  31.46, 12.36, 26.4, -0.15, 31.54, 12.36, 26.48, -0.16, 31.63, 12.34,
  26.56, -0.16, 31.71, 12.32, 26.63, -0.16, 31.79, 12.29, 26.69, -0.16,
  31.87, 12.26, 26.74, -0.16, 31.95, 12.23, 26.79, -0.16, 32.02, 12.19,
  26.8, -0.17, 32.09, 12.15, 26.81, -0.17, 32.16, 12.11, 26.81, -0.17,
  32.23, 12.07, 26.83, -0.18, 32.3, 12.03, 26.85, -0.18, 32.37, 12, 26.86,
  -0.19, 32.43, 11.98, 26.88, -0.19, 32.5, 11.96, 26.91, -0.19, 32.57,
  11.94, 26.94, -0.2, 32.64, 11.93, 26.98,
];

const yearsPerScenario = 52; // 2024..2075 inclusive
const metricsPerYear = 4;
const startYear = 2025; // skip 2024

function buildPopulation(scenarioIdx: number): PopulationPoint[] {
  const out: PopulationPoint[] = [];
  for (let y = 1; y < yearsPerScenario; y++) {
    const base = scenarioIdx * yearsPerScenario * metricsPerYear + y * metricsPerYear;
    out.push({
      year: 2024 + y,
      "Bevölkerungswachstum": rawValues[base + 0],
      "Ausländeranteil": rawValues[base + 1],
      "Unter 15-Jährige": rawValues[base + 2],
      "65-Jährige und Ältere": rawValues[base + 3],
    });
  }
  return out;
}

const referenceScenario = buildPopulation(0);
const highScenario = buildPopulation(1);
const lowScenario = buildPopulation(2);

const shareYears = [2025, 2035, 2045, 2055, 2065, 2075];

function eraLabel(year: number): string {
  return String(year);
}

function toShares(pop: PopulationPoint[]): ShareRow[] {
  return pop
    .filter((p) => shareYears.includes(p.year))
    .map((p) => {
      const row = { era: eraLabel(p.year) } as ShareRow;
      groups.forEach((g) => (row[g] = p[g]));
      return row;
    });
}

function makeScenario(
  id: string,
  label: string,
  pop: PopulationPoint[],
): Scenario {
  return { id, label, population: pop, shares: toShares(pop) };
}

const scenarios: Record<string, Scenario> = {
  reference: makeScenario(
    "reference",
    "Referenzszenario A-00-2025",
    referenceScenario,
  ),
  high: makeScenario("high", "'Hohes' Szenario B-00-2025", highScenario),
  low: makeScenario("low", "'Tiefes' Szenario C-00-2025", lowScenario),
};

const xDomain: [number, number] = [startYear, 2075];
const allHighlight: Group[] = [...groups];

export const scrollyData1: InputData = {
  lineSteps: [
    {
      id: "s1",
      text: "Das Referenzszenario A-00-2025 des Bundesamts für Statistik zeichnet die mittlere Annahme: Wachstum schwächt sich ab, der Ausländeranteil steigt, die Bevölkerung altert.",
      state: {
        chart: "line",
        scenarioId: "reference",
        highlight: allHighlight,
        xDomain,
      },
    },
    {
      id: "s2",
      text: "Im 'hohen' Szenario B-00-2025 bleibt das Wachstum stärker, der Ausländeranteil steigt deutlicher — der Anteil der unter 15-Jährigen bleibt höher, die Alterung verläuft langsamer.",
      state: {
        chart: "line",
        scenarioId: "high",
        highlight: allHighlight,
        xDomain,
      },
    },
    {
      id: "s3",
      text: "Im 'tiefen' Szenario C-00-2025 dreht das Wachstum ab Mitte der 2040er ins Negative; der Anteil der unter 15-Jährigen sinkt stark, die Alterung beschleunigt sich.",
      state: {
        chart: "line",
        scenarioId: "low",
        highlight: allHighlight,
        xDomain,
      },
    },
  ],
  scenarios,
  groups,
  groupColors,
};
