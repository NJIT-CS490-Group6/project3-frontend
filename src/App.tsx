import { Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';

import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <main>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
      </main>
    </div>
  );
}

export default App;
