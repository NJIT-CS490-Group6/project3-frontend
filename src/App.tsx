import { Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';

import './styles/App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
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
