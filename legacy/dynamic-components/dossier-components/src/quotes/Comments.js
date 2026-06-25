import React from 'react'

const t = createFormatter([
  {
    key: 'timeago/justNow/other',
    value: 'gerade eben',
  },
  {
    key: 'timeago/seconds/1',
    value: 'vor einer Sekunde',
  },
  {
    key: 'timeago/seconds/other',
    value: 'vor {count} Sekunden',
  },
  {
    key: 'timeago/minutes/1',
    value: 'vor einer Minute',
  },
  {
    key: 'timeago/minutes/other',
    value: 'vor {count} Minuten',
  },
  {
    key: 'timeago/hours/1',
    value: 'vor einer Stunde',
  },
  {
    key: 'timeago/hours/other',
    value: 'vor {count} Stunden',
  },
  {
    key: 'timeago/days/1',
    value: 'vor einem Tag',
  },
  {
    key: 'timeago/days/other',
    value: 'vor {count} Tagen',
  },
  {
    key: 'timeago/weeks/1',
    value: 'vor einer Woche',
  },
  {
    key: 'timeago/weeks/other',
    value: 'vor {count} Wochen',
  },
  {
    key: 'timeago/months/1',
    value: 'vor einem Monat',
  },
  {
    key: 'timeago/months/other',
    value: 'vor {count} Monaten',
  },
  {
    key: 'timeago/years/1',
    value: 'vor einem Jahr',
  },
  {
    key: 'timeago/years/other',
    value: 'vor {count} Jahren',
  },
  {
    key: 'styleguide/CommentTeaser/comment/link',
    value: 'Beitrag in {link}',
  },
])

import {
  CommentTeaser,
  createFormatter,
  BlockQuote,
  BlockQuoteParagraph,
  fontStyles,
  Interaction,
  mediaQueries,
  Breakout,
  useColorContext
} from '@project-r/styleguide'
import { css } from 'glamor'

const Comments = ({ comments }) => {
  const [colorScheme] = useColorContext()
  return (
    <div
      {...css({
        display: 'flex',
        flexDirection: 'column',
      })}
      {...colorScheme.set('color', 'text')}
    >
      <div
        {...css({
          marginBottom: 15,
        })}
      >
        <Interaction.H3>{comments.label}</Interaction.H3>
      </div>
      {comments.entries.map((e) => {
        return <CommentTeaser t={t} {...e} timeago={(t) => t} />
      })}
    </div>
  )
}

export default Comments
