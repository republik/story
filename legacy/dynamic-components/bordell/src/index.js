import React, { useEffect, useState, useRef } from 'react'
import Menu, { IMG_HEIGHT_MINI, PADDING_MINI, PADDING_MINI_MUP } from './Menu'
import { scaleLinear } from 'd3-scale'
import { useWindowSize } from './useWindowSize'
import { mediaQueries, useMediaQuery } from '@project-r/styleguide'

const scaleProgress = scaleLinear()
  .domain([200, 0])
  .range([0, 1])
  .clamp(true)

const Index = ({ sections }) => {
  const windowSize = useWindowSize()
  const isDesktop = useMediaQuery(mediaQueries.mUp)
  const [progress, setProgress] = useState(0)
  const [hideFloating, setHideFloating] = useState(true)
  const [floatingPosition, setFloatingPosition] = useState({ top: 0, bottom: 0})
  const [figures, setFigures] = useState([])
  const [article, setArticle] = useState({})

  const staticMenuRef = useRef(null)
  const floatingMenuRef = useRef(null)

  const getPosition = (ref, corner) => ref.current ? ref.current.getBoundingClientRect()[corner] : 0

  const getBounds = (el, padding = 0) => {
    const rect = el.getBoundingClientRect()
    return {
      top: rect.top + window.scrollY + padding,
      bottom: rect.bottom + window.scrollY - padding }
  }

  const intersectBounds = (bounds, padding = 0) => {
    const topBound = bounds.top - window.scrollY - padding
    const bottomBound = bounds.bottom - window.scrollY + padding
    return (floatingPosition.top >= topBound && floatingPosition.top <= bottomBound) ||
      (floatingPosition.bottom >= topBound && floatingPosition.bottom <= bottomBound)
  }

  const isInViewport = (bounds) => bounds.bottom - window.scrollY > 0

  const getFigurePositions = () => {
    const figures = document.querySelectorAll('figure')
    return Array.prototype.map.call(figures, figure => getBounds(figure))
  }

  const getArticlePosition = (padding = 0) => {
    const articles = document.querySelectorAll('article')
    const article = articles[articles.length - 1]
    return getBounds(article, padding)
  }

  const setStaticProgress = () => {
    const top = getPosition(staticMenuRef, 'top')
    const updatedProgress = scaleProgress(top)
    setProgress(updatedProgress)
  }

  const setFloatingVisibility = () => {
    const notVisible = !intersectBounds(article) ||
      isInViewport(figures[0]) ||
      (!isDesktop && figures.some(f => intersectBounds(f, IMG_HEIGHT_MINI)))
    setHideFloating(notVisible)
  }

  const onScroll = () => {
    setStaticProgress()
    setFloatingVisibility()
  }

  useEffect(() => {
    setFloatingPosition({
      top: window.innerHeight + IMG_HEIGHT_MINI + (isDesktop ? PADDING_MINI_MUP : PADDING_MINI),
      bottom: window.innerHeight
    })
    setFigures(getFigurePositions())
    setArticle(getArticlePosition(820))
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [windowSize])

  return <>
    <div ref={floatingMenuRef}><Menu sections={sections} hide={hideFloating} isDesktop={isDesktop}/></div>
    <div ref={staticMenuRef}><Menu sections={sections} isStatic={true} isDesktop={isDesktop} progress={progress}/></div>
  </>
}

export default Index
