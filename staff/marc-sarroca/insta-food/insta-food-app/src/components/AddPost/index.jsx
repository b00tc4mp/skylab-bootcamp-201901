import React, { useState } from "react";
import logic from "../../logic";
import storage from "../../firebase";
import Feedback from "../Feedback";
import { withRouter } from "react-router-dom";
import "./index.sass";

function AddPost({ history }) {
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [image, setImage] = useState(null);
  const [percentage, setPercentage] = useState(0);
  const [addFeedback, setAddFeedback] = useState(null);

  const handleTitleInput = event => setTitle(event.target.value);
  const handleDescriptionInput = event => setDescription(event.target.value);

  const handleFormSubmit = event => {
    try {
      event.preventDefault();
      logic
        .createPost(title, description, image)
        .then(() => history.push("/profile"));
    } catch ({ message }) {
      showAddFeedback(message);
    }
  };
  const hideAddFeedback = () => setAddFeedback(null);
  const showAddFeedback = message => {
    setAddFeedback(message);
    setTimeout(hideAddFeedback, 2000);
  };

  const handleImageInput = e => {
    const file = e.target.files[0];
    const id = Date.now();
    const storageRef = storage.ref(`images/${id}`);
    const task = storageRef.put(file);

    task.on(
      "state_changed",
      snapshot => {
        const percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPercentage(percentage);

        //pushToLogin(percentage);
      },
      error => {
        setAddFeedback(error.message);
      },
      () => {
        // Upload complete
        task.snapshot.ref.getDownloadURL().then(downloadURL => {
          setImage(downloadURL);
        });
      }
    );
  };

  return (
    <div className="add-post">
      <form autocomplete="off" onSubmit={handleFormSubmit}>
        <fieldset>
          <input
            className="post-input"
            type="text"
            name="title"
            onChange={handleTitleInput}
            placeholder="Titulo del post"
          />
          <div class="after" />
        </fieldset>
        <fieldset>
          <textarea
            className="post-input area"
            type="text"
            name="description"
            onChange={handleDescriptionInput}
            placeholder="Descriptcion del post"
          />
          <div class="after" />
        </fieldset>
        <fieldset className="custom-file-upload">
          <input
            type="file"
            name="image"
            className="filew"
            onChange={handleImageInput}
            placeholder="title"
          />
        </fieldset>
        <div className="bar-progress">
          <div className="bar" style={{ width: `${percentage}%` }} />
        </div>
        <button className="post-button">Create Post</button>
      </form>
      {addFeedback && <Feedback message={addFeedback} />}
    </div>
  );
}
export default withRouter(AddPost);
