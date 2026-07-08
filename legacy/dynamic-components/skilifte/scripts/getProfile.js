const d3 = require('d3')
const _ = require('lodash')
const fs = require('fs')
fetch = require('node-fetch')
const qs = require('querystring');

const activeResorts = [
  'Adelboden-Lenk',
  'Andermatt-Sedrun',
  'Arosa-Lenzerheide',
  'Crans-Montana',
  'Davos Klosters',
  'Engelberg',
  'Flumserberg',
  'Hoch-Ybrig',
  'Grindelwald-Wengen',
  'Gstaad',
  'Laax',
  'Les Diablerets',
  'Leysin',
  'Saas-Fee',
  'Schönried-Zweisimmen',
  'Sörenberg',
  'St. Moritz',
  'Toggenburg',
  'Verbier',
  'Zermatt',
  'Elm',
  'Braunwald'
]

const run = async () => {

  const resortsData = await d3.csvParse(fs.readFileSync(`./skigebiete.csv`).toString())

  // const resortGroups = d3.nest().key(d => d['SKIGEBIET']).sortKeys(d3.ascending).entries(resorts)
  //   .filter(g => g.key !== '#N/A')
  //   .filter(g => g.values.length > 10)

  //console.log('getProfile.js:16 [resortGroups.length]', resortGroups.length)

  //  resortGroups.forEach(async ({key, values}) => {
  const data = await Promise.all(activeResorts.map(async (key) => {

    console.log(key)

    const profileFile = `./profiles/${key}.json`

    const { name, stations } = JSON.parse(fs.readFileSync(profileFile).toString())
    const resorts = resortsData.filter((d => d['SKIGEBIET'] === key)).filter(r => r.MAX_Z - r.MIN_Z >= 100)

    console.log(`skilifte`, resorts.length)

    const [min, max] = resorts.reduce((acc, cur) => {
        if (cur.MIN_Z <= acc[0].MIN_Z) acc[0] = cur
        if (cur.MAX_Z >= acc[1].MAX_Z) acc[1] = cur
        return acc
      },
      [{MIN_Z: Number.MAX_VALUE, MAX_Z: Number.MIN_VALUE},{MIN_Z: Number.MAX_VALUE, MAX_Z: Number.MIN_VALUE}]
    )


    if (!stations[0].Z)
      stations[0].Z = +min.MIN_Z
    // stations[0].N = +min.MIN_N
    if (!stations[stations.length-1].Z)
      stations[stations.length-1].Z = +max.MAX_Z
    // stations[stations.length-1].E = +max.MAX_E
    // stations[stations.length-1].N = +max.MAX_N

    const lineString =  JSON.stringify({
      type:"LineString",
      coordinates: stations.map(s => ([s.E, s.N]))
    })

    // console.log('getProfile.js:47 [lineString]', lineString)

    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        Referer: 'https://map.geo.admin.ch',
        Origin: 'https://map.geo.admin.ch',
      },
      body: qs.stringify({ geom: lineString, elevation_models: 'COMB', offset: 1})
    }

    const response = await fetch('https://api3.geo.admin.ch/rest/services/profile.json', init)
    const profile = await response.json()

    const profileStations = stations.map((s,i) => ({
      ...s,
      ...profile.find(p => +p.easting === s.E && +p.northing === s.N)
    }))

    const payload = {
      name,
      profile: _.sortBy(_.uniqBy([...profile.filter((d,i) => i % 20 === 0), ...profileStations], p => p.dist), p => p.dist),//.map(p => _.pick(p, 'dist', 'alts')),
      data: resorts,//.map(r => _.pick(r, ['NAME', 'MIN_Z', 'MAX_Z', '2005 bottom', '2005 top', '2035 bottom', '2035 top', '2060 bottom', '2060 top', '2085 bottom', '2085 top'])),
      stations: profileStations
    }

    fs.writeFileSync(profileFile, JSON.stringify(payload))

    return {
      name,
      profile: _.sortBy(_.uniqBy([...profile.filter((d,i) => i % 20 === 0), ...profileStations], p => p.dist), p => p.dist).map(p => _.pick(p, 'dist', 'alts')),
      data: resorts.map(r => _.pick(r, ['UUID', 'NAME', 'MIN_E', 'MIN_N', 'MIN_Z', 'MAX_Z', '2005 bottom', '2005 top', '2035 bottom', '2035 top', '2060 bottom', '2060 top', '2085 bottom', '2085 top'])),
      stations: profileStations.map(s => _.pick(s, ['name', 'dist', 'alts', 'Z']))
    }

  }))

  fs.writeFileSync('../src/data/profiles.json', JSON.stringify(data))

  //
  // const highestPoint = lines.find(l => l.geometry.coordinates.some(c => c[2] == max)).geometry.coordinates.find(c => c[2] == max)
  // const lowestPoint = lines.find(l => l.geometry.coordinates.some(c => c[2] == min)).geometry.coordinates.find(c => c[2] == min)
  //
  // const nodes = _.flatMap(lines, l => l.geometry.coordinates)
  // const lineStringElements = _.sortBy(nodes, n => n[1])
  //
  // const init = {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //     Accept: 'application/json',
  //     Referer: 'https://map.geo.admin.ch',
  //     Origin: 'https://map.geo.admin.ch',
  //   },
  //   body: qs.stringify({ geom: JSON.stringify({
  //     type:"LineString",
  //     coordinates: lineStringElements.map(n => ([n[0], n[1]]))
  //   })})
  // }
  //
  // const response = await fetch('https://api3.geo.admin.ch/rest/services/profile.json', init)
  // const profile = await response.json()
  //
  //
  // fs.writeFileSync(`../src/profile-${NAME}.json`, JSON.stringify(profile))
  
}

run()
