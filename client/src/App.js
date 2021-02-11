import React, { Fragment, useEffect, useState } from 'react';

import Header from "./components/Header"
import FoodView from "./components/FoodView"
import FoodContainer from "./components/FoodContainer"
import Login from "./components/Login"
import Registration from "./components/Register"
import Logout from "./components/Logout"
import Cart from "./components/Cart"
import Profile from "./components/Profile/Profile"
import Footer from "./components/Footer"
import VerifyEmail from "./components/VerifyEmail"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {SessionContext} from "./SessionContext";

function App() {

  const [sessionInfo, setSessionInfo] = useState({});

  const getSessionInfo = async () => {
    try {
      const response = await fetch("/api/user/checkSession");
      const sessionJson = await response.json();
      setSessionInfo(sessionJson);
    }
    catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getSessionInfo();
  }, []);

  return (
    <SessionContext.Provider value={sessionInfo}>
    <div className="container">
          <Header/>
          <Router>
            <Switch>
              <Route exact path="/" component={FoodContainer}></Route>
              <Route path="/food/:fId" component={FoodView}></Route>
              <Route path="/login" component={Login}></Route>
              <Route path="/register" component={Registration}></Route>
              <Route path="/logout" component={Logout}></Route>
              <Route path="/verify/:token" component={VerifyEmail}></Route>
              <Route path="/cart" component={Cart}></Route>
              <Route exact path="/profile" component={Profile}></Route>
              <Route path="/profile/orders/:oid" component={Profile}></Route>
        {/*   
              
              <Route path="/edit/:id" component={Edit}></Route>
              <Route path="/view/:id" component={ViewAd}></Route>
              <Route path="/createAd" component={CreateAd}></Route>
              <Route exact path="/profile" component={Profile}></Route>
              <Route path="/profile/order/:oid" component={Profile}></Route>
               */}
            </Switch>
          </Router>
    </div>
    <Footer/>
    </SessionContext.Provider>  
  );
}

export default App;
