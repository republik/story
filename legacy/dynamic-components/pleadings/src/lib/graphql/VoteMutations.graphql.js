import gql from 'graphql-tag'
import COMMENT_FRAGMENT from './fragments/PleadingComment.graphql'

export const UPVOTE_MUTATION = gql`
  mutation upvoteComment($commentId: ID!) {
    upvoteComment(id: $commentId) {
      ...PleadingComment
    }
  }
  ${COMMENT_FRAGMENT}
`
export const DOWNVOTE_MUTATION = gql`
  mutation downvoteComment($commentId: ID!) {
    downvoteComment(id: $commentId) {
      ...PleadingComment
    }
  }
  ${COMMENT_FRAGMENT}
`

export const UNVOTE_MUTATION = gql`
  mutation unvoteComment($commentId: ID!) {
    unvoteComment(id: $commentId) {
      ...PleadingComment
    }
  }
  ${COMMENT_FRAGMENT}
`
