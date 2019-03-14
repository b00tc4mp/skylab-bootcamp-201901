import React, { useState } from "react";
import logic from "../../logic";
import storage from "../../firebase";

function AddPost() {
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [image, setImage] = useState(null);
  const [percentage, setPercentage] = useState(0);

  const handleTitleInput = event => setTitle(event.target.value);
  const handleDescriptionInput = event => setDescription(event.target.value);

  const handleFormSubmit = event => {
    event.preventDefault();
    logic.createPost(title, description, image);
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
      },
      error => {
        console.error(error.message);
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
    </div>
  );
}
export default AddPost;
