import React from "react";
import Main from '../Pages/Main/Main';
import Train from '../Pages/Train/Train';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route 
} from "react-router-dom";
import './app.scss';

const App = () => {
  return (
    <Router>
    <div className="container">
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/:id" component={Train} />
      </Switch>
    </div>
    </Router>
  )
}

export default App;