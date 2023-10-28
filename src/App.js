
import React, { useState, useEffect } from 'react';
// import MessageList from './components/MessageList';
import MessageForm from './components/MessageForm';
import axios from 'axios';
import Feed from './components/Feed';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('/api/messages')
      .then(res => setMessages(res.data))
      .catch(err => console.error(err));
  }, []);

  const addMessage = (newMessage) => {
    axios.post('/api/messages', newMessage)
      .then(res => {
        setMessages([...messages, res.data]);
      })
      .catch(err => console.error(err));
  };

  const handleLike = (id) => {
    axios.put(`/api/messages/${id}/like`)
      .then(res => {
        const updatedMessages = messages.map(message => {
          if (message._id === id) {
            return { ...message, likes: res.data.likes };
          } else {
            return message;
          }
        });
        setMessages(updatedMessages);
      })
      .catch(err => console.error(err));
  };

  const handleComment = (id, comment) => {
    axios.post(`/api/messages/${id}/comment`, { comment })
      .then(res => {
        const updatedMessages = messages.map(message => {
          if (message._id === id) {
            return { ...message, comments: res.data.comments };
          } else {
            return message;
          }
        });
        setMessages(updatedMessages);
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>Social Media Feed</h1>
      <MessageForm addMessage={addMessage} />
      <Feed messages={messages} handleLike={handleLike} handleComment={handleComment} />
    </div>
  );
}

export default App;
