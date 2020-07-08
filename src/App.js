import React, { lazy, useContext, Suspense } from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import { AuthProvider, AuthContext } from './context/AuthContext'
import { FetchProvider } from './context/FetchContext'
const Login = lazy(() => import('./containers/Login'))
const Home = lazy(() => import('./containers/Home'))
const Signup = lazy(() => import('./containers/Signup'))
const UserDetails = lazy(() => import('./containers/UserDetails'))
const FourOFour = lazy(() => import('./containers/FourOFour'))


const AppRoutes = () => {
  const authContext = useContext(AuthContext)
  return (
    <Suspense fallback={<div>Loading..</div>}>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/signup'>
          <Signup />
        </Route>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/userDetails' render={
          () => authContext.isAuthenticated() ? (<UserDetails />) : (<Redirect to='/' />)
        }>

        </Route>
        <Route path="*">
          <FourOFour />
        </Route>
      </Switch>
    </Suspense>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <FetchProvider>
          <div>
            <AppRoutes />
          </div>
        </FetchProvider>
      </AuthProvider >
    </Router>
  );
}

export default App;
