import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../userContext";
import logic from "../../logic";
import Card from "../../components/Card";
import Masonry from "react-masonry-component";

function CardList() {
  const masonryOptions = {
    transitionDuration: 0,
    gutter: 20
  };
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

  return (
    <Masonry
      elementType={"section"}
      options={masonryOptions}
      disableImagesLoaded={false}
      updateOnEachImageLoad={false}
    >
      {posts.map(post => (
        <Card
          key={post._id}
          title={post.title}
          image={post.image}
          description={post.description}
          comments={post.comments}
          postId={post._id}
          username={post.user_id.username}
          postUserId={post.user_id._id}
          userFavorites={userFavorites}
          call={updatePosts}
          countfavs={post.countfavs}
        />
      ))}
    </Masonry>
  );
}

export default CardList;
