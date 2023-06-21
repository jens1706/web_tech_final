import React, { useState, useRef, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {faCheck, faTimes, faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import {toast} from "react-toastify"

import './Login.css';

 //rules to validate the input
 const Email_REGEX = /^(?=.*[@])[a-zA-Z0-9][a-zA-Z0-9-_.@]{1,100}$/;
 const Password_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%\.-_]).{8,24}$/;

const DeleteUser = () => {
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

  const handleDelete = async (e) => {
    e.preventDefault();
    //set the user information for validation
    const user_db = {
        email: email,
        password: password,
        };

        axios.post("http://localhost:5000/user/delete", user_db)
        .then(res => {
            console.log(res);
            if (res.data == true){
                console.log("user deleted succesfully");
                toast.success("User deleted succesfully!");

                //reset user data
                setEmail('');
                setPassword('');

                //link to Login
                setTimeout(() => {
                    history.push('/login');
                }, 2000);
            }
            else {
                //set success
                toast.error("User information is not correct.")
              }
        }).catch(err => console.log(err));
  };

  return (
    <section>
    <div className="login-page">
      <h1 className="page-title">Random Joke Generator</h1>
        <div className="login-container">
          <h2 className="login-heading">Delete User</h2>
          <form onSubmit={handleDelete}>
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
              Delete
            </button>
          </form>
          <p className="register-text">
            You want to login into an existing account?{' '}
            <Link to="/login" className="register-link">
              Login
            </Link>
          </p>
        </div>
    </div>
    </section>
  );
};

export default DeleteUser;
