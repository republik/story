import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { createFormatter } from '@project-r/styleguide'

import Simulator from './components/Simulator/Y2020'
import MembershipEvolution from './components/MembershipEvolution'

import translations from './lib/translations.json'

const Wrapper = ({ membershipEvolution, extract }) => {
  const t = createFormatter(translations.data)

  if (membershipEvolution) {
    return <MembershipEvolution {...membershipEvolution} t={t} />
  }

  const query = typeof window !== 'undefined'
    ? window.location.search.substring(1)
        .split('&').reduce((q, item) => {
          const [key, value] = item.split('=')
          q[key] = value
          return q
        }, {})
    : {}

  if (extract && !query.extract) {
    return null
  }

  return <Simulator
    t={t}
    extract={extract}
    query={query} />
}

export default Wrapper
