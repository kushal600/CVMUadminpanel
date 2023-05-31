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
  const [token, setToken] = useState("");
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
      .post("http://localhost:8000/api/v1/admin/login", obj)
      .then((res) => {
        const data = res;
        //le.log('data.dat.token',data.data.token);
        if (data.data.token) {
          //le.log('success');
          localStorage.setItem("token", data.data.token);
          console.log("logged in");

          navigate("/home");

          // dispatch(AuthActions.setTokenadmin(data.data.token));
          // <Navigate replace={true}  to="/owner-dashboard"/>\
        }
      })
      .catch((err) => {
        console.log(err);
        issetError(true);
        setError(err.response.data.msg);
        throw err.response.data.msg;
        //le.log(err.response.data.msg,'fsdffdafa')
      });
    setToken(localStorage.getItem("token"));
    //le.log('admin_obj',obj);
  };
  return (
    <form action="#">
      <h1>Login For Owner</h1>

      <p>Use your provided E-mail and Password for login</p>
      <input
        type="text"
        name="email"
        placeholder="Enter Your E-mail"
        required
        value={adminEmail}
        onChange={(e) => setAdminEmail(e.target.value)}
      />
      <input
        type="password"
        name="password"
        placeholder="Enter Your Password"
        value={adminPass}
        onChange={(e) => setAdminPass(e.target.value)}
        required
      />

      <button type="button" onClick={handle_login_admin}>
        Log In
      </button>
      <Link to="/forgetEmail">
        <p>
          forget password?<a>click here</a>
        </p>
      </Link>
    </form>
  );
};
export default Login;
