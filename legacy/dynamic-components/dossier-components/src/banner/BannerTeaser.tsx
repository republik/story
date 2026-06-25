import * as React from "react";
import { TimelineItem } from "../timeline/Timeline";
import {
  TeaserFrontImage,
  TeaserFrontTile,
  TeaserFrontImageHeadline,
  TeaserFrontLead,
  TeaserFrontCredit,
  TeaserFeed,
  TeaserFrontSplit,
  TeaserFrontSplitHeadline,
  TeaserFrontCreditLink,
  Editorial,
  Breakout,
  mediaQueries,
  RawHtml,
} from "@project-r/styleguide";
import { css } from "glamor";

export type BannerTeaserItem = {
  date?: string;
  title?: string;
  header?: string;
  description?: string;
  url: string;
  author?: string;
  highlight?: boolean;
  image?: string;
  color?: string;
  center?: boolean;
  bgColor?: string;
  textPosition?: string;
  split?: boolean;
  lead?: string;
  noMargin: boolean;
};

type Props = {
  item: BannerTeaserItem;
};

const styles = {
  link: css({
    color: "inherit",
    ":visited": {
      color: "inherit",
    },
    textDecoration: "none",
    cursor: "pointer",
  }),
  description: css({
    marginTop: 15,
    [mediaQueries.onlyS]: {
      marginLeft: 35,
      marginRight: 15,
    },
  }),
  credit: css({
    "& a": {
      color: "inherit",
      ":hover": {
        color: "inherit",
        opacity: 0.8,
      },
      ":visited": {
        color: "inherit",
      },
      textDecoration: "underline",
    },
  }),
};

const BannerTeaser: React.FC<Props> = ({ item }) => {
  const TeaserHeadLine =
    item.header == "Aus der Redaktion"
      ? TeaserFrontImageHeadline.Interaction
      : TeaserFrontImageHeadline.Editorial;

  const inner = (
    <>
      {item.header && <Editorial.Format>{item.header}</Editorial.Format>}
      <TeaserHeadLine>
        <a {...styles.link} href={item.url}>
          {item.title}
        </a>
      </TeaserHeadLine>
      {item.lead && <TeaserFrontLead>{item.lead}</TeaserFrontLead>}
      <TeaserFrontCredit>
        <div {...styles.credit} style={{ "--color-text": item.color }}>
          <RawHtml
            dangerouslySetInnerHTML={{
              __html: item.author,
            }}
          />
        </div>
      </TeaserFrontCredit>
    </>
  );

  if (item.split) {
    return (
      <div style={{ marginTop: item.noMargin ? "-15px" : 0 }}>
        <TeaserFrontSplit
          even
          image={item.image}
          color={item.color || "#fff"}
          bgColor={item.bgColor || "#000"}
        >
          {inner}
        </TeaserFrontSplit>
      </div>
    );
  } else {
    return (
      <div>
        <a {...styles.link} href={item.url}>
          <TeaserFrontImage
            color={item.color || "#fff"}
            bgColor={item.bgColor || "#000"}
            image={item.image}
            center={item.center}
            textPosition={item.textPosition || "bottom"}
          >
            {inner}
          </TeaserFrontImage>
        </a>
        <Editorial.P {...styles.description}>{item.description}</Editorial.P>
      </div>
    );
  }
};

export default BannerTeaser;
