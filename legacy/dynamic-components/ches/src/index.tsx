// @ts-ignore
import Component from './index.js'
import r2wc from '@r2wc/react-to-web-component'

function Wrapper({ data }: { data: Record<string, any> }) {
  return <Component {...(data ?? {})} />
}

customElements.define(
  'republik-ches',
  r2wc(Wrapper, { props: { data: 'json' } }),
)
