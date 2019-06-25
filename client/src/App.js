import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import Search from './pages/Search';
import Saved from './pages/Saved';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/search" />} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/saved" component={Saved} />
        <Route render={() => <Redirect to="/search" />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
