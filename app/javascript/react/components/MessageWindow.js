import React, { useEffect, useRef } from 'react'

import Message from './Message'

const MessageWindow = props => {
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
  }
  useEffect(scrollToBottom, [props.messages]);

  let messagesComponents = props.messages.map(message => {
    return(
      <Message
        key={message.messageId}
        handle={message.user.username}
        message={message.message}
      />
    )
  }, this);

  return(
    <div id="message-window">
      {messagesComponents}
      <div ref={messagesEndRef}>
        {messagesComponents[-1]}
      </div>
    </div>
  )
}

export default MessageWindow