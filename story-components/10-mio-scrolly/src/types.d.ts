export type LineData = {
  name: string;
  color: string;
  dataPoints: number[];
};

export type Annotation = {
  show10M?: boolean;
  x: number;
  y: number;
  label: string;
  color?: string;
};

export type StepState = {
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
