import * as React from 'react';
import { storiesOf } from '@storybook/react';
import App from '../App';
import {
  Center,
  ColorContext,
  colors
} from '@project-r/styleguide';
import Card from './Card';
import { Reason } from '../types';
import Deck from './Deck';
import { reasons } from '../App.story';


storiesOf('Deck', module)
  .add('default', () => (
    <ColorContext.Provider value={colors.negative}>
      <Center>
        <Deck reasons={reasons} />
      </Center>
    </ColorContext.Provider>
  ))