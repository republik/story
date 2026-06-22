import React from 'react'
import { css } from 'glamor'
import { Interaction, fontStyles } from '@project-r/styleguide'
export const Badge = ({ label, color }) => (
  <span
    {...css({
      color: '#fff',
      background: color,
      padding: '1px 3px 2px 3px',
      whiteSpace: 'nowrap',
      marginRight: 5,
    })}
  >
    {label}
  </span>
)

const Card = ({ children, label }) => (
  <div
    {...css({
      marginTop: 30,
    })}
  >
    <Interaction.P
      {...css({
        marginBottom: '1rem',
        ...fontStyles.sansSerifMedium,
      })}
    >
      {label}
    </Interaction.P>

    {children}
  </div>
)

export default Card
