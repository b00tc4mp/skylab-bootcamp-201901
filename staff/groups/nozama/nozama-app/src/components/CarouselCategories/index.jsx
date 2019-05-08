import React from 'react';

export default function CarouselCategories(props) {
  return (
    <div className="container mt-4">
      <div className="row">
        <h3 className="display-5">{props.title}</h3>
      </div>
      <div id="CarouselCategories" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          {props.products.map((p,i) => (
            <li key={Math.random()} data-target="#CarouselCategories" data-slide-to={`${i}`} className={i === 0 ? 'active' : '' } />
            ))}
        </ol>
        <div className="carousel-inner">
          {props.products.map((product,i) => (
            <div key={product.imageSmall} className={`carousel-item ${i === 0 ? 'active' : '' }`}>
              <div className="carousel-caption d-md-block text-dark" style={{ bottom: 'inherit'}}>
                <h4>{product.subtitle}</h4>
              </div>
              <img src={product.imageSmall} className="d-block w-100"/>
            </div>
          ))}
        </div>
        <a
          className="carousel-control-prev"
          href="#CarouselCategories"
          role="button"
          data-slide="prev"
          >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#CarouselCategories"
          role="button"
          data-slide="next"
          >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </a>
      </div>
          </div>
  );
}

