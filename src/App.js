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
import './app.css';

function App() {
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.auth.loggedIn);

  useEffect(async () => {
    dispatch(validateAndAuth());
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            {loggedIn ? (
              <Tickets />
            ) : (
              <Redirect to={{ pathname: '/login', search: '?redirect=/' }} />
            )}
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
