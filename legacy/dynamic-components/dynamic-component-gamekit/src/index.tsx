// @ts-ignore
import Component from './index.ts'
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
  'republik-dynamic-component-gamekit',
  r2wc(Wrapper, { props: { data: 'json' } })
)
