import React, { Fragment, useEffect, useState } from 'react'
import { useColorContext, colors, mediaQueries } from '@project-r/styleguide'
import { css } from 'glamor'
import BudgetChartItem from './BudgetChartItem'
import BudgetTable, { swissNumbers } from './BudgetTable'
import sharedStyles from './sharedStyles'

const MIN_HEIGHT = 400
const MAX_HEIGHT = 700

const HEADER_HEIGHT = 60
const HEADER_HEIGHT_MOBILE = 48

const styles = {
  wrapper: css({
    width: '100%',
    margin: '10px auto',
    position: 'relative',
  }),
}

const countFormat = swissNumbers.format(',.2f')

const displayAmount = (amount) => `CHF ${countFormat(amount / 1000000)} Mio.`

const BudgetChart = ({ data, info, total }) => {
  const [height, setHeight] = useState(MAX_HEIGHT)
  const [colorScheme] = useColorContext()

  const onHeightChange = () => {
    const headerHeight =
      window.innerWidth < mediaQueries.mBreakPoint
        ? HEADER_HEIGHT_MOBILE
        : HEADER_HEIGHT

    const newHeight = Math.max(
      MIN_HEIGHT,
      Math.min(
        window.innerHeight - headerHeight - 4 * headerHeight,
        MAX_HEIGHT - headerHeight
      )
    )

    newHeight && setHeight(newHeight)
  }

  useEffect(() => {
    onHeightChange()
    window.addEventListener('resize', onHeightChange)
    return () => window.removeEventListener('resize', onHeightChange)
  }, [])

  if (!data || !data.children) {
    return null
  }

  return (
    <div {...styles.wrapper}>
      <BudgetChartItem
        color={colorScheme.getCSSColor('text')}
        category={info.title}
        total={displayAmount(total)}
        highlight
      />
      {data.children &&
        data.children.map(({ data }, i) => (
          <BudgetChartItem
            key={`item-${i}`}
            category={data.category}
            total={displayAmount(data.total)}
            background={colors.discrete[i]}
            height={(data.total / total) * (height || MAX_HEIGHT)}
            last={i === data.children.length - 1}
          >
            <div
              dangerouslySetInnerHTML={{ __html: data.more }}
              {...sharedStyles.small}
            />
            {data.children && (
              <Fragment>
                <BudgetTable {...data} data={data.children} />
                <div
                  dangerouslySetInnerHTML={{ __html: info.tableCaption }}
                  {...sharedStyles.tiny}
                  {...sharedStyles.note}
                />
              </Fragment>
            )}
          </BudgetChartItem>
        ))}
    </div>
  )
}
export default BudgetChart
