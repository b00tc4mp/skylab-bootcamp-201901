import React, { useState } from "react";
import { Route, withRouter } from "react-router-dom";
import Login from "../Login";
import Register from "../Register";
import ProfilePage from "../../pages/Profile";
import HomePage from "../../pages/Home";
import FavsPage from "../../pages/Favs";
import ListPage from "../../pages/List";
import SearchPage from "../../pages/Search";
import AddPostPage from "../../pages/AddPost";
import logic from "../../logic";
import useUser from "../../logic/user";
import ButtonBar from "../ButtonBar";
import "./index.sass";

function App(props) {
  const [registerFeedback, setRegisterFeedback] = useState(null);
  const { user } = useUser();

  const handleRegister = (
    name,
    username,
    email,
    password,
    passwordConfirmation
  ) => {
    try {
      logic
        .registerUser(name, username, email, password, passwordConfirmation)
        .then(() => props.history.push("/login"))
        .catch(({ message }) => setRegisterFeedback(message));
    } catch ({ message }) {
      setRegisterFeedback(message);
    }
  };
  return (
    <main className="app">
      <Route
        path="/"
        exact
        render={() => (user ? <ProfilePage /> : <HomePage />)}
      />
      <Route
        path="/register"
        render={() => (
          <Register onRegister={handleRegister} feedback={registerFeedback} />
        )}
      />
      <Route path="/login" render={() => <Login />} />
      <Route path="/profile" render={() => <ProfilePage />} />
      <Route path="/favorites" render={() => <FavsPage />} />
      <Route path="/posts" render={() => <ListPage />} />
      <Route path="/search" render={() => <SearchPage />} />
      <Route path="/add" render={() => <AddPostPage />} />
      <ButtonBar />
    </main>
  );
}

export default withRouter(App);
