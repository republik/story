import { graphql } from 'react-apollo'
import ME_QUERY from '../graphql/Me.graphql'

const withMe = () =>
  graphql(ME_QUERY, {
    props: ({ data: { me, refetch } }) => ({
      meData: {
        me,
        refetch,
      },
    }),
  })

export default withMe
