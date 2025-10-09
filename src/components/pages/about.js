import React, { Component } from "react";
import "../../style/about.scss";

export default class About extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lang: "es"
    };

    this.handleLanguageChange = this.handleLanguageChange.bind(this);
  }

  handleLanguageChange(lang) {
    this.setState({ lang: lang });
  }

  render() {
    const textEs = `Una familia con una gran mujer y dos niños preciosos. El amor a la montaña y a los libros. Una licenciatura y tres masters. Más de 25 años sumergido en el diseño y ejecución de programas y proyectos. Voluntario, técnico, analista o coordinador de proyectos en diferentes organizaciones y espacios de trabajo. Comenzando en asociaciones y fundaciones del tercer sector, pasando por el Ministerio de Asuntos Exteriores y por organismos internacionales de Naciones Unidas y terminando en la administración pública local, donde ahora estoy, en el Ayuntamiento de Bilbao. Muchas vivencias, en muchas ciudades y en muchos países. Decenas de problemas y cientos de soluciones. Recién terminada mi formación como Fullstack Developer en la Bottega University de Estados Unidos de Norteamérica. Ha llegado mi hora de afrontar un nuevo reto laboral. Aspiro a convertirme en un buen project manager del sector tecnológico. Logrando objetivos, interpretando datos, uniendo código y personas. Por cierto, yo he desarrollado este portafolio, con Java Script y con mucho REACT. ¿Trabajamos?`;

    const textEn = `A family with a great woman and two lovely children. Loving the mountains and books. One bachelor's degree and three master's degrees. More than 25 years immersed in the design and implementation of programmes and projects. Volunteer, technician, analyst or project coordinator in different organisations and workplaces. Starting in third sector associations and foundations, moving on to the Ministry of Foreign Affairs and international organisations of the United Nations, and ending up in local public administration, where I am now, at Bilbao City Council. Many experiences, in many cities and many countries. Dozens of problems and hundreds of solutions. I have just completed my training as a Fullstack Developer at Bottega University in the United States of America. The time has come to change my professional challenge. I aspire to become a good project manager in the technology sector. Achieving goals, interpreting data, bringing together code and people. By the way, I developed this portfolio using JavaScript, with a lot of REACT. Shall we work together?`;

    const text = this.state.lang === "es" ? textEs : textEn;

    return (
      <div className="about-wrapper">
        <div className="about-container">
          <img
            src={require("../../../static/assets/images/auth/bio.png")}
            alt="Txema González"
            className="about-photo"
          />

          <div className="about-content">
            <h3>Sobre mí...</h3>

            <div className="lang-buttons">
              <button
                className={
                  this.state.lang === "es"
                    ? "lang-btn active"
                    : "lang-btn"
                }
                onClick={() => this.handleLanguageChange("es")}
              >
                ES
              </button>
              <button
                className={
                  this.state.lang === "en"
                    ? "lang-btn active"
                    : "lang-btn"
                }
                onClick={() => this.handleLanguageChange("en")}
              >
                EN
              </button>
            </div>

            <p>{text}</p>
          </div>
        </div>
      </div>
    );
  }
}