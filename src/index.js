import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Login from './components/login';
import { Route, BrowserRouter } from 'react-router-dom';
import Profile from './components/profile'
import shopkeeper from './components/shopkeeper';
import Customer from './components/customer';
import admin from './components/admin';
import { CookiesProvider } from 'react-cookie';
// import Menu from './components/menu'

const routing = (
  <BrowserRouter>
    <CookiesProvider>
      <Route exact path="/" component={App}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/profile" component={Profile}/>
      <Route exact path="/seller" component={shopkeeper}/>
      <Route exact path="/customer" component={Customer}/>
      <Route exact path="/admin" component={admin}/>
    </CookiesProvider>
  </BrowserRouter>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
