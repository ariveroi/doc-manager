import "../style/App.css";
import React, { useState } from "react";
import {
  Route,
  Switch,
  Link,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import Main from "./Main";
import Login from "./Login";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  // const []

  return (
    <>
      {/* <Router>
        <Route exact path="/" component={Main} />
      <Router/> */}
      <Router>{loggedIn ? <Main /> : <Login />}</Router>
      {/* <button onClick={()=>setLoggedIn(true)}>Login</button> */}
    </>
  );
}
