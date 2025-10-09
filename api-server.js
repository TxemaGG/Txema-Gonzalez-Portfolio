const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 4000; 
const DB_PATH = path.join(__dirname, 'messages.json');

app.use(cors());
app.use(express.json());

function loadMessages() {
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
}

function saveMessages(msgs) {
  fs.writeFileSync(DB_PATH, JSON.stringify(msgs, null, 2), 'utf8');
}

let messages = loadMessages();


app.get('/messages', (req, res) => {
  res.json(messages);
});

app.post('/messages', (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Faltan campos obligatorios.' });
  }

  const newMsg = {
    id: Date.now(),
    name,
    email,
    subject: subject || "",
    message,
    created_at: new Date().toISOString(),
  };

  messages.unshift(newMsg); 
  saveMessages(messages);

  res.status(201).json(newMsg);
});


app.listen(PORT, () => {
  console.log(`✅ API escuchando en http://localhost:${PORT}`);
});
