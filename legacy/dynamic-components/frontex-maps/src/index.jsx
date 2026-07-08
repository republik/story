import React from 'react'
import Map from './Map'
import Journey from './Journey'

export const ASSETS_BASE_URL =
  'https://cdn.repub.ch/s3/republik-assets/dynamic-components/frontex-maps/assets'

const Index = ({ showJourney, ...props }) =>
  showJourney ? <Journey {...props} /> : <Map {...props} />

export default Index
