import React, { ReactElement } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Categories from '../Pages/Categories/Categories';
import MainField from '../Pages/MainField/MainField';
import SideMenu from '../components/SideMenu/SideMenu';
import Statistic from '../Pages/Statistic/Statistic';
import Admin from '../Pages/Admin/Admin';
import AdminCategotyPage from '../Pages/Admin/AdminCategoryPage/AdminCategotyPage';
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
          <Route path="/admin" exact component={Admin} />
          <Route path="/admin/:id" exact component={AdminCategotyPage} />
          <Route path="/:id" exact component={MainField} />
          <Route path="/repeat" component={MainField} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
