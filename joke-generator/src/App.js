import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Login from './Login';
import Register from './Register';
import JokeDisplay from './JokeDisplay';
import CreateJoke from './CreateJoke';
import PasswordForget from './PasswordForget';
import DeleteUser from './DeleteUser';


function App() {
  //settings to send the userID from login and registration to display joke
  const [userID, setUserID] = useState(0);
  const [loggedIn, setLogIn] = useState(false);

  const handleLogin = (userID) => {
    setUserID(userID);
    setLogIn(true);
  };


  return (
    <Router>
      <div className="App">
        <ToastContainer position="top-center" />
        <Switch>
        <Route path="/" exact render={() => <Login onLogin={handleLogin} />} />
          <Route path="/login" render={() => <Login onLogin={handleLogin} />} />
          <Route path="/register" component={Register} />
          <Route path="/password-forget" component={PasswordForget} />
          <Route path="/delete-user" component={DeleteUser} />
          <Route path="/jokes" render={() => <JokeDisplay userID={userID} loggedIn={loggedIn} />} />
          <Route path="/create-joke" render={() => <CreateJoke loggedIn={loggedIn} />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
