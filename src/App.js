import React from 'react';

//import home from './components/home'

import './App.css';
import customer from './components/customer';
//import Login from './components/login';
const login = () =>{
  window.location.href="/login"
}

function App() {
 
  return (
    <div>
    <customer/>
    <button onClick={login}>Login</button>
    </div>
  );
}

export default App;
