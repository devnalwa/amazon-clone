import React from "react";
import "./Header.css"; // Connecting the Styling File for different header components
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket"; // Needed to Import Icons from Material-UI
import { Link } from "react-router-dom"; // Importing router. This is needed to allow you to go to different pages by clicking stuff.
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

function Header() {
  const [{ basket, user }, dispatch] = useStateValue(); // Rendering basket icon to dynamically update when items added to basket.

  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <div className="header">
      <Link to="/">
        {" "}
        {/* Establishing Link to HomePage by clicking on Amazon Logo*/}
        <img
          className="header_logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
        />
      </Link>

      <div className="header_search">
        <input className="header_searchInput" type="text" />
        <SearchIcon className="header_searchIcon" />
      </div>

      <div className="header_nav">
        <Link to={!user && "/login"}>
          {" "}
          {/* Establishing Link to Login Page, won't take you to login page upon signing out, only when signing in*/}
          <div onClick={handleAuthentication} className="header_option">
            <span className="header_optionLineOne">
              {" "}
              Hello {!user ? "Guest" : user.email}
            </span>
            <span className="header_optionLineTwo">
              {user ? "Sign Out" : "Sign In"}{" "}
            </span>
          </div>
        </Link>

        <Link to="/orders">
          <div className="header_option">
            <span className="header_optionLineOne"> Returns </span>
            <span className="header_optionLineTwo"> & Orders </span>
          </div>
        </Link>

        <div className="header_option">
          <span className="header_optionLineOne"> Your </span>
          <span className="header_optionLineTwo"> Prime </span>
        </div>

        <Link to="/checkout">
          {" "}
          {/* Establishing Link to Checkout by clicking on basket icon*/}
          <div className="header_optionsBasket">
            <ShoppingBasketIcon />
            <span className="header_optionLineTwo header_basketCount">
              {basket?.length}
            </span>{" "}
            {/* Setting the basket count number to dynamically change. ? is so if basket becomes undefined it doesnt throw error   */}
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
