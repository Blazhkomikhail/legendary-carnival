import React from "react";
import Header from '../components/Header/Header';
import Categories from '../Pages/Categories/Categories';
import MainField from '../Pages/MainField/MainField';
import SideMenu from '../components/SideMenu/SideMenu';
import { Statistic } from '../Statistic/Statistic';
import {
  BrowserRouter as Router,
  Switch, 
  Route
} from "react-router-dom";
import './app.scss';

const App = () => {
  return (
    <Router>
    <SideMenu />
    <div className="container">
      <Header />
      <Switch>
        <Route path="/" exact component={Categories} />
        <Route path="/statistic" component={Statistic} />
        <Route path="/:id" component={MainField} />
      </Switch>
    </div>
    </Router>
  )
}

export default App;