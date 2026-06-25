import React, { useMemo } from 'react'
import {
  Editorial,
  Interaction,
  fontStyles,
  useColorContext,
  RawHtml,
} from '@project-r/styleguide'
import Card from './Card'
import { css } from 'glamor'

const styles = {
  horizontal: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  }),
  choice: css({
    cursor: 'pointer',
    marginBottom: 10,
    lineHeight: 1.4,
    ...fontStyles.sansSerifRegular,
  }),
}

const Choice = ({
  id,
  title,
  options = [],
  onChange = () => {},
  choice,
  horizontal,
  changeable,
  customTrueColor,
  customWronglySelectedColor,
}) => {
  const [colorScheme] = useColorContext()
  const hoverRules = useMemo(
    () =>
      css({
        '@media (hover)': {
          ':hover': {
            background: colorScheme.getCSSColor('text'),
            color: colorScheme.getCSSColor('default'),
          },
        },
      }),
    [colorScheme],
  )

  const isChangeable = !choice || !!changeable
  return (
    <Card label={title}>
      <div {...(horizontal && styles.horizontal)}>
        {options.map((o, i) => {
          let style = {}
          const isTrueChoice = choice && o.value === 'WAHR'
          const isWronglySelectedChoice =
            choice && choice.value.option === o.option && o.value !== 'WAHR'

          return (
            <div
              {...styles.choice}
              {...colorScheme.set('color', isChangeable ? 'text' : 'disabled')}
              {...colorScheme.set(
                'borderColor',
                isChangeable ? 'text' : 'disabled',
              )}
              {...colorScheme.set(
                'backgroundColor',
                isTrueChoice
                  ? customTrueColor || 'sequential100'
                  : isWronglySelectedChoice
                    ? customWronglySelectedColor || 'opposite100'
                    : 'default',
              )}
              {...(isChangeable && hoverRules)}
              style={{
                ...style,
                border:
                  isTrueChoice || isWronglySelectedChoice
                    ? 'none'
                    : '1px solid',
                flexGrow: 1,
                marginRight: horizontal && i < options.length - 1 ? 10 : 0,
                textAlign: horizontal ? 'center' : 'left',
                padding: `0.8rem ${horizontal ? 0.3 : 1}rem`,
              }}
              {...colorScheme.set(
                'color',
                isTrueChoice || isWronglySelectedChoice ? 'default' : undefined,
              )}
              onClick={(e) => {
                e.stopPropagation()
                if (isChangeable) {
                  onChange({ id, value: o, result: o.value === 'WAHR' })
                }
              }}
            >
              {`${o.option}`}
            </div>
          )
        })}
      </div>
      {options.some((o) => o.debriefing) && (
        <Interaction.P style={{ marginTop: 10, minHeight: 25 }}>
          {choice?.value?.debriefing && (
            <span>
              <RawHtml
                dangerouslySetInnerHTML={{
                  __html: choice.value.debriefing,
                }}
              />
              {choice.value.source && (
                <>
                  {' '}
                  <Editorial.A
                    target={
                      choice.value.source.includes('www.republik.ch')
                        ? ''
                        : '_blank'
                    }
                    href={choice.value.source}
                  >
                    {choice.value.sourceTitle}
                  </Editorial.A>
                  {choice.value.customEndMark || '.'}
                </>
              )}
            </span>
          )}
        </Interaction.P>
      )}
    </Card>
  )
}

export default Choice
