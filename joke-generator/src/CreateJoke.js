import React, { useState, useRef, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {faCheck, faTimes, faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import {toast} from "react-toastify"

import './CreateJoke.css';

 //rules to validate the input
 const Joke_REGEX = /^[a-zA-Z0-9][a-zA-Z0-9-_.%&/!?()$€='" ,]{10,500}$/;


const CreateJoke = (props) => {
  const [joke, setJoke] = useState('');
  const [validjoke, setValidJoke] = useState(false);
  const [jokeFocus, setJokeFocus] = useState(false);

  const [error, setErrMsg] = useState('');

  //recieve loggedIn Status from login or registration
  const { loggedIn } = props;

  const userRef = useRef();

  const history = useHistory();

  // Check if the page was opened through the link to create a joke
  useEffect(() => {
    userRef.current.focus();
    if (loggedIn) {
      //logged in
    } else if (!loggedIn) {
      // not logged in
      toast.error("You have not been logged in!");
      //link back to login
      setTimeout(() => {
        history.push('/login');
      }, 500);
    } 
  }, []);

  useEffect (() => {
    const result =Joke_REGEX.test(joke);
    console.log(result);
    console.log(joke);
    setValidJoke(result);
  }, [joke])

  
  useEffect(() => {
    setErrMsg('');
  }, [joke])

  const handleInputChange = (event) => {
    setJoke(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    //send joke to database
    const jokedata = {
      joke: joke
    };
    axios.post("http://localhost:5000/jokes/create", jokedata)
    .then(response => {
      console.log('data sendet succesfully:', response.data);
      })
      .catch(error => {
        console.error('error while sending the data:', error);
      });

    //sucessfully submitted
    setJoke('');
    toast.success("Joke created successfully!")
    console.log(`Joke submitted: ${joke}`);
  };

  const handleLogout = () => {
    toast.info("You have been logged out.")
  };

  return (
    <div className="create-joke-page">
      <h1 className="page-title">Random Joke Generator</h1>
      <div className="create-joke-container">
        <h2 className="create-joke-heading">Create Joke</h2>
        <form className="create-joke-form" onSubmit={handleSubmit}>
          <label htmlFor="joke" className="form-label">
            Your Joke
            <span className={validjoke ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validjoke || !joke ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <textarea
            className="joke-input"
            placeholder="Enter your joke here"
            value={joke}
            onChange={handleInputChange}
            required
            ref={userRef}
            aria-invalid={validjoke ? "false" : "true"}
            aria-describedby="jokeidnote"
            onFocus={() => setJokeFocus(true)}
            onBlur={() => setJokeFocus(false)}
          ></textarea>
          <p id='jokeidnote' className={jokeFocus && joke && !validjoke ? "instructions" : "offscreen"}>
            <FontAwesomeIcon icon={faInfoCircle} />
            10 to 500 characters.<br />
            Must beginn with a letter or a number.<br />
            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span> <span aria-label="dot">.</span> <span aria-label="minus">-</span> <span aria-label="underscore">_</span> <span aria-label="and">&</span> <span aria-label="slash">/</span> <span aria-label="quiestion mark">?</span> <span aria-label="brackets">()</span> <span aria-label="euro sign">€</span> <span aria-label="equal">=</span> <span aria-label="apostrophe">'</span> <span aria-label="quotation mark">"</span> <span aria-label="comma">,</span>
            </p>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-joke-button">
            Submit Joke
          </button>
        </form>
        <Link to="/jokes" className="back-to-display-link">
          Back to Joke Display
        </Link>
        <Link to="/login" className="back-to-login-link" onClick={handleLogout}>
          Logout
        </Link>
      </div>
    </div>
  );
};

export default CreateJoke;
