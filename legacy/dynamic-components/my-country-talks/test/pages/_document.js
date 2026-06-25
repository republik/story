import Document, {
  Head,
  Main,
  NextScript
} from 'next/document'
import { renderStaticOptimized } from 'glamor/server'

export default class MyDocument extends Document {
  static async getInitialProps ({ renderPage, pathname }) {
    const page = renderPage()
    const styles = renderStaticOptimized(() => page.html)
    return {
      ...page,
      ...styles,
      env: {
        SG_DYNAMIC_COMPONENT_BASE_URLS: 'https://cdn.republik.space/'
      }
    }
  }
  constructor (props) {
    super(props)
    const { __NEXT_DATA__, env } = props
    if (env) {
      __NEXT_DATA__.env = this.props.env
    }
  }
  render () {
    const { css } = this.props

    return (
      <html lang='de'>
        <Head>
          <meta
            name='viewport'
            content='width=device-width,initial-scale=1'
          />
          <meta
            httpEquiv='X-UA-Compatible'
            content='IE=edge'
          />
          {css
            ? <style
              dangerouslySetInnerHTML={{ __html: css }}
            />
            : null}
          <meta name='author' content='Republik' />
          <meta name='referrer' content='no-referrer' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
