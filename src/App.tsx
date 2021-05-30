import React, { useEffect, useState } from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Menu from './pages/Menu';
import Login from './pages/Login';
import Register from './pages/Register';
import './styles/app.global.scss';
import LessonList from './pages/LessonList';
import PrivateRoute from './utils/PrivateRoute';
import Exercise from './pages/Exercise';
import ExerciseList from './pages/ExerciseList';
import CreateExercise from './pages/CreateExercise';
import ClassList from './pages/ClassList';
import Preferences from './pages/Preferences';
import CreateClass from './pages/CreateClass';
import MyClass from './pages/MyClass';
import Logout from './utils/Logout';
import StartConference from './pages/StartConference';
import Conference from './pages/Conference';
import Participate from './pages/Participate';
import apiClient from './utils/apiClient';

/**
 * Main component
 */
export default function App() {
  const [user, setUser] = useState();
  /**
   * Sets the state loggedIn to true
   * @set sessionStorage loggedIn
   * @set loggedIn true
   */
  const login = (user) => {
    setUser(user);
    apiClient.defaults.headers.common.Authorization = `Bearer ${user}`;
    console.log(apiClient.defaults.headers);

    sessionStorage.setItem('user', user);
    sessionStorage.setItem('loggedIn', true);
  };

  useEffect(() => {}, []);

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login login={login} />
        </Route>
        <Route path="/register" component={Register} />
        <Route path="/logout">
          <Logout />
        </Route>
        <PrivateRoute path="/preferences" component={Preferences} />
        <PrivateRoute path="/lessons" component={LessonList} />
        <PrivateRoute path="/classes/create" component={CreateClass} />
        <PrivateRoute path="/classes/show" component={MyClass} />
        <PrivateRoute path="/classes" component={ClassList} />
        <PrivateRoute path="/exercises/create" component={CreateExercise} />
        <PrivateRoute path="/exercises/show" component={Exercise} />
        <PrivateRoute path="/exercises" component={ExerciseList} />
        <PrivateRoute path="/start-conference" component={StartConference} />
        <PrivateRoute path="/participate-conference" component={Participate} />
        <PrivateRoute path="/conference" component={Conference} />
        <PrivateRoute path="/" component={Menu} />
      </Switch>
    </Router>
  );
}
