import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { browserHistory } from "react-router-dom";
const Home = function () {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const getToken = () => {
    setToken(localStorage.getItem("token"));
    // console.log(tok);
  };
  useEffect(() => {
    // getToken();
    window.onpopstate = () => {
      if (localStorage.getItem("token")) {
        navigate("/home");
      }
    };
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <h1>Home Page</h1>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          // localStorage.clear();
          window.location.reload();
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
