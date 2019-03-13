import React, { useEffect, Fragment } from "react";
import { Route, withRouter, Redirect } from "react-router-dom";
import { UserContext } from "../../userContext";
import Login from "../Login";
import Register from "../Register";
import ProfilePage from "../../pages/Profile";
import HomePage from "../../pages/Home";
import FavsPage from "../../pages/Favs";
import ListPage from "../../pages/List";
import SearchPage from "../../pages/Search";
import AddPostPage from "../../pages/AddPost";
import LoadingPage from "../../pages/Loading";
import useUser from "../../logic/user";
import ButtonBar from "../ButtonBar";
import "./index.sass";

function App(props) {
  const { userState, getUser, logout, login } = useUser();
  const { user, isUserLoading, userError } = userState;

  useEffect(() => {
    getUser();
  }, []);

  const renderRoutes = () => (
    <Fragment>
      <Route
        path="/"
        exact
        render={() => (user ? <Redirect to="/posts" /> : <HomePage />)}
      />
      <Route
        path="/register"
        render={() => (user ? <Redirect to="/posts" /> : <Register />)}
      />
      <Route
        path="/login"
        render={() => (user ? <Redirect to="/posts" /> : <Login />)}
      />
      <Route
        path="/profile/:userId?"
        render={() => (user ? <ProfilePage /> : <Redirect to="/login" />)}
      />
      <Route
        path="/favorites"
        render={() => (user ? <FavsPage /> : <Redirect to="/login" />)}
      />
      <Route
        path="/posts"
        render={() => (user ? <ListPage /> : <Redirect to="/login" />)}
      />
      <Route
        path="/search"
        render={() => (user ? <SearchPage /> : <Redirect to="/login" />)}
      />
      <Route
        path="/add"
        render={() => (user ? <AddPostPage /> : <Redirect to="/login" />)}
      />
    </Fragment>
  );

  return (
    <UserContext.Provider
      value={{ user, isUserLoading, userError, logout, login }}
    >
      <main className="app">
        {isUserLoading ? <LoadingPage /> : renderRoutes()}
        {user && <ButtonBar />}
      </main>
    </UserContext.Provider>
  );
}

export default withRouter(App);
