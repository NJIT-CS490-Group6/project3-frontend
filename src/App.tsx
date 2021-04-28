import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Cookies from 'universal-cookie';

import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/ProfilePage";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/ErrorPage";
import MainNavbar from "./components/MainNavbar";

import "./styles/App.css";

function App() {
  const cookies = new Cookies();
  cookies.set('token', 'something', { path: '/' });
  const token = cookies.get('token');
  console.log(token);

  if (!token) {
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
          <MainNavbar />
          <Dashboard />
        </Route>
        <Route path="/profile/:id">
          <MainNavbar />
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
