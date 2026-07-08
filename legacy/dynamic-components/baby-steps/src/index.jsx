import React from 'react'
import GoalBar from './Bar'

// const ASSETS_BASE_URL = 'https://cdn.repub.ch/s3/republik-assets/dynamic-components/baby-steps/assets'

const Index = ({ voting, goals, caption }) => {
  return <GoalBar voting={voting} goals={goals} caption={caption} />
}

export default Index
