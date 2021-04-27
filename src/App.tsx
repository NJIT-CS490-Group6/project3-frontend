import React from "react";
import { Route, Switch } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/ProfilePage";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/ErrorPage";
import MainNavbar from "./components/MainNavbar";

import "./styles/App.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <MainNavbar />
          <LandingPage />
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
