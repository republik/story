import React, { useContext, useMemo } from 'react'
import {
  renderCommentMdast,
  fontStyles,
  mediaQueries,
  DiscussionContext,
} from '@project-r/styleguide'
import { css } from 'glamor'
import VoteButtons from './VoteButtons'

const styles = {
  root: css({
    display: 'grid',
    gridTemplateAreas: `
      "portrait heading"
      "text text"
      "vote vote"
    `,
    gridTemplateColumns: 'max-content 1fr',
    gridTemplateRows: 'auto auto auto',
    gap: '.5rem',
    [mediaQueries.mUp]: {
      gridTemplateAreas: `
      "portrait heading ."
      "portrait text vote"
    `,
      gridTemplateColumns: 'minmax(100px, max-content) 1fr max-content',
      gridTemplateRows: '28px auto',
      gap: '.5rem 1rem',
    },
  }),
  profilePicture: css({
    gridArea: 'portrait',
    display: 'block',
    width: 60,
    height: 60,
    [mediaQueries.mUp]: {
      width: 100,
      height: 100,
    },
  }),
  headingWrapper: css({
    gridArea: 'heading',
  }),
  textWrapper: css({
    gridArea: 'text',
  }),
  heading: css({
    margin: 0,
    ...fontStyles.sansSerifMedium22,
  }),
  voteWrapper: css({
    gridArea: 'vote',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  }),
}

const PleaComment = ({ comment, tagMapping, t }) => {
  const { discussion } = useContext(DiscussionContext)

  const tagMapper = useMemo(() => {
    const tag = comment.tags.length > 0 && comment.tags[0]

    if (tagMapping && tag && tag in tagMapping) {
      return tagMapping[tag]
    }
    return (
      tagMapping.default || {
        text: 'Plädoyer von {user}',
        color: 'black',
      }
    )
  }, [comment, tagMapping])

  const commentHeading = useMemo(
    () => tagMapper.text.replace('{user}', comment.displayAuthor.name),
    [comment, tagMapper]
  )

  const commentText = useMemo(
    () => renderCommentMdast(comment.content),
    [comment]
  )

  return (
    <div {...styles.root}>
      {comment.displayAuthor?.profilePicture && (
        <img
          {...styles.profilePicture}
          alt={comment.displayAuthor.name}
          src={comment.displayAuthor.profilePicture}
        />
      )}
      <div {...styles.headingWrapper}>
        <p
          {...styles.heading}
          {...css({
            color: tagMapper.color,
          })}
        >
          {commentHeading}
        </p>
      </div>
      <div {...styles.textWrapper}>{commentText}</div>
      <div {...styles.voteWrapper}>
        <VoteButtons
          t={t}
          comment={comment}
          userCanVote={discussion.userCanComment}
        />
      </div>
    </div>
  )
}

export default PleaComment
