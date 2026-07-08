import gql from 'graphql-tag'

const ME_QUERY = gql`
  query me {
    me {
      id
      username
      portrait
      name
      firstName
      lastName
      email
      initials
      roles
      isListed
      hasPublicProfile
      discussionNotificationChannels
      accessCampaigns {
        id
      }
      prolongBeforeDate
      activeMembership {
        id
        type {
          name
        }
        endDate
        graceEndDate
      }
    }
  }
`

export default ME_QUERY
