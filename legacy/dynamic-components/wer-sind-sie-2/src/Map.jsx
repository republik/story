import React, { Component, useEffect, useMemo, useState } from 'react'
import { descending } from 'd3-array'
import { css } from 'glamor'

import PostCodes from './PostCodes'

import {
  Editorial,
  Loader,
  mediaQueries,
  RawHtml,
  useColorContext,
  Autocomplete,
} from '@project-r/styleguide'
import CityDist from './CityDist'
import {
  capitalise,
  countFormat,
  groupBy,
  HEADER_HEIGHT,
  HEADER_HEIGHT_MOBILE,
  makeNameList,
  translate,
} from './utils'

const countryWithArticle = {
  USA: 'den USA',
  'Königreich Belgien': 'dem Königreich Belgien',
  Niederlande: 'den Niederlanden',
  'Volksrepublik China': 'der Volksrepublik China',
  'Grossbritannien und Nordirland': 'Grossbritannien',
}

const styles = {
  mapStory: css({
    position: 'relative',
  }),
  mapFixed: css({
    position: 'fixed',
    left: 0,
    right: 0,
  }),
  scrollBlock: css({
    padding: 15,
    marginLeft: -15,
    marginRight: -15,
    position: 'relative',
  }),
  spacer: css({
    pointerEvents: 'none',
    height: '75vh',
    '@media (max-height: 450px)': {
      height: '65vh',
    },
    '@media (max-height: 670px)': {
      height: '70vh',
    },
  }),
  smallSpacer: css({
    pointerEvents: 'none',
    height: '55vh',
    '@media (max-height: 450px)': {
      height: '40vh',
    },
    '@media (max-height: 670px)': {
      height: '45vh',
    },
  }),
}

const globalState = {
  instances: [],
}

const Spacer = ({ small }) => (
  <div {...(small ? styles.smallSpacer : styles.spacer)} />
)

