import * as React from 'react'
import { storiesOf } from '@storybook/react'
import App from './App'
import {
  mediaQueries,
  Logo,
  colors,
  Center,
  Loader
} from '@project-r/styleguide'
import { css } from 'glamor'
import { csv } from 'd3-fetch'
import { autoType } from 'd3-dsv'
import omit from 'lodash/omit'
import { Profile } from './types'
import profiles from '../profiles.json'

const styles = {
  header: css({
    position: 'fixed',
    top: 0,
    width: '100%',
    background: '#fff',
    height: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    borderBottom: `1px solid ${colors.divider}`,
    [mediaQueries.mUp]: {
      height: 0
    }
  })
}

export const PROFILES: Profile[] = profiles

const GsheetApp = () => {
  const [profiles, setProfiles] = React.useState(null)
  React.useEffect(() => {
    const getUrl = gid =>
      `https://docs.google.com/spreadsheets/d/e/2PACX-1vQuRNYEzZh3qI3k_yhDbvv_AnpKqTdCmnAkXMpuC11avC6yUwf4TW8EbgCdUi3WWjxbFrSwDB8imCAw/pub?gid=${gid}&single=true&output=csv`
    const profilesUrl = getUrl(`1562561026`)
    async function fetchData() {
      let profiles = await csv(profilesUrl, autoType)
      const actions = await Promise.all(
        profiles.filter(p => p.gid).map(p => csv(getUrl(p.gid), autoType))
      )
      const res = profiles.map((p, i) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        outro: p.outro,
        analysis: p.analysis,
        budget: omit(p, [
          'id',
          'name',
          'description',
          'gid',
          'analysis',
          'outro',
          'type'
        ]),
        actions: actions[i]
      }))

      setProfiles(res)
    }
    fetchData()
  }, [])
  return profiles ? (
    <App profiles={profiles.filter(p => p.actions)} />
  ) : (
    <Loader />
  )
}

