import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { browserHistory } from "react-router-dom";
const AdminHome = function () {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const getToken = () => {
    setToken(localStorage.getItem("admintoken"));
    // console.log(tok);
  };

  const handleCreateSubject = () =>{
    console.log("create subject");
    navigate("/createsubject");
  };
  useEffect(() => {
    // getToken();
    window.onpopstate = () => {
      if (localStorage.getItem("admintoken")) {
        navigate("/adminhome");
      }
    };
    if (!localStorage.getItem("admintoken")) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <div>
        <h1>Admin Home Page</h1>
        <Link to="/registerfaculty">
          <p>
            Register Faculty?<a>click here</a>
          </p>
        </Link>
      </div>
      <div>
        <button onClick={handleCreateSubject}>Create Subject</button>
      </div>
      <div>
        <button onClick={()=>navigate("/verifystudent")}>Verify Student</button>
      </div>
      <div>
        <button
          onClick={() => {
            localStorage.removeItem("admintoken");
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

export default AdminHome;
