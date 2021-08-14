import React, { ReactElement, useState } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Categories from '../Pages/Categories/Categories';
import MainField from '../Pages/MainField/MainField';
import SideMenu from '../components/SideMenu/SideMenu';
import Statistic from '../Pages/Statistic/Statistic';
import Admin from '../Pages/Admin/Admin';
import Authorisation from '../Pages/Authorisation/Authorisation';
import AdminCategotyPage from '../Pages/Admin/AdminCategoryPage/AdminCategotyPage';
import './app.scss';

const App = (): ReactElement => {
  const [isLogined, setIsLogined] = useState(false);

  const isLoginedHandler = (flag: boolean) => {
    setIsLogined(flag);
  };
  return (
    <Router>
      <SideMenu />
      <div className="container">
        <Header logined={isLogined} handleLogined={isLoginedHandler} />
        <main className="main-app">
          <Switch>
            <Route path="/" exact component={Categories} />
            <Route path="/statistic" component={Statistic} />
            <Route path="/auth">
              <Authorisation handleLogined={isLoginedHandler} />
            </Route>
            <Route path="/admin" exact component={Admin} />
            <Route path="/admin/:id" component={AdminCategotyPage} />
            <Route path="/:id" exact component={MainField} />
            <Route path="/repeat" component={MainField} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
