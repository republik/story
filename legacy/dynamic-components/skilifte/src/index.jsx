import React from 'react';
import App from './components/App';
import profiles from './data/profiles.json'
import sortBy from 'lodash/sortBy'

const sortedProfiles = sortBy(profiles, p => p.name)

export default ({profile, period, legend}) =>
  <App profile={profile} profiles={sortedProfiles} period={period} legend={legend} />

