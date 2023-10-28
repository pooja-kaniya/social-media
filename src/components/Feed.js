
import React from 'react';
import Message from './Message';

function Feed({ messages, handleLike, handleComment }) {
  return (
    <div>
      {messages.map(message => (
        <Message key={message._id} message={message} handleLike={handleLike} handleComment={handleComment} />
      ))}
    </div>
  );
}

export default Feed;
