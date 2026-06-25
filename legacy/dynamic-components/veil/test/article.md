---
template: article
title: 'Szenarien'
---

<section><h6>TITLE</h6>

# Veil Components

«In Wirklichkeit erkennen wir nichts; denn die Wahrheit liegt in der Tiefe.»

Von [Elias Blülle](~eblulle), 14.06.2019

<hr /></section>

<section><h6>CENTER</h6>

## Slider (2) Veil

Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.

Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis.

<section><h6>DYNAMIC_COMPONENT</h6>

```
{
  "props": {
    "veil": "slider",
    "config": {
      "paddingBottom": "0",
      "min": 0,
      "max": 100,
      "step": 1,
      "revealValue": 33,
      "initialValue": 50,
      "colors": {
        "light": {
          "guess": "red",
          "guessed": "#3CAD00",
          "reveal": "#622281",
          "guide": "#979797"
          },
        "dark": {
          "guess": "blue",
          "guessed": "blue",
          "reveal": "red",
          "guide": "#979797"
          }
      },
      "guide": true
    },
    "translations": [
      { "key": "slider/label/text", "value": "Sie schätzen, dass {emphasis} verfasst wurden." },
      { "key": "slider/label/emphasis", "value": "{value}% der Republik Artikel" },
      { "key": "slider/guide", "value": "Verschieben Sie den grünen Regler an die gewünschte Stelle." },
      { "key": "veil/label/text", "value": "etwa {emphasis} weibliche Vornamen" },
      { "key": "veil/label/emphasis", "value": "{value}%" },
      { "key": "button", "value": "Verrate" }
    ]
  },
  "src": "https://cdn.republik.space/s3/republik-assets/dynamic-components/veil/index.js?6"
}
```

<hr /></section>

Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.

Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis.

<section><h6>DYNAMIC_COMPONENT</h6>

```
{
  "props": {
    "veil": "slider",
    "config": {
      "paddingBottom": "0",
      "min": 0,
      "max": 100,
      "step": 1,
      "revealValue": 25,
      "initialValue": 20,
      "colors": {
        "light": {
          "guess": "#eb93c4",
          "guessed": "#eb93c4",
          "reveal": "rgba(218, 52, 144, 0.9)",
          "guide": "#979797"
        },
        "dark": {
          "guess": "#c2247b",
          "guessed": "#c2247b",
          "reveal": "#e368ac",
          "guide": "#979797"
        }
      },
      "guide": false
    },
    "translations": [
      {
        "key": "slider/label/text",
        "value": "Welcher Anteil der Menschen stirbt an {emphasis}? Ihre Schätzung: {valueEmphasis}"
      },
      {
        "key": "slider/label/emphasis",
        "value": "Krebserkrankungen"
      },
      {
        "key": "slider/label/valueEmphasis",
        "value": "{value} Prozent."
      },
      {
        "key": "slider/guide",
        "value": " Ihre Schätzung: {value} Prozent."
      },
      {
        "key": "veil/label/text",
        "value": "tatsächlich {emphasis}"
      },
      {
        "key": "veil/label/emphasis",
        "value": "{value} Prozent"
      },
      {
        "key": "button",
        "value": "Anzeigen"
      }
    ]
  },
  "src": "https://cdn.republik.space/s3/republik-assets/dynamic-components/veil/index.js?14"
}
```

<hr /></section>

Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.

Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis.

<section><h6>DYNAMIC_COMPONENT</h6>

```
{
  "props": {
    "veil": "slider",
    "config": {
      "paddingBottom": "0",
      "min": 0,
      "max": 50000,
      "step": 100,
      "labelMin": "0",
      "labelMax": "50’000",
      "revealValue": 15000,
      "initialValue": 5000,
      "colors": {
        "light": {
          "guess": "#08306b",
          "guessed": "#08306b",
          "reveal": "#1863aa",
          "guide": "#979797"
        },
        "dark": {
          "guess": "#4b97c9",
          "guessed": "#4b97c9",
          "reveal": "#1863aa",
          "guide": "#979797"
        }
      },
      "guide": false
    },
    "translations": [
      {
        "key": "slider/label/text",
        "value": "Wie viele Zuschauerinnen verfolgten {emphasis} vor Ort? Ihre Schätzung: {valueEmphasis}"
      },
      {
        "key": "slider/label/emphasis",
        "value": "das Wimbledon-Finale der Männer 2019"
      },
      {
        "key": "slider/label/valueEmphasis",
        "value": "{value}"
      },
      {
        "key": "veil/label/text",
        "value": "tatsächlich: {emphasis}"
      },
      {
        "key": "veil/label/emphasis",
        "value": "{value}"
      },
      {
        "key": "button",
        "value": "Anzeigen"
      }
    ]
  },
  "src": "https://cdn.republik.space/s3/republik-assets/dynamic-components/veil/index.js?19"
}
```

<hr /></section>

Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.

Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis.

<section><h6>DYNAMIC_COMPONENT</h6>

```
{
  "props": {
    "veil": "slider",
    "config": {
      "paddingBottom": "0",
      "min": 0,
      "max": 10,
      "step": 0.1,
      "labelMin": "0",
      "labelMax": "10 Mio.",
      "precision": 1,
      "revealValue": 6.3,
      "initialValue": 0.5,
      "colors": {
        "light": {
          "guess": "#08306b",
          "guessed": "#08306b",
          "reveal": "#1863aa",
          "guide": "#979797"
        },
        "dark": {
          "guess": "#4b97c9",
          "guessed": "#4b97c9",
          "reveal": "#1863aa",
          "guide": "#979797"
        }
      },
      "guide": false
    },
    "translations": [
      {
        "key": "slider/label/text",
        "value": "Wie viel verdiente {emphasis} in der Saison 2020/21? Ihre Schätzung: {valueEmphasis}"
      },
      {
        "key": "slider/label/emphasis",
        "value": "der Tennisspieler Roger Federer"
      },
      {
        "key": "slider/label/valueEmphasis",
        "value": "{value} Mio."
      },
      {
        "key": "veil/label/text",
        "value": "tatsächlich: {emphasis}"
      },
      {
        "key": "veil/label/emphasis",
        "value": "{value} Mio."
      },
      {
        "key": "button",
        "value": "Anzeigen"
      }
    ]
  },
  "src": "https://cdn.republik.space/s3/republik-assets/dynamic-components/veil/index.js?19"
}
```

<hr /></section>

<hr /></section>
