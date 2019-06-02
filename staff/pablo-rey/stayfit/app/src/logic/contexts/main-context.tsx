import React, { useReducer, useState } from 'react';
import { ApolloClient } from 'apollo-boost';
import Login from '../../pages/Login';
import logic from '..';

type IMainContext = {
  gqlClient?: ApolloClient<{}>;
  accessToken?: string | null;
  refreshToken?: string | null;
  errorMessage?: string | null;
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
  const [errorMessage, setErrorMessage] = useState(null);
  const login = async (email: string, password: string) => {
    try {
      const result = await logic.login(email, password);
      setAccessToken(result.accessToken);
      setRefreshToken(result.refreshToken);
      return true;
    } catch (error) {
      setAccessToken(null);
      setRefreshToken(null);
      setErrorMessage(error.message);
    }
    return false;
  };
  // const [state, dispatch] = useReducer(reducer, initialState);
  return <MainContext.Provider value={{ login, accessToken, refreshToken, errorMessage: null, gqlClient: props.gqlClient }}>{props.children}</MainContext.Provider>;
}
export { MainContext, MainProvider };
