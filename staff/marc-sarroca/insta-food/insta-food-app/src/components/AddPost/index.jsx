import React, { useState } from "react";
import logic from "../../logic";
import storage from "../../firebase";
import { withRouter } from "react-router-dom";
import "./index.sass";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function AddPost({ history }) {
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [image, setImage] = useState(null);
  const [percentage, setPercentage] = useState(0);

  const handleTitleInput = event => setTitle(event.target.value);
  const handleDescriptionInput = event => setDescription(event.target.value);

  const handleFormSubmit = event => {
    try {
      event.preventDefault();
      logic
        .createPost(title, description, image)
        .then(() => history.push("/profile"));
    } catch ({ message }) {
      notify(message);
    }
  };
  const notify = message => toast.warn(message);
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
        notify(error.message);
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
    </div>
  );
}
export default withRouter(AddPost);
