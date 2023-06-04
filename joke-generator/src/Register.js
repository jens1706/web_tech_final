import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import './database.php'

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    // Hier kannst du den Input an eine Datenbank senden
    // Beispiel:
    // const userData = {
    //   name,
    //   email,
    //   password
    // };
    // sendUserDataToDatabase(userData);

    // Zurücksetzen der Eingabefelder
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="register-page">
      <h1 className="page-title">Random Joke Generator</h1>
      <div className="register-container">
        <h2 className="register-heading">Register</h2>
        <p className="subheading">Create a new account</p>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
        <p className="login-text">
          Already have an account?{' '}
          <Link to="/login" className="login-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
