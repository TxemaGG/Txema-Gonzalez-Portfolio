import React, { useState } from "react";
import axios from "axios";

export default function Contact() {
  const API_BASE = process.env.REACT_APP_CONTACT_API || "http://localhost:4000";
  const api = axios.create({ baseURL: API_BASE, timeout: 8000 });

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function validate() {
    if (form.name.trim().length < 2) return "El nombre debe tener al menos 2 caracteres.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Introduce un email válido.";
    if (form.message.trim().length < 5) return "El mensaje es demasiado corto.";
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setSending(true);
    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
        created_at: new Date().toISOString()
      };

      await api.post("/messages", payload);
      setForm({ name: "", email: "", subject: "", message: "" });
      setSuccess("Mensaje enviado. ¡Gracias!");
      setTimeout(() => setSuccess(null), 4000);
    } catch (err) {
      console.error(err);
      setError("Error al enviar el mensaje. Intenta de nuevo más tarde.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h2>CONTACTO</h2>
        <p>
          ¿Quieres trabajar conmigo? ¡Pensaba que nunca me lo ibas a preguntar!<br />
          Puedes ponerte en contacto conmigo rellenando el siguiente formulario o enviándome un correo
          electrónico a <a href="mailto:jmggalan@gmail.com">jmggalan@gmail.com</a> o mediante{" "}
          <a
            href="https://www.linkedin.com/in/txemagonzalezgalan"
            target="_blank"
            rel="noopener noreferrer"
            className="linkedin-link"
            aria-label="LinkedIn de Txema"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4v13h-4V8zm7 0h3.8v1.8h.05c.53-1 1.83-2.1 3.77-2.1 4.03 0 4.78 2.66 4.78 6.12V21h-4V15.3c0-1.36-.03-3.11-1.9-3.11-1.9 0-2.2 1.48-2.2 3v5.81h-4V8z" />
            </svg>
          </a>
          .
        </p>
      </div>

      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        {error && (
          <div className="form-error" role="alert" aria-live="assertive">
            {error}
          </div>
        )}
        {success && (
          <div className="form-success" role="status" aria-live="polite">
            {success}
          </div>
        )}

        <label className="field">
          <span>Nombre</span>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Tu nombre"
            required
          />
        </label>

        <label className="field">
          <span>Email</span>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="tu@ejemplo.com"
            required
          />
        </label>

        <label className="field">
          <span>Asunto</span>
          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Asunto (opcional)"
          />
        </label>

        <label className="field">
          <span>Mensaje</span>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows="6"
            placeholder="Escribe tu mensaje..."
            required
          />
        </label>

        <div className="form-actions">
          <button type="submit" className="contact-btn" disabled={sending}>
            {sending ? "Enviando..." : "Enviar mensaje"}
          </button>
        </div>
      </form>
    </div>
  );
}
