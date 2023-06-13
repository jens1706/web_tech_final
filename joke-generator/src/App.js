import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Login from './Login';
import Register from './Register';
import JokeDisplay from './JokeDisplay';
import CreateJoke from './CreateJoke';
import PasswordForget from './PasswordForget';

function App() {
  //settings to send the userID from login and registration to display joke
  const [userID, setUserID] = useState(0);

  const handleLogin = (userID) => {
    setUserID(userID);
  };

  const handleRegister = (userID) => {
    setUserID(userID);
  };

  return (
    <Router>
      <div className="App">
        <ToastContainer position="top-center" />
        <Switch>
        <Route path="/" exact render={() => <Login onLogin={handleLogin} />} />
          <Route path="/login" render={() => <Login onLogin={handleLogin} />} />
          <Route path="/password-forget" component={PasswordForget} />
          <Route path="/register" render={() => <Register onRegister={handleRegister} />} />
          <Route path="/jokes" render={() => <JokeDisplay userID={userID} />} />
          <Route path="/create-joke" component={CreateJoke} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
