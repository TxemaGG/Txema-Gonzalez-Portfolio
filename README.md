> **Nota / Note:**  
> Este documento está disponible en español y traducido al inglés al final del documento.    
> This document is available in Spanish, and an English translation is included at the end.


## Repositorios del proyecto

> Este proyecto **full-stack** combina el frontend (React) y el backend (Node.js + Express) en un único repositorio.

- **Frontend (React App):**  
  > Código fuente en la carpeta principal `/src`  
   [https://github.com/TxemaGG/Txema-Gonzalez-Portfolio](https://github.com/TxemaGG/Txema-Gonzalez-Portfolio)

- **Backend (API REST con Node y Express):**  
  > Implementado en el archivo [`api-server.js`](./api-server.js)  
   [https://github.com/TxemaGG/Txema-Gonzalez-Portfolio/blob/main/api-server.js](https://github.com/TxemaGG/Txema-Gonzalez-Portfolio/blob/main/api-server.js)

---
---

# TXEMA GONZÁLEZ REACT PORTFOLIO APP

## 1. Título del proyecto  
**Portafolio de Txema González**

---

## 2. Objetivo del proyecto  
El objetivo de mi aplicación es aprovechar el esfuerzo de crear una aplicación, haciendo algo que me motive personalmente y que sea útil para alcanzar el objetivo final de este curso: conseguir un trabajo como profesional en el mundo de la programación y el desarrollo.  

Para ello, propongo crear mi propio **portfolio profesional**, moderno y bien estructurado, utilizando mi propio diseño y una estructura original, evitando copiar el proyecto de portfolio desarrollado durante el curso.

---

## 3. Usuario final de esta aplicación web  
Esta aplicación de portfolio está dirigida a:
- Profesionales de **recursos humanos** de empresas tecnológicas (reclutadores).
- **Directores de RRHH** de centros de investigación o empresas del sector tecnológico.
- **Cazatalentos** que busquen perfiles creativos en desarrollo y programación.
- **Desarrolladores técnicos** o **jefes de equipo** que evalúen talento en desarrollo fullstack.

---

## 4. Tecnologías utilizadas  
**Frontend:**  
- Lenguajes: JavaScript, HTML, SCSS.  
- Framework: React.js.  

**Backend:**  
- Lenguaje: JavaScript.  
- Framework: Node.js + Express.  
- Comunicación entre cliente y servidor: Axios + CORS.  
- Manejo del formulario de contacto: React Hooks + API REST.  

### 4.1 Resumen técnico del apartado “Contact”  
| Elemento | Descripción |
|-----------|-------------|
| **Interfaz** | React.js |
| **Backend** | Node.js + Express |
| **API REST** | Recibe, valida y guarda los mensajes |
| **Almacenamiento** | Archivo local `messages.json` persistente |
| **Comunicación** | Axios + CORS (puertos 3000 ↔ 4000) |
| **Entorno local** | `npm start` / `node api-server.js` |
| **Producción** | `server.js` sirve los archivos compilados |

---

## 5. Servidores locales necesarios  
- 
Ahora (versión unificada para producción o Render):

Un solo servidor → http://localhost:8080

Ese mismo servidor:

Muestra tu aplicación React (frontend)

Recibe los mensajes del formulario en la ruta /messages

Guarda los datos en messages.json



---

## 6. Estructura general de la aplicación  
La aplicación contiene las siguientes secciones:

- **Home:** pantalla inicial con animación ligera.  
- **About:** biografía con texto y fotografía, disponible en dos idiomas.  
- **Experience:** experiencias laborales clasificables mediante botones.  
- **Contact:** formulario funcional explicado en detalle más adelante.  
- **Auth / Portfolio Manager:** acceso privado donde se gestionan proyectos del portfolio con un CRUD conectado a un servidor remoto (DevCamp Space).

---

## 7. Arquitectura y funcionamiento del apartado “Contact”

### 7.1 Estructura general del proyecto
El apartado **Contact** forma parte del frontend React (puerto `http://localhost:3000`), mientras que el backend con **Node.js + Express** se ejecuta en `http://localhost:4000`.  

Ambos servicios siguen una arquitectura **cliente-servidor**:
- **Frontend (React):** muestra el formulario, valida los datos y envía la información.
- **Backend (Express):** recibe los datos, los guarda en `messages.json` y responde al cliente.

Pero para poder subirlo a la web he cambiado a esto: 

Ahora (versión unificada para producción o Render):

Un solo servidor → http://localhost:8080

Ese mismo servidor:

Muestra tu aplicación React (frontend)

Recibe los mensajes del formulario en la ruta /messages

Guarda los datos en messages.json



---

### 7.2 Funcionamiento del formulario
El archivo `contact.js` define un componente funcional de React con los campos:
- **name (nombre)**
- **email**
- **subject (asunto, opcional)**
- **message (mensaje)**

El componente usa **React Hooks (useState)** para gestionar el estado.  
Al pulsar “Enviar mensaje”:
1. Se ejecuta `handleSubmit()`.
2. Se validan los campos (mínimo de caracteres y formato de email).
3. Se construye un objeto `payload` con los datos y la fecha de envío.
4. Se envía mediante una petición **HTTP POST** a `http://localhost:4000/messages` usando **Axios**.  
5. Si tiene éxito, se muestra un mensaje de confirmación y el formulario se limpia.  
6. En caso de error, se muestra un mensaje al usuario.

---

### 7.3 API y almacenamiento de mensajes
La API está implementada en `api-server.js` y gestiona dos rutas principales:

- **POST /messages:**  
  Recibe los datos del formulario, los valida y los guarda en `messages.json`.  
  Si el archivo no existe, se crea automáticamente.  
  Devuelve un código **200 OK** y el objeto guardado.

- **GET /messages:**  
  (Solo para depuración) Devuelve todos los mensajes almacenados.

El almacenamiento es **local y persistente**, manteniendo la simplicidad sin usar bases de datos.

---

### 7.4 Comunicación entre puertos (3000 ↔ 4000)
El middleware **CORS** en el backend permite la comunicación entre ambos puertos:
- React (cliente) ejecutado en `localhost:3000`.
- API (servidor) ejecutada en `localhost:4000`.

Flujo de comunicación:
1. React envía el formulario a la API.
2. Express procesa la solicitud y guarda los datos.
3. El servidor responde con éxito.
4. React actualiza la interfaz y muestra el mensaje de confirmación.

---

### 7.5 Servidor de producción
El archivo `server.js` sirve los archivos compilados desde `/dist` y redirige todas las rutas a `index.html`.  

En desarrollo:
- `npm start` → lanza React (puerto 3000).  
- `node api-server.js` → lanza la API (puerto 4000).  

Esto permite **depurar frontend y backend por separado**.

---

### 7.6 Diseño y accesibilidad
El formulario está diseñado siguiendo buenas prácticas de accesibilidad:
- Etiquetas `<label>` asociadas a cada campo.
- Mensajes de error y éxito con roles **alert** y **status**.
- Validación de campos antes del envío.
- Icono de **LinkedIn** en SVG inline (sin dependencias externas).
- Código y estilos separados (`contact.js` / `contact.scss`) para modularidad y mantenimiento.

---

# 🇬🇧 English Version

## TXEMA GONZÁLEZ REACT PORTFOLIO APP

### 1. Project Title  
**Txema González Portfolio**

---

### 2. Project Objective  
The goal of this app is to create a personal and professional project that demonstrates my programming skills while helping me reach my ultimate objective — to work professionally as a developer.  

This portfolio is **custom-designed and independently built**, not a copy of the course template, using a modern structure and React best practices.

---

### 3. Target Audience  
The portfolio is aimed at:
- **HR professionals** in tech companies.  
- **Recruiters and talent managers** in R&D or public institutions.  
- **Team leads and developers** evaluating fullstack candidates.  

---

### 4. Technologies Used  
**Frontend:** JavaScript, HTML, SCSS, React.js.  
**Backend:** Node.js, Express, Axios, CORS.  
**Form handling:** React Hooks + REST API.  

#### Contact Section Summary
| Component | Description |
|------------|-------------|
| **Frontend** | React.js |
| **Backend** | Node.js + Express |
| **API** | Receives, validates, and saves messages |
| **Storage** | Local JSON file (`messages.json`) |
| **Communication** | Axios + CORS (ports 3000 ↔ 4000) |
| **Local Environment** | `npm start` / `node api-server.js` |
| **Production** | `server.js` serves built files |

---

### 5. Local Servers  
- `localhost:3000` → React frontend (`npm start`)  
- `localhost:4000` → API backend (`node api-server.js`)  

---

### 6. App Structure  
- **Home:** simple animation.  
- **About:** bilingual biography section.  
- **Experience:** filterable work experiences.  
- **Contact:** functional form (explained below).  
- **Auth / Portfolio Manager:** private CRUD panel using an external API.

---

### 7. “Contact” Architecture & Functionality

#### 7.1 General Architecture  
The **Contact** page is part of a React frontend (port 3000) that communicates with a **Node/Express backend** (port 4000).  
They follow a **client-server** model:
- **Frontend (React):** handles UI and form submission.
- **Backend (Express):** saves messages into `messages.json`.

---

#### 7.2 Form Functionality  
The `contact.js` file defines a functional React component that:
1. Displays the form (`name`, `email`, `subject`, `message`).  
2. Uses React Hooks to manage state.  
3. Validates input before submission.  
4. Sends the data to `http://localhost:4000/messages` via Axios.  
5. Shows success or error feedback accordingly.  

---

#### 7.3 API & Message Storage  
Implemented in `api-server.js`:
- **POST /messages:** validates and stores data in `messages.json`.  
- **GET /messages:** retrieves stored messages for testing.  
Messages persist locally without using databases.

---

#### 7.4 Port Communication (3000 ↔ 4000)  
Using **CORS**, requests from `localhost:3000` to `localhost:4000` are allowed.  
The communication flow:
1. React sends the POST request.  
2. Express saves the data.  
3. A success response is returned to the client.  

---

#### 7.5 Production Server  
`server.js` serves the built files from `/dist`.  
In local mode:
- `npm start` → React app.  
- `node api-server.js` → API backend.  

This separation improves maintainability and debugging.

---

#### 7.6 Design & Accessibility  
- Semantic HTML labels for accessibility.  
- Visual feedback for errors and success.  
- Inline lightweight SVG for the LinkedIn icon.  
- Clear separation between logic (`contact.js`) and style (`contact.scss`).  

---


