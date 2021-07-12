import React, { useEffect } from 'react';
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { validateAndAuth } from './features/login/loginSlice';
// import { validateToken, getUser } from './app/sdk';
import Login from './features/login/Login';
import Tickets from './features/tickets/Tickets';
import './app.scss';
import Header from './features/common/Header';

function App() {
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.auth.loggedIn);

  useEffect(async () => {
    dispatch(validateAndAuth());
  }, []);

  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          {!loggedIn && (
            <Redirect to={{ pathname: '/login', search: '?redirect=/' }} />
          )}

          <Route path="/" exact>
            <Tickets />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
