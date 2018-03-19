import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from '../components/Header';
import DashboardPage from '../components/DashboardPage';
import EditItemPage from '../components/EditItemPage';
import AddItemPage from '../components/AddItemPage';
import PageNotFound from '../components/PageNotFound';
import Footer from '../components/Footer';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={DashboardPage} exact />
        <Route path="/edit/:id" component={EditItemPage} />
        <Route path="/add" component={AddItemPage} />
        <Route component={PageNotFound} />
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>
);

export default AppRouter;
