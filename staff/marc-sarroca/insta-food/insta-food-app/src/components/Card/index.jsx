import React, { Fragment } from "react";
import "./index.sass";

function Card({ title, image, description, comments }) {
  return (
    <div className="card">
      {title && <p>{title}</p>}
      <img className="post-image" src={image} alt="Post" />
      {description && <p>{description}</p>}
      {comments &&
        comments.map(comment => (
          <Fragment>
            <p>Comentario: </p> <p>{comment.body}</p>
          </Fragment>
        ))}
    </div>
  );
}

export default Card;
