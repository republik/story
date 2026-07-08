import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { Center, Editorial } from '@project-r/styleguide'
import { STORYVALUES } from './indicators/Indicators.story'
import Indicators from './indicators/Indicators'
import BannerTeaser from './banner'
import { ITEM1, ITEM2 } from './banner/BannerTeaser.story'
import Quotes from './quotes/Quotes'
import { QUOTES } from './quotes/Press.story'
import { COMMENTS } from './quotes/Comments.story'

import {css} from 'glamor'
import Timeline from './timeline';
import { ETH_TIMELINE } from './timeline/Timeline.story';

css.global('body', {margin: 0})

storiesOf('Article', module).add('Article', () => (
  <>
    <Center>
      <Editorial.Headline>Dossier</Editorial.Headline>
      <Editorial.P>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
        Aenean commodo ligulaeget dolor. Aenean massa. Cum sociis
        natoque penatibus et magnis dis parturientmontes, nascetur
        ridiculus mus. Donec quam felis, ultricies nec,
        pellentesqueeu, pretium quis, sem. Nulla consequat massa quis
        enim. Donec pede justo,fringilla vel, aliquet nec, vulputate
        eget, arcu. In enim justo, rhoncus ut,imperdiet a, venenatis
        vitae, justo. Nullam dictum felis eu pede mollis
        pretium.Integer tincidunt. Cras dapibus. Vivamus elementum
        semper nisi. Aenean vulputateeleifend tellus. Aenean leo
        ligula, porttitor eu, consequat vitae, eleifend ac,enim.
        Aliquam lorem ante, dapibus in, viverra quis, feugiat a,
        tellus. Phasellusviverra nulla ut metus varius laoreet.
        Quisque rutrum. Aenean imperdiet. Etiamultricies nisi vel
        augue.
      </Editorial.P>
    </Center>
    <BannerTeaser item={ITEM1} />
    <Center>
      <Editorial.P>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
        Aenean commodo ligulaeget dolor. Aenean massa. Cum sociis
        natoque penatibus et magnis dis parturientmontes, nascetur
        ridiculus mus. Donec quam felis, ultricies nec,
        pellentesqueeu, pretium quis, sem. Nulla consequat massa quis
        enim. Donec pede justo,fringilla vel, aliquet nec, vulputate
        eget, arcu. In enim justo, rhoncus ut,imperdiet a, venenatis
        vitae, justo. Nullam dictum felis eu pede mollis
        pretium.Integer tincidunt. Cras dapibus. Vivamus elementum
        semper nisi. Aenean vulputateeleifend tellus. Aenean leo
        ligula, porttitor eu, consequat vitae, eleifend ac,enim.
        Aliquam lorem ante, dapibus in, viverra quis, feugiat a,
        tellus. Phasellusviverra nulla ut metus varius laoreet.
        Quisque rutrum. Aenean imperdiet. Etiamultricies nisi vel
        augue.
      </Editorial.P>
      <Indicators values={STORYVALUES} />
      <Editorial.P>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
        Aenean commodo ligulaeget dolor. Aenean massa. Cum sociis
        natoque penatibus et magnis dis parturientmontes, nascetur
        ridiculus mus. Donec quam felis, ultricies nec,
        pellentesqueeu, pretium quis, sem. Nulla consequat massa quis
        enim. Donec pede justo,fringilla vel, aliquet nec, vulputate
        eget, arcu. In enim justo, rhoncus ut,imperdiet a, venenatis
        vitae, justo. Nullam dictum felis eu pede mollis
        pretium.Integer tincidunt. Cras dapibus. Vivamus elementum
        semper nisi. Aenean vulputateeleifend tellus. Aenean leo
        ligula, porttitor eu, consequat vitae, eleifend ac,enim.
        Aliquam lorem ante, dapibus in, viverra quis, feugiat a,
        tellus. Phasellusviverra nulla ut metus varius laoreet.
        Quisque rutrum. Aenean imperdiet. Etiamultricies nisi vel
        augue.
      </Editorial.P>
    </Center>
    <BannerTeaser item={ITEM2} />
    <Center>
      <Editorial.P>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
        Aenean commodo ligulaeget dolor. Aenean massa. Cum sociis
        natoque penatibus et magnis dis parturientmontes, nascetur
        ridiculus mus. Donec quam felis, ultricies nec,
        pellentesqueeu, pretium quis, sem. Nulla consequat massa quis
        enim. Donec pede justo,fringilla vel, aliquet nec, vulputate
        eget, arcu. In enim justo, rhoncus ut,imperdiet a, venenatis
        vitae, justo. Nullam dictum felis eu pede mollis
        pretium.Integer tincidunt. Cras dapibus. Vivamus elementum
        semper nisi. Aenean vulputateeleifend tellus. Aenean leo
        ligula, porttitor eu, consequat vitae, eleifend ac,enim.
        Aliquam lorem ante, dapibus in, viverra quis, feugiat a,
        tellus. Phasellusviverra nulla ut metus varius laoreet.
        Quisque rutrum. Aenean imperdiet. Etiamultricies nisi vel
        augue.
      </Editorial.P>
      <Timeline timeline={ETH_TIMELINE} />
    </Center>
  </>
))
