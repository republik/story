import * as React from "react";
import { TimelineItem } from "./Timeline";
import { css } from "glamor";
import {
  mediaQueries,
  RawHtml,
  fontStyles,
  useColorContext,
} from "@project-r/styleguide";

type Props = {
  item: TimelineItem;
};

const styles = {
  title: css({
    ...fontStyles.sansSerifMedium14,
    [mediaQueries.mUp]: {
      ...fontStyles.sansSerifMedium14,
      fontSize: 15,
      lineHeight: "21px",
    },
    fontWeight: "normal",
    margin: 0,
    lineHeight: 1,
  }),
  description: css({
    ...fontStyles.sansSerifRegular14,
    [mediaQueries.mUp]: {
      ...fontStyles.sansSerifRegular15,
    },
    "& a": {
      color: "inherit",
      ":visited": {
        color: "inherit",
      },
      textDecoration: "underline",
    },
    "& b": {
      ...fontStyles.sansSerifBold,
    },
  }),
};

const EventItem: React.FC<Props> = ({ item }) => {
  const [colorScheme] = useColorContext();
  return (
    <div
      {...colorScheme.set("color", "text")}
      {...colorScheme.set("backgroundColor", "hover")}
      style={{ width: "100%", marginTop: 8, padding: 8 }}
    >
      {item.title && <h3 {...styles.title}>{item.title}</h3>}
      {item.description && (
        <div {...styles.description} style={{ marginTop: item.title ? 8 : 0 }}>
          <RawHtml
            dangerouslySetInnerHTML={{
              __html: item.description,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default EventItem;
