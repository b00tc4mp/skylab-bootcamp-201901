import React, { useState } from "react";
import logic from "../../../logic";
import Feedback from "../../../components/Feedback";
import "./index.sass";

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
    <div className="comments-container">
      <input
        className="comments-input"
        type="text"
        name="comment"
        onChange={handleAddComment}
        placeholder="Escribe tu comentario"
        autoFocus
      />
      {commentFeedback && <Feedback message={commentFeedback} />}
      <button className="comment-button" onClick={handleOnClick}>
        Publicar
      </button>
    </div>
  );
}

export default AddComment;
