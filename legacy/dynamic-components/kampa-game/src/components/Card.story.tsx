import * as React from 'react';
import { storiesOf } from '@storybook/react';
import {
  Center,
  ColorContext,
  colors
} from '@project-r/styleguide';
import Card from './Card';
import { Reason } from '../types';
import { reason1, reasonsCount, reason2, reason3 } from '../App.story';

storiesOf('Card', module)
  .add('Short Card', () => (
    <ColorContext.Provider value={colors.negative}>
      <Center>
        <Card reason={reason1} totalReasons={reasonsCount} />
      </Center>
    </ColorContext.Provider>
  ))
  .add('Medium Card', () => (
    <ColorContext.Provider value={colors.negative}>
      <Center>
        <Card reason={reason2} totalReasons={reasonsCount} />
      </Center>
    </ColorContext.Provider>
  ))
  .add('Long Card', () => (
    <ColorContext.Provider value={colors.negative}>
      <Center>
        <Card reason={reason3} totalReasons={reasonsCount} />
      </Center>
    </ColorContext.Provider>
  ));
