// @ts-ignore
import Component from './index.jsx'
import r2wc from '@r2wc/react-to-web-component'

function Wrapper({ data }: { data: Record<string, any> }) {
  return <Component {...(data ?? {})} />
}

customElements.define(
  'republik-wer-sind-sie-2',
  r2wc(Wrapper, { props: { data: 'json' } }),
)
