import React from 'react'
import { Editorial, useColorContext, mediaQueries } from '@project-r/styleguide'
import { css } from 'glamor'

// const ASSETS_BASE_URL = 'https://cdn.repub.ch/s3/republik-assets/dynamic-components/REPOSLUG/assets'

const ChoiceAnswerOption = ({ option, checked, verticalAlign }) => {
  const [colorScheme] = useColorContext()
  return (
    <span
      style={{
        marginRight: '2em',
        display: verticalAlign ? 'block' : 'inline-flex',
        paddingBottom: verticalAlign ? '4px' : 0,
        alignItems: 'center',
      }}
      {...colorScheme.set('color', checked ? 'text' : 'textSoft')}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        height='1em'
        viewBox='0 96 960 960'
        width='1em'
        fill='currentColor'
        style={{ verticalAlign: 'middle', marginRight: '7px' }}
      >
        {checked ? (
          <path d='M480 762q78 0 132-54t54-132q0-78-54-132t-132-54q-78 0-132 54t-54 132q0 78 54 132t132 54Zm0 214q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-83 31.5-156t86-127Q252 239 325 207.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 82-31.5 155T763 858.5q-54 54.5-127 86T480 976Zm0-60q142 0 241-99.5T820 576q0-142-99-241t-241-99q-141 0-240.5 99T140 576q0 141 99.5 240.5T480 916Zm0-340Z'></path>
        ) : (
          <path d='M480 976q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-83 31.5-156t86-127Q252 239 325 207.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 82-31.5 155T763 858.5q-54 54.5-127 86T480 976Zm0-60q142 0 241-99.5T820 576q0-142-99-241t-241-99q-141 0-240.5 99T140 576q0 141 99.5 240.5T480 916Zm0-340Z'></path>
        )}
      </svg>
      {option}
    </span>
  )
}

const Index = ({ options, answer, verticalAlign }) => {
  return (
    <div {...styles.container}>
      <Editorial.P>
        {options.map((option, i) => (
          <ChoiceAnswerOption
            key={i}
            option={option}
            checked={answer === option}
            verticalAlign={verticalAlign}
          />
        ))}
      </Editorial.P>
    </div>
  )
}

export default Index

const styles = {
  container: css({
    marginTop: '-22px',
    [mediaQueries.mUp]: {
      marginTop: '-30px',
    },
  }),
}
