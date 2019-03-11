import React, { Fragment } from "react";
import "./index.sass";
import GetProfilePost from "../../components/GetProfilePosts";

function ProfilePage() {
  return (
    <Fragment>
      <h1 className="page-title">Profile</h1>
      <GetProfilePost />
    </Fragment>
  );
}

export default ProfilePage;
