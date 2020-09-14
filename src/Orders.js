import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import "./Orders.css";
import { useStateValue } from "./StateProvider";
import Order from "./Order";

function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [order, setOrders] = useState([]); // State for storing all orders

  useEffect(
    () => {
      // Only if User exists
      if (user) {
        db // Accessing Database
          .collection("users") // Going to users field in the db (firebase)
          .doc(user?.uid) // Then to id -- in db (firebase)
          .collection("orders") // Then to orders -- in db (firebase)
          .orderBy("created", "desc") // Most recent one on top
          .onSnapshot((
            snapshot // Gives us a real time snapshot of what the database looks like, will update in real time.
          ) =>
            setOrders(
              snapshot.docs.map(doc => ({
                // Returning Orders as documents, and return an object full of info for those documents
                id: doc.id,
                data: doc.data()
              }))
            )
          );
      } else {
        setOrders([]);
      }
    },
    [user]
  );

  return (
    <div className="Orders">
      <h1>Your Orders</h1>

      <div className="orders_order">
        {order?.map(order => <Order order={order} />)}
      </div>
    </div>
  );
}

export default Orders;
