import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './JokeDisplay.css';

const JokeDisplay = () => {
  const [joke, setJoke] = useState('');
  const [language, setLanguage] = useState('en');

  const fetchJoke = () => {
    fetch('./database.php')
      .then(response => response.json())
      .then(data => {
        // Überprüfe, ob der Witz-Wert vorhanden ist
        if (data && data.joke) {
          setJoke(data.joke);
        } else {
          setJoke('No joke available');
        }
      })
      .catch(error => {
        console.error('Fehler beim Abrufen des zufälligen Witzes:', error);
        setJoke('Error occurred while fetching joke');
      });
  };

  const handleLanguageChange = e => {
    setLanguage(e.target.value);
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
            <button className="fetch-joke-button" onClick={fetchJoke}>
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
