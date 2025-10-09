// server.js
// 🚀 Servidor Express unificado para producción (Render o local)

// -------------------------------
// Importación de dependencias
// -------------------------------
const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

// -------------------------------
// Configuración básica del servidor
// -------------------------------
const app = express();
const PORT = process.env.PORT || 8080;

// -------------------------------
// Middlewares
// -------------------------------
app.use(express.json()); // Permite recibir JSON en peticiones POST
app.use(cors()); // Habilita CORS entre cliente y servidor

// -------------------------------
// Servir la app React compilada
// -------------------------------
// ⚠️ IMPORTANTE: Render busca la carpeta /dist (no /build)
app.use(express.static(path.join(__dirname, "dist")));

// -------------------------------
// Archivo donde se guardarán los mensajes del formulario
// -------------------------------
const MESSAGES_FILE = path.join(__dirname, "messages.json");

// -------------------------------
// ENDPOINT: GET /messages → obtener todos los mensajes (solo para pruebas)
// -------------------------------
app.get("/messages", (req, res) => {
  fs.readFile(MESSAGES_FILE, "utf8", (err, data) => {
    if (err) {
      // Si el archivo aún no existe, devolvemos un array vacío
      return res.status(200).json([]);
    }
    try {
      const messages = JSON.parse(data);
      res.json(messages);
    } catch (e) {
      res.json([]);
    }
  });
});

// -------------------------------
// ENDPOINT: POST /messages → guardar un mensaje nuevo
// -------------------------------
app.post("/messages", (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validación básica
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  // Nuevo mensaje con fecha e ID
  const newMsg = {
    id: Date.now(),
    name,
    email,
    subject,
    message,
    created_at: new Date().toISOString(),
  };

  // Leemos el archivo existente y añadimos el nuevo mensaje
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

    // Guardamos el nuevo array de mensajes
    fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: "Error al guardar el mensaje" });
      }
      res.json(newMsg);
    });
  });
});

// -------------------------------
// Cualquier otra ruta → devolver el index.html de React
// -------------------------------
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// -------------------------------
// Iniciar servidor
// -------------------------------
app.listen(PORT, () => {
  console.log(`✅ Servidor iniciado correctamente en puerto ${PORT}`);
});
