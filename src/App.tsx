import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import io from "socket.io-client";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";

import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/ProfilePage";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/ErrorPage";
import MainNavbar from "./components/MainNavbar";
import { User } from "./models/user.model";

import "./styles/App.css";

function App() {
  const cookies = new Cookies();
  const token = cookies.get('jwt');
  const [currentUser, setCurrentUser] = useState<User>();

  useEffect(() => {
    if (token) {
      const decoded: User = jwt_decode(token);
      setCurrentUser(decoded);
    }
  }, []);

  if (!token || !currentUser) {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/">
            <LandingPage/>
          </Route>
          <Route path="**">
            <ErrorPage/>
          </Route>
        </Switch>
      </div>
    );
  }

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Redirect to="/dashboard"/>
        </Route>
        <Route path="/dashboard">
          <MainNavbar currentUser={currentUser}/>
          <Dashboard currentUser={currentUser}/>
        </Route>
        <Route path="/profile/:id">
          <MainNavbar currentUser={currentUser}/>
          <ProfilePage/>
        </Route>
        <Route path="**">
          <ErrorPage/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
