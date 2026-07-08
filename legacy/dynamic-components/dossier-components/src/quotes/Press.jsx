import React from 'react'
import {
  CommentTeaser,
  createFormatter,
  BlockQuote,
  fontStyles,
  Interaction,
  mediaQueries,
  Breakout,
  FigureCaption,
  FigureByline,
  Editorial,
  useColorContext
} from '@project-r/styleguide'
import { css } from 'glamor'

const Quote = ({ source, url, quote, date, description }) => {
  const [colorScheme] = useColorContext()
  return (
    <div
      {...css({
        marginBottom: 30,
      })}
    >
      <BlockQuote attributes={{ style: { margin: 0 } }}>
        <div
          style={{ padding: 15 }}
          {...colorScheme.set('backgroundColor', 'hover')}>
          <Interaction.P>
            {quote}
          </Interaction.P>
        </div>
        <FigureCaption>{description}{' '}<FigureByline><Editorial.A href={url}>{source}, {date}</Editorial.A></FigureByline></FigureCaption>
      </BlockQuote>
    </div>
  )
}

const PressQuotes = ({ quotes }) => (
  <div>
    <div
      {...css({
        marginBottom: 15,
      })}
    >
      <Interaction.H3>{quotes.label}</Interaction.H3>
    </div>
    {quotes.entries.map(q => (
      <Quote {...q} />
    ))}
  </div>
)

export default PressQuotes
