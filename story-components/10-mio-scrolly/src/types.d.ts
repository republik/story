export type Group = "Referenz" | "Hoch" | "Tief";

export type PopulationPoint = {
  year: number;
} & Record<Group, number>;

export type Scenario = {
  id: string;
  label: string;
  population: PopulationPoint[];
};

export type Annotation = {
  year: number;
  group: Group;
};

export type LineStepState = {
  chart: "line";
  scenarioId: string;
  highlight: Group[];
  xDomain: [number, number];
  yDomain: [number, number];
  annotations: Annotation[];
};

export type Step = {
  id: string;
  text: string;
  state: LineStepState;
};

export type InputData = {
  lineSteps: Step[];
  scenarios: Record<string, Scenario>;
  groups: Group[];
  groupColors: Record<Group, string>;
};
