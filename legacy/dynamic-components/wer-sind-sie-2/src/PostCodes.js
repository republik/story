import React, { Component } from 'react'
import { geoAlbers } from 'd3-geo'
import { timer } from 'd3-timer'
import { ascending } from 'd3-array'
import { easeCubicInOut } from 'd3-ease'

import ContextBox, { ContextBoxValue } from './ContextBox'

import { fontFamilies } from '@project-r/styleguide'
import { countFormat } from './utils'

const toGeoJson = (data) => ({
  type: 'FeatureCollection',
  features: data.map((d) => ({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [d.lon, d.lat],
    },
  })),
})

const ROTATION = [-8.33, 0]

class PostCodes extends Component {
  constructor(...args) {
    super(...args)

    this.state = {}
    this.projection = geoAlbers().rotate(ROTATION)
    this.containerRef = (ref) => {
      this.container = ref
    }
    this.canvasRef = (ref) => {
      this.canvas = ref
    }
    this.measure = () => {
      const { width } = this.container.getBoundingClientRect()
      const top = 0

      let stableInnerHeight = window.innerHeight

      const iOS =
        /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
      if (iOS) {
        stableInnerHeight =
          window.orientation === 90 || window.orientation === -90
            ? window.screen.width
            : window.screen.height
      }

      const height = stableInnerHeight - top

      const { extentPadding, colorScheme } = this.props

      const extentData = this.props.extentData || this.props.data
      if (
        width !== this.state.width ||
        height !== this.state.height ||
        extentData !== this.state.extentData ||
        colorScheme !== this.state.colorScheme
      ) {
        const extent = [
          [extentPadding.left || 10, extentPadding.top || 20],
          [
            width - (extentPadding.right || 10),
            height - (extentPadding.bottom || window.innerHeight * 0.15),
          ],
        ]
        if (!this.state.extentData) {
          this.projection.fitExtent(extent, toGeoJson(extentData))
          this.draw()
        } else {
          const targetProjection = geoAlbers()
            .rotate(ROTATION)
            .fitExtent(extent, toGeoJson(extentData))

          const currentScale = this.projection.scale()
          const targetScale = targetProjection.scale()
          const currentTranslate = this.projection.translate()
          const targetTranslate = targetProjection.translate()

          const duration = 1000
          if (this.timer) {
            this.timer.stop()
          }
          this.timer = timer((elapsed) => {
            const t = easeCubicInOut(Math.min(elapsed / duration, 1))
            this.projection.scale(currentScale * (1 - t) + targetScale * t)
            this.projection.translate([
              currentTranslate[0] * (1 - t) + targetTranslate[0] * t,
              currentTranslate[1] * (1 - t) + targetTranslate[1] * t,
            ])
            this.draw()
            if (t >= 1) {
              this.timer.stop()
            }
          })
        }

        this.setState(
          {
            top,
            width,
            height,
            extentData,
            colorScheme,
          },
          () => {
            this.draw()
          }
        )
      } else {
        this.draw()
      }
    }
    this.focus = (event) => {
      const { top } = this.state
      if (top === undefined || !this.circles) {
        return
      }

      let currentEvent = event
      if (currentEvent.nativeEvent) {
        currentEvent = event.nativeEvent
      }
      while (currentEvent.sourceEvent) {
        currentEvent = currentEvent.sourceEvent
      }
      if (currentEvent.changedTouches) {
        currentEvent = currentEvent.changedTouches[0]
      }

      const focusX = currentEvent.clientX
      const focusY = currentEvent.clientY - top

      const hover = this.circles.filter(
        ({ cx, cy, r }) =>
          Math.sqrt(Math.pow(cx - focusX, 2) + Math.pow(cy - focusY, 2)) <=
          Math.max(r, 3)
      )

      this.setState(() => ({ hover }))
    }
    this.blur = () => {
      this.setState(() => ({ hover: null }))
    }
  }
  componentDidMount() {
    window.addEventListener('resize', this.measure)
    this.measure()
  }