storiesOf('App', module)
  .add('default', () => (
    <>
      <div {...styles.header}>
        <Logo height={30} />
      </div>
      <Center>
        <h1>Klimagame</h1>
        <p>
          Knapp 14 Tonnen. So viel CO2 verursachen wir als Einwohner in der
          Schweiz jedes Jahr. Wegen den Nahrungsmitteln, die wir essen, den
          Kilometern, die wir fliegen, den Räume, die wir beheizen und die
          Konsumgütern, die wir kaufen. 14’000 Kilogramm pro Person: So gross
          ist unser CO2-Fussabdruck.
        </p>

        <p>
          Fürs Klima ist dieser Abdruck zu gross. Und zwar deutlich: Wollen wir
          den Planeten vor irreparablen Schäden bewahren, muss der CO2-Ausstoss
          bald markant schrumpfen. So um die Hälfte innerhalb von 10 Jahren wäre
          gut.
        </p>

        <p>
          Doch wie kann das funktionieren? Ist eine solche Reduktion bei unserem
          aktuellen Lebensstil überhaupt möglich? Und wenn ja: Welche kleinen
          Freuden können wir uns noch gönnen? Worauf müssen wir verzichten?
        </p>

        <p>
          Um auf solche Fragen eine Antwort zu finden, haben wir basierend auf
          dem Footprint-Rechner und mit Unterstützung des WWF das Klimagame
          programmiert: ein Spiel, in dem Sie genau diese Aufgabe lösen müssen.
        </p>

        <h2>So geht's</h2>

        <p>
          Sie schlüpfen in eines von drei Profilen: die Städterin, der Pendler,
          die Vier-Personen-Familie
        </p>
        <p>
          Im Lauf eines Jahres fallen diverse Entscheidungen an – von der
          Ernährung über die Wohnungswahl bis zur Feriendestination
        </p>
        <p>
          Ihr Ziel: Den CO2-Fussabdruck um die Hälfte (oder im Fall der Familie:
          um 30 Prozent) zu reduzieren.
        </p>
        <p>
          Am Ende des Jahres ziehen wir Bilanz und analysieren, wie der
          Lebensstil ihres Profils sich verändert hat.{' '}
        </p>
      </Center>
      <App profiles={PROFILES} />
      <Center>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligulaeget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturientmontes, nascetur ridiculus mus. Donec quam
          felis, ultricies nec, pellentesqueeu, pretium quis, sem. Nulla
          consequat massa quis enim. Donec pede justo,fringilla vel, aliquet
          nec, vulputate eget, arcu. In enim justo, rhoncus ut,imperdiet a,
          venenatis vitae, justo. Nullam dictum felis eu pede mollis
          pretium.Integer tincidunt. Cras dapibus. Vivamus elementum semper
          nisi. Aenean vulputateeleifend tellus. Aenean leo ligula, porttitor
          eu, consequat vitae, eleifend ac,enim. Aliquam lorem ante, dapibus in,
          viverra quis, feugiat a, tellus. Phasellusviverra nulla ut metus
          varius laoreet. Quisque rutrum. Aenean imperdiet. Etiamultricies nisi
          vel augue.
        </p>
      </Center>
    </>
  ))
  .add('embedded', () => (
    <>
      <div {...styles.header}>
        <Logo height={30} />
      </div>
      <Center>
        <h1>Klimagame</h1>
        <p>
          Knapp 14 Tonnen. So viel CO2 verursachen wir als Einwohner in der
          Schweiz jedes Jahr. Wegen den Nahrungsmitteln, die wir essen, den
          Kilometern, die wir fliegen, den Räume, die wir beheizen und die
          Konsumgütern, die wir kaufen. 14’000 Kilogramm pro Person: So gross
          ist unser CO2-Fussabdruck.
        </p>

        <p>
          Fürs Klima ist dieser Abdruck zu gross. Und zwar deutlich: Wollen wir
          den Planeten vor irreparablen Schäden bewahren, muss der CO2-Ausstoss
          bald markant schrumpfen. So um die Hälfte innerhalb von 10 Jahren wäre
          gut.
        </p>

        <p>
          Doch wie kann das funktionieren? Ist eine solche Reduktion bei unserem
          aktuellen Lebensstil überhaupt möglich? Und wenn ja: Welche kleinen
          Freuden können wir uns noch gönnen? Worauf müssen wir verzichten?
        </p>

        <p>
          Um auf solche Fragen eine Antwort zu finden, haben wir basierend auf
          dem Footprint-Rechner und mit Unterstützung des WWF das Klimagame
          programmiert: ein Spiel, in dem Sie genau diese Aufgabe lösen müssen.
        </p>

        <h2>So geht's</h2>

        <p>
          Sie schlüpfen in eines von drei Profilen: die Städterin, der Pendler,
          die Vier-Personen-Familie
        </p>
        <p>
          Im Lauf eines Jahres fallen diverse Entscheidungen an – von der
          Ernährung über die Wohnungswahl bis zur Feriendestination
        </p>
        <p>
          Ihr Ziel: Den CO2-Fussabdruck um die Hälfte (oder im Fall der Familie:
          um 30 Prozent) zu reduzieren.
        </p>
        <p>
          Am Ende des Jahres ziehen wir Bilanz und analysieren, wie der
          Lebensstil ihres Profils sich verändert hat.{' '}
        </p>
        <GsheetApp />
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligulaeget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturientmontes, nascetur ridiculus mus. Donec quam
          felis, ultricies nec, pellentesqueeu, pretium quis, sem. Nulla
          consequat massa quis enim. Donec pede justo,fringilla vel, aliquet
          nec, vulputate eget, arcu. In enim justo, rhoncus ut,imperdiet a,
          venenatis vitae, justo. Nullam dictum felis eu pede mollis
          pretium.Integer tincidunt. Cras dapibus. Vivamus elementum semper
          nisi. Aenean vulputateeleifend tellus. Aenean leo ligula, porttitor
          eu, consequat vitae, eleifend ac,enim. Aliquam lorem ante, dapibus in,
          viverra quis, feugiat a, tellus. Phasellusviverra nulla ut metus
          varius laoreet. Quisque rutrum. Aenean imperdiet. Etiamultricies nisi
          vel augue.
        </p>
      </Center>
    </>
  ))
  .add('extract', () => (
    <App extract={true} profiles={[]} />
  ))
