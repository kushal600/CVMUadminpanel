import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { browserHistory } from "react-router-dom";
const FacultyHome = function () {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const getToken = () => {
    setToken(localStorage.getItem("facultytoken"));
    // console.log(tok);
  };
  useEffect(() => {
    // getToken();
    window.onpopstate = () => {
      if (localStorage.getItem("facultytoken")) {
        navigate("/facultyhome");
      }
    };
    if (!localStorage.getItem("facultytoken")) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <div>
        <h1>Faculty Home Page</h1>
        <button
          onClick={() => {
            localStorage.removeItem("facultytoken");
            // localStorage.clear();
            window.location.reload();
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default FacultyHome;
