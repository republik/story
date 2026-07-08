import * as React from 'react';
import { storiesOf } from '@storybook/react';
import App from './App';
import { Center, ColorContext, colors } from '@project-r/styleguide';
import { Reason } from './types';

import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';

const apolloClient = new ApolloClient({
  link: createHttpLink({
    uri: 'http://127.0.0.1:5000/graphql',
    fetchOptions: { credentials: 'include' }
  }),
  cache: new InMemoryCache()
});

export const reason1: Reason = {
  id: 1,
  text: 'Die Ästhetik!',
  author: {
    canton: 'BS'
  }
};

export const reason2: Reason = {
  id: 2,
  text:
    'Es wird ein 50/50-Geschlechterverhältnis angestrebt (Schreibende/Crew).',
  author: {
    canton: 'SG'
  }
};

export const reason3: Reason = {
  id: 3,
  text:
    'Innovative Formate, R ist mehr als eine Zeitung: Buchclub, Interviews, Podcasts, Dossiers, viele Links zu anderen Zeitungen/Medien.',
  author: {
    canton: 'ZH'
  }
};

export const reasons: Reason[] = [reason1, reason2, reason3];

export const reasonsCount = 101;

storiesOf('App', module).add('default', () => (
  <ApolloProvider client={apolloClient}>
    <ColorContext.Provider value={colors.negative}>
      <Center>
        <App />
      </Center>
    </ColorContext.Provider>
  </ApolloProvider>
));
