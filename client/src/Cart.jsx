import React, { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const Cart = ({ cartItems }) => {
  const API = axios.create({ baseURL: "http://localhost:5000" });
  const user = useState(JSON.parse(localStorage.getItem("profile")));

  const handleSaveToMongoDB = async () => {
    try {
      const response = await API.post("/user/savecart", {
        userId: user[0].result._id,
        cartItems,
      });
      toast.success(`${response.data.message}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Toaster />
      <h2>
        Cart
        <span className="float-end">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSaveToMongoDB}
          >
            Buy Now
          </button>
        </span>
      </h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Product ID</th>
            <th scope="col">Product Name</th>
            <th scope="col">Product Quantity</th>
            <th scope="col">Product Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <th scope="row">{item.id}</th>
              <td>{item.title}</td>
              <td>{item.quantity}</td>
              <td>$ {item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cart;
