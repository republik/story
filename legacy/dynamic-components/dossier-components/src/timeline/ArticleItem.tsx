import * as React from 'react'
import { TimelineItem } from './Timeline'
import {
  TeaserFrontTile,
  TeaserFrontTileHeadline,
  TeaserFrontLead,
  TeaserFrontCredit,
  TeaserFeed,
  Editorial,
  fontStyles,
  mediaQueries,
  fontFamilies,
  RawHtml,
} from '@project-r/styleguide'
import BannerTeaser from '../banner/BannerTeaser'
import { css } from 'glamor'

type Props = {
  item: TimelineItem
}

const styles = {
  title: css({
    ...fontStyles.serifTitle22,
    marginTop: 5,
    marginBottom: 10,
  }),
  titleCursive: css({
    ...fontStyles.cursiveTitle22,
  }),
  link: css({
    color: 'inherit',
    textDecoration: 'none',
  }),
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
  highlight: css({
    marginTop: 5,
    [mediaQueries.onlyS]: {
      marginLeft: -35,
      width: '100vw',
    },
  }),
}

const ArticleItem: React.FC<Props> = ({ item }) => {

  if (item.highlight) {
    return (
      <div {...styles.highlight}>
        <BannerTeaser item={item} />
      </div>
    )
  } else {
    return (
      <div style={{ width: '100%' }}>
        <a {...styles.link} href={item.url}>
          <h3 {...styles.title} {...(item.type === 'ant' && styles.titleCursive)}>{item.title}</h3>
          <Editorial.P {...styles.description}>
            {item.description}
          </Editorial.P>
        </a>
        <div {...styles.credit}>
          <RawHtml
            dangerouslySetInnerHTML={{
              __html: item.author,
            }}
          />
        </div>
      </div>
    )
  }
}

export default ArticleItem
