const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());


app.use(express.static(path.join(__dirname, "dist")));


const MESSAGES_FILE = path.join(__dirname, "messages.json");


app.get("/messages", (req, res) => {
  fs.readFile(MESSAGES_FILE, "utf8", (err, data) => {
    if (err) return res.status(200).json([]);
    try {
      const messages = JSON.parse(data);
      res.json(messages);
    } catch (e) {
      res.json([]);
    }
  });
});


app.post("/messages", (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  const newMsg = {
    id: Date.now(),
    name,
    email,
    subject,
    message,
    created_at: new Date().toISOString(),
  };

  fs.readFile(MESSAGES_FILE, "utf8", (err, data) => {
    let messages = [];
    if (!err && data) {
      try {
        messages = JSON.parse(data);
      } catch {
        messages = [];
      }
    }

    messages.push(newMsg);

    fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Error al guardar el mensaje" });
      res.json(newMsg);
    });
  });
});


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});


app.listen(PORT, () => console.log(`✅ Servidor iniciado en puerto ${PORT}`));