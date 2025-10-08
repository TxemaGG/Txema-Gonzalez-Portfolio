import React from "react";

export default function PortfolioItem(props) {
  const { name, description, thumb_image_url, url } = props.item;

  return (
    <div className="portfolio-item-wrapper">
      <img src={thumb_image_url} alt={`Imagen de ${name}`} />
      <div className="portfolio-name">{name}</div>
      <div className="portfolio-description">{description}</div>
      <a href={url} target="_blank" rel="noopener noreferrer">
        Quieres saber más...
      </a>
    </div>
  );
}