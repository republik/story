import React from 'react'
import { createFormatter } from '@project-r/styleguide'
import defaultTranslations from './translations.json'

export const t = createFormatter(defaultTranslations.data)

const withTranslations = (Component) => (props) => (
  <Component {...props} t={t} />
)

export default withTranslations
