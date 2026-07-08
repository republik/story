import { graphql } from 'react-apollo'
import GET_PLEADINGS_QUERY from '../graphql/GetPleadings.graphql'

const withPleadings = (defaultProps = { first: 50, orderBy: 'DATE' }) =>
  graphql(GET_PLEADINGS_QUERY, {
    options: ({ discussionId, first, orderBy }) => {
      return {
        variables: {
          discussionId,
          first: first || defaultProps.first,
          orderBy: orderBy || defaultProps.orderBy,
        },
      }
    },
    props: ({ data, ownProps, refetch }) => ({
      data,
      fetchMore: ({ after }) =>
        data.fetchMore({
          variables: {
            after,
          },
          updateQuery: (
            previousResult,
            { fetchMoreResult, queryVariables }
          ) => {
            const nodes = [
              ...previousResult.comments.nodes,
              ...fetchMoreResult.comments.nodes,
            ]
            return {
              ...previousResult,
              totalCount: fetchMoreResult.comments.pageInfo.hasNextPage
                ? fetchMoreResult.comments.totalCount
                : nodes.length,
              comments: {
                ...previousResult.comments,
                ...fetchMoreResult.comments,
                nodes,
              },
            }
          },
        }),
    }),
  })

export default withPleadings
