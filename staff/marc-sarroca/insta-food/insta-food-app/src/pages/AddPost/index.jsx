import React from "react";
import "./index.sass";
import AddPost from "../../components/AddPost";

function AddPostPage() {
  return (
    <section>
      <h1 className="page-title">Add your Post</h1>
      <AddPost />
    </section>
  );
}

export default AddPostPage;
