import * as React from 'react';
import { css } from 'glamor';
import { Choices, Reason } from '../types';
import {
  Editorial,
  Interaction,
  colors,
  mediaQueries
} from '@project-r/styleguide';

type DistributionProps = {
  choices: Choices;
};

type CardProps = {
  reason: Reason;
  totalReasons: number;
  choices?: Choices;
  isFirst?: boolean;
};

const styles = {
  container: css({
    background: colors.negative.containerBg,
    color: colors.negative.text,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    [mediaQueries.mUp]: {
      width: 300,
      height: 480
    }
  }),
  header: css({
    borderBottom: `5px dotted ${colors.negative.divider}`,
    padding: 5
  }),
  main: css({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingBottom: 60
  }),
  author: css({
    color: colors.negative.lightText,
    marginBottom: 10
  }),
  title: css({
    lineHeight: 1.3,
    padding: '0 20px'
  }),
  instructions: css({})
};

const SHOW_DISTRIBUTION = 5;
const BASE_TITLE_SIZE = 3.5;
const BASE_WORD_LENGTH = 10;
const BASE_SENTENCE_LENGTH = 50;

const getFontSize = (text: string): string => {
  const textLength = text.length;
  const maxWordLength = text
    .split(' ')
    .reduce(
      (currentMax, currentWord) =>
        currentWord.length > currentMax ? currentWord.length : currentMax,
      0
    );
  const textLengthFontSize =
    (BASE_TITLE_SIZE * BASE_SENTENCE_LENGTH) / textLength;
  const wordLengthFontSize =
    (BASE_TITLE_SIZE * BASE_WORD_LENGTH) / maxWordLength;
  return `${Math.min(
    textLengthFontSize,
    wordLengthFontSize,
    BASE_TITLE_SIZE
  )}rem`;
};

const Distribution: React.FC<DistributionProps> = ({ choices }) => {
  return <div>TODO Choices {choices.yes}</div>;
};

const Instructions: React.FC = () => (
  <div {...styles.instructions}>
    <Editorial.Credit>TODO Instructions</Editorial.Credit>
  </div>
);

const Card: React.FC<CardProps> = ({
  reason,
  totalReasons,
  choices,
  isFirst
}) => {
  const showDistribution = choices && choices.yes >= SHOW_DISTRIBUTION;
  return (
    <div {...styles.container}>
      <div {...styles.header}>
        <Editorial.Credit style={{ marginTop: 0, fontSize: 10 }}>
          Grund #{reason.id} von {totalReasons}
        </Editorial.Credit>
      </div>
      <div {...styles.main}>
        <Interaction.P {...styles.author}>
          Komplizin aus {reason.author.canton}
        </Interaction.P>
        <Editorial.Headline
          {...styles.title}
          style={{ fontSize: getFontSize(reason.text) }}
        >
          {reason.text}
        </Editorial.Headline>
      </div>
      {isFirst && <Instructions />}
      {showDistribution && <Distribution choices={choices} />}
    </div>
  );
};

export default Card;
