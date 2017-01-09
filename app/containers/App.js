import React, { Component } from 'react';
import { Router, Route, hashHistory } from 'react-router';
import Connections from '../components/Connections';
import Add from '../components/Add';

class App extends Component {

  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Connections} />
        <Route path="add" component={Add} />
      </Router>
    );
  }
}

export default App;