class Story extends Component {
  constructor(...args) {
    super(...args)

    this.state = {}
    this.blocks = {}

    this.refKeys = 'start zh cities plz dach end'.split(' ')

    this.setInstanceState = (state) => {
      this.setState(state)
    }

    this.refKeys.map((key) => {
      this.blocks[key] = {
        key,
        setRef: (ref) => {
          this.blocks[key].ref = ref
        },
      }
    })

    this.onScroll = () => {
      const y = window.pageYOffset
      const cx = y + window.innerHeight / 2
      const calcDistance = (block) =>
        Math.min(Math.abs(block.y0 - cx), Math.abs(block.y1 - cx))
      const activeBlock = this.refKeys.reduce((active, key) => {
        if (
          calcDistance(this.blocks[key]) < calcDistance(this.blocks[active])
        ) {
          return key
        }
        return active
      })

      if (this.state.activeBlock !== activeBlock) {
        globalState.instances.forEach((setter) => {
          setter({
            activeBlock,
          })
        })
      }
    }
    this.measure = () => {
      const y = window.pageYOffset
      const width = window.innerWidth
      const windowHeight = window.innerHeight
      if (this.props.scrollBlocks) {
        this.refKeys.forEach((key) => {
          const block = this.blocks[key]
          const { top, height } = block.ref.getBoundingClientRect()
          block.y0 = y + top + (key === 'end' ? windowHeight / 3 : 0)
          block.y1 = block.y0 + (key === 'end' ? windowHeight / 3 : height)
        })
      }
      if (
        this.state.width !== width ||
        this.state.windowHeight !== windowHeight
      ) {
        this.setState(() => ({
          width,
          windowHeight,
        }))
      }
      if (this.props.scrollBlocks) this.onScroll()
    }
  }
  componentDidMount() {
    if (this.props.scrollBlocks) {
      window.addEventListener('scroll', this.onScroll)
    }
    window.addEventListener('resize', this.measure)
    this.measure()
    globalState.instances.push(this.setInstanceState)
  }
  componentDidUpdate() {
    this.measure()
  }
  componentWillUnmount() {
    if (this.props.scrollBlocks) {
      window.removeEventListener('scroll', this.onScroll)
    }
    window.removeEventListener('resize', this.measure)
    globalState.instances = globalState.instances.filter(
      (setter) => setter !== this.setInstanceState
    )
  }
  render() {
    const {
      countryIndex,
      allPostalCodes,
      scrollBlocks,
      cityBuckets,
      citiesChartProps,
      colorScheme,
      translations,
      isMobile,
      me,
    } = this.props
    const { windowHeight } = this.state

    const { filter, filterValue, activeBlock } = this.state

    const headerHeight = isMobile ? HEADER_HEIGHT_MOBILE : HEADER_HEIGHT

    let filteredPlz = []
    let mapLabels = []
    let mapLabelOptions = {
      center: false,
    }
    let mapExtend = countryIndex.Schweiz.postalCodes
    let mapExtendPadding = {
      left: 10,
      right: 10,
      top: headerHeight,
    }
    switch (activeBlock) {
      case 'zh':
        mapLabelOptions.center = true
        mapLabelOptions.postalCode = true
        mapExtendPadding.top += 50
        mapExtendPadding.left += isMobile ? 80 : 0
        mapExtendPadding.right += isMobile ? 80 : 0
        mapExtendPadding.bottom = windowHeight ? windowHeight * 0.3 : undefined
        mapExtend = countryIndex.Schweiz.postalCodes.filter(
          (d) => d.postalCode && d.postalCode.startsWith('80')
        )
        mapLabels = mapExtend
        break
      case 'cities':
        mapLabels = ['2502', '3006', '4058', '8400', '6006', '8032', '4600']

        mapLabels = [
          {
            name: 'Schweiz',
            labels: [
              ['2502', 'Biel'],
              ['3006', 'Bern'],
              ['4058', 'Basel'],
              ['8400', 'Winterthur'],
              ['6006', 'Luzern'],
              ['8032', 'Zürich'],
              ['4600', 'Olten'],
            ],
          },
        ].reduce((labels, country) => {
          const data = countryIndex[country.name]
          if (data && data.postalCodes) {
            country.labels.forEach(([code, label]) => {
              const d = data.postalCodes.find((p) => p.postalCode === code)
              if (d) {
                labels.push({
                  ...d,
                  name: label,
                })
              }
            })
          }
          return labels
        }, [])
        mapLabelOptions.xOffset = 2
        mapExtendPadding.top = isMobile ? 0 : mapExtendPadding.top
        mapExtendPadding.left = isMobile ? 20 : 50
        mapExtendPadding.right = isMobile ? 45 : 70
        mapExtend = countryIndex.Schweiz.postalCodes.filter(
          (d) =>
            d.postalCode &&
            (d.postalCode.startsWith('30') ||
              d.postalCode.startsWith('40') ||
              d.postalCode.startsWith('84') ||
              d.postalCode.startsWith('60'))
        )
        break
      case 'plz':
        if (!filter || !filter.trim()) {
          break
        }
        filteredPlz = countryIndex.Schweiz.postalCodes
          .filter(
            ({ postalCode }) => postalCode && postalCode.startsWith(filter)
          )
          .sort((a, b) => descending(a.count, b.count))
        if (filteredPlz.length) {
          mapLabelOptions.center = true
          mapLabelOptions.postalCode = true
          const firstMatch = filteredPlz[0]
          const countryName = firstMatch.country
          mapExtend = filteredPlz.filter((d) => d.country === countryName)
          mapLabels = mapExtend.slice(0, 10)
          mapExtend = [
            {
              ...firstMatch,
              lon: firstMatch.lon - 0.1,
              lat: firstMatch.lat - 0.1,
            },
            ...mapExtend,
            {
              ...firstMatch,
              lon: firstMatch.lon + 0.1,
              lat: firstMatch.lat + 0.1,
            },
          ]
          mapExtendPadding.left = 100
          mapExtendPadding.right = 100
        }
        break
      case 'dach':
        mapLabels = [
          {
            name: 'Deutschland',
            labels: [
              ['10435', 'Berlin'],
              ['80339', 'München'],
              ['60594', 'Frankfurt am Main'],
              ['20359', 'Hamburg'],
            ],
          },
          {
            name: 'Österreich',
            labels: [['1020', 'Wien']],
          },
          {
            name: 'Königreich Belgien',
            labels: [['1000', 'Brüssel']],
          },
        ].reduce((labels, country) => {
          const data = countryIndex[country.name]
          if (data && data.postalCodes) {
            country.labels.forEach(([code, label]) => {
              const d = data.postalCodes.find((p) => p.postalCode === code)
              if (d) {
                labels.push({
                  ...d,
                  name: label,
                })
              }
            })
          }
          return labels
        }, [])
        mapLabelOptions.xOffset = 5
        mapExtendPadding.top = isMobile ? 0 : mapExtendPadding.top
        mapExtendPadding.left += isMobile ? 50 : 0
        mapExtendPadding.right += isMobile ? 50 : 0
        mapExtend = []
          .concat(countryIndex.Deutschland.postalCodes)
          .concat(countryIndex['Österreich'].postalCodes)
          .concat(countryIndex.Schweiz.postalCodes)
        break
      case 'end':
        mapLabelOptions.fade = true
        break
    }
    if (mapLabels.length && typeof mapLabels[0] === 'string') {
      mapLabels = allPostalCodes.filter(
        (d) => mapLabels.indexOf(d.postalCode) !== -1
      )
    }

    const defaultColor =
      window
        ?.getComputedStyle(document.body)
        ?.getPropertyValue('--color-default')
        ?.trim() || '#FFFFFF'
    return !scrollBlocks ? (
      <>
        {!me && (
          <style
            dangerouslySetInnerHTML={{
              __html: `
            article > div:first-of-type { margin-bottom: 0; }
            article > div:nth-of-type(2) > div > div.center { padding-top: 0; }
            `,
            }}
          />
        )}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            noscript + div { position: relative; z-index: 1; }
            .title-block, article > div:first-child .center { position: relative; } 
            .title-block h1, .title-block h2, .title-block p { text-shadow: -1px 0 ${defaultColor}, 0 1px ${defaultColor}, 1px 0 ${defaultColor}, 0 -1px ${defaultColor}; }
            `,
          }}
        />
        <Spacer small />
        <div {...styles.mapFixed} style={{ top: 0 }}>
          {colorScheme && (
            <PostCodes
              labels={mapLabels}
              labelOptions={mapLabelOptions}
              extentData={mapExtend}
              extentPadding={mapExtendPadding}
              data={allPostalCodes}
              colorScheme={colorScheme}
            />
          )}
        </div>
      </>
    ) : (
      <>
        {scrollBlocks.map((block) => (
          <div key={block.active}>
            <div
              {...styles.scrollBlock}
              {...colorScheme.set('backgroundColor', 'scrollBlockBg')}
              ref={this.blocks[block.active].setRef}
            >
              {block.title && (
                <Editorial.Subhead>{block.title}</Editorial.Subhead>
              )}
              {block.paragraphs.map((p) => (
                <RawHtml
                  key={p}
                  type={Editorial.P}
                  black
                  dangerouslySetInnerHTML={{
                    __html: translate(translations, p),
                  }}
                />
              ))}
              {block.active === 'cities' && (
                <CityDist cityBuckets={cityBuckets} {...citiesChartProps} />
              )}
              {block.active === 'plz' && (
                <Autocomplete
                  label='Postleitzahl (CH)'
                  isOpen={filteredPlz.length}
                  filter={filter}
                  value={filterValue}
                  items={filteredPlz.map((d) => ({
                    value: d.postalCode,
                    text: d.postalCode,
                    element: (
                      <span>
                        {d.postalCode}:{' '}
                        <b>
                          {countFormat(Math.max(d.count, 1))}{' '}
                          {d.count >= 2 ? 'Verlegerinnen' : 'Verleger'}
                        </b>
                      </span>
                    ),
                  }))}
                  onChange={(value) => this.setState({ filterValue: value })}
                  onFilterChange={(filter) => {
                    globalState.instances.forEach((setter) => {
                      setter({
                        filter,
                      })
                    })
                  }}
                />
              )}
            </div>
            <Spacer />
          </div>
        ))}
        <div ref={this.blocks.end.setRef} />
      </>
    )
  }
}

const MapWithStats = ({
  me,
  membershipStats,
  scrollBlocks,
  citiesChartProps,
}) => {
  const [colorScheme] = useColorContext()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const measure = () => {
      setIsMobile(window.innerWidth < mediaQueries.mBreakPoint)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => {
      window.removeEventListener('resize', measure)
    }
  }, [])

  const allPostalCodes = useMemo(() => {
    const geoBuckets = membershipStats.geo?.buckets || []
    return geoBuckets
      .map((d) => ({
        ...d,
        ...d.buckets[d.buckets.length - 1],
      }))
      .sort((a, b) => descending(a.count, b.count))
  }, [membershipStats])

  const countryIndex = useMemo(
    () =>
      allPostalCodes.reduce((index, d) => {
        if (!d.postalCode) return index
        index[d.country] = {
          postalCodes: (index[d.country]?.postalCodes || []).concat([d]),
        }
        return index
      }, {}),
    [allPostalCodes]
  )

  const cityBuckets = useMemo(() => membershipStats.geoCities?.buckets || [], [
    membershipStats,
  ])

  const translations = useMemo(() => {
    const latestCities = cityBuckets.map((city) => ({
      key: city.key,
      count: city.buckets[city.buckets.length - 1].count,
    }))

    const topCities = latestCities
      .filter((city) => !city.key.startsWith('other'))
      .sort((a, b) => descending(a.count, b.count))

    const topCountries = Object.entries(countryIndex)
      .map((d) => ({
        count: d[1].postalCodes.reduce((acc, pc) => acc + pc.count, 0),
        country: countryWithArticle[d[0]] || d[0],
      }))
      .concat(
        allPostalCodes
          .filter((d) => !countryIndex[d.country])
          .map((d) => ({
            count: d.buckets[d.buckets.length - 1].count,
            country: countryWithArticle[d.country] || d.country,
          }))
      )
      .filter((d) => d.count > 0)
      .sort((a, b) => descending(a.count, b.count))

    const topCountriesByAbo = Object.entries(groupBy(topCountries, 'count'))
      .map((d) => {
        return {
          count: Number(d[0]),
          text:
            d[1].length > 1
              ? `${makeNameList(d[1].map((c) => c.country))} mit je ${d[0]}`
              : `${d[1][0].country} mit ${d[0]}`,
        }
      })
      .sort((a, b) => descending(a.count, b.count))

    const formatCity = (city) =>
      `${capitalise(city.key)} (${countFormat(city.count)})`

    return {
      aboCount: countFormat(membershipStats.count),
      addressCount: countFormat(
        latestCities.reduce((acc, city) => acc + city.count, 0)
      ),
      topCity: formatCity(topCities[0]),
      nextCities: makeNameList(topCities.slice(1).map(formatCity)),
      countrysideAboCount: countFormat(
        latestCities.find((city) => city.key === 'otherCHAddress').count
      ),
      topAbroad: topCountries[1].country,
      topAbroadAboCount: countFormat(topCountries[1].count),
      abroadTwoOrMore: makeNameList(
        topCountriesByAbo
          .slice(2)
          .filter((abos) => abos.count > 1)
          .map((abos) => abos.text)
      ),
      abroadSingles: makeNameList(
        topCountries
          .filter((country) => country.count === 1)
          .map((country) => country.country)
      ),
    }
  }, [cityBuckets, countryIndex, allPostalCodes, membershipStats])

  return (
    <Story
      translations={translations}
      countryIndex={countryIndex}
      allPostalCodes={allPostalCodes}
      scrollBlocks={scrollBlocks}
      cityBuckets={cityBuckets}
      citiesChartProps={citiesChartProps}
      colorScheme={colorScheme}
      isMobile={isMobile}
      me={me}
    />
  )
}

const Map = ({ data, scrollBlocks, citiesChartProps }) => {
  const { loading, error, membershipStats, me } = data
  return loading || error || !membershipStats ? (
    <Loader loading={loading} error={error} />
  ) : (
    <MapWithStats
      me={me}
      membershipStats={membershipStats}
      scrollBlocks={scrollBlocks}
      citiesChartProps={citiesChartProps}
    />
  )
}

export default Map
