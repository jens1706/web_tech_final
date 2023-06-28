import React, { useState, useRef, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {faCheck, faTimes, faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {toast} from "react-toastify"
import axios from 'axios';

import './Login.css';

 //rules to validate the input
const Email_REGEX = /^(?=.*[@])[a-zA-Z0-9][a-zA-Z0-9-_.@]{1,100}$/;
const Password_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%\.-_]).{8,24}$/;

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [validemail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [validpassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [error, setErrMsg] = useState('');

  const history = useHistory();
  const userRef = useRef();

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect (() => {
    const result =Email_REGEX.test(email);
    console.log(result);
    console.log(email);
    setValidEmail(result);
  }, [email])

  useEffect (() => {
    const result =Password_REGEX.test(password);
    console.log(result);
    console.log(password);
    setValidPassword(result);
  }, [password])

  useEffect(() => {
    setErrMsg('');
  }, [email, password])

  
  const handleLogin = async (e) => {
    e.preventDefault();

    //if button enabled with JS hack
    const v1 = Email_REGEX.test(email);
    const v2 = Password_REGEX.test(password);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }

    //set the login information
    const userdata = {
      email: email,
      password: password
    };
    
    //prove the login data with the database
    axios.post("http://localhost:5000/user/login", userdata)
    .then(res => {
      //process result
      if (res.data.length === 0){
        console.log("login failed");
        toast.error("Login failed!");
      }
      else {
        console.log("login success");
        toast.info("You have been logged in.")

        //userid loggen
        props.onLogin(res.data[0].id);

        //delete entries
        setEmail('');
        setPassword('');

        //link to DisplayJoke
        setTimeout(() => {
          history.push('/jokes')
        }, 500);
      }
    }).catch(err => console.log(err));
  };

  return (
    <section>
    <div className="login-page">
      <h1 className="page-title">Random Joke Generator</h1>
        <div className="login-container">
          <h2 className="login-heading">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
                <span className={validemail ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validemail || !email ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
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
                aria-invalid={validemail ? "false" : "true"}
                aria-describedby="emailidnote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
              <p id='emailidnote' className={emailFocus && email && !validemail ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                1 to 100 characters.<br />
                Must beginn with a letter or a number and contain a <span aria-label="at symbol">@</span>. <br />.
                Letters, numbers, <span aria-label="dot">.</span>, <span aria-label="minus">-</span>, <span aria-label="underscore">_</span> and <span aria-label="at symbol">@</span> allowed.
              </p>
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              <span className={validpassword ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validpassword || !password ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>  
              </label>
              <input
                name='password'
                type="password"
                id="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-invalid={validpassword ? "false" : "true"}
                aria-describedby="passwordidnote"
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
              />
              <p id='passwordidnote' className={passwordFocus && password && !validpassword ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                8 to 24 characters.<br />
                Must include uppercase and lowercase letters, a number and a special character.<br />
                Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span> <span aria-label="dot">.</span> <span aria-label="minus">-</span> <span aria-label="underscore">_</span>
              </p>
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
          <p className="register-text">
            Did forget your password?{' '}
            <Link to="/password-forget" className="register-link">
              Change Password
            </Link>
          </p>
          <p className="register-text">
            Do you want to delete an existing user account?{' '}
            <Link to="/delete-user" className="register-link">
              Delete User
            </Link>
          </p>
        </div>
    </div>
    </section>
  );
};

export default Login;
