import React from 'react'
import { compose } from 'react-apollo'

import { formatLocale } from 'd3-format'
import { css } from 'glamor'

import {
  Loader,
  P,
  mediaQueries,
  fontStyles,
  pxToRem,
  useColorContext,
  Interaction,
} from '@project-r/styleguide'

import Countdown from './Countdown'
import withQuestionnaire from './lib/withQuestionnaire'

const thousandSeparator = '\u2019'
const swissNumbers = formatLocale({
  decimal: ',',
  thousands: thousandSeparator,
  grouping: [3],
  currency: ['CHF\u00a0', ''],
})

const count3Format = swissNumbers.format('.0f')
const count4Format = swissNumbers.format(',.0f')
const format = (value) => {
  if (String(Math.round(value)).length > 3) {
    return count4Format(value)
  }
  return count3Format(value)
}

const styles = {
  primaryNumber: css({
    display: 'block',
    marginBottom: -6,
    [mediaQueries.mUp]: {
      marginBottom: -8,
    },
    fontSize: 80,
    ...fontStyles.sansSerifRegular,
    lineHeight: 1,
  }),
  label: css(Interaction.fontRule, {
    display: 'block',
    fontSize: pxToRem(14),
    lineHeight: pxToRem(20),
    paddingTop: 8,
    paddingBottom: 8,
  }),
}

const Counter = ({
  data,
  caption,
  showCountdown,
  countdownCaption,
  countdownOverMessage,
}) => {
  const [colorScheme] = useColorContext()

  return (
    <Loader
      loading={data.loading}
      error={data.error}
      render={() => {
        const { questionnaire } = data

        /* for now we just take the max number out of submitted by question
        could be extended by submitted number of questionnaire's turnout 
        in case we have a questionnaire where one has to submit all answers 
        together at once */
        const submitted =
          Math.max(
            ...questionnaire?.questions.map(
              (question) => question.turnout.submitted
            )
          ) || 0

        return (
          <div>
            <P {...colorScheme.set('color', 'text')}>
              <span {...styles.primaryNumber}>{format(submitted)}</span>
              <span {...styles.label}>{caption}</span>
            </P>
            {showCountdown && (
              <Countdown
                endDate={questionnaire.endDate}
                caption={countdownCaption}
                over={countdownOverMessage}
              />
            )}
          </div>
        )
      }}
    />
  )
}

export default compose(withQuestionnaire)(Counter)
