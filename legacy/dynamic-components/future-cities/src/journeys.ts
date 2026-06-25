export type JourneyDef = {
  image: string
  width?: number
  height?: number
  origin: string
  originX: number
  originY: number
  dest: string
  destX: number
  destY: number
}

export const JOURNEYS: {[key: string]: JourneyDef} = {
  bern: {
    image: 'https://republik-assets.s3.amazonaws.com/dynamic-components/future-cities/assets/bern.jpg',
    origin: 'Bern',
    originX: 907,
    originY: 879,
    dest: 'Mailand',
    destX: 1105,
    destY: 1110,
  },
  miami: {
    image: 'https://republik-assets.s3.amazonaws.com/dynamic-components/future-cities/assets/miami.jpg',
    origin: 'Miami',
    originX: 1148,
    originY: 856,
    dest: 'Havanna',
    destX: 963,
    destY: 1110,
  },
  helsinki: {
    image: 'https://republik-assets.s3.amazonaws.com/dynamic-components/future-cities/assets/helsinki.jpg',
    origin: 'Helsinki',
    originX: 1038,
    originY: 769,
    dest: 'Bratislava',
    destX: 928,
    destY: 1194,
  },
  baghdad: {
    image: 'https://republik-assets.s3.amazonaws.com/dynamic-components/future-cities/assets/baghdad.jpg',
    origin: 'Bagdad',
    originX: 900,
    originY: 900,
    dest: 'Basra',
    destX: 1140,
    destY: 1132,
  },
}