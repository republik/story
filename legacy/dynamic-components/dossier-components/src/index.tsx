// @ts-ignore
import Component0 from './indicators/index.ts'
// @ts-ignore
import Component1 from './banner/index.ts'
// @ts-ignore
import Component2 from './timeline/index.ts'
// @ts-ignore
import Component3 from './quotes/index.ts'
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
  'republik-dossier-indicators',
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
  'republik-dossier-banner',
  r2wc(Wrapper1, { props: { data: 'json' } }),
)

function Wrapper2({ data }: { data: Record<string, any> }) {
  return <Component2 {...(data ?? {})} />
}

customElements.define(
  'republik-dossier-timeline',
  r2wc(Wrapper2, { props: { data: 'json' } }),
)

function Wrapper3({ data }: { data: Record<string, any> }) {
  return <Component3 {...(data ?? {})} />
}

customElements.define(
  'republik-dossier-quotes',
  r2wc(Wrapper3, { props: { data: 'json' } }),
)
