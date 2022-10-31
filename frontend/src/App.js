import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import Home from './Home.js';
import Register from './Register.js';
import Login from './Login.js'
import PremiumContent from './PremiumContent.js';
import PublicRoute from './routes/PublicRoute.js';
import PrivateRoute from './routes/PrivateRoute.js';
import React, { useState, useEffect } from 'react';
import{getUser, getToken, setUserSession, resetUserSession} from './service/AuthService';
import axios from 'axios';

const verifyUrl = 'https://m0z4y5aa2g.execute-api.us-west-2.amazonaws.com/prod/verify';

function App() {
  const [isAuthenticating, setAuthenticating] = useState(true);

  useEffect(() =>{
    const token = getToken();

    if(token === 'undefined' || token === undefined || token === null || !token) {
      return ;
    }

    const requestConfig = {
      headers: {
          'x-api-key': 'jAyp5BfgRr4nMUxHqFmGX6xlefGnO8XYa5VIK4Jx',
      }
    }

    const requestBody = {
      user: getUser(),
      token: token
    }

    axios.post(verifyUrl, requestBody, requestConfig).then(response => {
      setUserSession(response.data.user, response.data.token);
      setAuthenticating(false);
    }).catch(error => {
      resetUserSession();
      setAuthenticating(false);
    })

  }, []);

  const token = getToken();

  if(isAuthenticating && token) {
    return <div className="content">Authenticating...</div>
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div className="header">
          <NavLink exact activeClassName="active" to="/">Home</NavLink>
          <NavLink activeClassName="active" to="/register">Register</NavLink>
          <NavLink activeClassName="active" to="/login">Login</NavLink>
          <NavLink activeClassName="active" to="/premium-content">Premium Content</NavLink>
        </div>
        <div className="content">
          <Switch>
            <Route exact path="/" component={Home} />
            <PublicRoute path="/login" component={Login} />
            <PublicRoute path="/register" component={Register} />
            <PrivateRoute path="/premium-content" component={PremiumContent} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
