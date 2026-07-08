import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { css } from 'glamor'
import sharedStyles from './sharedStyles'
import { MdExpandMore, MdExpandLess } from 'react-icons/md'

import {
  fontFamilies,
  fontStyles,
  mediaQueries,
  useColorContext,
} from '@project-r/styleguide'

const ICON_SIZE = 20

const styles = {
  wrapper: css({
    marginTop: 0,
    marginBottom: 0,
    position: 'relative',
  }),
  label: css({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    padding: '0 15px',
    marginTop: '-2px',
  }),
  category: css({
    paddingRight: `${ICON_SIZE}px`,
    position: 'relative',
  }),
  toggle: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...fontStyles.sansSerifRegular16,
    [mediaQueries.mUp]: {
      ...fontStyles.sansSerifRegular16,
    },
    textRendering: 'optimizeLegibility',
    WebkitFontSmoothing: 'antialiased',
  }),
  toggleIcon: css({
    padding: 0,
    width: ICON_SIZE,
    marginLeft: 0,
    display: 'inline-block',
    opacity: 0.5,
    position: 'absolute',
    right: 0,
    top: 4,
  }),
  toggleContent: css({
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '25px',
    cursor: 'pointer',
    ...fontStyles.sansSerifRegular16,
    [mediaQueries.mUp]: {
      ...fontStyles.sansSerifRegular16,
    },
  }),
  toggleIconContent: css({
    padding: 0,
    width: ICON_SIZE,
    marginLeft: 0,
    display: 'inline-block',
    position: 'absolute',
    bottom: 5,
    left: `calc(50% - ${ICON_SIZE / 2}px)`,
    opacity: 0.5,
  }),
  content: css({
    position: 'relative',
    paddingBottom: '30px',
  }),
  highlight: css({
    fontFamily: fontFamilies.sansSerifMedium,
    fontWeight: 'normal',
  }),
}

const BudgetChartItem = ({
  children,
  category,
  height,
  background,
  color,
  total,
  highlight,
  last,
}) => {
  const [collapsed, setCollapsed] = useState(true)
  const [colorScheme] = useColorContext()
  const toggleCollapsed = () => setCollapsed(!collapsed)
  const hasMore = !!children
  const ExpandIcon = collapsed ? MdExpandMore : MdExpandLess
  const iconTitle = collapsed ? 'Mehr' : 'Schliessen'
  const compact = !!height && height < 35
  const minHeight = compact ? 25 : 35

  return (
    <Fragment>
      <div
        {...styles.wrapper}
        style={{
          background,
          borderBottom: collapsed
            ? `1px solid ${colorScheme.getCSSColor('default')}`
            : undefined,
        }}
      >
        <div
          {...styles.toggle}
          onClick={hasMore ? toggleCollapsed : undefined}
          style={{
            color,
            height: Math.max(height || 0, minHeight),
            cursor: hasMore ? 'pointer' : undefined,
            fontFamily: highlight ? fontFamilies.sansSerifMedium : undefined,
          }}
        >
          {hasMore && (
            <span {...styles.label} {...styles.category}>
              {category}
              <button
                {...sharedStyles.plainButton}
                {...styles.toggleIcon}
                title={iconTitle}
              >
                <ExpandIcon size={ICON_SIZE} fill={'#fff'} />
              </button>
            </span>
          )}
          {!hasMore && <span {...styles.label}>{category}</span>}
          {total && <span {...styles.label}>{total}</span>}
        </div>
      </div>
      {collapsed || (
        <div {...styles.content}>
          {children}
          <div
            {...styles.toggleContent}
            onClick={toggleCollapsed}
            style={{
              borderBottom: last
                ? `1px solid ${colorScheme.getCSSColor('divider')}`
                : undefined,
            }}
          >
            <button
              {...sharedStyles.plainButton}
              {...styles.toggleIconContent}
              title={iconTitle}
            >
              <ExpandIcon
                size={ICON_SIZE}
                fill={colorScheme.getCSSColor('text')}
              />
            </button>
          </div>
        </div>
      )}
    </Fragment>
  )
}

BudgetChartItem.propTypes = {
  label: PropTypes.string,
}

BudgetChartItem.defaultProps = {
  color: '#fff',
}

export default BudgetChartItem
