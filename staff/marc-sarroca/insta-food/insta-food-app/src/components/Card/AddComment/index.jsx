import React, { useState, Fragment } from "react";
import logic from "../../../logic";
import Feedback from "../../../components/Feedback";

function AddComment({ postId, refreshComments }) {
  const [text, setText] = useState("");
  const [commentFeedback, setCommentFeedback] = useState(null);
  const handleAddComment = event => setText(event.target.value);
  const handleOnClick = event => {
    event.preventDefault();
    try {
      logic.addComment(postId, text).then(comment => {
        refreshComments(comment.comments);
      });
    } catch ({ message }) {
      showCommentFeedback(message);
    }
  };
  const hideCommentFeedback = () => setCommentFeedback(null);
  const showCommentFeedback = message => {
    setCommentFeedback(message);
    setTimeout(hideCommentFeedback, 2000);
  };

  return (
    <Fragment>
      <input
        type="text"
        name="comment"
        onChange={handleAddComment}
        placeholder="Put yout comment"
      />
      {commentFeedback && <Feedback message={commentFeedback} />}
      <button onClick={handleOnClick}>Send your comment</button>
    </Fragment>
  );
}

export default AddComment;
