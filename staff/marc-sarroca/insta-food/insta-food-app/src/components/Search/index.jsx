import React, { useState, useContext } from "react";
import logic from "../../logic";
import { UserContext } from "../../userContext";

function Search() {
  const [hashtag, setHashTag] = useState("");
  const { user } = useContext(UserContext);
  const { token } = user;
  const handleHashtagInput = event => setHashTag(event.target.value);

  const onHandleOnClick = event => {
    event.preventDefault();
    logic
      .retrieveAllPosts(token)
      .then(posts => posts.filter(obj => obj.tags.includes(hashtag)))
      .then(hashtagPost => setHashTag(hashtagPost));
  };

  console.log(hashtag);
  return (
    <div>
      <input
        type="text"
        name="title"
        onChange={handleHashtagInput}
        placeholder="Put your title"
      />
      <button onClick={onHandleOnClick}>Search by hashtag</button>
    </div>
  );
}

export default Search;
