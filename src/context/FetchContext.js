import React, { createContext, useContext } from 'react';
import axios from 'axios';
// import { configure } from '@testing-library/react';
import { AuthContext } from './../context/AuthContext'
const FetchContext = createContext();
const { Provider } = FetchContext;

const FetchProvider = ({ children }) => {
  const authContext = useContext(AuthContext)
  // alert(authContext.authState.token)
  // const authContext = useContext(AuthContext)
  // const token= authContext.authState.token
  const authAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL
  });
  // authAxios.interceptors.request.use(

  //   config => {
  //     config.headers.Authorization = `Bearer ${authContext.authState.token}`
  //     return config
  //   },
  //   error => {
  //     return Promise.reject(error);
  //   }
  // )
  authAxios.interceptors.request.use(
    config => {
      const token = authContext.authState.token
      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
      }
      // config.headers['Content-Type'] = 'application/json';
      // console.log(JSON.stringify(config.headers.Authorization))
      return config;
    },
    error => {
      Promise.reject(error)
    });
  return (
    <Provider
      value={{
        authAxios
      }}
    >
      {children}
    </Provider>
  );
};

export { FetchContext, FetchProvider };
