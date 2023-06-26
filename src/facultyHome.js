import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import image from "./CVM.png";
import { Link, useNavigate } from "react-router-dom";
import { browserHistory } from "react-router-dom";
import UploadMaterial from "./uploadMaterial";
const FacultyHome = function () {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [flag, setFlag] = useState(false);
  const getToken = () => {
    setToken(localStorage.getItem("facultytoken"));
    // console.log(tok);
  };
  const createQuiz = () => {
    console.log("create quiz");
    navigate("/createquiz");
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
      <img src={image} alt="CVMU Logo" className="imgCVM" />

      <div>
        {/* <h1>Faculty Home Page</h1> */}
        <div class="mt-3">
          <div class=".box">
            <button onClick={createQuiz} class="btn btn-warning  btn-lg">
              Create Quiz
            </button>
          </div>
        </div>
        <div class="mt-3">
          <div class=".box">
            <button
              type="button"
              onClick={() => setFlag(!flag)}
              class="btn btn-warning  btn-lg"
            >
              Upload Material/Announcement/Result
            </button>
          </div>
        </div>
        {flag && <UploadMaterial />}
        <div class="mt-3">
          <button
            onClick={() => {
              localStorage.removeItem("facultytoken");
              // localStorage.clear();
              window.location.reload();
            }}
            class="btn btn-primary btn-lg btn-block"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacultyHome;
