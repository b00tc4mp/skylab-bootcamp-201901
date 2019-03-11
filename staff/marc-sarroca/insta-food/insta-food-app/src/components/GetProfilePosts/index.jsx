import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../userContext";
import logic from "../../logic";
import Card from "../../components/Card";

function GetProfilePost() {
  const { user } = useContext(UserContext);
  const { token } = user;
  const { id } = user;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = () => {
    logic.retrievePostByUser(id, token).then(posts => setPosts(posts));
  };

  return (
    <div className="card-listt">
      {posts.map(post => (
        <Card image={post.image} />
      ))}
    </div>
  );
}

export default GetProfilePost;
