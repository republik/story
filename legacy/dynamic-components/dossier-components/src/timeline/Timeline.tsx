import * as React from "react";
import ArticleItem from "./ArticleItem";
import EventItem from "./EventItem";
import { descending, ascending } from "d3-array";
import { formatDate, parseDate } from "./utils";
import { timeFormatLocale } from "d3-time-format";
import timeDefinition from "d3-time-format/locale/de-CH";
const locale = timeFormatLocale(timeDefinition);
// import { Query } from 'react-apollo'
// import gql from 'graphql-tag'
import { css } from "glamor";
import {
  mediaQueries,
  fontStyles,
  useColorContext,
  ChartTitle,
  ChartLead,
  Collapsable,
  InfoBoxTitle,
  InfoBox,
} from "@project-r/styleguide";
import { BannerTeaserItem } from "../banner/BannerTeaser";
import {
  provideTranslationContext,
  withTranslations,
} from "../lib/TranslationsContext";

export type TimelineItemType = "article" | "event" | "ant";

export type TimelineItem = BannerTeaserItem & { type: TimelineItemType };

type Props = {
  timeline: TimelineItem[];
  utm?: string;
  title?: string;
  lead?: string;
  hideRepeatDates?: boolean;
  compact?: boolean;
  sort?: "descending" | "ascending" | "none";
  customFormat?: string;
  collapsable?: boolean;
};

const styles = {
  header: css({
    marginBottom: 30,
  }),
  collapsedTimeline: css({
    margin: "20px 0 20px 16px",
    [mediaQueries.onlyS]: {
      marginLeft: "1px",
    },
  }),
  item: css({
    ...fontStyles.sansSerifRegular14,
    [mediaQueries.mUp]: {
      ...fontStyles.sansSerifRegular15,
    },
    display: "flex",
    flexDirection: "column",
    borderLeftWidth: 2,
    borderLeftStyle: "solid",
    marginLeft: -15,
    [mediaQueries.onlyS]: {
      marginLeft: 0,
    },
    paddingLeft: 18,
  }),
  timestamp: css({
    ...fontStyles.sansSerifRegular14,
    [mediaQueries.mUp]: {
      ...fontStyles.sansSerifRegular15,
    },
    lineHeight: 1.5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -21,
    paddingLeft: 0,
  }),
};

const TimestampIcon: React.FC<{
  width?: number;
  height?: number;
}> = React.memo(({ width = 20, height = 12 }) => {
  const [colorScheme] = useColorContext();
  return (
    <svg width={width} height={height}>
      <circle
        cx={2}
        cy={height / 2}
        r={6}
        {...colorScheme.set("fill", "default")}
      />
      <circle
        cx={2}
        cy={height / 2}
        r={2}
        {...colorScheme.set("fill", "divider")}
      />
    </svg>
  );
});

const sortCompare = {
  ascending,
  descending,
};

const Timeline: React.FC<Props> = withTranslations(
  ({
    timeline,
    utm,
    title,
    lead,
    hideRepeatDates,
    compact,
    sort,
    collapsable,
    customFormat,
    t,
  }) => {
    const [colorScheme] = useColorContext();
    const items = timeline.map((i) => ({
      ...i,
      url: utm && i.type === "article" ? `${i.url}?${utm}` : i.url,
      date: parseDate(i.date),
    }));

    if (sortCompare[sort]) {
      items.sort((a, b) =>
        sortCompare[sort](a.date.getTime(), b.date.getTime())
      );
    }

    let lastFormattedDate;
    const timeFormat = locale.format;

    const content = items.map((item, j) => {
      const formattedDate = customFormat
        ? timeFormat(customFormat)(item.date)
        : formatDate(item.date);
      const showDate = hideRepeatDates
        ? lastFormattedDate !== formattedDate
        : true;
      lastFormattedDate = formattedDate;
      return (
        <div
          key={j}
          {...styles.item}
          {...colorScheme.set("borderLeftColor", "divider")}
          style={{
            paddingBottom: j === items.length - 1 ? 0 : compact ? 30 : 45,
            marginTop: !showDate ? -45 : undefined,
          }}
        >
          {showDate && (
            <div {...styles.timestamp} style={{ marginTop: j === 0 ? -10 : 0 }}>
              <TimestampIcon />
              {formattedDate}
            </div>
          )}
          {item.type === "event" ? (
            <EventItem item={item} />
          ) : (
            <ArticleItem item={item} />
          )}
        </div>
      );
    });

    if (collapsable) {
      const height = 350;
      return (
        <div {...colorScheme.set("color", "text")}>
          <Collapsable
            isOnOverlay={false}
            height={{ mobile: height, desktop: height }}
            t={t}
          >
            <InfoBoxTitle>{title}</InfoBoxTitle>
            {lead && <ChartLead>{lead}</ChartLead>}
            <div {...styles.collapsedTimeline}>{content}</div>
          </Collapsable>
        </div>
      );
    }
    return (
      <div {...colorScheme.set("color", "text")}>
        <div {...styles.header}>
          <ChartTitle>{title || `Chronologie`}</ChartTitle>
          {lead && <ChartLead>{lead}</ChartLead>}
        </div>
        {content}
      </div>
    );
  }
);

// export const TimelineWithQuery: React.FC<Props> = ({ timeline }) => {
//   const getQuery = (path) => `
//     ${last(path.split('/'))}: document(
//       path: "${path}"
//     ) {
//       id
//       meta {
//         title
//         description
//         slug
//       }
//     }
//   `

//   const query = gql`
//   {
//     ${timeline
//       .filter(i => i.type === 'Beitrag')
//       .map(item => getQuery(new URL(item.url).pathname))
//       .join('')}
//   }
//   `

//   return (
//     <div>
//       <Query
//         query={query}
//       >
//         {({ loading, error }) => {

//           if (loading) return 'Loading...'
//           if (error) return `Error! ${error.message}`

//           return <Timeline timeline={timeline} />
//         }}
//       </Query>
//     </div>
//   )
// }

export default provideTranslationContext(Timeline);
