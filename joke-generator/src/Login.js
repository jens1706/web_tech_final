import React, { useState, useRef, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import './Login.css';


const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setErrMsg] = useState('');

  const userRef = useRef();
  const errRef = useRef();

  
  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [email, password])

  
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(email, password);

    //delete entries
    setEmail('');
    setPassword('');

    //link to DisplayJoke
    //history.push('/jokes');
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
                name='email'
                type="text"
                id="email"
                ref={userRef}
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                name='password'
                type="password"
                id="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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
