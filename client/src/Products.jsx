import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import Product from "./Product";
import Cart from "./Cart";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        if (data && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          console.error("Invalid data format. Products array not found.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const addToCart = (product) => {
    if (user) {
      const existingItem = cartItems.find((item) => item.id === product.id);
      if (existingItem) {
        const updatedItems = cartItems.map((item) => {
          if (item.id === product.id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        });
        setCartItems(updatedItems);
      } else {
        const newItem = {
          id: product.id,
          title: product.title,
          quantity: 1,
          price: product.price,
        };
        setCartItems([...cartItems, newItem]);
      }
    } else {
      toast.error("Please Login First");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  return (
    <div>
      <Toaster />
      <div className="container mx-auto">
        <Cart cartItems={cartItems} />
        {products?.length > 0 ? (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
            {products.map((product) => (
              <Product
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>
        ) : (
          <div
            className="spinner-border"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
