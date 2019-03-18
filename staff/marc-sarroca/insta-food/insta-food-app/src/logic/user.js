import { useState, createContext } from "react";
import instaApi from "../instafood-api";

export default function useUser() {
  const context = createContext();

  const [userState, setUserState] = useState({
    user: null,
    isUserLoading: true,
    userError: null
  });

  function getUser() {
    const id = sessionStorage.getItem("__userId__");
    const token = sessionStorage.getItem("__userApiToken__");
    const user = id ? { id, token } : null;

    setUserState({
      user,
      isUserLoading: false,
      userError: null
    });
  }

  function logout() {
    setUserState({
      user: null,
      isUserLoading: false,
      userError: null
    });
    sessionStorage.removeItem("__userId__");
    sessionStorage.removeItem("__userApiToken__");
  }

  function login(email, password) {
    if (typeof email !== "string") throw TypeError(email + " is not a string");

    if (!email.trim().length) throw Error("email cannot be empty");

    if (typeof password !== "string")
      throw TypeError(password + " is not a string");

    if (!password.trim().length) throw Error("password cannot be empty");

    setUserState({
      isUserLoading: true
    });
    try {
      instaApi
        .authenticateUser(email, password)
        .then(({ id, token }) => {
          const user = { id, token };
          setUserState({
            user,
            isUserLoading: false,
            userError: null
          });
          sessionStorage.setItem("__userId__", id);
          sessionStorage.setItem("__userApiToken__", token);
        })
        .catch(({ message }) =>
          setUserState({
            user: null,
            isUserLoading: false,
            userError: message
          })
        );
    } catch (error) {
      setUserState({ userError: error.message });
    }
  }

  return { userState, login, logout, getUser };
}
