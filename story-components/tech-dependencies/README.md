# tech-dependencies

Ein interaktiver Story-Baustein, der die Tech-Abhängigkeiten von Republik visualisiert:

- **Weltkarte** — Standorte aller Anbieter und Infrastruktur-Provider als klickbare Punkte (Grösse = CHF/Jahr).
- **Geldfluss (Sankey)** — Von Republik über Kategorie, Anbieter, Anbieter-Land bis zum Infrastruktur-Land.
- **Migrations-Timeline** — Event-basierter Schieberegler; jede Migration ist ein Tick auf der Zeitachse.
- **KPI-Strip** — Total CHF/Jahr, %-Anteil USA-Anbieter, %-Anteil Big Tech, Schweizer Anteil, Anzahl aktiver Dienste.

## Entwicklung

```bash
pnpm install     # aus dem Repo-Root
pnpm dev         # startet Vite + Panda im Watch-Modus
```

Öffne dann `index.html` im Browser.

## Datenstruktur (`src/data.json`)

Das Herzstück ist eine einzige JSON-Datei mit drei Tabellen.

### 1. `companies[]`

Jedes Unternehmen (Anbieter **und** Infrastruktur-Provider) hat einen eigenen Eintrag.

```jsonc
{
  "id": "heroku",           // eindeutige ID, Kleinschreibung mit Bindestrich
  "name": "Heroku",
  "parentId": "salesforce", // optional: Muttergesellschaft
  "hqs": [
    {
      "country": "US",      // ISO-3166 alpha-2
      "city": "San Francisco",
      "lat": 37.78,
      "lng": -122.41,
      "role": "primary-hq"  // primary-hq | secondary-hq | data-center | legal-entity
    }
  ],
  "size": "medium",         // micro | small | medium | large | mega
  "publiclyTraded": false,
  "legalStructure": "for-profit", // for-profit | cooperative | non-profit | foundation | public
  "bigTech": false,         // true = FAANG-Tier, wird für KPI-Berechnung genutzt
  "url": "https://heroku.com"
}
```

### 2. `services[]`

Jeder Dienst den Republik nutzt. Bei Bundles (Google Workspace, Adobe) gibt es pro Kategorie einen eigenen Eintrag mit gleichem `bundleId`.

```jsonc
{
  "id": "heroku-prod",
  "category": "hosting",      // siehe vollständige Liste unten
  "product": "Heroku",
  "vendorId": "heroku",       // FK -> companies[].id
  "infraIds": ["amazon"],     // optional: FK[] -> companies[].id (Infra-Provider)
  "bundleId": "gws",          // optional: verbindet Services eines Vertrags
  "dataResidency": ["US"],    // ISO-Ländercodes wo Daten physisch liegen
  "annualCostCHF": 40000,     // Jahreskosten in CHF (Schätzung bei Usage-Modellen)
  "costModel": "usage",       // flat | per-seat | usage
  "deployment": "managed",    // saas | self-hosted | managed
  "openSource": false,
  "from": "2018-01-01",       // ISO-Datum, ab wann genutzt
  "to": "2025-06-01",         // optional: bis wann genutzt (undefined = noch aktiv)
  "replacedById": "scalingo", // optional: ID des Nachfolge-Dienstes
  "replacesId": null,
  "description": "Erklärung"
}
```

**Vollständige Kategorie-Liste:**
`hosting` · `infrastructure` · `database` · `search` · `cdn` · `domains` · `cms` ·
`email` · `newsletter` · `communication` · `office` · `productivity` ·
`password-manager` · `auth` · `analytics` · `monitoring` ·
`dev-tools` · `design` · `media-hosting` · `media-production` ·
`ai` · `translation` · `customer-support` · `compliance` · `payments` · `other`

### 3. `events[]`

Jede Migration ist ein Eintrag. Mehrere `fromServiceIds` und `toServiceIds` erlauben n:m-Migrationen (z.B. Konsolidierung mehrerer Dienste in einem).

```jsonc
{
  "id": "evt-mail-2026-04",
  "date": "2026-04-29",
  "title": "Gmail → Proton Mail",
  "description": "Ausführlichere Beschreibung für den Tooltip auf der Timeline.",
  "fromServiceIds": ["gws-email"],
  "toServiceIds": ["proton-mail"],
  "motivation": ["sovereignty", "privacy"], // cost | sovereignty | privacy | features | consolidation | security | reliability
  "costDeltaCHF": -1500   // optional: negative = Einsparung
}
```

## Einen neuen Dienst hinzufügen

1. **Unternehmen prüfen:** Gibt es das Unternehmen schon in `companies[]`? Falls nein, Eintrag ergänzen (HQ-Koordinaten via Google Maps, Ländercode via ISO-3166).
2. **Service-Eintrag hinzufügen:** `from`-Datum setzen, `annualCostCHF` schätzen, `vendorId` zeigt auf `companies[].id`.
3. **Bundle?** Wenn der Dienst Teil eines bestehenden Vertrags ist (z.B. Google Workspace), `bundleId` setzen.
4. **Commit + Push** — die Visualisierung aktualisiert sich automatisch.

## Eine Migration eintragen

1. Alten Dienst: `to`-Datum setzen, `replacedById` auf die ID des neuen Dienstes.
2. Neuen Dienst: `from`-Datum setzen, `replacesId` auf die ID des alten Dienstes.
3. `events[]`-Eintrag: `fromServiceIds` und `toServiceIds` verlinken die beiden Einträge. Der Slider zeigt dieses Datum als Tick.

## Architektur

```
src/
  index.svelte       # Custom-Element-Wrapper (Shadow DOM, Theme-Propagation)
  types.d.ts         # TypeScript-Typen (Dataset, Company, Service, MigrationEvent)
  data.json          # Einzige Datenquelle, hand-editiert
  lib/
    derive.ts        # Pure Functions: activeServicesAt, mapDots, sankeyEdges, computeTotals
  Map.svelte         # Weltkarte (d3-geo, world-atlas TopoJSON)
  Sankey.svelte      # Sankey-Diagramm (eigene Implementierung)
  Timeline.svelte    # Event-basierter Slider
  Totals.svelte      # KPI-Strip
```

Der Schieberegler (`currentDate`) ist der einzige reaktive State in `index.svelte`. Alle anderen Ansichten sind reine Derived-Werte davon.

## Bewusst nicht umgesetzt (v1)

- **Wechselkurs-/Inflationshistorie:** Kosten sind CHF/Jahr ohne Zeitverlauf.
- **Rekursive Infra-Abhängigkeiten** (Vercel → AWS → ...): nur eine Ebene.
- **Editor-UI:** Daten werden via PR in `data.json` editiert. Ein JSON Schema (`schema.json`) könnte später Autocomplete im Editor ermöglichen.

## Build & Publish

```bash
pnpm build   # Panda CSS + Vite Build
```

Die gebuildete Datei liegt in `dist/index.js` und kann in Publikator als Story-Baustein verlinkt werden.
