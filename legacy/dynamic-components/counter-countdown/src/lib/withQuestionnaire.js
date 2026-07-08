import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const questionnaireQuery = gql`
  query getQuestionnaire($slug: String!) {
    questionnaire(slug: $slug) {
      id
      slug
      endDate
      turnout {
        eligible
        submitted
      }
      questions {
        id
        text
        turnout {
          submitted
        }
      }
    }
  }
`

export default graphql(questionnaireQuery, {
  options: ({ slug, pollInterval = 0 }) => ({
    pollInterval,
    variables: { slug },
  }),
})
