import { css } from 'glamor'
import {
  colors,
  fontFamilies,
  fontStyles,
  mediaQueries,
  linkRule,
} from '@project-r/styleguide'

const styles = {
  plainButton: css({
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    outline: 'none',
    WebkitAppearance: 'none',
  }),
  tiny: css({
    marginTop: 10,
    ...fontStyles.sansSerifRegular14,
    [mediaQueries.mUp]: {
      ...fontStyles.sansSerifRegular14,
      lineHeight: 1.4,
    },
    '& a': linkRule,
    '& strong': {
      fontFamily: fontFamilies.sansSerifMedium,
      fontWeight: 'normal',
    },
  }),
  small: css({
    marginTop: 10,
    ...fontStyles.sansSerifRegular16,
    [mediaQueries.mUp]: {
      ...fontStyles.sansSerifRegular16,
      lineHeight: 1.4,
    },
    '& a': linkRule,
    '& strong': {
      fontFamily: fontFamilies.sansSerifMedium,
      fontWeight: 'normal',
    },
  }),
  note: css({
    color: colors.lightText,
  }),
  indent: css({
    marginLeft: 20,
  }),
}
export default styles
