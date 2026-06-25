import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Map from "./Map";

storiesOf("Map", module)
  .add("Zurich", () => (
    <Map
      image="./assets/zurich.png"
      title="Zürich"
      maxWidth={1502}
      value={"18%"}
      description={'Anteil gemeinnütziger Wohnungen an allen Wohungen'}
    />
  ))
  .add("Basel", () => (
    <Map
      image="./assets/basel.png"
      title="Basel"
      maxWidth={712}
      value={"9%"}
    />
  ))
  .add("Bern", () => (
    <Map
      image="./assets/bern.png"
      title="Bern"
      maxWidth={1065}
      value={"9%"}
      legendAlign="left"
    />
  ))
  .add("Genf", () => (
    <Map
      image="./assets/geneve.png"
      title="Genf"
      maxWidth={597}
      value={"5%"}
    />
  ))
  .add("Zurich mobile", () => (
    <div style={{ width: 400 }}>
      <Map
        image="./assets/zurich.png"
        title="Zürich"
        maxWidth={1502}
        value={"18%"}
      />
    </div>
  ))
  .add("Bern mobile", () => (
    <div style={{ width: 400 }}>
      <Map
        image="./assets/bern.png"
        title="Bern"
        maxWidth={1065}
        value={"9%"}
        legendAlign="left"
      />
    </div>
  ))
  .add("Multiple", () => (
    <div>
      <Map
        image="./assets/zurich.png"
        title="Zürich"
        maxWidth={1502}
        value={"18%"}
        showLegend={true}
        description={'Anteil gemeinnütziger Wohnungen an allen Wohungen'}
      />
      <Map
        image="./assets/bern.png"
        title="Bern"
        maxWidth={1065}
        value={"9%"}
        legendAlign="left"
      />
    </div>
  ));
