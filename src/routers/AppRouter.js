import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Header from '../components/layout/Header';
import DashboardPage from '../components/pages/DashboardPage';
import EditItemPage from '../components/pages/EditItemPage';
import AddItemPage from '../components/pages/AddItemPage';
import PageNotFound from '../components/pages/PageNotFound';
import Footer from '../components/layout/Footer';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={DashboardPage} exact />
        <Route path="/edit/:id" component={EditItemPage} />
        <Route path="/add/:type" component={AddItemPage} />
        <Route component={PageNotFound} />
      </Switch>
      <Footer />
    </div>
  </Router>
);

export default AppRouter;
