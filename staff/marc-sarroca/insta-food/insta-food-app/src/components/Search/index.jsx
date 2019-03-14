import React, { useState, Fragment, useEffect } from "react";
import logic from "../../logic";
import Card from "../../components/Card";
import { withRouter } from "react-router-dom";

function Search({ history, match }) {
  const [posts, setPosts] = useState([]);
  const [tag, setTag] = useState("");
  const handleHashtagInput = event => setTag(event.target.value);

  const searchByTag = initTag => {
    logic
      .retrieveAllPosts()
      .then(posts => posts.filter(obj => obj.tags.includes(`#${initTag}`)))
      .then(posts => setPosts(posts));
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
