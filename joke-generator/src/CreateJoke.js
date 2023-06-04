import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CreateJoke.css';
import './database.php'

const CreateJoke = () => {
  const [joke, setJoke] = useState('');

  const handleInputChange = (event) => {
    setJoke(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Hier kannst du die Funktion aufrufen, um den Witz an die Datenbank zu senden
    // Beispiel:
    // saveJokeToDatabase(joke);
    console.log(`Joke submitted: ${joke}`);
  };

  return (
    <div className="create-joke-page">
      <h1 className="page-title">Random Joke Generator</h1>
      <div className="create-joke-container">
        <h2 className="create-joke-heading">Create Joke</h2>
        <form className="create-joke-form" onSubmit={handleSubmit}>
          <textarea
            className="joke-input"
            placeholder="Enter your joke here"
            value={joke}
            onChange={handleInputChange}
            required
          ></textarea>
          <button type="submit" className="submit-joke-button">
            Submit Joke
          </button>
        </form>
        <Link to="/jokes" className="back-to-display-link">
          Back to Joke Display
        </Link>
        <Link to="/login" className="back-to-login-link">
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default CreateJoke;