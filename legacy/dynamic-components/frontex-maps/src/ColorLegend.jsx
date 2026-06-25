import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'glamor'
import {
  useColorContext,
  fontStyles,
  mediaQueries,
} from '@project-r/styleguide'

const styles = {
  container: css({
    zIndex: 10,
    marginBottom: 10,
    [mediaQueries.mUp]: {
      backgroundColor: '#3a4b51',
      color: '#ffffff',
      maxWidth: 200,
      position: 'absolute',
      right: 0,
      bottom: '35%',
      padding: 10,
    },
  }),
  title: css({
    ...fontStyles.sansSerifMedium12,
  }),
  label: css({
    ...fontStyles.sansSerifRegular12,
    fontFeatureSettings: '"tnum" 1, "kern" 1',
    paddingLeft: 12,
    position: 'relative',
  }),
  color: css({
    position: 'absolute',
    left: 0,
    top: 5,
    width: 8,
    height: 8,
    borderRadius: '50%',
  }),
}

const ColorLegend = ({ title, values }) => {
  const [colorScheme] = useColorContext()
  if (!values?.length && !title) {
    return null
  }
  return (
    <div {...styles.container}>
      {!!title && <div {...styles.title}>{title}</div>}
      {values.map((value, i) => {
        let text = value.label

        return (
          <div key={i} {...styles.label}>
            {!!value.color && (
              <div
                {...styles.color}
                {...colorScheme.set('backgroundColor', value.color, 'charts')}
              />
            )}
            {text}{' '}
          </div>
        )
      })}
    </div>
  )
}

ColorLegend.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  values: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    })
  ),
}

export default ColorLegend
