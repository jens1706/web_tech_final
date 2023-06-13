import React, { useState, useRef, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {faCheck, faTimes, faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import {toast} from "react-toastify"

import './Register.css';

 //rules to validate the input
 const Name_REGEX = /^[a-zA-Z][a-zA-Z ]{2,50}$/;
 const Email_REGEX = /^(?=.*[@])[a-zA-Z0-9][a-zA-Z0-9-_.@]{1,100}$/;
 const Password_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%\.-_]).{8,24}$/;


const Register = (props) => {
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


  const handleRegister = async (e) => {
    e.preventDefault();

    //if button enabled with JS hack
    const v1 = Name_REGEX.test(name);
    const v2 = Email_REGEX.test(email);
    const v3 = Password_REGEX.test(password);
    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }

      //set the email information for validation
      const email_db = {
        email: email,
      };

    //check if the email is new
    axios.post("http://localhost:5000/user/check", email_db)
    .then(res => {
      //console.log(res);
      //process result
      if (res.data.length == 0){
        console.log("registration success");
        toast.success("Registration successfully!");

        //userid loggen
        console.log(res);
        //props.onLogin(res.data[0].id);

        //set the rating information
        const userdata = {
          name: name,
          email: email,
          password: password
        };

        //write registration information into database
        axios.post("http://localhost:5000/user/register", userdata)
        .then(response => {
          console.log('data sendet succesfully:', response.data);
          })
          .catch(error => {
            console.error('error while sending the data:', error);
          });

        // reset of input 
        setName('');
        setEmail('');
        setPassword('');
        setMatchPassword('');

        //link to DisplayJoke
        setTimeout(() => {
          history.push('/jokes');
        }, 2000);

      }
      else {
        console.log("email exists");
        toast.error("Email is already registrated!");
      }
    }).catch(err => console.log(err));
  };

  return (
    <section>
    <div className="register-page">
      <h1 className="page-title">Random Joke Generator</h1>
      <div className="register-container">
        <h2 className="register-heading">Register</h2>
        <p className="subheading">Create a new account</p>
        <form onSubmit={handleRegister}>
          <div className="form-group">
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
          <div className="form-group">
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
          {error && <p className="error-message">{error}</p>}
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
    </section>
  );
};

export default Register;
