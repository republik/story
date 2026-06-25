// @ts-ignore
import Component0 from './index.jsx'
// @ts-ignore
import Component1 from './collage.js'
import r2wc from '@r2wc/react-to-web-component'

function Wrapper0({ data }: { data: Record<string, any> }) {
  return <Component0 {...(data ?? {})} />
}

customElements.define(
  'republik-erbschaft',
  r2wc(Wrapper0, { props: { data: 'json' } }),
)

function Wrapper1({ data }: { data: Record<string, any> }) {
  return <Component1 {...(data ?? {})} />
}

customElements.define(
  'republik-erbschaft-collage',
  r2wc(Wrapper1, { props: { data: 'json' } }),
)
