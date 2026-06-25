global.fetch = require('node-fetch-polyfill')
const { csv } = require('d3-fetch')
const { autoType } = require('d3-dsv')
const { omit } = require('lodash')
const fs = require('fs')

const getUrl = gid =>
  `https://docs.google.com/spreadsheets/d/e/2PACX-1vQuRNYEzZh3qI3k_yhDbvv_AnpKqTdCmnAkXMpuC11avC6yUwf4TW8EbgCdUi3WWjxbFrSwDB8imCAw/pub?gid=${gid}&single=true&output=csv`
const profilesUrl = getUrl(`1562561026`)

async function fetchData() {
  let profiles = await csv(profilesUrl, autoType)
  const actions = await Promise.all(
    profiles.filter(p => p.gid).map(p => csv(getUrl(p.gid), autoType))
  )
  const res = profiles.map((p, i) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    outro: p.outro,
    target: p.target,
    analysis: p.analysis,
    budget: omit(p, ['id', 'name', 'description', 'gid', 'analysis', 'message', 'outro', 'type', 'target']),
    actions: actions[i]
  }))

  fs.writeFile('../profiles.json', JSON.stringify(res, null, 2), err => {
    if (err) throw err
    console.log('Profiles saved')
  })
}
fetchData()
