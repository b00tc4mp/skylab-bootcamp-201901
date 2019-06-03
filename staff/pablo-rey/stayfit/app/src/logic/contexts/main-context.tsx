import React, { useReducer, useState } from 'react';
import { ApolloClient } from 'apollo-boost';
import Login from '../../pages/Login';
import logic from '..';

type IMainContext = {
  gqlClient?: ApolloClient<{}>;
  accessToken?: string | null;
  refreshToken?: string | null;
  errorMessage?: string | null;
  userId?: string | null;
  role?: string | null;
  login?: (email: string, password: string) => Promise<boolean>;
  logout?: () => boolean;
};

// let reducer = (state, action) => {
//   switch (action.type) {
//     case "increment":
//       return { ...state, count: state.count + 1 };
//     case "decrement":
//       return { ...state, count: state.count - 1 };
//     default:
//       return;
//   }
// };

const initialState: IMainContext = { accessToken: null, refreshToken: null, errorMessage: null };
const MainContext = React.createContext(initialState);

function MainProvider(props) {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const login = async (email: string, password: string) => {
    try {
      const { accessToken, refreshToken, role, userId } = await logic.login(email, password);
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setRole(role);
      setUserId(userId);
      return true;
    } catch (error) {
      setAccessToken(null);
      setRefreshToken(null);
      setRole(null);
      setUserId(null);
      setErrorMessage(error.message);
    }
    return false;
  };
  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setRole(null);
    setUserId(null);
    return true;
  };

  // const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <MainContext.Provider
      value={{ login, logout, accessToken, refreshToken, role, userId, errorMessage: null, gqlClient: props.gqlClient }}
    >
      {props.children}
    </MainContext.Provider>
  );
}
export { MainContext, MainProvider };
