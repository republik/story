export type Group = "Elves" | "Dwarves" | "Orcs" | "Humans" | "Halflings";

export type PopulationPoint = {
  year: number;
} & Record<Group, number>;

export type ShareRow = {
  era: string;
} & Record<Group, number>;

export type Scenario = {
  id: string;
  label: string;
  population: PopulationPoint[];
  shares: ShareRow[];
};

export type LineStepState = {
  chart: "line";
  scenarioId: string;
  highlight: Group[];
  xDomain: [number, number];
};

export type Step = {
  id: string;
  text: string;
  state: LineStepState | BarsStepState;
};

export type InputData = {
  lineSteps: Step[];
  scenarios: Record<string, Scenario>;
  groups: Group[];
  groupColors: Record<Group, string>;
};
