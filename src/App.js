import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './features/login/Login';
import './app.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/">
            <Login />
          </Route>
          {/* <Route path='/login' component={<Login/>}/> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
