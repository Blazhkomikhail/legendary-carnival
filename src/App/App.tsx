import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Categories from '../Pages/Categories/Categories';
import MainField from '../Pages/MainField/MainField';
import SideMenu from '../components/SideMenu/SideMenu';
import { Statistic } from '../Statistic/Statistic';
import './app.scss';

const App = (): ReactElement => {
  return (
    <Router>
      <SideMenu />
      <div className="container">
        <Header />
        <Switch>
          <Route path="/" exact component={Categories} />
          <Route path="/statistic" component={Statistic} />
          <Route path="/:id" component={MainField} />
          <Route path="/repeat" component={MainField} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
