import React from "react";

function Results({ results, onItemClick }) {
  return (
    <section className="results container">
      <ul classname="ul">
        {results.map(({ id, name, images }) => (
          <li key={id} onClick={() => onItemClick(id)}>
            <img
              className="images"
              src={
                images[0]
                  ? images[0].url
                  : "https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png"
              }
              alt="artis-image"
            />
            {name}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Results;
