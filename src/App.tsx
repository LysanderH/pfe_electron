import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Menu from './pages/Menu';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Menu} />
      </Switch>
    </Router>
  );
}
