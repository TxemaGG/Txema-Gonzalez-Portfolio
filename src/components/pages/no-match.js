import React from "react";
import { Link } from "react-router-dom";

export default function() {
  return (
    <div>
      <h2>¡Que pena! No pudimos encontrar la página...</h2>
      <Link to="/">Return to homepage</Link>
    </div>
  );
}