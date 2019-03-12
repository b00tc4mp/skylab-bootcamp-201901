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

  console.log(posts);

  return (
    <Masonry
      elementType={"section"}
      options={masonryOptions}
      disableImagesLoaded={false}
      updateOnEachImageLoad={false}
    >
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
    </Masonry>
  );
}

export default CardList;
