// @ts-ignore
import Component0 from './index.jsx'
// @ts-ignore
import Component1 from './collage.js'
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
  'republik-erbschaft',
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
  'republik-erbschaft-collage',
  r2wc(Wrapper1, { props: { data: 'json' } }),
)
