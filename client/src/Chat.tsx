import React, { useState } from 'react';
import { Box, Button, Container, Paper, TextField, Typography, Divider, CircularProgress } from '@mui/material';

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
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        AI Chatbot
      </Typography>
      <Paper elevation={3} sx={{ minHeight: 200, p: 2, mb: 2 }}>
        {messages.map((msg, idx) => (
          <Box key={idx} sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="primary">You:</Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>{msg.user}</Typography>
            <Typography variant="subtitle2" color="secondary">Bot:</Typography>
            <Typography variant="body1">{msg.bot}</Typography>
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
        {messages.length === 0 && (
          <Typography color="text.secondary" align="center">
            Start the conversation!
          </Typography>
        )}
      </Paper>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="Type your message..."
          variant="outlined"
          fullWidth
          disabled={loading}
          size="small"
        />
        <Button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          variant="contained"
          color="primary"
          sx={{ ml: 2, minWidth: 90 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Send'}
        </Button>
      </Box>
    </Container>
  );
};

export default Chat;