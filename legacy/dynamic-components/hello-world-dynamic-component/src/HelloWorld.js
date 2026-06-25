import React, { useState } from 'react'
import { useWindowSize } from './useWindowSize'

const Title = (props) => {
  const { message } = props
  return (
    <h1>{message}</h1>
  )
}

const Container = (props) => {
  const { children } = props
  return (
    <div style={{backgroundColor: 'green'}}>
      {children}
    </div>
  )
}

export default (props) => {
  const [counter, setCounter] = useState(0)
  const [width, height] = useWindowSize()

  return (
    <Container>
      <Title message='Mein neuer Titel' />
      <p>The counter is: {counter}</p>
      <button
        onClick={
          () => setCounter(counter+1)
        }
      >
        Click me!
      </button>

      <p>The size is: {width}x{height}</p>

    </Container>
  )

}
