import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Header from '../components/layout/Header';
import LoginPage from '../components/pages/LoginPage';
import SignUpPage from '../components/pages/SignUpPage';
import ResetPasswordPage from '../components/pages/ResetPasswordPage';
import DashboardPage from '../components/pages/DashboardPage';
import EditItemPage from '../components/pages/EditItemPage';
import AddItemPage from '../components/pages/AddItemPage';
import PageNotFound from '../components/pages/PageNotFound';
import Footer from '../components/layout/Footer';
import * as routes from '../constants/routes';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div className="site">
      <Header />
      <Switch>
        <PublicRoute path={routes.LOGIN} component={LoginPage} exact />
        <PublicRoute path={routes.SIGNUP} component={SignUpPage} exact />
        <PublicRoute path={routes.RESET_PASS} component={ResetPasswordPage} exact />
        <PrivateRoute path={routes.DASHBOARD} component={DashboardPage} />
        <PrivateRoute path={routes.EDIT_ITEM} component={EditItemPage} />
        <PrivateRoute path={routes.ADD_ITEM} component={AddItemPage} />
        <Route component={PageNotFound} />
      </Switch>
      <Footer />
    </div>
  </Router>
);

export default AppRouter;
