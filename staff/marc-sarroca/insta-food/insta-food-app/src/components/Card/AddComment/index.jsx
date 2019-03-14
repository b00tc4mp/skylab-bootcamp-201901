import React, { useState, Fragment } from "react";
import logic from "../../../logic";

function AddComment({ postId, refreshComments }) {
  const [text, setText] = useState("");
  const handleAddComment = event => setText(event.target.value);
  const handleOnClick = event => {
    event.preventDefault();
    logic.addComment(postId, text).then(comment => {
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
