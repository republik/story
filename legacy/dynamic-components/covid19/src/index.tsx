// @ts-ignore
import Component from './extrapolation.js'
import r2wc from '@r2wc/react-to-web-component'

function Wrapper({ data }: { data: Record<string, any> }) {
  return (
    <>
      <RootColorVariables />
      <Component {...(data ?? {})} />
    </>
  )
}

customElements.define(
  'republik-covid19',
  r2wc(Wrapper, { props: { data: 'json' } }),
)
