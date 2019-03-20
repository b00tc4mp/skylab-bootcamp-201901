import React, { useState, useContext, useEffect, Fragment } from "react";
import { UserContext } from "../../userContext";
import { withRouter } from "react-router-dom";
import logic from "../../logic";
import Card from "../../components/Card";
import "./index.sass";

function CardList(props) {
  const { user } = useContext(UserContext);
  const { token } = user;
  const [posts, setPosts] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);
  const [page, setPage] = useState(1);
  const [setn] = useState(false);

  window.scrollTo(0, 0);

  useEffect(() => {
    getPosts();
    retrieveUserFavs();
  }, []);

  window.onscroll = () => {
    if (!document.getElementById("load")) return;
    if (
      document.getElementById("load").offsetHeight -
        document.body.offsetHeight <=
      window.scrollY
    ) {
      handleClick();
    }
  };

  const retrieveUserFavs = () => {
    let y = window.scrollY;
    logic
      .retrieveUser(token)
      .then(user => setUserFavorites(user.favorites))
      .then(() => page !== 1 && window.scrollTo(0, y));
  };

  const getPosts = () => {
    let y = window.scrollY;
    logic
      .retrieveAllPosts(page)
      .then(p => {
        if (p.docs.length) {
          setPosts([...posts, ...p.docs]);
        } else {
          setn(true);
        }
      })
      .then(() => setPage(page + 1))
      .then(() => page !== 1 && window.scrollTo(0, y));
  };

  const updatePosts = () => {
    retrieveUserFavs();
  };

  const handleClick = () => {
    getPosts();
  };
  return (
    <Fragment>
      <div className="load">
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
            email={post.user_id.email}
            path={props.location.pathname}
            date={post.date}
          />
        ))}
      </div>
    </Fragment>
  );
}

export default withRouter(CardList);
