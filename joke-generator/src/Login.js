import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Login.css';
import './database.php'

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Hier kannst du eine Datenbankabfrage der Benutzerdaten einbauen
    // Beispiel:
    // if (email === 'user@example.com' && password === 'password') {
    //   // Benutzerdaten stimmen überein, weiter zur DisplayJoke-Seite
    //   history.push('/display-joke');
    // } else {
    //   // Falsche Anmeldeinformationen, Fehler anzeigen
    //   setError('Falsche Anmeldeinformationen');
    // }

    // Beispiel: Direkter Weiterleitung zur DisplayJoke-Seite (ohne Datenbankabfrage)
    history.push('/jokes');
  };

  return (
    <div className="login-page">
      <h1 className="page-title">Random Joke Generator</h1>
      <div className="login-container">
        <h2 className="login-heading">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p className="register-text">
          Don't have an account?{' '}
          <Link to="/register" className="register-link">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
