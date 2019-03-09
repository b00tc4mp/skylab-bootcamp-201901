import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../userContext";
import logic from "../../logic";

function CardList() {
  const { user } = useContext(UserContext);
  const { token } = user;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = () => {
    logic.retrieveAllPosts(token).then(posts => setPosts(posts));
  };
  return (
    <div className="card-lsit">
      {posts.map(post => (
        <p>{post._id}</p>
      ))}
    </div>
  );
}

export default CardList;
