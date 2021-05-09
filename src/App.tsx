import React, { useState } from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import Menu from './pages/Menu';
import Login from './pages/Login';
import Register from './pages/Register';
import './styles/app.global.scss';
import LessonList from './pages/LessonList';

/**
 * Main component
 */
export default function App() {
  const [loggedIn, setLoggedIn] = useState(
    sessionStorage.getItem('loggedIn') === 'true' || false
  );

  /**
   * Sets the state loggedIn to true
   * @set sessionStorage loggedIn
   * @set loggedIn true
   */
  const login = (user) => {
    setLoggedIn(true);
    sessionStorage.setItem('user', JSON.stringify(user));
    sessionStorage.setItem('loggedIn', true);
  };

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login login={login} />
        </Route>
        <Route path="/register" component={Register} />
        <Route path="/lesson-list" component={LessonList} />
        <Route path="/" component={Menu} />
      </Switch>
    </Router>
  );
}
