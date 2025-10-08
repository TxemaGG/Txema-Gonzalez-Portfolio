import React from "react";
import { Link } from "react-router-dom";

export default function() {
  return (
    <div>
      <h2>Writing</h2>

      <div>
        <Link to="/about-me">Conoce más sobre mi</Link>
      </div>
    </div>
  );
}