import React from "react";
import PropTypes from "prop-types";
import { css } from "glamor";
import {
  mediaQueries,
  fontStyles,
  useColorContext,
} from "@project-r/styleguide";
import { timeFormat } from "d3-time-format";
import { timeHour, timeMillisecond } from "d3-time";
import { formatLocale } from "d3-format";

const swissNumbers = formatLocale({
  decimal: ".",
  thousands: "’",
  grouping: [3],
});

const clock = timeFormat("%M:%S");
const clockFull = timeFormat("%H:%M:%S");
const intFormat = swissNumbers.format(",.0f");

const Timer = ({ value, countdown }) => {
  const timerRef = React.useRef();
  React.useEffect(() => {
    const setTimer = (value) => {
      const start = countdown ? Date.now() : new Date(value);
      const end = countdown ? new Date(value) : Date.now();
      const diffMs = timeMillisecond.count(start, end);
      const days = Math.trunc(diffMs / 8.64e7);
      if (countdown && diffMs <= 0) {
        timerRef.current.children[0].innerHTML = `00:00:00`;
        timerRef.current.children[1].innerHTML = "";
      } else {
        if (days > 1) {
          timerRef.current.children[0].innerHTML = `${intFormat(days)} Tag${
            days > 1 ? "e" : ""
          }`;
          if (days > 10) {
            timerRef.current.children[1].innerHTML = "";
          } else {
            timerRef.current.children[1].innerHTML = clockFull(diffMs);
          }
        } else {
          const hours = timeHour.count(start, end);
          timerRef.current.children[0].innerHTML = `${hours}:${clock(diffMs)}`;
        }
      }
    };
    setTimer(value, timerRef);
    const loop = setInterval(() => {
      setTimer(value, timerRef);
    }, 1000);
    return () => clearInterval(loop);
  }, []);

  return (
    <div
      ref={timerRef}
      {...css({
        padding: `5px 0`,
      })}
    >
      <span
        {...css({
          ...fontStyles.sansSerifRegular30,
          fontSize: 40,
          paddingRight: 5,
        })}
      ></span>{" "}
      <span
        {...css({
          ...fontStyles.sansSerifRegular16,
          lineHeight: 1,
          verticalAlign: "baseline",
        })}
      ></span>
    </div>
  );
};

const Metric = ({ value, unit }) => (
  <div
    {...css({
      padding: `5px 0`,
    })}
  >
    <span {...css({ ...fontStyles.sansSerifRegular30, fontSize: 40 })}>
      {value}
    </span>{" "}
    <span {...css({ ...fontStyles.sansSerifRegular30, fontSize: 40 })}>
      {unit}
    </span>
  </div>
);

const INDICATOR_TYPES = {
  Timer,
  Metric,
};

const Indicator = ({
  label,
  value,
  unit,
  countdown,
  description,
  color,
  source,
  type = INDICATOR_TYPES.METRIC,
}) => {
  const [colorScheme] = useColorContext();

  return (
    <div
      {...css({
        borderTopWidth: 1,
        borderTopStyle: "solid",
        paddingTop: 10,
      })}
      {...colorScheme.set("borderTopColor", "divider")}
      {...colorScheme.set("color", "text")}
    >
      <div
        {...css({
          ...fontStyles.sansSerifMedium16,
          color: color,
        })}
      >
        {label}
      </div>
      {React.createElement(INDICATOR_TYPES[type] || Metric, {
        value,
        unit,
        countdown,
      })}
      <div
        {...css({
          ...fontStyles.sansSerifRegular14,
          paddingTop: 3,
        })}
        {...colorScheme.set("color", "textSoft")}
      >
        {description}
      </div>
      {source && (
        <div>
          <span
            {...css({
              ...fontStyles.sansSerifRegular12,
              lineHeight: "16px",
            })}
          >
            <a href={source.url} {...colorScheme.set("color", "textSoft")}>
              {source.name}
              {source.date ? `, ${source.date}` : ""}
            </a>
          </span>
        </div>
      )}
    </div>
  );
};

const Indicators = ({ values }) => {
  return (
    <>
      <div
        {...css({
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          [mediaQueries.onlyS]: {
            flexDirection: "column",
          },
        })}
      >
        {values.map((v, i) => (
          <div
            key={i}
            {...css({
              boxSizing: "border-box",
              width: `${100 / values.length}%`,
              [mediaQueries.mUp]: {
                width: `50%`,
                paddingBottom: 15,
                paddingLeft: i % 2 === 0 ? 0 : 15,
              },
              // [mediaQueries.lUp]: {
              //   width: values.length > 2 ? `25%` : `50%`,
              //   paddingLeft: i === 0 ? 0 : 15,
              // },
              [mediaQueries.onlyS]: {
                width: `100%`,
                paddingLeft: 0,
                paddingBottom: 15,
              },
            })}
          >
            <Indicator {...v} />
          </div>
        ))}
      </div>
    </>
  );
};

Indicators.propTypes = {
  values: PropTypes.arrayOf(PropTypes.shape(Indicator.propTypes)),
};

Indicators.defaultProps = {
  values: [],
};

export default Indicators;
