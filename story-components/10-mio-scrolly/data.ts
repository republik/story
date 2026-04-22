import type {
  Group,
  InputData,
  PopulationPoint,
  Scenario,
  ShareRow,
} from "./src/types";

const groups: Group[] = ["Elves", "Dwarves", "Orcs", "Humans", "Halflings"];

const groupColors: Record<Group, string> = {
  Elves: "#4FB08A",
  Dwarves: "#C97A3A",
  Orcs: "#8B5A8C",
  Humans: "#3A6EA5",
  Halflings: "#D4A437",
};

// Recorded history — the "canonical" chronicle (population in thousands).
const baseline: PopulationPoint[] = [
  {
    year: -10000,
    Elves: 1200,
    Dwarves: 400,
    Orcs: 50,
    Humans: 80,
    Halflings: 30,
  },
  {
    year: -9000,
    Elves: 1300,
    Dwarves: 520,
    Orcs: 90,
    Humans: 130,
    Halflings: 55,
  },
  {
    year: -8000,
    Elves: 1400,
    Dwarves: 680,
    Orcs: 160,
    Humans: 220,
    Halflings: 90,
  },
  {
    year: -7000,
    Elves: 1420,
    Dwarves: 860,
    Orcs: 290,
    Humans: 380,
    Halflings: 140,
  },
  {
    year: -6000,
    Elves: 1380,
    Dwarves: 1020,
    Orcs: 510,
    Humans: 640,
    Halflings: 210,
  },
  {
    year: -5000,
    Elves: 1290,
    Dwarves: 1150,
    Orcs: 880,
    Humans: 1080,
    Halflings: 310,
  },
  {
    year: -4000,
    Elves: 1150,
    Dwarves: 1220,
    Orcs: 1400,
    Humans: 1900,
    Halflings: 430,
  },
  {
    year: -3000,
    Elves: 980,
    Dwarves: 1210,
    Orcs: 2100,
    Humans: 3400,
    Halflings: 580,
  },
  {
    year: -2000,
    Elves: 800,
    Dwarves: 1120,
    Orcs: 2900,
    Humans: 6100,
    Halflings: 760,
  },
  {
    year: -1000,
    Elves: 620,
    Dwarves: 960,
    Orcs: 3600,
    Humans: 9800,
    Halflings: 960,
  },
  {
    year: 0,
    Elves: 450,
    Dwarves: 780,
    Orcs: 4200,
    Humans: 15200,
    Halflings: 1150,
  },
];

// Counter-factual: the Orc Surge never happens.
// Orcs plateau around 500, Humans grow even faster into the vacuum.
const noOrcSurge: PopulationPoint[] = baseline.map((p) => ({
  ...p,
  Orcs: Math.min(p.Orcs, p.year <= -6000 ? p.Orcs : 500 + (p.year + 6000) / 60),
  Humans:
    p.year >= -6000
      ? Math.round(p.Humans * (1 + (p.year + 6000) / 20000))
      : p.Humans,
}));

// Counter-factual: a long plague in the Fourth Age halves Humans,
// Halflings, and Orcs between year -4000 and -2000.
const plague: PopulationPoint[] = baseline.map((p) => {
  if (p.year < -4000 || p.year > -1000) return { ...p };
  const t = Math.min(1, (p.year + 4000) / 2000); // 0..1 across the plague years, then recovers
  const dip =
    p.year <= -2000 ? 0.45 + 0.4 * t : 0.7 + 0.25 * ((p.year + 2000) / 1000);
  return {
    ...p,
    Humans: Math.round(p.Humans * dip),
    Halflings: Math.round(p.Halflings * (0.6 + 0.35 * t)),
    Orcs: Math.round(p.Orcs * (0.7 + 0.25 * t)),
  };
});

// Counter-factual: the Elves adapt and never enter their long decline.
const elvishRenaissance: PopulationPoint[] = baseline.map((p) => ({
  ...p,
  Elves: p.year <= -6000 ? p.Elves : Math.round(1380 + (p.year + 6000) * 0.08),
}));

