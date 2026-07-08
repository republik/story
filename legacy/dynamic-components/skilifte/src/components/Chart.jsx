import React, { Component } from 'react'
import Contour from './Contour'
import DotPlot, { DOT_RADIUS } from './DotPlot'
import { range } from 'd3-array'
import random from 'lodash/random'

const MAX_WIDTH = 960
const isMobile = () => typeof window !== 'undefined'
  ? window.innerWidth < MAX_WIDTH + 30
  : true

const SnowFall = ({width = 100, height = 100}) =>
  <g>
    {
      range(0, 60).map(d => {
        let x = random(DOT_RADIUS.small, width - DOT_RADIUS.small)
        let y = random(0, height)
        return <circle cx={x} cy={-y} r={DOT_RADIUS.small} fill={'#fff'} opacity={random(0.3, 0.8)}>
          <animate attributeName="cy" from={-y} to={height} dur={random(5, 12)} repeatCount='indefinite'/>
        </circle>
      })
    }
  </g>

class Chart extends Component {

  constructor(props) {
    super(props)
    this.state = {
      width: 375,
    }
    this.measure = () => {
      if (!isMobile()) {
        this.setState({mobile: false, width: MAX_WIDTH})
      } else {
        this.setState({mobile: true, width: window.innerWidth - 30})
      }
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.measure)
    this.measure()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.measure)
  }

  render() {

    const width = this.state.width,
      height = this.state.mobile ? 370 : 340

    const letItSnow = false

    return (
      <svg width={width} height={height}>
        <Contour
          max={this.props.max}
          profile={this.props.profile}
          width={width} height={height}
          inline
          letItSnow={letItSnow}
        />
        {
          letItSnow &&
          <SnowFall width={width} height={height}/>
        }
        <DotPlot width={width} height={height}
                 max={this.props.max}
                 scenario={this.props.scenario}
                 profile={this.props.profile}
                 letItSnow={letItSnow}
        />
      </svg>
    )
  }

}

export default Chart