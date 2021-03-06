import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import Payment from "./Payment";
import Orders from "./Orders";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51HQJMXActt51VOE3sVI6C2OCpZ43KnHr6WNtluFWB4Y6YVN6JTvjmNGKS9zfB5epAChauTh4i9D2KCP3iFxplIEW00A0RGXjhJ"
); // For Stripe Functionality

function App() {
  const [{}, dispatch] = useStateValue();

  //  If Statement in React, its kind of dynamic
  useEffect(() => {
    // Will only run once when the app component loads.

    auth.onAuthStateChanged(authUser => {
      // Creating a listner that will essentially retain login info for user based specific sign in.
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        // the user just looged in / the user was logged in

        dispatch({
          // Sending user info to data layer so it can be pulled later to give user personalized greeting, experiemce, etc.
          type: "SET_USER",
          user: authUser
        });
      } else {
        // the user is logged out.
        dispatch({
          type: "SET_USER",
          user: null // Nobody logged in
        });
      }
    });
  }, []);

  return (
    // BEM Convention ,, The home page router must be last (/) out of all routers.
    <Router>
      <div className="app">
        <Switch>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
