import React from 'react'
import { ChartTitle, ChartLead, ChartLegend } from '@project-r/styleguide/chart'

const ChartFrame = ({ title, lead, legend, children }) => {
  return (
    <div>
      {title && <ChartTitle>{title}</ChartTitle>}
      {lead && <ChartLead>{lead}</ChartLead>}
      {children}
      {legend && <ChartLegend>{legend}</ChartLegend>}
    </div>
  )
}

export default ChartFrame
