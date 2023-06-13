import React, { useState, useRef, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {faCheck, faTimes, faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import {toast} from "react-toastify"

import './PasswordForget.css';

 //rules to validate the input
 const Name_REGEX = /^[a-zA-Z][a-zA-Z ]{2,50}$/;
 const Email_REGEX = /^(?=.*[@])[a-zA-Z0-9][a-zA-Z0-9-_.@]{1,100}$/;
 const Password_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%\.-_]).{8,24}$/;

 let userID = 0;

const PasswordForget = () => {
    const [name, setName] = useState('');
    const [validname, setValidName] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);
  
    const [email, setEmail] = useState('');
    const [validemail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
  
    const [password, setPassword] = useState('');
    const [validpassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
  
    const [match_password, setMatchPassword] = useState('');
    const [validmatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);
  
    const [error, setErrMsg] = useState('');
  
    const history = useHistory();
    const userRef = useRef();

    const [usercorrect, setUserCorrect] = useState(false);
  
    
    useEffect(() => {
      userRef.current.focus();
    }, [])
  
    useEffect (() => {
      const result =Name_REGEX.test(name);
      console.log(result);
      console.log(name);
      setValidName(result);
    }, [name])
  
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
      const match = password	=== match_password;
      setValidMatch(match);
    }, [password, match_password])
  
    useEffect(() => {
      setErrMsg('');
    }, [name, email, password, match_password])


  const CheckUser = () => {
    //set the user information for validation
    const user_db = {
        name: name,
        email: email,
        };

    //database connection to check user
    axios.post("http://localhost:5000/user/validate", user_db)
    .then(res => {
        if (res.data.length == 0){
            console.log("user doesn't exists");
            toast.error("User information is wrong!");
        }
        else {
            //set success
            toast.info("User information is correct.")
            setUserCorrect(true);

            //userid loggen
            //console.log("id:" + res.data[0].id);
            userID = res.data[0].id;
            console.log("id:" + userID);
          }
    }).catch(err => console.log(err));
  };

  const ChangePassword = () => {
    //log the sucess
    console.log("password change success");
    toast.success("Password changed successfully!");
    setUserCorrect(false);

    //set user information for password change
    const password_db = {
        password: password,
        id: userID,
    }
    console.log(password_db);
    // Database communication, to change password
    axios.put("http://localhost:5000/user/update", password_db)
    .then(res => {
        console.log(res);
        }).catch(err => console.log(err));

    //reset user data
    setName('');
    setEmail('');
    setPassword('');
    setMatchPassword('');
    userID = 0;

    //link to Login
    setTimeout(() => {
        history.push('/login');
    }, 2000);
  };

  return (
    <div className="password-forget-page">
      <div className="password-forget-container">
        <h2 className="password-forget-heading">Change Pasword</h2>
        {error && <p className="error-message">{error}</p>}
        <form className="password-forget-form">
        <div className={usercorrect ? "hide" : "form-group"}>
            <label htmlFor="name" className="form-label">
              Name
              <span className={validname ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validname || !name ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>            
            </label>
            <input
              type="text"
              name='name'
              id="name"
              ref={userRef}
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete='off'
              aria-invalid={validname ? "false" : "true"}
              aria-describedby="nameidnote"
              onFocus={() => setNameFocus(true)}
              onBlur={() => setNameFocus(false)}
            />
            <p id='nameidnote' className={nameFocus && name && !validname ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              2 to 50 characters.<br />
              Must beginn with a letter. <br />
              Letters and spaces allowed.
            </p>
          </div>
          <div className={usercorrect ? "hide" : "form-group"}>
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
              type="text"
              name='email'
              id="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete='off'
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
          <div className={usercorrect ? "form-group" : "hide"}>
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
              type="password"
              name='password'
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
          <div className={usercorrect ? "form-group" : "hide"}>
            <label htmlFor="match_password" className="form-label">
              Repeat Password
              <span className={validmatch && match_password ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validmatch || !match_password ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>   
            </label>
            <input
              type="password"
              name='match_password'
              id="match_password"
              className="form-input"
              value={match_password}
              onChange={(e) => setMatchPassword(e.target.value)}
              required
              aria-invalid={validmatch ? "false" : "true"}
              aria-describedby="matchidnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p id='matchidnote' className={matchFocus && !validmatch ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.<br />
            </p>
          </div>
          <button type="submit" className={usercorrect ? "reset-button" : "hide"} onClick={ChangePassword}>
            Change Password
          </button>
          <button type="submit" className={usercorrect ? "hide" : "reset-button"} onClick={CheckUser}>
            Validate user information
          </button>
        </form>
        <p className="login-text">
          Back to{' '}
          <a href="/login" className="login-link">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default PasswordForget;
