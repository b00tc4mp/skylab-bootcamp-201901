import React, { Fragment, useEffect, useState } from "react";
import "./index.sass";
import AddComment from "../AddComment";

function Card({ title, image, description, comments, postId }) {
  const [commentsPost, setComments] = useState("");
  console.log(comments);
  const refreshComments = comments => {
    setComments(comments);
  };

  useEffect(() => {
    setComments(comments);
  }, [comments]);
  return (
    <div className="card">
      {title && <p>{title}</p>}
      <img className="post-image" src={image} alt="Post" />
      {description && <p>{description}</p>}
      {commentsPost &&
        commentsPost.map(comment => (
          <Fragment>
            <p>Comentario: </p>
            <p>{comment.body}</p>
            <p>Usuario: </p>
            <p>{comment.by.username}</p>
          </Fragment>
        ))}
      <AddComment postId={postId} refreshComments={refreshComments} />
    </div>
  );
}

export default Card;
