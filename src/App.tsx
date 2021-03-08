import React from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import Menu from './pages/Menu';
import Login from './pages/Login';
import Register from './pages/Register';
import './style.css';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/" component={Menu} />
      </Switch>
    </Router>
  );
}