const shareYears = [-10000, -7000, -4000, -1000, 0];

function eraLabel(year: number): string {
  if (year === 0) return "Present";
  return `${Math.abs(year / 1000)}k BA`;
}

function toShares(pop: PopulationPoint[]): ShareRow[] {
  return pop
    .filter((p) => shareYears.includes(p.year))
    .map((p) => {
      const total = groups.reduce((s, g) => s + p[g], 0);
      const row = { era: eraLabel(p.year) } as ShareRow;
      groups.forEach((g) => (row[g] = p[g] / total));
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

// --- Forward-looking projections: year 0 to +10 000 ---
// Starts from the present-day values and extrapolates under different
// assumptions about fertility, magic, and the climate of the north.
const presentDay = baseline[baseline.length - 1];

const futureYears = [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];

function projectFuture(
  step: (year: number, prev: PopulationPoint) => Omit<PopulationPoint, "year">,
): PopulationPoint[] {
  const out: PopulationPoint[] = [{ ...presentDay, year: 0 }];
  for (let i = 1; i < futureYears.length; i++) {
    const y = futureYears[i];
    const prev = out[i - 1];
    out.push({ year: y, ...step(y, prev) });
  }
  return out;
}

// Business-as-usual: gentle continuation of present trends.
const futureBaseline = projectFuture((_, p) => ({
  Elves: Math.round(p.Elves * 0.96),
  Dwarves: Math.round(p.Dwarves * 0.985),
  Orcs: Math.round(p.Orcs * 1.03),
  Humans: Math.round(p.Humans * 1.045),
  Halflings: Math.round(p.Halflings * 1.02),
}));

// Climate shift: the long winter of the Northern Reaches. Dwarves thrive,
// Humans and Orcs stall, Elves stabilise.
const climateShift = projectFuture((y, p) => ({
  Elves: Math.round(p.Elves * 1.005),
  Dwarves: Math.round(p.Dwarves * 1.04),
  Orcs: Math.round(p.Orcs * (y <= 3000 ? 1.01 : 0.985)),
  Humans: Math.round(p.Humans * (y <= 2000 ? 1.015 : 0.992)),
  Halflings: Math.round(p.Halflings * 0.99),
}));

// Dwarven diaspora: the Great Tunnels open, Dwarves explode across the
// surface, everyone else recalibrates.
const dwarvenDiaspora = projectFuture((_, p) => ({
  Elves: Math.round(p.Elves * 0.97),
  Dwarves: Math.round(p.Dwarves * 1.08),
  Orcs: Math.round(p.Orcs * 0.99),
  Humans: Math.round(p.Humans * 1.015),
  Halflings: Math.round(p.Halflings * 1.025),
}));

// Human collapse: over-extension, plague, and civil wars halve the Human
// population every two millennia. Others fill the gap slowly.
const humanCollapse = projectFuture((y, p) => ({
  Elves: Math.round(p.Elves * 1.02),
  Dwarves: Math.round(p.Dwarves * 1.03),
  Orcs: Math.round(p.Orcs * 1.05),
  Humans: Math.round(p.Humans * (y <= 4000 ? 0.7 : 0.92)),
  Halflings: Math.round(p.Halflings * 1.04),
}));

const scenarios: Record<string, Scenario> = {
  baseline: makeScenario("baseline", "Recorded history", baseline),
  noOrcSurge: makeScenario("noOrcSurge", "Without the Orc Surge", noOrcSurge),
  plague: makeScenario("plague", "The Fourth-Age Plague", plague),
  elvishRenaissance: makeScenario(
    "elvishRenaissance",
    "An Elvish Renaissance",
    elvishRenaissance,
  ),
  futureBaseline: makeScenario("futureBaseline", "Continuation of present trends", futureBaseline),
  climateShift: makeScenario("climateShift", "The Long Northern Winter", climateShift),
  dwarvenDiaspora: makeScenario("dwarvenDiaspora", "The Dwarven Diaspora", dwarvenDiaspora),
  humanCollapse: makeScenario("humanCollapse", "A Human Unravelling", humanCollapse),
};

export const scrollyData1: InputData = {
  lineSteps: [
    {
      id: "l1",
      text: "This is the chronicle as the Scribes of Thal recorded it. Elves dominant in the First Age, Dwarves steady through the Third, and Humans overtaking everyone by the turn of the present era.",
      state: {
        chart: "line",
        scenarioId: "baseline",
        highlight: ["Elves", "Dwarves", "Orcs", "Humans"],
        xDomain: [-10000, 0],
      },
    },
    {
      id: "l2",
      text: "But history is not the only possibility. Consider a Mittelland in which the Orc Surge of the Fourth Age never happened — their clans splintered, their warlords forgotten. The Orc line flattens; Humans expand to fill the space left behind.",
      state: {
        chart: "line",
        scenarioId: "noOrcSurge",
        highlight: ["Orcs", "Humans"],
        xDomain: [-10000, 0],
      },
    },
    {
      id: "l3",
      text: "Or imagine the Plague of the Fourth Age had not been contained. Humans, Halflings, and Orcs all collapse between year -4000 and -2000, and only begin to recover by the present. The scale of the Mittelland is a fraction of what we know.",
      state: {
        chart: "line",
        scenarioId: "plague",
        highlight: ["Humans", "Halflings", "Orcs"],
        xDomain: [-10000, 0],
      },
    },
    {
      id: "l4",
      text: "And a kinder counter-factual: suppose the Elves had adapted to the new world instead of withdrawing from it. In this timeline their numbers never fall — they finish the chronicle with more than a million, not fewer than five hundred thousand.",
      state: {
        chart: "line",
        scenarioId: "elvishRenaissance",
        highlight: ["Elves"],
        xDomain: [-10000, 0],
      },
    },
  ],
  scenarios,
  groups,
  groupColors,
};

export const scrollyData2: InputData = {
  lineSteps: [
    {
      id: "f1",
      text: "Now turn the telescope the other way. Starting from today's populations, the Royal Academy of Prognostication has modelled four futures for the Mittelland. Here is the business-as-usual projection: Humans keep climbing, Orcs and Halflings drift upward, Elves and Dwarves slowly decline.",
      state: {
        chart: "line",
        scenarioId: "futureBaseline",
        highlight: ["Humans", "Orcs", "Elves", "Dwarves"],
        xDomain: [0, 10000],
      },
    },
    {
      id: "f2",
      text: "The first alternative: a long winter closes over the Northern Reaches. The cold favours stone and iron over field and orchard. Dwarves multiply sixfold over the coming millennia; Human and Orc expansion stalls in the icebound plains.",
      state: {
        chart: "line",
        scenarioId: "climateShift",
        highlight: ["Dwarves", "Humans", "Orcs"],
        xDomain: [0, 10000],
      },
    },
    {
      id: "f3",
      text: "Second: the Great Tunnels open and the Dwarves, for the first time in their history, pour out onto the surface. The Halflings — long their trading partners — come up with them. The Elven line keeps falling, just more gently than in the baseline.",
      state: {
        chart: "line",
        scenarioId: "dwarvenDiaspora",
        highlight: ["Dwarves", "Halflings"],
        xDomain: [0, 10000],
      },
    },
    {
      id: "f4",
      text: "And the darkest forecast: a Human unravelling. Imperial overreach, plague, civil war — the great curve that dominated the last ten thousand years breaks, and every other people inherits a slightly larger share of a much smaller world.",
      state: {
        chart: "line",
        scenarioId: "humanCollapse",
        highlight: ["Humans", "Orcs", "Halflings", "Elves"],
        xDomain: [0, 10000],
      },
    },
  ],
  scenarios,
  groups,
  groupColors,
};
