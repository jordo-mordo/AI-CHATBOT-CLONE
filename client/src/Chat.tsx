import React, { useState } from 'react';

const Chat: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const userMessage = input;
    setInput('');
    try {
      const res = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await res.json();
      setMessages((msgs) => [...msgs, { user: userMessage, bot: data.response }]);
    } catch {
      setMessages((msgs) => [...msgs, { user: userMessage, bot: 'Error connecting to server.' }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h2>AI Chatbot</h2>
      <div style={{ minHeight: 200, border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
        {messages.map((msg, idx) => (
          <div key={idx}>
            <b>You:</b> {msg.user}
            <br />
            <b>Bot:</b> {msg.bot}
            <hr />
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && sendMessage()}
        placeholder="Type your message..."
        style={{ width: '80%', padding: 8 }}
        disabled={loading}
      />
      <button onClick={sendMessage} disabled={loading || !input.trim()} style={{ padding: 8, marginLeft: 8 }}>
        Send
      </button>
    </div>
  );
};

export default Chat;