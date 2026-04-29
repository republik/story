import type { InputData } from "./src/types";

/*

// KEEPING THIS AS A REFERENCE TO HOW THE DATA WAS CALCULATED

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

console.log(lines); */

/*{
  text: "<p>Die wichtigsten Grössen sind:<br />&ndash; die Geburtenrate<br/>&ndash; die Lebenserwartung<br/>&ndash; der Wanderungssaldo</p>",
  state: {
    chartDescription: "Drei mögliche Szenarien",
    highlight: ["Referenz", "Hoch", "Tief"],
    annotations: [],
  },
},
{
  text: "<p>Heute kommen in der Schweiz pro Frau 1,28 Kinder zur Welt (ein historischer Tiefstand). Frauen haben eine Lebenserwartung bei Geburt von 86 Jahren, Männer eine von 82,5 Jahren.<br/><br/>Und der durchschnittliche Wanderungssaldo liegt seit 2002 bei rund 65’000 Personen pro Jahr.</p>",
  state: {
    chartDescription: "Drei mögliche Szenarien",
    highlight: ["Referenz", "Hoch", "Tief"],
    annotations: [],
  },
},*/

export const scrollyData1: InputData = {
  steps: [
    {
      text: "<p>Im <span class='color'>Referenzszenario</span>, das in der Mitte der drei Szenarien liegt, geht der Bund von einer höheren Geburtenrate (1,40) als der aktuellen aus. Die Lebenserwartung ist leicht erhöht und der Wanderungssaldo liegt bei 45’000.</p>",
      state: {
        chartDescription: "Das Referenzszenario",
        highlight: ["Referenz"],
        annotations: [],
      },
    },
    {
      text: "<p>In diesem Szenario wäre die <span class='color'>10-Millionen-Schweiz</span> im Jahr 2042 erreicht.</p>",
      state: {
        chartDescription: "Das Referenzszenario",
        highlight: ["Referenz"],
        annotations: [
          {
            show10M: true,
            x: 2042,
            y: 10_030_100,
            label: "2042",
          },
        ],
      },
    },
    {
      text: "<p>Im <span class='color'>hohen Szenario</span> sind alle drei Grössen deutlich höher. Die Lebenserwartung läge bei 90,5 beziehungsweise 88,5 Jahren, die Geburtenrate bei 1,55 Kinder und der Wanderungssaldo bei 60’000 Personen.</p>",
      state: {
        chartDescription: "Das hohe Szenario",
        highlight: ["Hoch"],
        annotations: [],
      },
    },
    {
      text: "<p>Schon im Jahr 2034 würde die Bevölkerung die <span class='color'>Marke von 10 Milionen</span> erreichen.</p>",
      state: {
        chartDescription: "Das hohe Szenario",
        highlight: ["Hoch"],
        annotations: [
          {
            show10M: true,
            x: 2034,
            y: 10_015_100,
            label: "2034",
          },
        ],
      },
    },
    {
      text: "<p>Im <span class='color'>tiefen Szenario</span> bliebe die Lebenserwartung in etwa gleich. Die Geburtenrate läge bei 1,25 Kindern pro Frau und der Wanderungssaldo bei 30’000 Personen.</p>",
      state: {
        chartDescription: "Das tiefe Szenario",
        highlight: ["Tief"],
        annotations: [],
      },
    },
    {
      text: "<p>In diesem Szenario würde die 10-Millionen-Schweiz nie erreicht und ab 2043 würde die Bevölkerung schrumpfen.</p>",
      state: {
        chartDescription: "Das tiefe Szenario",
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
    {
      text: "<p>Es ist also alle andere als sicher, ob die Schweiz überhaupt 10 Millionen Einwohnerinnen erreicht.</p>",
      state: {
        chartDescription: "Drei mögliche Szenarien",
        highlight: ["Referenz", "Hoch", "Tief"],
        annotations: [],
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
      color: "#36c99e",
      dataPoints: [
        9100000, 9172800, 9244347.84, 9314604.883584, 9383532.959722523,
        9451094.397032525, 9517252.057811752, 9579114.196187528,
        9637546.792784272, 9691517.054823864, 9741912.94350895,
        9789648.316932142, 9834680.69919003, 9877953.294266466,
        9919440.698102385, 9959118.460894795, 9997959.022892285,
        10035951.267179277, 10073084.28686784, 10109347.390300564,
        10144730.106166618, 10179222.188527586, 10213831.54396858,
        10247537.188063677, 10280329.307065481, 10312198.327917386,
        10343134.922901137, 10373130.01417755, 10402174.778217247,
        10430260.650118433, 10457379.32780874, 10483522.77612826,
        10508683.230790967, 10533904.070544865, 10559185.440314172,
        10583471.566826895, 10607813.551430596, 10632211.522598887,
        10656665.609100863, 10681175.940001795, 10705742.6446638,
        10730365.852746526, 10755045.694207842, 10779782.299304519,
        10804575.79859292, 10828345.865349824, 10852168.226253593,
        10876042.99635135, 10898882.686643688, 10921770.34028564,
        10944706.05800024,
      ],
    },
    {
      name: "Hoch",
      color: "#327be0",
      dataPoints: [
        9100000, 9205560, 9311423.940000001, 9416643.030522002,
        9522109.432463849, 9626852.63622095, 9729859.959428513,
        9830077.517010627, 9926412.276677331, 10019720.552078098,
        10109898.0370468, 10196843.160165401, 10280457.274078757,
        10361672.886543978, 10440421.600481713, 10516636.67816523,
        10592356.462248022, 10667562.193129985, 10742235.128481893,
        10816356.550868416, 10889907.77541432, 10962870.157509595,
        11035225.100549158, 11106954.063702727, 11178038.569710424,
        11248460.2126996, 11318200.666018337, 11387241.690081049,
        11455565.140221534, 11523152.97454884, 11591139.577098679,
        11658368.18664585, 11725986.722128397, 11792824.846444529,
        11860043.948069263, 11927646.198573258, 11995633.781905126,
        12062809.331083795, 12130361.063337864, 12198291.085292557,
        12266601.515370196, 12335294.48385627, 12403138.60351748,
        12471355.865836827, 12539948.32309893, 12608918.038875975,
        12677006.196285905, 12745462.02974585, 12814287.52470648,
        12882203.248587424, 12950478.92580494,
      ],
    },
    {
      name: "Tief",
      color: "#df3794",
      dataPoints: [
        9100000, 9139130, 9175686.52, 9210554.128775999, 9242791.068226716,
        9273292.278751865, 9302039.484815996, 9325294.583528036,
        9344877.702153444, 9358895.018706676, 9369189.803227253,
        9377622.074050156, 9384186.40950199, 9388878.50270674,
        9392634.054107822, 9395451.844324054, 9397330.93469292,
        9398270.667786388, 9398270.667786388, 9397330.840719609,
        9395451.374551466, 9392632.7391391, 9388875.686043445,
        9384181.248200424, 9378550.739451503, 9371985.753933888,
        9364488.16533074, 9356060.125981942, 9346704.06585596,
        9336422.691383518, 9325218.984153857, 9313096.199474458,
        9300057.864795193, 9287037.78378448, 9273107.227108805,
        9259197.566268142, 9244382.850162113, 9229591.837601854,
        9214824.49066169, 9200080.77147663, 9185360.642242268, 9170664.06521468,
        9155073.936303815, 9139510.310612097, 9123973.143084057,
        9107549.991426505, 9091156.401441937, 9073883.204279197,
        9056642.826191068, 9039435.204821305, 9021356.334411662,
      ],
    },
  ],
};
