import React, { useEffect, useState, Fragment, useContext } from "react";
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
  location,
  date,
  call = () => {},
  call2 = () => {}
}) {
  const [commentsPost, setComments] = useState("");
  const [total, setTotal] = useState(countfavs);
  const [y, setY] = useState("");
  const [m, setM] = useState("");
  const [d, setD] = useState("");
  const [h, setH] = useState("");
  const [min, setMin] = useState("");
  const [s, setS] = useState("");
  const toggleFavorite = event => {
    if (location.pathname === "/profile") return;
    event.preventDefault();
    logic.toggleFavorites(postId).then(() => {
      call2();
      call();
      (userFavorites || []).map(f => f._id).includes(postId)
        ? setTotal(total - 1)
        : setTotal(total + 1);
    });
  };
  const dateRefactor = new Date(date);
  const refreshComments = comments => {
    setComments(comments);
  };
  useEffect(() => {
    setComments(comments);
  }, [comments]);

  const removePost = () => {
    logic.removePost(postId).then(() => call());
  };
  useEffect(() => {
    setY(dateRefactor.getFullYear());
    setM(dateRefactor.getMonth() + 1);
    setD(dateRefactor.getDate());
    let hour = dateRefactor.getHours();
    if (Number(hour) < 10) hour = "0" + hour;
    setH(hour);
    let minutes = dateRefactor.getMinutes();
    if (Number(minutes) < 10) minutes = "0" + minutes;
    setMin(minutes);
    let seconds = dateRefactor.getSeconds();
    if (Number(seconds) < 10) seconds = "0" + seconds;
    setS(seconds);
  }, []);
  console.log(location.pathname);
  return (
    <div className="instafood-card">
      <div className="instafood-card-header">
        <Link
          className="instafood-card-user-name"
          to={`/profile/${postUserId}`}
        >
          {location.pathname.includes("/posts") ||
          location.pathname.includes("/search") ? (
            <img
              className="user-photo"
              src={`https://api.adorable.io/avatars/285/${postUserId}.png`}
              alt="user"
            />
          ) : (
            ""
          )}
          {location.pathname === "/posts" || "/search" ? (
            <span>{username}</span>
          ) : (
            ""
          )}
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
          {total && <span className="instafood-favs">&nbsp; {total}</span>}
        </div>
      </div>
      <img className="instafood-image" src={image} alt="Post" />
      <p className="date">
        {d}-{m}-{y}
      </p>
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
              commentsPost.reverse().map(comment => (
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
