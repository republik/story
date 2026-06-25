import App, { Container } from 'next/app'
import React from 'react'
import { ApolloProvider } from 'react-apollo'

import withApolloClient from '../lib/apollo/withApolloClient'
import { css } from 'glamor'
import 'glamor/reset'
import { fontFamilies } from '@project-r/styleguide'

css.global('html', { boxSizing: 'border-box' })
css.global('*, *:before, *:after', { boxSizing: 'inherit' })

css.global('body', {
  width: '100%',
  fontFamily: fontFamilies.sansSerifRegular
})

class WebApp extends App {
  render () {
    const { Component, pageProps, apolloClient, serverContext } = this.props
    return <Container>
      <ApolloProvider client={apolloClient}>
        <Component serverContext={serverContext} {...pageProps} />
      </ApolloProvider>
    </Container>
  }
}

export default withApolloClient(WebApp)
