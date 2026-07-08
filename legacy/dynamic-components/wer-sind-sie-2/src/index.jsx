import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import AgeDist from './AgeDist'
import AgeVal from './AgeVal'
import Map from './Map'
import RevenueSeg from './RevenueSeg'
import TopNames from './TopNames'
import NameGenders from './NameGenders'
import { ColorContextLocalExtension } from '@project-r/styleguide'
import { timeFormat } from 'd3-time-format'
import TranslateP from './TranslateP'

// const ASSETS_BASE_URL = 'https://cdn.repub.ch/s3/republik-assets/dynamic-components/wer-sind-sie-2/assets'

const formatter = timeFormat('%Y-%m')

const query = gql`
  query MembershipStats($currentMonth: YearMonthDate!) {
    me {
      id
    }
    revenueStats {
      segments {
        updatedAt
        buckets {
          key
          buckets {
            key
            share
            label
          }
        }
      }
    }
    membershipStats {
      count
      evolution(min: $currentMonth, max: $currentMonth) {
        buckets {
          activeLoyalists
        }
      }
      ages {
        averageAge
        buckets {
          key
          count
        }
      }
      geo {
        buckets {
          country
          postalCode
          lat
          lon
          buckets {
            key
            count
          }
        }
      }
      geoCities {
        buckets {
          key
          buckets {
            key
            count
          }
        }
      }
      names {
        buckets {
          key
          sex
          count
        }
      }
    }
  }
`

const Charts = {
  AgeDist,
  AgeVal,
  Map,
  RevenueSeg,
  TopNames,
  NameGenders,
}

const Index = (props) => {
  if (props.type === 'P') return <TranslateP {...props} />
  const Chart = Charts[props.type]
  return (
    <ColorContextLocalExtension
      localColors={{
        light: {
          scrollBlockBg: 'rgba(255, 255, 255, 0.85)',
        },
        dark: {
          scrollBlockBg: 'rgba(25, 25, 25, 0.85)',
        },
      }}
    >
      <Chart {...props} />
    </ColorContextLocalExtension>
  )
}

export default graphql(query, {
  options: {
    variables: { currentMonth: formatter(new Date()) },
  },
})(Index)
