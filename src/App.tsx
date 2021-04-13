import { Route } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';

import './App.css';

function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <LandingPage />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
    </div>
  );
}

export default App;
