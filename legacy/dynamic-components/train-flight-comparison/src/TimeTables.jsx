import React from 'react'
import { css } from 'glamor'
import { fontStyles } from '@project-r/styleguide'

const NUMBER_HEIGHT = '30'

const styles = {
  numberWrapper: css({
    display: 'flex',
    position: 'relative',
    padding: '5px 0',
    flexWrap: 'wrap',
  }),
  numberBackground: css({
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    width: '20px',
    height: NUMBER_HEIGHT,
    padding: '4px',
    margin: '2px',
    color: 'white',
    ...fontStyles.sansSerifMedium18,
    // boxShadow: '1px 0.5px 0.5px #3E4450',
    borderRadius: '1px',
  }),
  numberBackgroundTop: css({
    position: 'absolute',
    height: NUMBER_HEIGHT / 2,
    backgroundColor: '#2b303a',
    borderTopLeftRadius: '1px',
    borderTopRightRadius: '1px',
    width: '20px',
    top: 0,
    borderBottom: 'solid 1px #000',
  }),
  numberBackgroundBottom: css({
    position: 'absolute',
    height: NUMBER_HEIGHT / 2,
    backgroundColor: '#393e48',
    borderBottomLeftRadius: '1px',
    borderBottomRightRadius: '1px',
    width: '20px',
    bottom: 0,
  }),
  number: css({
    zIndex: '2',
    alignSelf: 'center',
  }),
}

export const TimeTableNumbers = (props) => {
  const chars =
    props.align === 'right'
      ? props.string.padStart(props.padding || 8, ' ')
      : props.string.padEnd(props.padding || 8, ' ')

  return (
    <div {...styles.numberWrapper}>
      {chars.split('').map((d, i) => (
        <div key={i} {...styles.numberBackground}>
          <div {...styles.numberBackgroundTop} />
          <div {...styles.numberBackgroundBottom} />
          <div {...styles.number} style={{ color: props.color }}>
            {d}
          </div>
        </div>
      ))}
    </div>
  )
}

export const TimeTableTrees = (props) => {
  const treeAmount = Math.round(props.treeAmount * 0.08)
  const maxTreeAmount = Math.round(props.maxTreeAmount * 0.08)

  const padRight = (fields, trees) => [
    ...Array(fields).fill(),
    ...Array(trees).fill('tree'),
  ]
  const padLeft = (fields, trees) => [
    ...Array(trees).fill('tree'),
    ...Array(fields).fill(),
  ]

  const belowArray = (fields) => ['below', 'tree', ...Array(fields - 2).fill()]

  const fullLines = Math.floor(treeAmount / 8)
  const fullLinesArray = [...Array(fullLines * 8).fill('tree')]

  const restAmount = treeAmount - fullLines * 8

  const numberFields = Math.ceil(maxTreeAmount / 8) * 8

  const fields =
    props.align === 'right'
      ? fullLinesArray.concat(padRight(8 - restAmount, restAmount))
      : treeAmount === 0
      ? belowArray(numberFields)
      : padLeft(numberFields - treeAmount, treeAmount)

  return (
    <div {...styles.numberWrapper}>
      {fields.map((d, i) => (
        <div key={i} {...styles.numberBackground}>
          <div {...styles.numberBackgroundTop} />
          <div {...styles.numberBackgroundBottom} />
          <div {...styles.number}>
            {d === 'tree' ? (
              <svg
                width='100%'
                viewBox='0 0 50 57'
                version='1.1'
                xmlns='http://www.w3.org/2000/svg'
              >
                <title>tree</title>
                <g
                  id='Page-1'
                  stroke='none'
                  strokeWidth='1'
                  fill='#FFFFFF'
                  fillRule='evenodd'
                >
                  <g id='tree' fill='#FFFFFF' fillRule='nonzero'>
                    <path
                      d='M48.4418605,16.8662791 C48.4418605,12.5406977 45.1627907,8.98837209 40.9534884,8.55232558 C39.7732558,5.36627907 36.7151163,3.09302326 33.122093,3.09302326 C31.5465116,3.09302326 30.0813953,3.53488372 28.8255814,4.29069767 C27.3895349,1.73255814 24.6569767,0 21.5174419,0 C17.3546512,0 13.9127907,3.04651163 13.2732558,7.02906977 C12.9360465,6.98837209 12.5872093,6.95930233 12.2383721,6.95930233 C7.62209302,6.95930233 3.87790698,10.7034884 3.87790698,15.3197674 C3.87790698,15.5465116 3.89534884,15.7674419 3.9127907,15.9883721 C1.56976744,17.4709302 0.011627907,20.0813953 0.011627907,23.0523256 C0.011627907,25.6802326 1.22674419,28.0290698 3.12790698,29.5581395 C3.12209302,29.7093023 3.10465116,29.8604651 3.10465116,30.0116279 C3.10465116,34.627907 6.84883721,38.372093 11.4651163,38.372093 C12.8488372,38.372093 14.1511628,38.0290698 15.3023256,37.4360465 C16.8953488,38.5813953 19.1744186,40.0116279 20.2790698,39.7267442 C20.2790698,39.7267442 20.6918605,46.0930233 20.5988372,47.7034884 C20.4302326,50.7790698 19.505814,54.2034884 18.8604651,56.9709302 L28.9127907,56.9709302 C28.9127907,56.9709302 27.4302326,50.7965116 27.3662791,48.7325581 C27.3023256,46.6686047 28.0116279,42.872093 28.0116279,42.872093 L31.5,39.2674419 C32.8430233,40.1860465 34.4651163,40.7093023 36.2151163,40.7093023 C40.5406977,40.7093023 44.0930233,37.4186047 44.5290698,33.2151163 C47.7151163,32.0348837 49.9883721,28.9709302 49.9883721,25.372093 C49.9883721,23.25 49.1918605,21.3139535 47.8895349,19.8430233 C48.2383721,18.9186047 48.4418605,17.9186047 48.4418605,16.8662791 Z M17.2325581,36.0581395 C17.9011628,35.4186047 18.4651163,34.6686047 18.8953488,33.8430233 L20.5348837,37.2848837 C20.5348837,37.2790698 19.6453488,37.6744186 17.2325581,36.0581395 Z M23.372093,38.1802326 C22.5232558,38.3372093 21.0755814,35.7209302 20.0465116,33.5930233 C21.1860465,34.1744186 22.4709302,34.505814 23.8372093,34.505814 C24.1860465,34.505814 24.5348837,34.4767442 24.872093,34.4360465 C24.6104651,36.1395349 24.1453488,38.0406977 23.372093,38.1802326 Z M26.9825581,39.8546512 C25.0174419,40.4011628 26.1918605,36.3313953 26.755814,33.9767442 C27.1627907,33.8255814 27.5581395,33.6453488 27.9302326,33.4360465 C28.1569767,35.1511628 28.9011628,36.7034884 30.005814,37.9302326 C29.0523256,38.7790698 27.9476744,39.5872093 26.9825581,39.8546512 Z'
                      id='Shape'
                    ></path>
                  </g>
                </g>
              </svg>
            ) : d === 'below' ? (
              '<'
            ) : (
              ''
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
