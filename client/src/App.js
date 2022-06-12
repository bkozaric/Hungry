import React, { Fragment, useEffect, useState } from 'react';

import Header from "./components/Layout/Header"
import FoodView from "./components/Layout/FoodView"
import FoodContainer from "./components/Layout/FoodContainer"
import Login from "./components/Auth/Login"
import Registration from "./components/Auth/Register"
import Logout from "./components/Auth/Logout"
import Cart from "./components/Layout/Cart"
import Profile from "./components/Profile/Profile"
import Footer from "./components/Layout/Footer"
import VerifyEmail from "./components/Auth/VerifyEmail"
import Admin from "./components/Admin/Admin"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SessionProvider } from "./SessionContext";


function App() {

  const [cartCount, setCartCount] = useState(0);
  const [cart, setCart] = useState([])

  const calculateTotal = () => {
    setCartCount(cart.reduce((cTotal, food) => { return food.amount + cTotal }, 0));
  }

  const updateCart = (forceEmpty) => {
    if (forceEmpty) {
      setCart([]);
      setCartCount(0);
    }
    else {
      let cartCurrent = JSON.parse(localStorage.getItem("cart"));
      if (!cartCurrent) {
        cartCurrent = [];
        setCart([])
      }
      else {
        setCart(cartCurrent);
      }
    }

  }

  useEffect(() => {
    updateCart(false);
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      calculateTotal();
    }
  }, [cart])

  return (
    <SessionProvider>
      <div className="container">
        <Header cartCount={cartCount} />
        <Router>
          <Switch>
            <Route exact path="/" render={() => (<FoodContainer updateCart={updateCart} />)}></Route>
            <Route path="/food/:fId" render={(props) => (<FoodView {...props} updateCart={updateCart} />)}>
            </Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Registration}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route path="/verify/:token" component={VerifyEmail}></Route>
            <Route path="/cart" render={() => (<Cart updateCart={updateCart} />)}></Route>
            <Route exact path="/profile" component={Profile}></Route>
            <Route path="/profile/orders/:oid" component={Profile}></Route>
            <Route path="/admin" component={Admin}></Route>
          </Switch>
        </Router>
      </div>
      <Footer />
    </SessionProvider>
  );
}

export default App;
