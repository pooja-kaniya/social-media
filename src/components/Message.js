
import React, { useState } from 'react';

function Message({ message, handleLike, handleComment }) {
  const [comment, setComment] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment) {
      handleComment(message._id, comment);
      setComment('');
    }
  };

  return (
    <div>
      <h3>{message.title}</h3>
      <p>{message.content}</p>
      <p>Timestamp: {message.timestamp}</p>
      <p>Likes: {message.likes}</p>
      <button onClick={() => handleLike(message._id)}>Like</button>
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment"
        />
        <button type="submit">Post Comment</button>
      </form>
      <ul>
        {message.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  );
}

export default Message;
