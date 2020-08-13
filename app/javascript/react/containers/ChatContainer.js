import React, { useState, useEffect } from 'react';

import MessageWindow from '../components/MessageWindow'
import TextFieldWithSubmit from '../components/TextFieldWithSubmit';

const ChatContainer = (props) => {
  const [user, setUser] = useState({})
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState("")

  useEffect(() => {
    let chatId = props.id

    fetch("/api/v1/users/current", {
      credentials: 'same-origin',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    .then((response) => {
      let { ok } = response;
      if (ok) {
        return response.json();
      }
    })
    .then((data) => {
      setUser(data)
    })

    App.chatChannel = App.cable.subscriptions.create(
      {
        channel: "ChatChannel",
        chat_id: chatId
      },
      {
        connected: () => {},
        disconnected: () => {},
        received: data => {
          handleMessageReceipt(data)
        }
      }
    );
  }, [])

  const handleMessageReceipt = (messages) => {
    setMessages(messages)
  }

  const handleClearForm = () => {
    setMessage("")
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    App.chatChannel.send({
     message: message,
     user: user
    })

    handleClearForm();
  }

  const handleMessageChange = (event) => {
    setMessage(event.target.value)
  }

  return(
    <div className="chat-window">
      <div className='callout chat' id='chatWindow'>
        <h4 className="underline-text">Chat:</h4>
        <div className="message-window medium-cell-block-y">

        <MessageWindow 
          messages={messages}
        />
        </div>
      </div>
      <form onSubmit={handleFormSubmit}>
        <TextFieldWithSubmit
          content={message}
          name='message'
          handlerFunction={handleMessageChange}
        />
      </form>
    </div>
);
}

export default ChatContainer;