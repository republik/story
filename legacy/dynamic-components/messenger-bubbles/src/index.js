import React, { Fragment } from 'react'

import Bubble from './Bubble'

const Wrapper = ({ messages, alignments = {} }) => {
  if (messages) {
    return (
      <Fragment>
        {messages.map((message, i) => {
          const nextMessage = messages[i + 1] || {}
          return (
            <Bubble
              key={i}
              name={
                nextMessage.author === message.author
                  ? undefined
                  : message.author
              }
              align={alignments[message.author]}
              avatar={message.avatar}
              date={message.date}
            >
              {message.text}
            </Bubble>
          )
        })}
        <br style={{ clear: 'both' }} />
      </Fragment>
    )
  }
  return null
}

export default Wrapper
