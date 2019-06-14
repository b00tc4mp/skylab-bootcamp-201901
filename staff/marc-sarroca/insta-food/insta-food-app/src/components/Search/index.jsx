import React, { useState, Fragment, useEffect } from "react";
import logic from "../../logic";
import Card from "../../components/Card";
import { withRouter } from "react-router-dom";
import "./index.sass";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function Search({ history, match }) {
  const [posts, setPosts] = useState([]);
  const [tag, setTag] = useState("");
  const [userFavorites, setUserFavorites] = useState([]);
  const handleHashtagInput = event => setTag(event.target.value);

  const searchByTag = async initTag => {
    logic
      .retrieveAllPosts()
      .then(posts => {
        const filtered = posts.docs.filter(obj =>
          obj.tags.includes(`#${initTag}`)
        );
        setPosts(filtered);
        window.scrollTo(0, 0);
        if (filtered.length === 0) {
          notify("No results");
        }
      })
      .catch(({ message }) => notify(message));
  };

  const retrieveUserFavs = () => {
    logic.retrieveUser().then(user => setUserFavorites(user.favorites));
  };

  const handleClick = event => {
    event.preventDefault();
    history.push(`/search/${tag}`);
  };

  const notify = message => toast.warn(message);

  useEffect(() => {
    retrieveUserFavs();
    const initTag = match.params.tag;
    if (initTag) searchByTag(initTag);
  }, [match.params.tag]);
  return (
    <Fragment>
      <div className="add-post">
        <form className="search-container" onSubmit={handleClick}>
          <input
            className="search-input"
            type="text"
            name="title"
            onChange={handleHashtagInput}
            placeholder="Search by tag"
          />
        </form>
      </div>
      <div className="card-list load">
        {posts &&
          posts.map(post => (
            <Card
              username={post.user_id.username}
              key={post._id}
              title={post.title}
              image={post.image}
              description={post.description}
              comments={post.comments}
              postId={post._id}
              searchByTag={searchByTag}
              userFavorites={userFavorites}
              countfavs={post.countfavs}
              date={post.date}
              call={retrieveUserFavs}
              postUserId={post.user_id._id}
            />
          ))}
      </div>
    </Fragment>
  );
}

export default withRouter(Search);
