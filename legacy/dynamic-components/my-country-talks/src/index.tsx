// @ts-ignore
import Component from './index.jsx'
import { RootColorVariables } from '@project-r/styleguide'
import r2wc from '@r2wc/react-to-web-component'

function Wrapper({
  data,
}: {
  data: Record<string, any>
}) {
  return (
    <>
      <RootColorVariables />
      <Component {...(data ?? {})} />
    </>
  )
}

customElements.define(
  'republik-my-country-talks',
  r2wc(Wrapper, { props: { data: 'json' } }),
)
