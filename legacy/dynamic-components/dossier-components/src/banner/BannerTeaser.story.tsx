import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { Center, Editorial } from '@project-r/styleguide'

import BannerTeaser, { BannerTeaserItem } from './BannerTeaser'
import { ETH_TIMELINE } from '../timeline/Timeline.story';

export const ITEM1: BannerTeaserItem = {
  "color": "#fff",
  "header": "Wissenschaftsgeschichte des Klimawandels",
  "author": "Von <a href='/~abastiani'>Arian Bastiani</a>, 4.12. – 27.17.2018",
  "url": "https://www.republik.ch/2019/03/19/das-versagen-der-eth",
  "textPosition": "top",
  "title": "Geheimnisvolle Strahlen",
  "image": "https://cdn.republik.space/s3/republik-assets/github/republik/article-klima-forschungsgeschichte-teil-1/images/2b0b82cc16d0baaf0491b5bf1e6e70c72cb435d3.jpeg",
  "lead": "Wie die Klimaforschung den Weg in die Politik fand – und dort von mächtigen Gegnern bekämpft wurde. Ein Serie in vier Teilen.",
}

export const ITEM2: BannerTeaserItem = {
  "color": "#fff",
  "bgColor": "#EFCE5A",
  "author": "Von <a href='/~ubruderer'>Urs Bruderer</a> (Text) und Adam Higton (Illustrationen), 07.09.2018",
  "url": "https://www.republik.ch/2018/09/07/das-land-wo-bald-die-zitronen-bluehn",
  "textPosition": "topright",
  "title": "Das Land, wo bald die Zitronen blühn",
  "image": "https://cdn.republik.space/s3/republik-assets/github/republik/article-das-land-wo-die-zitronen-bluehn/images/cf31077d21d1e2accace0240a3b004e3b631eb39.gif",
  "lead": "Die Schweiz wird zu einem mediterranen Land, nur leider ohne Meer. Für die Landwirtschaft ein Glück: Es werden Melonen, Reis und Topweine wachsen. Doch den Bauern fällt die Umstellung schwer, die der Klimawandel verlangt.",
  "split": true
}

storiesOf('BannerTeaser', module).add('default', () => (
  <Center>
    <BannerTeaser item={ETH_TIMELINE[6]} />
  </Center>
)).add('split', () => (
  <Center>
    <BannerTeaser item={{...ITEM2}} />
  </Center>
))
