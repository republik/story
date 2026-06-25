import React, { useState, Fragment } from 'react'
import { css } from 'glamor'
import { Interaction, Editorial, Label, colors } from '@project-r/styleguide'
import { Chart, ChartTitle, ChartLead } from '@project-r/styleguide/chart'

import data from './freq.json'

const options = Array.from(new Set(data.map(d => d.word)))

const styles = {
  disabled: css({
    textDecoration: 'none',
    color: colors.disabled,
    ':hover': {
      color: colors.text
    }
  }),
  active: css({
    textDecoration: 'none',
    color: colors.text
  })
}

export default ({ title, lead, source, chartConfig, label }) => {
  const [word, setWord] = useState(options[0])

  return <div>
    {title && <ChartTitle>{title}</ChartTitle>}
    {lead && <ChartLead>{lead}</ChartLead>}
    <Interaction.P style={{ marginTop: -5 }}>
      <Label style={{ display: 'block', lineHeight: '20px' }}>{label}</Label>
      {options.map((option, i, all) =>
      <Fragment key={option}>
        <a {...styles[option === word ? 'active' : 'disabled']}href='#' onClick={(e) => {
          e.preventDefault()
          setWord(option)
        }}>{option}</a>
        {i === all.length - 1 ? '' : <span>&nbsp;&nbsp; </span>}
      </Fragment>
    )}
    </Interaction.P>
    <Chart config={chartConfig} values={data.filter(d => d.word == word)} />
    {source && <Editorial.Note style={{ marginTop: 10 }}>{source}</Editorial.Note>}
  </div>
}
