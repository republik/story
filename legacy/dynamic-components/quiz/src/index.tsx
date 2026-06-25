import Quiz from './Quiz'
import r2wc from '@r2wc/react-to-web-component'

function Wrapper({ data }: { data: Record<string, any> }) {
  return <Quiz {...data} />
}

customElements.define(
  'republik-quiz',
  r2wc(Wrapper, {
    props: { data: 'json' },
  }),
)
