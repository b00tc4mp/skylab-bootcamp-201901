import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import "./index.sass";
import AddComment from "./AddComment";
import logic from "../../logic";
import { withRouter } from "react-router-dom";

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
  email,
  location,
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

  // let currentLocation = location.pathname;
  // console.log(currentLocation);

  useEffect(() => {
    setComments(comments);
  }, [comments]);

  const removePost = () => {
    logic.removePost(postId).then(() => call());
  };

  console.log(location.pathname);

  return (
    <div className="instafood-card">
      <div className="instafood-card-header">
        <Link
          className="instafood-card-user-name"
          to={`/profile/${postUserId}`}
        >
          <img
            className="user-photo"
            src={`https://api.adorable.io/avatars/285/${email}.png`}
            alt="user"
          />
          {username}
        </Link>
        <div className="insta-food-favorites">
          <i
            className={`fas fa-star ${
              (userFavorites || []).map(f => f._id).includes(postId)
                ? "fav-icon-enable"
                : "fav-icon-disable"
            }`}
            onClick={toggleFavorite}
          />
          {countfavs && (
            <span className="instafood-favs">&nbsp; {countfavs}</span>
          )}
        </div>
      </div>
      <img className="instafood-image" src={image} alt="Post" />
      {title && <p className="instafood-title">{title}</p>}
      <div className="instafood-card-content">
        <div className="instafood-card-icons">
          {location.pathname === "/profile" ? (
            <i
              className="far fa-trash-alt instafood-remove"
              onClick={removePost}
            />
          ) : (
            ""
          )}
        </div>
        <div className="instafood-description">
          {description && (
            <p>
              {description.split(" ").map(res => {
                if (res.includes("#"))
                  return (
                    <Fragment>
                      <Link
                        className="hashtag"
                        to={`/search/${res.substring(1)}`}
                      >
                        {res}
                      </Link>
                      <span> </span>
                    </Fragment>
                  );
                return <span>{res + " "}</span>;
              })}
            </p>
          )}
        </div>

        <AddComment postId={postId} refreshComments={refreshComments} />
        <div className="instafood-comments">
          <details>
            <summary className="detail">View Comments</summary>
            {commentsPost &&
              commentsPost.map(comment => (
                <div className="comments-container" key={comment._id}>
                  <Link className="user-comment" to={`/profile/${postUserId}`}>
                    {comment.by.username}
                  </Link>
                  <p className="comments">{comment.body}</p>
                </div>
              ))}
          </details>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Card);
