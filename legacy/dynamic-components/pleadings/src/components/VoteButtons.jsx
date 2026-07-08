import React, { useContext } from 'react'
import { Mutation } from 'react-apollo'
import { css } from 'glamor'
import {
  DOWNVOTE_MUTATION,
  UNVOTE_MUTATION,
  UPVOTE_MUTATION,
} from '../lib/graphql/VoteMutations.graphql'
import { fontStyles, IconButton, useColorContext } from '@project-r/styleguide'
import {
  SvgArrowDownward as ArrowDownIcon,
  SvgArrowUpward as ArrowUpIcon,
} from '@republik/icons'

const styles = {
  root: css({
    ...fontStyles.sansSerifMedium24,
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    marginLeft: '-7px',
  }),
  votes: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 'auto',
  }),
  vote: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),
  voteDivider: css({
    padding: '0 2px',
  }),
  voteButton: css({
    margin: 0,
  }),
}

const VoteButtons = ({ t, comment, userCanVote = false }) => {
  const [colorScheme] = useColorContext()

  const options = {
    variables: {
      commentId: comment.id,
    },
  }

  return (
    <Mutation mutation={UNVOTE_MUTATION}>
      {(handleUnVote) => (
        <div {...styles.votes}>
          <Mutation mutation={UPVOTE_MUTATION}>
            {(handleUpvote) => {
              let clickHandler

              if (userCanVote && comment.userVote !== 'UP') {
                clickHandler = () => handleUpvote(options)
              } else if (userCanVote && comment.userVote === 'UP') {
                clickHandler = () => handleUnVote(options)
              }

              return (
                <div {...styles.vote}>
                  <IconButton
                    size={24}
                    fill={
                      comment.userVote === 'UP' &&
                      colorScheme.getCSSColor('primary')
                    }
                    Icon={ArrowUpIcon}
                    disabled={!userCanVote}
                    onClick={clickHandler}
                    title={t('styleguide/CommentActions/upvote')}
                    noMargin
                  />
                  <span
                    title={t.pluralize(
                      'styleguide/CommentActions/upvote/count',
                      {
                        count: comment.upVotes,
                      }
                    )}
                  >
                    {comment.upVotes}
                  </span>
                </div>
              )
            }}
          </Mutation>
          <div {...styles.voteDivider} {...colorScheme.set('color', 'text')}>
            /
          </div>
          <Mutation mutation={DOWNVOTE_MUTATION}>
            {(handleDownVote) => {
              let clickHandler

              if (userCanVote && comment.userVote !== 'DOWN') {
                clickHandler = () => handleDownVote(options)
              } else if (userCanVote && comment.userVote === 'DOWN') {
                clickHandler = () => handleUnVote(options)
              }

              return (
                <div {...styles.vote}>
                  <span
                    title={t.pluralize(
                      'styleguide/CommentActions/downvote/count',
                      {
                        count: comment.downVotes,
                      }
                    )}
                  >
                    {comment.downVotes}
                  </span>
                  <IconButton
                    size={24}
                    fill={
                      comment.userVote === 'DOWN' &&
                      colorScheme.getCSSColor('primary')
                    }
                    Icon={ArrowDownIcon}
                    disabled={!userCanVote}
                    onClick={clickHandler}
                    title={t('styleguide/CommentActions/downvote')}
                    noMargin
                  />
                </div>
              )
            }}
          </Mutation>
        </div>
      )}
    </Mutation>
  )
}

export default VoteButtons