  componentDidUpdate() {
    this.measure()
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.measure)
  }
  draw() {
    const { width, height, hover } = this.state
    const { projection } = this
    const { data, labels, labelOptions } = this.props
    if (!this.canvas || !width) {
      return
    }

    const devicePixelRatio = window.devicePixelRatio || 1
    this.canvas.width = width * devicePixelRatio
    this.canvas.height = height * devicePixelRatio

    const ctx = this.canvas.getContext('2d')

    ctx.save()
    ctx.scale(devicePixelRatio, devicePixelRatio)
    ctx.clearRect(0, 0, width, height)

    const scale = projection.scale()
    const radius = (d) => Math.max(0.5, Math.sqrt(d.count) * scale * 0.00001)

    ctx.beginPath()

    this.circles = data.map((d) => {
      const [cx, cy] = projection([d.lon, d.lat])
      const r = radius(d)

      ctx.moveTo(cx + r, cy)
      ctx.arc(cx, cy, r, 0, 2 * Math.PI)

      return {
        cx,
        cy,
        r,
        d,
      }
    })

    const defaultColor =
      window
        ?.getComputedStyle(document.body)
        ?.getPropertyValue('--color-default')
        ?.trim() || '#FFFFFF'
    const isLightMode =
      defaultColor.toUpperCase() === '#FFFFFF' ||
      defaultColor.toUpperCase() === '#FFF'
    const blue = isLightMode ? 'rgb(24, 100, 170)' : 'rgb(75, 151, 201)'
    const hoverBlue = isLightMode ? 'rgb(8, 48, 107)' : 'rgb(147, 195, 223)'

    ctx.globalAlpha = 0.1
    ctx.fillStyle = blue
    ctx.fill()
    ctx.globalAlpha = 1
    ctx.strokeStyle = blue
    ctx.stroke()

    if (hover && hover.length) {
      ctx.beginPath()
      hover.forEach(({ d }) => {
        const [cx, cy] = projection([d.lon, d.lat])
        const r = radius(d)

        ctx.moveTo(cx + r, cy)
        ctx.arc(cx, cy, r, 0, 2 * Math.PI)
      })
      ctx.globalAlpha = 0.2
      ctx.fillStyle = blue
      ctx.fill()
      ctx.globalAlpha = 1
      ctx.strokeStyle = hoverBlue
      ctx.stroke()
    }

    if (labels.length) {
      ctx.font = `12px ${fontFamilies.sansSerifRegular}`

      ctx.textAlign = labelOptions.center ? 'center' : 'start'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = blue
      ctx.strokeStyle = defaultColor

      labels.forEach((d) => {
        let [x, y] = projection([d.lon, d.lat])
        y -= 1
        if (!labelOptions.center) {
          x += radius(d)
        }
        if (labelOptions.xOffset) {
          x += labelOptions.xOffset
        }
        const text = labelOptions.postalCode ? d.postalCode : d.name

        ctx.lineWidth = 2
        ctx.strokeText(text, x, y)
        ctx.fillText(text, x, y)
      })
    }

    ctx.restore()
  }
  renderHover() {
    const { hover, width, height } = this.state

    if (!hover || !hover.length) {
      return null
    }

    const { cx, cy, r } = hover.sort((a, b) => ascending(a.cy, b.cy))[0]
    const top = cy > height / 3
    const yOffset = r + 12
    const sum = hover.reduce(
      (acc, point) => Math.max(acc + point.d.count, 1),
      0
    )
    return (
      <ContextBox
        orientation={top ? 'top' : 'below'}
        x={cx}
        y={cy + (top ? -yOffset : yOffset)}
        contextWidth={width}
      >
        <ContextBoxValue key={hover.map((d) => d.postalCode).join('-')}>
          {countFormat(sum)}{' '}
          <span style={{ fontFamily: fontFamilies.serifTitle }}>R</span>
        </ContextBoxValue>
      </ContextBox>
    )
  }
  render() {
    const { width, height } = this.state
    const { labelOptions } = this.props

    return (
      <div
        ref={this.containerRef}
        style={{
          position: 'relative',
          transition: 'opacity 0.3s, min-height 0s 0.5s',
        }}
      >
        <canvas
          ref={this.canvasRef}
          onTouchStart={this.focus}
          onTouchMove={this.focus}
          onTouchEnd={this.blur}
          onMouseEnter={this.focus}
          onMouseMove={this.focus}
          onMouseLeave={this.blur}
          style={{
            width,
            height,
            userSelect: 'none',
            maxHeight: labelOptions.fade ? 0 : 10000,
            opacity: labelOptions.fade ? 0 : 1,
            transition: '1s all',
          }}
        />
        {!labelOptions.fade && this.renderHover()}
      </div>
    )
  }
}

export default PostCodes
