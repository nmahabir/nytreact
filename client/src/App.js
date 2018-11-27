import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav'
import Card from './components/Card'
import Jumbotron from './components/Jumbotron'

const App = () => (
  <Router>
    <div>
      <Nav />
        <Switch>
          <Route exact path='/' component={Articles} />
          <Route exact path='/articles' component={Articles} />
          <Route exact path='/articles:id' component={SavedArticles} />
          
        </Switch>
    </div>
  </Router>
);

export default App;


