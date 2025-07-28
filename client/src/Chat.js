import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000');

function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('chat message', (msgObj) => {
      setMessages((prev) => [...prev, msgObj]);
    });

    return () => {
      socket.off();
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit('chat message', message);
      setMessage('');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div key={index} style={styles.message}>
            <strong>User:</strong> {msg.message}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} style={styles.form}>
        <input
          type="text"
          value={message}
          placeholder="Type your message..."
          onChange={(e) => setMessage(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Send</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 600,
    margin: 'auto',
    padding: 20,
  },
  chatBox: {
    height: '400px',
    overflowY: 'auto',
    border: '1px solid #ccc',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
    background: '#f9f9f9',
  },
  message: {
    padding: '5px 0',
  },
  form: {
    display: 'flex',
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 6,
    border: '1px solid #ccc',
  },
  button: {
    marginLeft: 10,
    padding: '10px 20px',
    border: 'none',
    backgroundColor: '#0077cc',
    color: 'white',
    borderRadius: 6,
    cursor: 'pointer',
  }
};

export default Chat;
