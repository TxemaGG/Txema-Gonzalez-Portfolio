import React, { useEffect, useState } from "react";

const mainMessages = ["Bienvenida", "Welcome", "Ongi etorri"];
const otherMessages = [
  "Bienvenido", "Willkommen", "Bienvenue", "Benvenuto",
  "Bem-vindo", "欢迎", "ようこそ", "환영합니다", "स्वागत है",
  "Karibu", "Qamkuna", "Buiti binafi", "Sáabe t'aan",
  "Merħba", "Vitajte", "Tervetuloa", "Benvieniu", "أهلا وسهلا",
  "Benvido", "Benvingut",
];

const marginPercent = 20;
const animationDuration = 20000; // 20 segundos para la animación completa

function getRandomPosition() {
  const x = Math.random() * (100 - 2 * marginPercent) + marginPercent;
  const y = Math.random() * (100 - 2 * marginPercent) + marginPercent;
  return { x, y };
}

export default function WelcomeAnimation() {
  const [words, setWords] = useState([]);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setTimeElapsed(elapsed);

      let randomMessage = "";

      if (elapsed < 10000) {
        // primeros 10s solo mostrar los mensajes principales con más frecuencia
        if (Math.random() < 0.8) {
          randomMessage = mainMessages[Math.floor(Math.random() * mainMessages.length)];
        } else {
          randomMessage = otherMessages[Math.floor(Math.random() * otherMessages.length)];
        }
      } else {
        // después, mezcla de todos, pero mainMessages con mayor probabilidad
        if (Math.random() < 0.5) {
          randomMessage = mainMessages[Math.floor(Math.random() * mainMessages.length)];
        } else {
          randomMessage = otherMessages[Math.floor(Math.random() * otherMessages.length)];
        }
      }

      const id = Date.now();
      const { x, y } = getRandomPosition();

      setWords(prev => [...prev, { id, text: randomMessage, x, y }]);

      setTimeout(() => {
        setWords(prev => prev.filter(w => w.id !== id));
      }, animationDuration);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="welcome-animation">
      {words.map(word => (
        <span
          key={word.id}
          className="floating-word"
          style={{
            left: `${word.x}%`,
            top: `${word.y}%`,
            animationDuration: `${animationDuration}ms`,
          }}
        >
          {word.text}
        </span>
      ))}
    </div>
  );
}