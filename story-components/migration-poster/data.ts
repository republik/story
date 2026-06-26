import type { InputData } from "./src/types";

export const migrationData: InputData = {
  data: [
    {
      year: 1995,
      emmigration: 69357,
      immigration: 90957,
    },
    {
      year: 1996,
      emmigration: 71949,
      immigration: 74359,
    },
    {
      year: 1997,
      emmigration: 67880,
      immigration: 69604,
    },
    {
      year: 1998,
      emmigration: 64017,
      immigration: 72202,
    },
    {
      year: 1999,
      emmigration: 62780,
      immigration: 83677,
    },
    {
      year: 2000,
      emmigration: 59302,
      immigration: 84200,
    },
    {
      year: 2001,
      emmigration: 56477,
      immigration: 99746,
    },
    {
      year: 2002,
      emmigration: 53517,
      immigration: 105014,
    },
    {
      year: 2003,
      emmigration: 51046,
      immigration: 98812,
    },
    {
      year: 2004,
      emmigration: 52950,
      immigration: 100834,
    },
    {
      year: 2005,
      emmigration: 54435,
      immigration: 99091,
    },
    {
      year: 2006,
      emmigration: 57739,
      immigration: 107177,
    },
    {
      year: 2007,
      emmigration: 60688,
      immigration: 143855,
    },
    {
      year: 2008,
      emmigration: 58266,
      immigration: 161629,
    },
    {
      year: 2009,
      emmigration: 59236,
      immigration: 138269,
    },
    {
      year: 2010,
      emmigration: 70528,
      immigration: 139495,
    },
    {
      year: 2011,
      emmigration: 66738,
      immigration: 140508,
    },
    {
      year: 2012,
      emmigration: 73855,
      immigration: 151002,
    },
    {
      year: 2013,
      emmigration: 77707,
      immigration: 167248,
    },
    {
      year: 2014,
      emmigration: 82607,
      immigration: 161149,
    },
    {
      year: 2015,
      emmigration: 86528,
      immigration: 162563,
    },
    {
      year: 2016,
      emmigration: 90088,
      immigration: 167407,
    },
    {
      year: 2017,
      emmigration: 93157,
      immigration: 147142,
    },
    {
      year: 2018,
      emmigration: 98431,
      immigration: 146183,
    },
    {
      year: 2019,
      emmigration: 94859,
      immigration: 145608,
    },
    {
      year: 2020,
      emmigration: 83602,
      immigration: 137685,
    },
    {
      year: 2021,
      emmigration: 88053,
      immigration: 143506,
    },
    {
      year: 2022,
      emmigration: 90861,
      immigration: 169055,
    },
    {
      year: 2023,
      emmigration: 93289,
      immigration: 241040,
    },
    {
      year: 2024,
      emmigration: 99680,
      immigration: 190043,
    },
  ],
  peaks: [
    {
      year: "2002",
      threshold: [0.35, 0.36],
      emmigration: 53517,
      immigration: 105014,
      mobileThreshold: [0.1, 0.2],
      numberPositionX: 65000,
    },
    {
      year: "2007",
      threshold: [0.5, 0.51],
      emmigration: 60688,
      immigration: 143855,
      mobileThreshold: [0.1, 0.2],
      numberPositionX: 90000,
    },
    {
      year: "2015",
      threshold: [0.7, 0.71],
      emmigration: 86528,
      immigration: 162563,
      mobileThreshold: [0.1, 0.2],
      numberPositionX: 110000,
    },
    {
      year: "2023",
      threshold: [0.85, 0.86],
      emmigration: 93289,
      immigration: 241040,
      mobileThreshold: [0.1, 0.2],
      numberPositionX: 110000,
    },
  ],
  steps: [
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
      mobileThreshold: [0.23, 0.24, 0.37, 0.38],
    },
    {
      step: "step3",
      title: "Einwanderung aus Nachbarstaaten",
      positionX: 380,
      positionY: "2006",
      threshold: [0.4, 0.6],
      mobileThreshold: [0.37, 0.38, 0.63, 0.64],
    },
    {
      step: "step4",
      title: "Und wieder, die Kriege",
      positionX: 420,
      positionY: "2014",
      threshold: [0.5, 0.7],
      mobileThreshold: [0.63, 0.64, 0.8, 0.81],
    },
    {
      step: "step5",
      title: "Heutzutag",
      positionX: 480,
      positionY: "2021",
      threshold: [0.7, 0.95],
      mobileThreshold: [0.8, 0.81],
    },
  ],
  chartTitle: "Die Schweiz und ihre Migration",
  annotations: [
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
      color: "emmigration",
      title: "Abwanderung",
      positionX: 10000,
      positionY: "1997",
      threshold: [0.13, 0.14],
      mobilePositionX: 10000,
      mobileThreshold: [0.01, 0.02],
    },
  ],
  translations: {
    "step1/text":
      "1997 betrug die sogenannte Nettozuwanderung von Ausländern rund 1700&nbsp;Personen. Das war der tiefste Wert in den letzten 30&nbsp;Jahren und eine Folge der wirtschaftlichen Stagnation in der ersten Hälfte der 1990er-Jahre.",
    "step2/text":
      "2002 trat das Freizügigkeitsabkommen zwischen der Schweiz und der EU in Kraft. Seither macht die Zuwanderung aus der EU den mit Abstand grössten Teil der Zuwanderung in die Schweiz aus.",
    "step3/text":
      "2007 fielen die Kontingente, mit denen die Schweiz die Zuwanderung aus den EU-Staaten in einer ersten Phase eingeschränkt hatte – darunter aus Deutschland, Frankreich und Italien.",
    "step4/text":
      "2015 war das Jahr der Geflüchteten. Sie stammten hauptsächlich aus Eritrea, Syrien und Afghanistan und stellten hier Asylgesuche. Das schlug sich ein Jahr später auch in der Statistik nieder: Die Nettozuwanderung aus Afrika und Asien allein lag bei rund 27’000&nbsp;Menschen. Das war ein Höchstwert in den letzten 25&nbsp;Jahren.",
    "step5/text":
      "2022 griff Russland die Ukraine an, was zur Flucht von Millionen Ukrainerinnen führte, zu einem kleinen Teil auch in die Schweiz. 2023 vermeldete das BFS eine Netto&shy;zuwanderung von rund 69’000&nbsp;Personen aus dem «übrigen Europa». Die meisten Zuwanderer davon stammten aus der Ukraine.",
  },
  chartSubTitle: "Zu- und Abwanderung in den letzten 30&nbsp;Jahren",
};
