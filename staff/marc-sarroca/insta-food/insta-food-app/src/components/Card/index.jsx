import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.sass";
import AddComment from "./AddComment";
import logic from "../../logic";

function Card({
  title,
  image,
  description,
  comments,
  postId,
  userFavorites,
  username,
  postUserId,
  countfavs,
  call = () => {}
}) {
  const [commentsPost, setComments] = useState("");
  const toggleFavorite = event => {
    event.preventDefault();
    logic.toggleFavorites(postId).then(() => {
      call();
    });
  };

  const refreshComments = comments => {
    setComments(comments);
  };

  useEffect(() => {
    setComments(comments);
  }, [comments]);

  const removePost = () => {
    logic.removePost(postId).then(() => call());
  };

  return (
    <div className="card">
      <Link to={`/profile/${postUserId}`}>{username}</Link>
      {title && <p>{title}</p>}
      <img className="post-image" src={image} alt="Post" />
      <i
        className={`fas fa-star ${
          (userFavorites || []).map(f => f._id).includes(postId)
            ? "fav-icon-enable"
            : "fav-icon-disable"
        }`}
        onClick={toggleFavorite}
      />
      {countfavs && <p>{countfavs}</p>}
      <i className="far fa-trash-alt" onClick={removePost} />
      <AddComment postId={postId} refreshComments={refreshComments} />
      {description && (
        <p>
          {description.split(" ").map(res => {
            if (res.includes("#"))
              return (
                <div>
                  <Link to={`/search/${res.substring(1)}`}>{res}</Link>
                  <span> </span>
                </div>
              );
            return <span>{res + " "}</span>;
          })}
        </p>
      )}
      {commentsPost &&
        commentsPost.map(comment => (
          <div key={comment._id}>
            <p>Comentario: </p>
            <p>{comment.body}</p>
            <p>Usuario: </p>
            <Link to={`/profile/${postUserId}`}>{comment.by.username}</Link>
          </div>
        ))}
    </div>
  );
}

export default Card;
