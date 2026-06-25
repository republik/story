import React from 'react'
import { storiesOf } from '@storybook/react'
import Collage from './Collage'


storiesOf('Collage', module)
  .add('default', () => (
    <Collage items={[
      {
        "name": "goldvreneli",
        "title": "Zum Geburtstag viel Gold",
        "src": "https://cdn.republik.space/s3/republik-assets/dynamic-components/erbschaft/images/goldvreneli.jpg",
        "audioSrc": {
          "mp3": "https://cdn.republik.space/s3/republik-assets/dynamic-components/erbschaft/audio/goldvreneli.mp3"
        }
      },
      {
        "name": "haus",
        "title": "Das halbe Haus",
        "src": "https://cdn.republik.space/s3/republik-assets/dynamic-components/erbschaft/images/haus.jpg",
        "audioSrc": {
          "mp3": "https://cdn.republik.space/s3/republik-assets/dynamic-components/erbschaft/audio/haus.mp3"
        }
      }
    ]} />
  ))
