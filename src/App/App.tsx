import React from "react";
import Main from '../Pages/Main/Main';
import Train from '../Pages/Train/Train';
import {
  HashRouter,
  Switch, 
  Route 
} from "react-router-dom";
import './app.scss';

const App = () => {
  return (
    <HashRouter>
    <div className="container">
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/:id" component={Train} />
      </Switch>
    </div>
    </HashRouter>
  )
}

export default App;