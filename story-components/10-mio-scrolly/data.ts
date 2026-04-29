import type { InputData } from "./src/types";

// Source: BFS — Bevölkerungsszenarien 2025–2075 (© BFS).
// Annual Bevölkerungswachstum (%) per scenario, applied from 2026 onward.
// 2025 is the anchor year (no prior-year change applied).
const growthRates = {
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

const startPopulation = 9_100_000; // December 2025

function compoundPopulation(rates: number[]): number[] {
  const values = [startPopulation];
  for (const r of rates) values.push(values[values.length - 1] * (1 + r / 100));
  return values;
}

const lines = {
  Referenz: compoundPopulation(growthRates.Referenz),
  Hoch: compoundPopulation(growthRates.Hoch),
  Tief: compoundPopulation(growthRates.Tief),
};

console.log(lines);

export const scrollyData1: InputData = {
  steps: [
    {
      text: "<p>Let's start with the <span class='color'>reference scenario</span> calculated by the BFS.</p>",
      state: {
        chartDescription: "Szenario A-00-2025",
        highlight: ["Referenz"],
        annotations: [],
      },
    },
    {
      text: "<p>In this scenario, the country crosses the psychological barrier of <span class='color'>10&nbsp;Million inhabitants</span> by year 2042.</p>",
      state: {
        chartDescription: "Szenario A-00-2025",
        highlight: ["Referenz"],
        annotations: [
          {
            x: 2042,
            y: 10_030_100,
            label: "2042",
          },
        ],
      },
    },
    {
      text: "<p>The next scenario describes <span class='color'>higher population growth</span>. It relies on a higher fertility rate combined with a higher immigration rate.</p>",
      state: {
        chartDescription: "Szenario B-00-2025",
        highlight: ["Hoch"],
        annotations: [],
      },
    },
    {
      text: "<p>The <span class='color'>10 Million</span> mark is reached by 2034, so 8 years earlier than in the reference scenario.<br/><br/>The population continues to grow almost linearly in the following decades.</p>",
      state: {
        chartDescription: "Szenario B-00-2025",
        highlight: ["Hoch"],
        annotations: [
          {
            x: 2034,
            y: 10_015_100,
            label: "2034",
          },
        ],
      },
    },
    {
      text: "<p>Let's now have a look at the third scenario, which models a <span class='color'>lower population growth</span>.<br/><br/>Things look very different here.</p>",
      state: {
        chartDescription: "Szenario C-00-2025",
        highlight: ["Tief"],
        annotations: [],
      },
    },
    {
      text: "<p>The <span class='color'>inflection point</span> is reached in 2042, with 9.4 Million inhabitants.<br/><br/>After that, growth turns into shrinkage and the pulation slowly declines.</p>",
      state: {
        chartDescription: "Szenario C-00-2025",
        highlight: ["Tief"],
        annotations: [
          {
            x: 2042,
            y: 9_400_100,
            label: "2042",
          },
        ],
      },
    },
  ],
  chartConfig: {
    title: "Bevölkerungswachstum in der Schweiz",
    xDomain: [2025, 2075],
    yDomain: [9_000_000, 13_000_000],
  },
  lines: [
    {
      name: "Referenz",
      color: "#ff0f4f",
      dataPoints: lines.Referenz,
    },
    {
      name: "Hoch",
      color: "#aa16ff",
      dataPoints: lines.Hoch,
    },
    {
      name: "Tief",
      color: "#ffa600",
      dataPoints: lines.Tief,
    },
  ],
};
