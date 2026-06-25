import React, { Component } from 'react'
import { Dropdown, fontStyles, fontFamilies, Interaction, Label, mediaQueries, colors } from '@project-r/styleguide'
import Chart from './Chart'
import { css } from 'glamor'
import { DOT_RADIUS } from './DotPlot'
import { COLORS } from './constants'

const PERIODS = [
  '2005',
  '2035',
  '2060',
  '2085',
]

const ANIMATION_FRAME_MS = 1000

const styles = {
  wrapper: css({
    margin: '50px 0',
  }),
  center: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90%'
  }),
  menu: css({
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 15,
    flexDirection: 'column',
    [mediaQueries.mUp]: {
      flexDirection: 'row'
    }
  }),
  title: css({
    ...fontStyles.sansSerifMedium22,
    color: colors.text,
    width: '100%',
    marginTop: 5
  }),
  label: css({
    marginTop: 5,
  }),
  dropdown: css({
    ...fontStyles.sansSerifRegular21,
    fontSize: 22,
    color: colors.text,
    fontWeight: 700,
    width: '100%',
  }),
  spacer: css({
    width: '10%'
  }),
  yearsSelector: css({
    marginTop: 6,
    [mediaQueries.mUp]: {
      marginTop: 0,
    },
    width: '100%',
  }),
  years: css({
    display: 'flex',
    width: '100%',
    marginTop: 3,
    ...fontStyles.sansSerifRegular21,
    fontSize: 22,
    color: colors.text,
    alignItems: 'flex-end',
  }),
  play: css({
    width: 20,
    height: 36,
    marginBottom: 20,
  }),
  sheet: css({
    flex: 1,
    background: '#fff',
    color: colors.disabled,
    textAlign: 'right',
    cursor: 'pointer',
    ...fontStyles.sansSerifRegular21,
    marginBottom: 20,
    ...fontStyles.sansSerifRegular21,
    fontSize: 22,
    WebkitTapHighlightColor: 'transparent'
  }),
  active: css({
    color: '#000',
    background: '#fff',
  }),
  progress: css({
    height: 1,
    background: '#b9bdc0',
    marginTop: 18,
    width: '0%',
    transition: 'width 0s',
    [mediaQueries.mUp]: {
      marginBottom: 2,
    }
  }),
  progressFull: css({
    width: '100%',
    transition: `width ${ANIMATION_FRAME_MS}ms ease-in`
  }),
  legend: css({
    ...fontStyles.sansSerifRegular14,
    lineHeight: 1.45,
    marginBottom: 20,
    textAlign: 'left',
    '& a': {
      color: '#000'
    }
  }),
  legendIcon: css({
    position: 'relative',
    top: 3
  })
}

const LegendIcon = (props) => <svg {...styles.legendIcon} width={16} height={16}>
  <circle {...props} cx={8} cy={8} r={DOT_RADIUS.small}/>
</svg>

class App extends Component {

  constructor(props) {
    super(props)
    const idx = props.profiles.findIndex(p => p.name === (props.profile))
    this.state = {
      profileIdx: idx > -1 ? idx : 0,
      periodIdx: PERIODS.findIndex(p => p === props.period) > -1 || 0,
    }
  }

  render() {

    const {profile, profiles, legend} = this.props

    return (
      <div {...styles.wrapper}>
        <div>
          <div>
            <div {...styles.menu}>
              {
                profile ? (
                  <div {...styles.title}>
                    <Interaction.H3>
                      {profiles[this.state.profileIdx].name}
                    </Interaction.H3>
                  </div>
                ) : (
                  <div {...styles.dropdown}>
                    <Dropdown.Native
                      label='Skigebiet'
                      items={profiles.map((p, i) => ({value: i, text: p.name}))}
                      value={this.state.profileIdx}
                      onChange={(item) => {
                        this.setState({profileIdx: item.target.value})
                      }}
                    />
                  </div>

                )
              }
              <div {...styles.spacer} />
              <div {...styles.yearsSelector}>
                {
                  !profile && (
                    <div {...styles.label}><Label style={{color: colors.disabled}}>Periode</Label></div>
                  )
                }
                <div {...styles.years}>
                  {
                    PERIODS.map((p, i) =>
                      <div
                        key={p}
                        {...styles.sheet}
                        {...(this.state.periodIdx === i && styles.active)}
                        onClick={e => {
                          e.preventDefault()
                          this.setState({periodIdx: i})
                        }}
                      >
                        {p}
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
            <div {...styles.center}>
              {
                <div>
                  <Chart
                    max={this.props.max && GLOBAL_MAX}
                    scenario={PERIODS[this.state.periodIdx]}
                    profile={profiles[this.state.profileIdx]}
                  />
                </div>
              }
            </div>
            { legend && <div {...styles.legend}>Quelle: <a href="https://www.the-cryosphere.net/11/517/2017/?_sm_au_=iVVvZVrkk36vN476">Marty et al. (2017)</a>. <nobr><LegendIcon stroke={'#000'}
              fill={COLORS.green}/> Naturschneedecke</nobr> über 30{'\u00A0'}cm während mindestens 100 Tagen pro Jahr vorhanden. <nobr><LegendIcon fill={COLORS.yellow}/> 40 bis
              100 Tage</nobr> lang Naturschnee über 30{'\u00A0'}cm. <nobr><LegendIcon fill={COLORS.red}/> Unter 40 Tage</nobr> lang Schneedecke über
              30{'\u00A0'}cm.<br/>Die Jahresangaben beziehen sich auf den Durchschnitt über eine Dreissigjahresperiode. Die Angabe für
              2035 bedeutet zum Beispiel, wie hoch die erwarteten Werte im Mittel über die Jahre 2020 bis 2049 sein
              werden.</div>}
          </div>
        </div>
      </div>
    )
  }

}

export default App
