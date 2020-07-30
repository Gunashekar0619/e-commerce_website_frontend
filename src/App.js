import React from 'react';
// import HomeMenu from './components/menu'
// import Home from './components/home'

import './App.css';
// import { Container } from 'semantic-ui-react';
// import customer from './components/customer';
//import Login from './components/login';
const login = () =>{
  window.location.href="/login"
}

function App() {
  return (
    <button className="ui button" onClick={login}>Login</button>  
  );
}

export default App;
