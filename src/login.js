import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { browserHistory } from "react-router-dom";

const Login = function () {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [Error, setError] = useState("");
  const [isError, issetError] = useState(false);
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
        throw err.response.data.msg;
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
          navigate("/facultyhome");
        }
      })
      .catch((err) => {
        console.log(err);
        issetError(true);
        setError(err.response.data.msg);
        throw err.response.data.msg;
      });
    setFacultyToken(localStorage.getItem("facultytoken"));
  };
  return (
    <div>
      <div>
        <form action="#">
          <h1>Admin Login</h1>

          <p>Use your provided E-mail and Password for login</p>
          <input
            type="text"
            name="email"
            placeholder="Enter Your Admin E-mail"
            required
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Admin Password"
            value={adminPass}
            onChange={(e) => setAdminPass(e.target.value)}
            required
          />

          <button type="button" onClick={handle_login_admin}>
            Log In
          </button>
          <Link to="/forgetadminpassword">
            <p>
              forget password?<a>click here</a>
            </p>
          </Link>
        </form>
      </div>
      <div>
        <h6>------------------------OR----------------------</h6>
        <form action="#">
          <h1>Faculty Login</h1>

          <p>Use your provided E-mail and Password for login</p>
          <input
            type="text"
            name="email"
            placeholder="Enter Your Faculty E-mail"
            required
            value={facultyEmail}
            onChange={(e) => setFacultyEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Faculty Password"
            value={facultyPass}
            onChange={(e) => setFacultyPass(e.target.value)}
            required
          />

          <button type="button" onClick={handle_login_Faculty}>
            Log In
          </button>
          <Link to="/forgetfacultypassword">
            <p>
              forget password?<a>click here</a>
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
};
export default Login;
