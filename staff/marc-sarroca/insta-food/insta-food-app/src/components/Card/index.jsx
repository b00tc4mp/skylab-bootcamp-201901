import React, { Fragment } from "react";
import "./index.sass";

function Card({ title, image, description, comments }) {
  console.log(comments);
  return (
    <div className="card">
      <p>{title}</p>
      <img className="post-image" src={image} alt="Post" />
      <p>{description}</p>
      {comments ? (
        comments.map(comment => (
          <Fragment>
            <p>Comentario: </p> <p>{comment.body}</p>
          </Fragment>
        ))
      ) : (
        <span />
      )}
    </div>
  );
}

export default Card;
