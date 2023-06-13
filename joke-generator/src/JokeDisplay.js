import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


import './JokeDisplay.css';

const JokeDisplay = (props) => {
  const [joke, setJoke] = useState('');
  const [rating, setRating] = useState(0);
  const [ratingdisplay, setRatingDisplay] = useState(false);
  const [jokedisplay, setJokeDisplay] = useState(true);
  const [jokeID, setJokeID] = useState(0);


  //fct to recieve data from database
  useEffect(() => {
    fetchJoke();
  }, []);
  const [data, setData] = useState([]);

  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/jokes/get");
    setData(response.data);
  };

  //recieve userID from login or registration
  const { userID } = props;
  //console.log("userID:" + userID);

  //set the rating information
  const jokeRate = {
    user_id: userID,
    joke_id: jokeID,
    joke_rating: rating
  };


  const fetchJoke = () => {
    //clear previous joke
    setRating(0);

    //set display rules
    setRatingDisplay(true);
    setJokeDisplay(false);


    //fetch joke and joke_id from database
    loadData();
    data.map((item, index) => {
      setJokeID(item.id)
      setJoke(item.joke);
    });
  };

  const handleRatingSubmit = () => {
    // Perform actions here based on the submitted rating
    console.log('Submitted rating:', rating);
    
    //set display rules
    setRatingDisplay(false);
    setJokeDisplay(true);

    //send rating result + userID + jokeID to database
    console.log(jokeRate);
    axios.post("http://localhost:5000/jokes/rate", jokeRate)
  .then(response => {
    console.log('data sendet succesfully:', response.data);
    })
    .catch(error => {
      console.error('error while sending the data:', error);
    });
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
          <div className={ratingdisplay && joke ? "rating-stars" : "hide"}>
            {[1, 2, 3, 4, 5].map((index) => (
              <FontAwesomeIcon
                key={index}
                icon={faStar}
                className={`star ${index <= rating ? 'selected' : ''}`}
                onClick={() => setRating(index)}
              />
            ))}
          </div>
            <button className={ratingdisplay && joke ? "submit-button" : "hide"} onClick={handleRatingSubmit}>
              Submit Rating
            </button>
            <button className={jokedisplay || !joke ? "submit-button" : "hide"} onClick={fetchJoke}>
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
