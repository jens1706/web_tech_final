import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import JokeDisplay from './JokeDisplay';
import CreateJoke from './CreateJoke';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/jokes" component={JokeDisplay} />
          <Route path="/create-joke" component={CreateJoke} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
