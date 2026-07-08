import * as React from 'react'
import { storiesOf } from '@storybook/react'
import App from './App'
import { Center, Editorial } from '@project-r/styleguide'

storiesOf('Article', module).add('Article', () => (
  <div>
    <div
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        height: 60,
        background: '#000',
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 40,
        zIndex: 10,
      }}
    />
    <Center style={{ marginTop: 60 }}>
      <Editorial.Headline>Städte auf Reisen</Editorial.Headline>
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
      <App
        descriptions={[
          `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligulaeget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturientmontes, nascetur ridiculus mus.`,
          `Donec quam felis, ultricies nec, pellentesqueeu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo,fringilla vel, aliquet nec, vulputate eget, arcu. `,
        ]}
        city="bern"
      />
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
      <App
        descriptions={[
          `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligulaeget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturientmontes, nascetur ridiculus mus.`,
          `Donec quam felis, ultricies nec, pellentesqueeu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo,fringilla vel, aliquet nec, vulputate eget, arcu. `,
        ]}
        city="miami"
      />
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
      <App
        descriptions={[
          `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligulaeget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturientmontes, nascetur ridiculus mus.`,
          `Donec quam felis, ultricies nec, pellentesqueeu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo,fringilla vel, aliquet nec, vulputate eget, arcu. `,
        ]}
        city="baghdad"
      />
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
      <App
        descriptions={[
          `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligulaeget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturientmontes, nascetur ridiculus mus.`,
          `Donec quam felis, ultricies nec, pellentesqueeu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo,fringilla vel, aliquet nec, vulputate eget, arcu. `,
        ]}
        city="helsinki"
      />
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
      <App />
    </Center>
  </div>
))
