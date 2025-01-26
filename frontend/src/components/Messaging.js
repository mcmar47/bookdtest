import React, { useState, useEffect } from 'react';
import { getMessages, sendMessageApi } from '../services/api';

function Messaging() {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    getMessages()
      .then(response => setMessages(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleSend = () => {
    const msgObj = {
      // Adjust fields to match your backend
      sender: 1, // placeholder user ID
      recipient: 2, // placeholder user ID
      content
    };
    sendMessageApi(msgObj)
      .then(res => {
        setMessages([...messages, res.data]);
        setContent('');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Messaging</h2>
      <div className="mb-4 space-y-2 max-h-64 overflow-auto">
        {messages.map((m, idx) => (
          <div key={idx} className="p-2 border rounded">
            <p><strong>{m.sender}</strong>: {m.content}</p>
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <input
          type="text"
          className="flex-grow border p-2 rounded"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSend} className="bg-blue-600 text-white px-4 py-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
}

export default Messaging;
