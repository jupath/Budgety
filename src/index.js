import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'react-dates/lib/css/_datepicker.css';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetItems } from './actions/budget';
import { userLogin, userLogout } from './actions/auth';
import { auth } from './firebase/auth';
import LoadingPage from './components/pages/LoadingPage';
import './styles/styles.scss';

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('root'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('root'));

auth.onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(userLogin(user.uid, user.displayName));
    store.dispatch(startSetItems()).then(() => {
      renderApp();
    });
  } else {
    store.dispatch(userLogout());
    renderApp();
  }
});
