import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../userContext";
import logic from "../../logic";
import Card from "../../components/Card";

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

  console.log(posts);

  return (
    <div className="card-listt">
      {posts.map(post => (
        <Card
          title={post.title}
          image={post.image}
          description={post.description}
          comments={post.comments}
          postId={post._id}
        />
      ))}
    </div>
  );
}

export default CardList;
