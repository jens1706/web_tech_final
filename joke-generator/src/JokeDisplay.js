import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';


import './JokeDisplay.css';

const JokeDisplay = (props) => {
  const [joke, setJoke] = useState('');
  const [rating, setRating] = useState(0);
  const [submittedrating, setSubmittedRating] = useState(true);
  const [jokedisplay, setJokeDisplay] = useState(false);
  const [jokeID, setJokeID] = useState(0);

  //recieve userID from login or registration
  const { userID } = props;


  const fetchJoke = () => {
    //clear previous joke
    setJoke('');
    setRating();

    //set display rules
    setSubmittedRating(false);
    setJokeDisplay(true);


    //fetch joke from database


    //set jokeID from database
    setJokeID();


    //set joke
    setJoke('example');
  };

  const handleRatingSubmit = () => {
    // Perform actions here based on the submitted rating
    console.log('Submitted rating:', rating);
    
    //set display rules
    setSubmittedRating(true);
    setJokeDisplay(false);

    //send rating result + userID + jokeID to database
    console.log("userID:" + userID);
  };
  


  return (
    <div className="joke-display-page">
      <h1 className="page-title">Random Joke Generator</h1>
      <div className="joke-display-container">
        <h2 className="joke-display-heading">Joke Display</h2>
        <div className="joke-display-content">
          <div className="joke-content">
            <p className="joke-text">{joke}</p>
          </div>
          <div className="button-container">
          <div className={jokedisplay ? "rating-stars" : "hide"}>
            {[1, 2, 3, 4, 5].map((index) => (
              <FontAwesomeIcon
                key={index}
                icon={faStar}
                className={`star ${index <= rating ? 'selected' : ''}`}
                onClick={() => setRating(index)}
              />
            ))}
          </div>
            {!submittedrating && (
              <button className={jokedisplay ? "submit-button" : "hide"} onClick={handleRatingSubmit}>
                Submit Rating
              </button>
            )}
            <button className={submittedrating ? "submit-button" : "hide"} onClick={fetchJoke}>
              Show Joke
            </button>
            <Link to="/create-joke" className="create-joke-link">
              Create your own Joke here!
            </Link>
          </div>
        </div>
        <Link to="/login" className="back-to-login-link">
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default JokeDisplay;
