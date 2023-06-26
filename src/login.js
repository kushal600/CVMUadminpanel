import React from "react";
import { useState, useEffect } from "react";
import image from "./CVM.png"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { browserHistory } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
const Login = function () {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [error, setError] = useState("");
  const [isError, issetError] = useState(false);
  const [isError2, issetError2] = useState(false);
  const [admintoken, setAdminToken] = useState("");
  const [facultytoken, setFacultyToken] = useState("");
  const [facultyEmail, setFacultyEmail] = useState("");
  const [facultyPass, setFacultyPass] = useState("");
  const navigate = useNavigate();

  const submit = function () {
    console.log(adminEmail, adminPass);
  };

  const handle_login_admin = () => {
    
    const obj = {
      email: adminEmail,
      password: adminPass,
    };

    axios
      .post(
        "http://elbforcvmu-2038773933.ap-south-1.elb.amazonaws.com/api/v1/admin/login",
        obj
      )
      .then((res) => {
        const data = res;
        console.log(data.data.res);
        // if(data.data.res == "error"){
        //   alert("invalid password or email");
        // }
        if (data.data.token) {
          localStorage.setItem("admintoken", data.data.token);
          localStorage.setItem("adminEmail", adminEmail);
          // console.log("adminEmail",)
          console.log("logged in");

          navigate("/adminhome");
        }
      })
      .catch((err) => {
        console.log(err);
        issetError(true);
        setError(err.response.data.msg);
        // throw err.response.data.msg;
      });
    setAdminToken(localStorage.getItem("admintoken"));
  };

  const handle_login_Faculty = () => {
    console.log(facultyEmail, facultyPass);
    const obj = {
      email: facultyEmail,
      password: facultyPass,
    };
    console.log(obj);

    axios
      .post(
        "http://elbforcvmu-2038773933.ap-south-1.elb.amazonaws.com/api/v1/faculty/login",
        obj
      )
      .then((res) => {
        const data = res;
        // console.log("logged in");
        // console.log("response: ", res);
        console.log(data.data.token);
        if (data.data.token) {
          localStorage.setItem("facultytoken", data.data.token);
          console.log("logged in");
          // issetError(false);
          navigate("/facultyhome");
        }
      })
      .catch((err) => {
        console.log(err);
        issetError2(true);
        setError(err.response.data.msg);
        // throw err.response.data.msg;
      });
    setFacultyToken(localStorage.getItem("facultytoken"));
  };
  return (<>
      <img src={image } alt="CVMU Logo" className="imgCVM"/>
    <div >
      
        {/* <div class="text-center">
          <img src="C:\Users\DELL\Desktop\tryingadminpanel\src\CVM.png" class="img-fluid" alt="cvm"/>
        </div> */}
      <div class="shadow p-3 mb-5 bg-white rounded">
        <form action="#">
          <h1 class="text-primary">Admin Login</h1>

          <p class="font-monospace">Use your provided E-mail and Password for login</p>
          <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">✉️</span>
          <input
            type="text"
            name="email"
            placeholder="Enter Your Admin E-mail"
            required
            class="form-control"
            aria-label="Enter Your Admin E-mail" 
            aria-describedby="basic-addon1"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
            />
            </div>
            <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">🔑</span>
          <input
            type="password"
            name="password"
            placeholder="Enter Admin Password"
            class="form-control"
            aria-label="Enter Admin Password" 
            aria-describedby="basic-addon1"
            value={adminPass}
            onChange={(e) => setAdminPass(e.target.value)}
            required
            />
            </div>


          <button type="button" onClick={handle_login_admin} class="btn btn-warning ">
            Log In
          </button>
          {isError && <>
            <div class="mt-2 col-md-12">

            <p  class="alert alert-danger">Email or Password in Invalid</p>
            </div>
          </>
            }
          <Link to="/forgetadminpassword">
            <p>
              forget password?<a>click here</a>
            </p>
          </Link>
        </form>
      </div>
        {/* <h6 >----------------------------------OR--------------------------------</h6> */}
      <div class="shadow p-3 mb-5 bg-white rounded">
        <form action="#">
          <h1 class="text-primary">Faculty Login</h1>

          <p class="font-monospace">Use your provided E-mail and Password for login</p>
          <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">✉️</span>
          <input
            type="text"
            name="email"
            placeholder="Enter Your Faculty E-mail"
            required
            class="form-control"
            aria-label="Enter Your Faculty E-mail" 
            aria-describedby="basic-addon1"
            value={facultyEmail}
            onChange={(e) => setFacultyEmail(e.target.value)}
          />
          </div>
          <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">🔑</span>
          <input
            type="password"
            name="password"
            placeholder="Enter Faculty Password"
            class="form-control"
            aria-label="Enter Faculty Password" 
            aria-describedby="basic-addon1"
            value={facultyPass}
            onChange={(e) => setFacultyPass(e.target.value)}
            required
            />
          </div>

          <button type="button" onClick={handle_login_Faculty} class="btn btn-warning ">
            Log In
          </button>
          {isError2 && <>
            <div class="mt-2 col-md-12">

            <p  class="alert alert-danger">Email or Password in Invalid</p>
            </div>
          </>
            }
          <Link to="/forgetfacultypassword">
            <p class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">
              forget password?<a>click here</a>
            </p>
          </Link>
        </form>
      </div>
    </div>
            </>
  );
};
export default Login;
