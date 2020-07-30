import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Login from './components/login';
import { Route, BrowserRouter } from 'react-router-dom';
import Profile from './components/profile'
import productdetails from './components/productdetails'
import Shopkeeper from './components/shopkeeper';
import Customer from './components/customer';
import admin from './components/admin';
import { CookiesProvider } from 'react-cookie';
import addgoods from './components/seller/addgoods'

const routing = (
  <div>
    <BrowserRouter>
      <CookiesProvider>
        <Route exact path="/seller/:userid/addgoods" component={addgoods}/>
        <Route exact path="/" component={App}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/profile/:userid" component={Profile}/>
        <Route exact path="/seller" component={Shopkeeper}/>
        <Route exact path="/customer" component={Customer}/>
        <Route exact path="/admin" component={admin}/>
        <Route exact path="/product/:foodid" component={productdetails}/>
      </CookiesProvider>
    </BrowserRouter>
  </div>
)
ReactDOM.render(routing, document.getElementById('root'));
serviceWorker.unregister();
