import React, { useEffect, useState } from 'react'
import {
  ChartTitle,
  ChartLead,
  Chart,
  ChartLegend,
} from '@project-r/styleguide'
import { css } from 'glamor'

const styles = {
  transition: css({
    '& path': {
      transition: 'fill 5s ease',
    },
  }),
}

export default ({ phase, dataByStep, userMunicipality }) => {
  const data = dataByStep.map((d) => {
    return {
      ...d,
      value: phase.step === 'step1' ? d.value : 0.5,
      favorite: userMunicipality && userMunicipality.value === d.feature,
    }
  })

  console.log(data)

  return (
    <div {...styles.transition}>
      <Chart
        config={{
          type: 'ProjectedMap',
          colorLegend: false,
          numberFormat: '.0%',
          features: {
            url:
              'https://cdn.republik.space/s3/republik-assets/assets/geo/bfs-g2g19.json?1',
            object: 'mun',
          },
          showValue: true,
          choropleth: true,
          colorRange: ['#e8e8e8', '#e4d9ac', '#c8b35a'],
          thresholds: [0.294, 0.346],
          heightRatio: 0.63,
          highlighted: 'favorite',
          opacity: 1,
        }}
        values={data}
      />
    </div>
  )
}
