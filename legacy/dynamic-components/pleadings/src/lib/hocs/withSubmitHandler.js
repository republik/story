import { graphql } from 'react-apollo'
import CREATE_PLEADING_MUTATION from '../graphql/CreatePleading.graphql'

const withSubmitHandler = () =>
  graphql(CREATE_PLEADING_MUTATION, {
    props: ({ mutate, ownProps }) => ({
      handleSubmit: (content, tags = []) => {
        const { discussionId } = ownProps

        return mutate({
          variables: { discussionId: discussionId, content, tags },
        }).catch((e) => Promise.reject(errorToString(e)))
      },
    }),
  })

export default withSubmitHandler

const errorToString = (error) =>
  error.graphQLErrors && error.graphQLErrors.length
    ? error.graphQLErrors.map((e) => e.message).join(', ')
    : error.toString()
