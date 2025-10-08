import React from "react";
import WelcomeAnimation from "../WelcomeAnimation"; 
import "../../style/WelcomeAnimation.scss";

export default function Home() {
  return (
    <div className="home-page">
      <WelcomeAnimation />
    </div>
  );
}