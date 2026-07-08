import React from "react";
import { scaleQuantize } from "d3-scale";

import { Interaction, fontStyles, colors } from "@project-r/styleguide";

import useSize from "./useSize";

const Map = ({
  image,
  title,
  mobileLegendBottom,
  scaling = [0.6, 0.8],
  maxWidth = 1024,
  value = "0",
  legendAlign = "right",
  description,
  legend,
  color = "#0000FF",
}) => {
  const containerRef = React.useRef(null);
  const { width, mobile } = useSize(containerRef);

  const imageScale = React.useMemo(
    () =>
      scaleQuantize()
        .domain([0, 1502])
        .range([maxWidth * scaling[0], maxWidth * scaling[1], maxWidth]),
    [maxWidth]
  );

  const imageWidth = Math.round(imageScale(width));

  return (
    <div ref={containerRef} style={{ margin: "25px 0", padding: "25px 0", background: "white" }}>
      <div
        style={{
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative"
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            maxWidth: 665,
            margin: "0 auto",
            bottom: mobileLegendBottom && mobile && 200
          }}
        >
          <div
            style={{
              position: "absolute",
              [legendAlign]: 0,
              padding: width > 768 ? 0 : 15,
              background: "rgba(255,255,255,0.5)",
              width: mobile ? "33%" : "22%"
            }}
          >
            <Interaction.P style={{ color: colors.lightText }}>{title}</Interaction.P>
            <Interaction.P
              style={{
                ...mobile ? fontStyles.sansSerifMedium32 : fontStyles.sansSerifMedium40,
                color,
                marginBottom: 5
              }}
            >
              {value}
            </Interaction.P>
            <Interaction.P
              style={{
                ...mobile ? fontStyles.sansSerifRegular11 : fontStyles.sansSerifRegular12,
                color: colors.text
              }}
            >
              {description}
            </Interaction.P>
          </div>
        </div>

        <img src={`${image}?resize=${imageWidth*2}x`} width={imageWidth} />
        {legend ?
          <Interaction.P
            style={{
              ...mobile ? fontStyles.sansSerifRegular11 : fontStyles.sansSerifRegular12,
              marginTop: 20,
              textAlign: "center",
              color: colors.lightText,
              maxWidth: "70%"
            }}
          >
            {legend}
          </Interaction.P> :
          <>
          <Interaction.P
          style={{
            ...mobile ? fontStyles.sansSerifRegular11 : fontStyles.sansSerifRegular12,
            marginTop: 5,
            textAlign: "center",
            color: colors.lightText,
            maxWidth: "70%"
          }}
        >
          1 Kilometer
        </Interaction.P>
          <Interaction.P
          style={{
            ...mobile ? fontStyles.sansSerifRegular11 : fontStyles.sansSerifRegular12,
            marginTop: 20,
            textAlign: "center",
            color: colors.lightText,
            maxWidth: "70%"
          }}
        >
          Quellen:{" "}
          <a
            href="https://genossenschaften.wbg-schweiz.ch"
            target="_blank"
            style={{
              ...mobile ? fontStyles.sansSerifRegular11 : fontStyles.sansSerifRegular12,
              color: colors.lightText
            }}
          >
            Wohnbaugenossenschaften Schweiz
          </a>
          ,{" "}
          <a
            href="https://opendata.swiss/de/dataset/amtliche-vermessung-opendata"
            target="_blank"
            style={{
              ...mobile ? fontStyles.sansSerifRegular11 : fontStyles.sansSerifRegular12,
              color: colors.lightText
            }}
          >
            Amtliche Vermessung (OpenData)
          </a>
        </Interaction.P>
        </>}
      </div>
    </div>
  );
};

export default Map;
