import { useState, useEffect } from "react";
import instaApi from "../instafood-api";

export default function useUser() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const id = sessionStorage.getItem("__userId__");
    const token = sessionStorage.getItem("__userApiToken__");
    const user = id ? { id, token } : null;
    setUser(user);
  }, []);

  function logout() {
    setUser(null);
    sessionStorage.removeItem("__userId__");
    sessionStorage.removeItem("__userApiToken__");
  }

  function login(email, password) {
    if (typeof email !== "string") throw TypeError(email + " is not a string");

    if (!email.trim().length) throw Error("email cannot be empty");

    if (typeof password !== "string")
      throw TypeError(password + " is not a string");

    if (!password.trim().length) throw Error("password cannot be empty");

    return instaApi
      .authenticateUser(email, password)
      .then(({ id, token }) => {
        setUser({ id, token });
        sessionStorage.setItem("__userId__", id);
        sessionStorage.setItem("__userApiToken__", token);
      })
      .catch(({ message }) => setError(message));
  }

  return { user, login, error, logout };
}
