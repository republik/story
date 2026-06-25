import React from 'react'
import Widget from '../../build'
import { css } from 'glamor'

css.global('html', { boxSizing: 'border-box' })
css.global('*, *:before, *:after', {
  boxSizing: 'inherit'
})

css.global('body', {
  fontFamily: 'Noto Serif, serif'
})

export default () => <Widget event='euTalks2020' question={1} />
