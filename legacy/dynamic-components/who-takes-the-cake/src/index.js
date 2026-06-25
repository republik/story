import React from 'react'
import { getBudget, getTotal } from './data'
import BudgetChart from './BudgetChart'
import { css } from 'glamor'
import { mediaQueries } from '@project-r/styleguide'
import sharedStyles from './sharedStyles'

// const ASSETS_BASE_URL = 'https://cdn.repub.ch/s3/republik-assets/dynamic-components/who-takes-the-cake/assets'

const styles = {
  chart: css({
    margin: '30px auto',
    [mediaQueries.mUp]: {
      margin: '50px auto',
    },
    maxWidth: '400px',
  }),
}

const Index = ({ info, data }) => {
  return (
    <div {...styles.chart}>
      <BudgetChart info={info} data={getBudget(data)} total={getTotal(data)} />
      <div
        {...sharedStyles.small}
        dangerouslySetInnerHTML={{ __html: info.caption }}
      />
    </div>
  )
}

export default Index
