import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../userContext";
import logic from "../../logic";
import Card from "../../components/Card";
import { withRouter } from "react-router-dom";

function GetProfilePost({ match }) {
  const { user } = useContext(UserContext);
  const { token } = user;
  const { id } = user;
  const [postsUser, setPostsUser] = useState([]);

  useEffect(() => {
    const postUserId = match.params.userId;
    getUserPosts(postUserId);
  }, []);

  const getUserPosts = (postUserId = id) => {
    logic
      .retrievePostByUser(postUserId, token)
      .then(res => setPostsUser(res.post));
  };

  return (
    <div className="card-listt">
      {postsUser.map(post => (
        <Card key={post._id} image={post.image} />
      ))}
    </div>
  );
}

export default withRouter(GetProfilePost);
