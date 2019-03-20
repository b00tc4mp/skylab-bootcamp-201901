import React, { useState, useContext, useEffect, Fragment } from "react";
import { UserContext } from "../../userContext";
import logic from "../../logic";
import Card from "../../components/Card";
import { withRouter } from "react-router-dom";
import "./index.sass";

function ProfilePost({ match }) {
  const { user } = useContext(UserContext);
  const { id } = user;
  const [postsUser, setPostsUser] = useState([]);
  const [numPost, setnumPost] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);

  useEffect(() => {
    const postUserId = match.params.userId;
    getUserPosts(postUserId);
  }, []);

  useEffect(() => {
    postsUser.post && setnumPost(postsUser.post.length);
  }, [postsUser]);

  const retrieveUserFavs = () => {
    logic.retrieveUser().then(user => setUserFavorites(user.favorites));
  };

  const getUserPosts = (postUserId = id) => {
    logic.retrievePostByUser(postUserId).then(res => {
      setPostsUser(res);
      window.scrollTo(0, 0);
    });
  };

  return (
    <Fragment>
      <div className="header-container">
        <img
          className="user-photo-profile"
          src={`https://api.adorable.io/avatars/285/${id}.png`}
          alt="user"
        />
        <div className="user-container">
          <h2 className="profile-username">
            {postsUser.user && postsUser.user.username}
          </h2>
          <span>Tienes {numPost} publicaciones</span>
        </div>
      </div>
      {postsUser.post &&
        postsUser.post.map(post => (
          <Card
            key={post._id}
            title={post.title}
            image={post.image}
            description={post.description}
            comments={post.comments}
            countfavs={post.countfavs}
            postId={post && post._id}
            userFavorites={userFavorites}
            call={getUserPosts}
            call2={retrieveUserFavs}
            date={post.date}
          />
        ))}
    </Fragment>
  );
}

export default withRouter(ProfilePost);
