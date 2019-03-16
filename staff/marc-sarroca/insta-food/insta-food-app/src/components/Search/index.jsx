import React, { useState, Fragment, useEffect } from "react";
import logic from "../../logic";
import Card from "../../components/Card";
import { withRouter } from "react-router-dom";
import Feedback from "../Feedback";

function Search({ history, match }) {
  const [posts, setPosts] = useState([]);
  const [tag, setTag] = useState("");
  const handleHashtagInput = event => setTag(event.target.value);
  const [searchFeedback, setSearchFeedback] = useState(null);

  const searchByTag = initTag => {
    try {
      logic
        .retrieveAllPosts()
        .then(posts => {
          posts.filter(obj => obj.tags.includes(`#${initTag}`));
        })
        .then(posts => {
          if (posts === undefined) {
            setSearchFeedback("No founds results");
          } else setPosts(posts);
        })
        .catch(({ message }) => setSearchFeedback(message));
    } catch ({ message }) {
      setSearchFeedback(message);
    }
  };

  const handleClick = () => {
    history.push(`/search/${tag}`);
  };

  useEffect(() => {
    const initTag = match.params.tag;
    searchByTag(initTag);
  }, [match.params.tag]);

  return (
    <Fragment>
      <div>
        <input
          type="text"
          name="title"
          onChange={handleHashtagInput}
          placeholder="Put your title"
        />
        <button onClick={handleClick}>Search by posts</button>
        {searchFeedback && <Feedback message={searchFeedback} />}
      </div>

      <div className="card-list">
        {posts &&
          posts.map(post => (
            <Card
              key={post._id}
              title={post.title}
              image={post.image}
              description={post.description}
              comments={post.comments}
            />
          ))}
      </div>
    </Fragment>
  );
}

export default withRouter(Search);
