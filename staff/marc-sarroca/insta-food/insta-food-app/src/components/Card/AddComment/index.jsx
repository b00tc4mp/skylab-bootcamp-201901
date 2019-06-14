import React, { useState } from "react";
import logic from "../../../logic";
import "./index.sass";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function AddComment({ postId, refreshComments }) {
  const [text, setText] = useState("");
  const handleAddComment = event => setText(event.target.value);
  const handleOnClick = event => {
    event.preventDefault();
    try {
      logic.addComment(postId, text).then(comment => {
        refreshComments(comment.comments);
        setText("");
      });
    } catch ({ message }) {
      notify(message);
    }
  };
  const notify = message => toast.warn(message);

  return (
    <div className="comments-container">
      <input
        className="comments-input"
        type="text"
        name="comment"
        onChange={handleAddComment}
        placeholder="Escribe tu comentario"
        autoFocus={false}
        value={text}
      />
      <button className="comment-button" onClick={handleOnClick}>
        Publicar
      </button>
    </div>
  );
}

export default AddComment;
