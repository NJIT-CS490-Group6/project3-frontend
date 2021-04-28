import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import io from 'socket.io-client';
import Cookies from 'universal-cookie';

import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/ProfilePage";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/ErrorPage";
import MainNavbar from "./components/MainNavbar";
import { Friend } from './models/friend.model';

import "./styles/App.css";

const socket = io();

const testUser = new Friend(
  "f48c1eca-295d-4603-8433-bbfa641234",
  "Mike123",
  "Mike Smith",
  {
  status: "available",
  timestamp: "2017-07-21T17:32:28Z"
  }
);

function App() {
  const cookies = new Cookies();
  cookies.set('jwt', 'something');
  const token = cookies.get('jwt');


  const [currentUser, setCurrentUser] = useState<Friend>();

  useEffect(() => {
    setCurrentUser(testUser);
  }, []);


  if (!token || !currentUser) {
    return (
      <div className="App">
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route path="**">
          <ErrorPage />
        </Route>
      </Switch>
    </div>
    );
  }

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Redirect to="/dashboard" />
        </Route>
        <Route path="/dashboard">
          <MainNavbar currentUser={currentUser} />
          <Dashboard socket={socket} currentUser={currentUser} />
        </Route>
        <Route path="/profile/:id">
          <MainNavbar currentUser={currentUser} />
          <ProfilePage />
        </Route>
        <Route path="**">
          <ErrorPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
