import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import MainApp from './containers/MainApp';
import Dashboard from './containers/Dashboard';
import SignIn from './components/Login';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={MainApp} />
        <Route path='/login' component={SignIn} />
        <Route path='/dashboard' component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;
