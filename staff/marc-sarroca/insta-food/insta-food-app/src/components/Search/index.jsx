import React, { useState, useContext, Fragment } from "react";
import logic from "../../logic";
import { UserContext } from "../../userContext";
import Card from "../../components/Card";

function Search() {
  const [hashtag, setHashTag] = useState(false);
  const [input, setInput] = useState("");
  const { user } = useContext(UserContext);
  const { token } = user;
  const handleHashtagInput = event => setInput(event.target.value);

  const onHandleOnClick = event => {
    event.preventDefault();
    logic
      .retrieveAllPosts(token)
      .then(posts => posts.filter(obj => obj.tags.includes(`#${input}`)))
      .then(hashtagPost => setHashTag(hashtagPost));
  };

  console.log(hashtag);
  return (
    <Fragment>
      <div>
        <input
          type="text"
          name="title"
          onChange={handleHashtagInput}
          placeholder="Put your title"
        />
        <button onClick={onHandleOnClick}>Search by hashtag</button>
      </div>
      <div className="card-list">
        {hashtag &&
          hashtag.map(post => (
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

export default Search;
