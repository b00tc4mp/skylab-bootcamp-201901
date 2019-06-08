import React, { useReducer, useState, useEffect } from 'react';
import { ApolloClient } from 'apollo-boost';
import logic from '..';

export type TProvider = {
  id: string;
  name: string;
  bannerImageUrl: string;
  portraitImageUrl: string;
  registrationUrl: string;
};

export type TUser = {
  id: string;
  name: string;
  role: string;
  customerOf: TProvider[];
  adminOf: TProvider[];
  bannerImageUrl: string;
  portraitImageUrl: string;
};

export type TMainContext = {
  gqlClient?: ApolloClient<{}>;
  errorMessage?: string | null;
  setErrorMessage?: any;
  user?: TUser | null;
  userId?: string | null;
  role?: string | null;
  myProviders?: any;
  provider?: TProvider | null;
  customers?: any;
  setCustomers?: any;
  nextAttendances?: any;
  refreshUserData?: any;
  logic: any;
  login?: (email: string, password: string) => Promise<boolean>;
  logout?: () => boolean;
};

const initialState: TMainContext = { errorMessage: null, logic };
const MainContext = React.createContext(initialState);

function MainContextProvider(props) {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [myProviders, setMyProviders] = useState(null);
  const [provider, setProvider] = useState(null);
  const [customers, setCustomers] = useState(null);
  const [role, setRole] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [nextAttendances, setNextAttendances] = useState(null);

  const refreshUserData = async () => {
    const user = await logic.retrieveMe();
    setRole(user.role);
    setUserId(user.id);
    setUser(user);
    if (user.adminOf.length) {
      setProvider(user.adminOf[0]);
    } else {
      const providers = await logic.listMyProviders();
      setMyProviders(providers);
      const data = await logic.listMyNextAttendances();
      if (data) {
        setNextAttendances(data);
      } else {
        setNextAttendances(null);
      }
    }
    return user;
  };

  const login = async (email: string, password: string) => {
    try {
      const { accessToken, refreshToken, role, userId } = await logic.login(email, password);
      logic.token = refreshToken;
      await refreshUserData();
      return true;
    } catch (error) {
      logout();
      setErrorMessage('Login failed');
    }
    return false;
  };
  const logout = () => {
    logic.token = null;
    setRole(null);
    setUserId(null);
    setUser(null);
    setMyProviders(null);
    setProvider(null);
    setCustomers(null);
    return true;
  };

  useEffect(() => {
    if (logic.token) {
      refreshUserData();
    }
  }, []);

  return (
    <MainContext.Provider
      value={{
        login,
        logout,
        logic,
        role,
        userId,
        user,
        myProviders,
        provider,
        customers,
        setCustomers,
        nextAttendances,
        refreshUserData,
        errorMessage,
        setErrorMessage,
        gqlClient: props.gqlClient,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
}
export { MainContext, MainContextProvider as MainProvider };
