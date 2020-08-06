import React from 'react';

const Message = ({ handle, message}) => {
  return(
    <p>
      <strong> {handle}: </strong>
      {message}
    </p>
  );
};

export default Message;