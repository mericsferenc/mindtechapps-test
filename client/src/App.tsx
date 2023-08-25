import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './PrivateRoute';
import MyPokemons from './components/MyPokemons';
import PokemonList from './components/PokemonList';
import PokemonProfile from './components/PokemonProfile';

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <div style={{ marginLeft: "auto" }}>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </div>
          {user && (
            <li>
              <Link to="/" onClick={() => setUser(null)}>Logout</Link>
            </li>
          )}
        </ul>
      </nav>

      <Route path="/pokemon-profile/:pokemonName" component={PokemonProfile} />

      <Route exact path="/" component={PokemonList} />

      <Route path="/login">
        <Login setUser={setUser} />
      </Route>
      <Route path="/register">
        <Register setUser={setUser} />
      </Route>
      <PrivateRoute path="/pokemon" user={user} component={MyPokemons} />
    </Router>
  );
};

export default App;
