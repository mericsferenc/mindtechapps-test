import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './PrivateRoute';
import MyPokemons from './components/MyPokemons';
import PokemonList from './components/PokemonList';
import PokemonProfile from './components/PokemonProfile';
import { clearUser } from './redux/actions';
import { useDispatch, useSelector } from 'react-redux';

const App: React.FC = () => {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">HOME</Link>
          </li>
          {user && <li>
              <Link to="/pokemon">My Pokemons</Link>
          </li>}
          {user ? 
            <div style={{ marginLeft: "auto" }}>
              <li>
                <Link to="/" onClick={handleLogout}>Logout</Link>
              </li>
            </div> :
            <div style={{ marginLeft: "auto" }}>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </div>
          }
        </ul>
      </nav>

      <div style={{ padding: "30px" }}>
        <Route path="/pokemon-profile/:pokemonName" component={PokemonProfile} />
        <Route exact path="/" component={PokemonList} />
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <PrivateRoute path="/pokemon" user={user} component={MyPokemons} />
      </div>
      
    </Router>
  );
};

export default App;
