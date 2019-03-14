import React, { Fragment, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./index.sass";
import AddComment from "./AddComment";
import logic from "../../logic";
import { UserContext } from "../../userContext";

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
  call
}) {
  const [commentsPost, setComments] = useState("");
  const { user } = useContext(UserContext);
  const { token } = user;
  const toggleFavorite = event => {
    event.preventDefault();
    logic.toggleFavorites(token, postId).then(() => {
      call();
    });
  };

  const refreshComments = comments => {
    setComments(comments);
  };

  useEffect(() => {
    setComments(comments);
  }, [comments]);

  console.log(commentsPost);

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
      <AddComment postId={postId} refreshComments={refreshComments} />
      {description && (
        <p>
          {description.split(" ").map(res => {
            if (res.includes("#"))
              return (
                <Fragment>
                  <Link to={`/search/${res.substring(1)}`}>{res}</Link>
                  <span> </span>
                </Fragment>
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
