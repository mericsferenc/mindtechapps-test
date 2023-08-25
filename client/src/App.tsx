import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './PrivateRoute';

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>

      <Route path="/login">
        <Login setUser={setUser} />
      </Route>
      <Route path="/register">
        <Register setUser={setUser} />
      </Route>
      <PrivateRoute path="/profile" user={user} component={UserProfile} />
    </Router>
  );
};

const UserProfile: React.FC = () => {
  return <h2>User Profile</h2>;
};

export default App;
