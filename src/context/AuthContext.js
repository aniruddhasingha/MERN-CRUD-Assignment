import React, { createContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const history = useHistory();
  const token = localStorage.getItem('token')
  const userInfo = localStorage.getItem('userInfo')
  const expiresAt = localStorage.getItem('expiresAt')

  // const expiresAt = localStorage.getItem('expiresAt')
  const [authState, setAuthState] = useState({
    token,
    expiresAt,
    userInfo: userInfo ? JSON.parse(userInfo) : {}
  })
  // userInfo ? JSON.parse(userInfo) :
  const setAuthInfo = ({ token, expiresAt, userInfo }) => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    localStorage.setItem('token', token)
    localStorage.setItem('expiresAt', expiresAt)
    setAuthState({
      token,
      userInfo,
      expiresAt
    })
  }
  const logout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
    localStorage.removeItem('expiresAt');
    setAuthState({
      token: null,
      userInfo: {}
    })
    history.push('/')
  }
  const isAuthenticated = () => {
    // alert(authState.token)
    // check Something
    // return localStorage.getItem('isAuthenticated') === 'true';
    if (!authState.expiresAt) {
      return false
    }
    return new Date().getTime() / 1000 < authState.expiresAt
  }
  return (
    <Provider
      value={{
        authState,
        setAuthState: authInfo => setAuthInfo(authInfo),
        isAuthenticated,
        logout
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
