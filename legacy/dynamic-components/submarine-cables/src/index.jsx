import React, { useState, useEffect } from 'react'
import { Center } from '@project-r/styleguide'
import CustomGlobe from './CustomGlobe'

// const ASSETS_BASE_URL = 'https://cdn.repub.ch/s3/republik-assets/dynamic-components/REPOSLUG/assets'

const Index = () => {
  const [cablePaths, setCablePaths] = useState([])

  useEffect(() => {
    // from https://github.com/telegeography/www.submarinecablemap.com
    fetch(
      '//raw.githubusercontent.com/telegeography/www.submarinecablemap.com/master/web/public/api/v3/cable/cable-geo.json'
    )
      .then((r) => r.json())
      .then((cablesGeo) => {
        let cablePaths = []
        cablesGeo.features.forEach(({ geometry, properties }) => {
          geometry.coordinates.forEach((coords) =>
            cablePaths.push({ coords, properties })
          )
        })

        setCablePaths(cablePaths)
      })
  }, [])
  return <CustomGlobe />
}

export default Index
