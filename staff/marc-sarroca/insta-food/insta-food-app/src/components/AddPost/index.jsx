import React, { useState } from "react";
import logic from "../../logic";
import storage from "../../firebase";
import Feedback from "../Feedback";
import { withRouter } from "react-router-dom";

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
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="title"
          onChange={handleTitleInput}
          placeholder="Put your title"
        />
        <br />
        <input
          type="text"
          name="description"
          onChange={handleDescriptionInput}
          placeholder="description"
        />
        <br />
        <input
          type="file"
          name="image"
          onChange={handleImageInput}
          placeholder="title"
        />
        <br />
        <p>{percentage} %</p>
        <button>Create Post</button>
      </form>
      {addFeedback && <Feedback message={addFeedback} />}
    </div>
  );
}
export default withRouter(AddPost);
