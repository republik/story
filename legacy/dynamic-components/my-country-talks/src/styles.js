import { css } from 'glamor'

// https://google-webfonts-helper.herokuapp.com/

export const fontFaces = `
/* noto-sans-regular - latin */
@font-face {
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 400;
  src: url('https://cdn.repub.ch/s3/republik-assets/dynamic-components/my-country-talks/fonts/noto-sans-v11-latin-regular.eot'); /* IE9 Compat Modes */
  src: local('Noto Sans'), local('NotoSans'),
       url('https://cdn.repub.ch/s3/republik-assets/dynamic-components/my-country-talks/fonts/noto-sans-v11-latin-regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('https://cdn.repub.ch/s3/republik-assets/dynamic-components/my-country-talks/fonts/noto-sans-v11-latin-regular.woff2') format('woff2'), /* Super Modern Browsers */
       url('https://cdn.repub.ch/s3/republik-assets/dynamic-components/my-country-talks/fonts/noto-sans-v11-latin-regular.woff') format('woff'), /* Modern Browsers */
       url('https://cdn.repub.ch/s3/republik-assets/dynamic-components/my-country-talks/fonts/noto-sans-v11-latin-regular.ttf') format('truetype'), /* Safari, Android, iOS */
       url('https://cdn.repub.ch/s3/republik-assets/dynamic-components/my-country-talks/fonts/noto-sans-v11-latin-regular.svg#NotoSans') format('svg'); /* Legacy iOS */
}
/* noto-sans-700 - latin */
@font-face {
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 700;
  src: url('https://cdn.repub.ch/s3/republik-assets/dynamic-components/my-country-talks/fonts/noto-sans-v11-latin-700.eot'); /* IE9 Compat Modes */
  src: local('Noto Sans Bold'), local('NotoSans-Bold'),
       url('https://cdn.repub.ch/s3/republik-assets/dynamic-components/my-country-talks/fonts/noto-sans-v11-latin-700.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('https://cdn.repub.ch/s3/republik-assets/dynamic-components/my-country-talks/fonts/noto-sans-v11-latin-700.woff2') format('woff2'), /* Super Modern Browsers */
       url('https://cdn.repub.ch/s3/republik-assets/dynamic-components/my-country-talks/fonts/noto-sans-v11-latin-700.woff') format('woff'), /* Modern Browsers */
       url('https://cdn.repub.ch/s3/republik-assets/dynamic-components/my-country-talks/fonts/noto-sans-v11-latin-700.ttf') format('truetype'), /* Safari, Android, iOS */
       url('https://cdn.repub.ch/s3/republik-assets/dynamic-components/my-country-talks/fonts/noto-sans-v11-latin-700.svg#NotoSans') format('svg'); /* Legacy iOS */
}
`

export default {
  a: css({
    color: '#000',
    '&:hover': { textDecoration: 'none' },
    '&:active': { textDecoration: 'none' }
  }),
  container: css({
    overflow: 'hidden',
    padding: 15,
    backgroundColor: '#fff'
  }),
  containerInner: css({
    margin: '0 -19px', // 15 + 4 inner margin
  }),
  iframe: css({
    borderWidth: 0,
    margin: 0,
    height: '300px',
    width: '100%'
  }),
  embed: css({
    boxSizing: 'border-box',
    position: 'relative',
    margin: '0 auto',
    textAlign: 'center',
    backgroundColor: '#fff',
    maxWidth: '460px',
    paddingTop: '20px',
    paddingBottom: '10px',
    '@media screen and (min-width:40.625em)': {
      maxWidth: '700px',
      paddingTop: '30px'
    },
    fontFamily: 'Noto Sans, sans-serif'
  }),
  embedInner: css({
    position: 'relative',
    padding: '35px 16px',
    border: '1px solid',
    margin: '0 4px',
    '@media screen and (min-width:40.625em)': {
      padding: '45px 25px'
    }
  }),
  embedSection: css({
    position: 'relative',
    opacity: 1
  }),
  embedTerms: css({
    fontSize: '14px',
    lineHeight: '21px',
    maxWidth: '460px',
    textAlign: 'left',
    margin: '50px auto 1em'
  }),
  questionTextLarger: css({
    fontSize: '18px',
    lineHeight: '27px',
    display: 'block',
    width: '100%',
    marginBottom: '1em',
    marginTop: '0',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '600px',
    fontWeight: 700
  }),
  questionRadios: css({
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
    paddingLeft: '45px',
    paddingRight: '45px',
    paddingBottom: '5px',
    overflow: 'hidden',
    '& label': {
      '&:first-child': {
        marginLeft: 5  // imitate invisible input radio in original
      },
      borderRadius: '3px',
      backgroundColor: '#000000 !important',
      color: '#ffffff !important',
      position: 'relative',
      userSelect: 'none',
      zIndex: 2,
      fontSize: '18px',
      lineHeight: '27px',
      width: 'calc(50% - 8px)',
      padding: '.7em .9em',
      cursor: 'default',
      transition: 'all .1s ease-in-out',
      opacity: 0.25,
      transform: 'scale(1)'
    }
  }),
  submitButton: css({
    fontSize: '18px',
    lineHeight: '27px',
    padding: '.7em 2.5em',
    color: '#fff',
    background: '#3CAD00',
    transition: 'all .1s ease-in-out',
    border: 'none',
    borderRadius: '3px',
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'Noto Sans, sans-serif',
    transform: 'scale(1)',
    textDecoration: 'none',
    transform: 'scale(1)',
    transition: 'transform .2s',
    '&.highlight': { transform: 'scale(1.05)' },
    '&:focus': {
      outline: 'none'
    },
    '&:disabled': {
      opacity: 0.5,
      cursor: 'default'
    },
    '&:hover': {
      color: '#fff',
      background: '#4B6359'
    }
  }),
  textColor: css({
    color: '#000000 !important'
  }),
  borderColor: css({
    borderColor: 'rgba(0, 0, 0, 0.15) !important'
  }),
  subtleText: css({
    color: 'rgba(0, 0, 0, 0.5) !important'
  }),
  eventLogo: css({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    textAlign: 'center',
    marginTop: '-19px'
  }),
  eventLogoOutlineFill: css({
    stroke: '#292929 !important'
  }),
  eventLogoBackgroundFill: css({
    fill: '#dde1e4 !important'
  }),
  eventLogoSvg: css({
    display: 'block'
  }),
  eventLogoInner: css({
    display: 'inline-block',
    backgroundColor: '#fff',
    paddingLeft: '.25em',
    paddingRight: '.25em',
    width: '45px',
    height: '41.44px'
  })
}
