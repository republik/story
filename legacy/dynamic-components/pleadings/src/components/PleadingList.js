import React from 'react'
import PleaComment from './PleaComment'
import { css } from 'glamor'

const styles = {
  wrapper: css({
    '& > div:not(:last-child)': {
      marginBottom: '2rem',
    },
  }),
}

const PleadingList = ({ t, pleadings, tagMapping }) => (
  <div {...styles.wrapper}>
    {pleadings?.length > 0 &&
      pleadings.map((pleading) => (
        <div key={pleading.id}>
          <PleaComment t={t} comment={pleading} tagMapping={tagMapping} />
        </div>
      ))}
  </div>
)

export default PleadingList
