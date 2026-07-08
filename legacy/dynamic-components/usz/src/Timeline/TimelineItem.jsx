import * as React from 'react'
import {
  Editorial,
  fontStyles,
  mediaQueries,
  RawHtml,
} from '@project-r/styleguide'
import { css } from 'glamor'

const styles = {
  description: css({
    margin: 0,
  }),
  credit: css({
    ...fontStyles.sansSerifRegular14,
    [mediaQueries.mUp]: {
      ...fontStyles.sansSerifRegular15,
    },
    marginTop: 10,
    '& a': {
      color: 'inherit',
      ':visited': {
        color: 'inherit',
      },
      textDecoration: 'underline',
    },
  }),
}

const ArticleItem = ({ item }) => {
  return (
    <div style={{ width: '100%' }}>
      <Editorial.P {...styles.description}>
        <RawHtml
          dangerouslySetInnerHTML={{
            __html: item.content,
          }}
        />
      </Editorial.P>
    </div>
  )
}

export default ArticleItem
