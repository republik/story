// @ts-ignore
import Component0 from './part1.jsx'
// @ts-ignore
import Component1 from './part2.js'
// @ts-ignore
import Component2 from './part3.jsx'
import { RootColorVariables } from '@project-r/styleguide'
import r2wc from '@r2wc/react-to-web-component'

function Wrapper0({ data }: { data: Record<string, any> }) {
  return (
    <>
      <RootColorVariables />
      <Component0 {...(data ?? {})} />
    </>
  )
}

customElements.define(
  'republik-talk-to-the-machine-part1',
  r2wc(Wrapper0, { props: { data: 'json' } }),
)

function Wrapper1({ data }: { data: Record<string, any> }) {
  return (
    <>
      <RootColorVariables />
      <Component1 {...(data ?? {})} />
    </>
  )
}

customElements.define(
  'republik-talk-to-the-machine-part2',
  r2wc(Wrapper1, { props: { data: 'json' } }),
)

function Wrapper2({ data }: { data: Record<string, any> }) {
  return <Component2 {...(data ?? {})} />
}

customElements.define(
  'republik-talk-to-the-machine-part3',
  r2wc(Wrapper2, { props: { data: 'json' } }),
)
