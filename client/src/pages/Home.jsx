import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import Products from "../Products";

const Home = () => {
  return (
    <div className="container mx-auto">
      <Toaster />
      <Products />
    </div>
  );
};

export default Home;
