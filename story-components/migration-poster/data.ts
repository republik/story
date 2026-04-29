import type {
  Annotation,
  InputData,
  MigrationRow,
  PeakHighlight,
  Step,
  Translations,
} from "./src/types";

// Source: BFS — Ein- und Auswanderung 1974–2022.
const data: MigrationRow[] = [
  { year: 1995, immigration: 90957, emmigration: 69357 },
  { year: 1996, immigration: 74359, emmigration: 71949 },
  { year: 1997, immigration: 69604, emmigration: 67880 },
  { year: 1998, immigration: 72202, emmigration: 64017 },
  { year: 1999, immigration: 83677, emmigration: 62780 },
  { year: 2000, immigration: 84200, emmigration: 59302 },
  { year: 2001, immigration: 99746, emmigration: 56477 },
  { year: 2002, immigration: 105014, emmigration: 53517 },
  { year: 2003, immigration: 98812, emmigration: 51046 },
  { year: 2004, immigration: 100834, emmigration: 52950 },
  { year: 2005, immigration: 99091, emmigration: 54435 },
  { year: 2006, immigration: 107177, emmigration: 57739 },
  { year: 2007, immigration: 143855, emmigration: 60688 },
  { year: 2008, immigration: 161629, emmigration: 58266 },
  { year: 2009, immigration: 138269, emmigration: 59236 },
  { year: 2010, immigration: 139495, emmigration: 70528 },
  { year: 2011, immigration: 140508, emmigration: 66738 },
  { year: 2012, immigration: 151002, emmigration: 73855 },
  { year: 2013, immigration: 167248, emmigration: 77707 },
  { year: 2014, immigration: 161149, emmigration: 82607 },
  { year: 2015, immigration: 162563, emmigration: 86528 },
  { year: 2016, immigration: 167407, emmigration: 90088 },
  { year: 2017, immigration: 147142, emmigration: 93157 },
  { year: 2018, immigration: 146183, emmigration: 98431 },
  { year: 2019, immigration: 145608, emmigration: 94859 },
  { year: 2020, immigration: 137685, emmigration: 83602 },
  { year: 2021, immigration: 143506, emmigration: 88053 },
  { year: 2022, immigration: 169055, emmigration: 90861 },
  { year: 2023, immigration: 241040, emmigration: 93289 },
  { year: 2024, immigration: 190043, emmigration: 99680 },
];

const steps: Step[] = [
  {
    step: "step1",
    title: "Intro",
    positionX: 280,
    positionY: "1996",
    threshold: [0.1, 0.2],
    mobileThreshold: [0.01, 0.01, 0.23, 0.24],
  },
  {
    step: "step2",
    title: "Personenfreizügigkeit mit der EU",
    positionX: 280,
    positionY: "2001",
    threshold: [0.25, 0.4],
    mobileThreshold: [0.23, 0.24, 0.43, 0.44],
  },
  {
    step: "step3",
    title: "Einwanderung aus Nachbarstaaten",
    positionX: 380,
    positionY: "2007",
    threshold: [0.4, 0.6],
    mobileThreshold: [0.43, 0.44, 0.65, 0.66],
  },
  {
    step: "step4",
    title: "Und wieder, die Kriege",
    positionX: 420,
    positionY: "2015",
    threshold: [0.5, 0.95],
    mobileThreshold: [0.65, 0.66],
  },
];

const annotations: Annotation[] = [
  {
    color: "immigration",
    title: "Zuwanderung",
    positionX: 90000,
    positionY: "1998",
    threshold: [0.13, 0.14],
    mobilePositionX: 90000,
    mobileThreshold: [0.01, 0.02],
  },
  {
    title: "Abwanderung",
    color: "emmigration",
    positionX: 10000,
    positionY: "1997",
    threshold: [0.13, 0.14],
    mobilePositionX: 10000,
    mobileThreshold: [0.01, 0.02],
  },
];

// Years where the gap between immigration & emmigration is highlighted.
const peaks: PeakHighlight[] = [
  {
    year: "2002",
    emmigration: 53517,
    immigration: 105014,
    numberPositionX: 65000,
    threshold: [0.35, 0.36],
    mobileThreshold: [0.1, 0.2],
  },
  {
    year: "2008",
    emmigration: 58266,
    immigration: 161629,
    numberPositionX: 90000,
    threshold: [0.6, 0.61],
    mobileThreshold: [0.1, 0.2],
  },
  {
    year: "2016",
    emmigration: 90088,
    immigration: 167407,
    numberPositionX: 110000,
    threshold: [0.9, 0.91],
    mobileThreshold: [0.1, 0.2],
  },
];

const translations: Translations = {
  "step1/text":
    "(WE NEED THIS SMALL EXPLANATION – BITTE ANPASSSEN!) Seit den 80er gibt es konsistent in der Schweiz mehr Menschen, die in der Schweiz einwanderten als auswanderten.",
  "step2/text":
    "2002 trat das sogenannte Freizügigkeits­abkommen in Kraft. In den letzten zwanzig Jahren machte die Zuwanderung aus der EU knapp zwei Drittel der gesamten Zuwanderung in die Schweiz aus.",
  "step3/text":
    "Die Personenfreizügigkeit für EU-Angehörige war während mehrerer Jahre durch Kontingente beschränkt. 2007 fielen die Beschränkungen für die mittel-, west- und nordeuropäischen EU-Staaten, 2014 die für die meisten osteuropäischen.",
  "step4/text":
    "2015 kam es auch wegen des Kriegs in Syrien zur Flucht von Hunderttausenden Menschen nach Europa. Rund 40’000 – vor allem Syrer, Eritreerinnen und Afghanen – stellten in der Schweiz ein Asylgesuch. Als Flüchtlinge anerkannt wurden vor allem eritreische Gesuchstellerinnen.",
};

export const migrationData: InputData = {
  chartTitle: "Die Schweiz und ihre Migration",
  chartSubTitle: "Ein- und Auswanderung in den letzten 30 Jahren",
  data,
  steps,
  annotations,
  peaks,
  translations,
};
