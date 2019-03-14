import React, { useState, useContext, Fragment } from "react";
import { UserContext } from "../../../userContext";
import logic from "../../../logic";

function AddComment({ postId, refreshComments }) {
  const { user } = useContext(UserContext);
  const { token } = user;
  const { id } = user;
  const [text, setText] = useState("");
  const handleAddComment = event => setText(event.target.value);
  const handleOnClick = event => {
    event.preventDefault();
    logic.addComment(postId, token, id, text).then(comment => {
      refreshComments(comment.comments);
    });
  };

  return (
    <Fragment>
      <input
        type="text"
        name="comment"
        onChange={handleAddComment}
        placeholder="Put yout comment"
      />
      <button onClick={handleOnClick}>Send your comment</button>
    </Fragment>
  );
}

export default AddComment;
