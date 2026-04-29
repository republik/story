export type MigrationRow = {
  year: number;
  immigration: number;
  emmigration: number;
};

export type Translations = Record<string, string>;

export type Step = {
  step: string;
  title: string;
  positionX: number;
  positionY: string;
  threshold: [number, number];
  mobileThreshold?: number[];
};

export type Annotation = {
  color: "immigration" | "emmigration";
  title: string;
  positionX: number;
  positionY: string;
  threshold: [number, number];
  mobilePositionX: number;
  mobileThreshold: [number, number];
};

export type PeakHighlight = {
  year: string;
  emmigration: number;
  immigration: number;
  numberPositionX: number;
  threshold: [number, number];
  mobileThreshold: [number, number];
};

export type InputData = {
  chartTitle: string;
  chartSubTitle: string;
  data: MigrationRow[];
  steps: Step[];
  annotations: Annotation[];
  peaks: PeakHighlight[];
  translations: Translations;
};
