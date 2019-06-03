import React, { useReducer, useState } from 'react';
import { ApolloClient } from 'apollo-boost';
import logic from '..';

export type TProvider = {
  id: string,
  name: string,
}

export type TUser = {
  name: string,
  customerOf: TProvider[] 
  adminOf: TProvider[]
}

export type TMainContext = {
  gqlClient?: ApolloClient<{}>;
  errorMessage?: string | null;
  user?: TUser | null;
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

const initialState: TMainContext = { errorMessage: null };
const MainContext = React.createContext(initialState);

function MainProvider(props) {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const refreshUserData = async () => {
    const user = await logic.retrieveMe();
    setUser(user);
  };

  const login = async (email: string, password: string) => {
    try {
      const { accessToken, refreshToken, role, userId } = await logic.login(email, password);
      logic.token = refreshToken;
      setRole(role);
      setUserId(userId);
      await refreshUserData()
      return true;
    } catch (error) {
      logout();
      setErrorMessage(error.message);
    }
    return false;
  };
  const logout = () => {
    logic.token = null;
    setRole(null);
    setUserId(null);
    setUser(null);
    return true;
  };

  // const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <MainContext.Provider value={{ login, logout, role, userId, user, errorMessage: null, gqlClient: props.gqlClient }}>
      {props.children}
    </MainContext.Provider>
  );
}
export { MainContext, MainProvider };
