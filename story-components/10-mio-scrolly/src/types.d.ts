export type LineData = {
  name: string;
  color: string;
  dataPoints: number[];
};

export type Annotation = {
  x: number;
  y: number;
  label: string;
  color?: string;
};

export type StepState = {
  chartDescription: string;
  highlight: string[];
  annotations: Annotation[];
};

export type Step = {
  text: string;
  state: StepState;
};

export type ChartConfig = {
  title: string;
  xDomain: [number, number];
  yDomain: [number, number];
};

export type InputData = {
  chartConfig: ChartConfig;
  steps: Step[];
  lines: LineData[];
};
