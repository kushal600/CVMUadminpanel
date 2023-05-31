import React, { useState } from "react";
// import { Link } from 'react-router-dom';
import axios from "axios";
// import './OTP.css'
import { Link, Navigate, useNavigate } from "react-router-dom";
import OTP from "./OTP";
// import "./ForgetEmail.css";
// import LockOpenIcon from "@mui/icons-material/LockOpen";
// import { API } from "../../constants/API";
const ForgetEmail = () => {
  const [email, setEmail] = useState("");
  const [Error, setError] = useState("");
  const [successMail, setSuccessMail] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleForgetPassword = (e) => {
    const obj = {
      email: email,
    };
    //le.log("vivek");
    //localhost:8000/api/v1/admin/login
    console.log(obj);
    axios
      .patch(`localhost:8000/api/v1/admin/forgotPasswordAdmin`, obj)
      .then((res) => {
        const data = res;
        if (data.data.res === "Success") {
          //le.log('success');
          localStorage.setItem("admin_email", email);
          // <Navigate replace={true}  to="/owner-dashboard"/>\
          setSuccessMail(true);
        }
      })
      .catch((err) => {
        console.log(err.response.data.msg, "fsdffdafa");
        setError(err.response.data.msg);
        throw err;
      });
  };
  const handleTest = () => {
    localStorage.setItem("email", email);
    setSuccessMail(true);
  };
  function handleOTP() {
    return <OTP />;
  }

  return (
    <>
      {!successMail ? (
        <div>
          <div>
            <div>
              <div>{/* <LockOpenIcon /> */}</div>
            </div>
            <div>
              <h1>Enter The E-Mail</h1>
              <input
                type="text"
                name="forget-email"
                id="forget-email"
                onChange={handleChange}
                value={email}
              />
              {Error && <p>{Error}</p>}
              {!successMail && (
                <button type="button" onClick={handleForgetPassword}>
                  SUBMIT
                </button>
              )}

              <button type="button" onClick={handleTest}>
                Test
              </button>
            </div>
          </div>
        </div>
      ) : (
        handleOTP()
      )}
    </>
  );
};

export default ForgetEmail;
