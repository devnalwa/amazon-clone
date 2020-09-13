import React, { useState, useEffect } from "react";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from "./axios";
import { db } from "./firebase";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue(); // This line is essential when you need variables in this file to access data layer in order to present specific user info.

  // Setting our states which are being called/referenced throughout this file.
  const history = useHistory();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null); // Writing Variables in React, creating two pieces of state
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true); // Required for Stripe Payments, cant make transactions with stripe without this as you need a Stripe secret.

  // This snippet below is required to charge user the correct amount based on baskettotal and handle any changes made by user and to process the payment with stripe.
  useEffect(
    () => {
      // generate the special stripe secret which allows us to charge a customer
      const getClientSecret = async () => {
        const response = await axios({
          // axios is a way to make a request such as post or get.
          method: "post",
          // Stripe expects the total in a currencies sub-units
          url: `/payments/create?total=${getBasketTotal(basket) * 100}` // API Call. Getting basket total incase basket contents changes. create?total(query prem).
        });
        setClientSecret(response.data.clientSecret);
      };

      getClientSecret();
    },
    [basket]
  );

  const handleSubmit = async event => {
    // Giving handle sumbit an event, and if that is event is in play, we do the stuff in the brackets.

    // Fancy Stripe Stuff
    event.preventDefault(); // Stops Page from refreshing
    setProcessing(true); // Will Allow you to click "Buy Now" button only once and will then disable it.

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        // Confirming client payment through secret from stripe which is how stripe knows how much to charge.
        payment_method: {
          card: elements.getElement(CardElement)
        }
      })
      .then(({ paymentIntent }) => {
        // paymenyIntent = paymeny confirmation
        setSucceeded(true);
        setError(null);
        setProcessing(false);

        history.repalce("/orders"); // Pushing user to order confirmation page after successfull transaction. Using 'replace' instead of 'push' as we don't want user to be able to go back to payment page.
      });
  };

  const handleChange = event => {
    // Listen for any changes in cardElement
    // and display any errors as the customer tyoes their card details.
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment_container">
        <h1>
          Checkout (
          <Link to="./checkout">{basket?.length} items</Link>)
        </h1>

        {/* Payment Section - Delivery Address */}
        <div className="payment_section">
          <div className="payment_title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment_address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        {/* Payment Section - review items / delivery */}

        <div className="payment_section">
          <div className="payment_title">
            <h3>Review Items and Delivery</h3>
          </div>
          <div className="payment_items">
            {basket.map(item => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        {/* Payment Section - Payment */}

        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment_details">
            {/* Stripe Payment magic */}

            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment_priceContainer">
                <CurrencyFormat
                  renderText={value => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>{" "}
                  {/* When order is processing, it will show "processing" and buy now button will be disables, otherwise it will say Buy Now. */}
                </button>
              </div>
              {/* Errors (Fail Safe incase error shows up, such as incorrect card number, etc.) */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
