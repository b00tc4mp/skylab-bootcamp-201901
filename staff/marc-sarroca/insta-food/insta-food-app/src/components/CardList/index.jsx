import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../userContext";
import logic from "../../logic";
import Card from "../../components/Card";

function CardList() {
  const { user } = useContext(UserContext);
  const { token } = user;
  const [posts, setPosts] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);

  useEffect(() => {
    getPosts();
    retrieveUserFavs();
  }, []);

  const retrieveUserFavs = () => {
    logic.retrieveUser(token).then(user => setUserFavorites(user.favorites));
  };

  const getPosts = () => {
    logic.retrieveAllPosts(token).then(posts => setPosts(posts.reverse()));
  };

  const updatePosts = () => {
    getPosts();
    retrieveUserFavs();
  };

  console.log(posts);

  return (
    <div className="card-list">
      {posts.map(post => (
        <Card
          title={post.title}
          image={post.image}
          description={post.description}
          comments={post.comments}
          postId={post._id}
          userFavorites={userFavorites}
          call={updatePosts}
        />
      ))}
    </div>
  );
}

export default CardList;
