import React, { useState } from "react";

import axios from "axios";

import { Link, Navigate, useNavigate } from "react-router-dom";

const ForgetAdminPassword = () => {
  const [email, setEmail] = useState("");
  const [Error, setError] = useState("");
  const [successMail, setSuccessMail] = useState(false);
  const [OTP, setOTP] = useState("");
  const [flag, setFlag] = useState(false);
  const [otpmsg, setOtpmsg] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleForgetPassword = (e) => {
    const obj = {
      email: email,
    };

    axios
      .patch(
        `http://elbforcvmu-2038773933.ap-south-1.elb.amazonaws.com/api/v1/admin/forgotpassword`,
        obj
      )
      .then((res) => {
        console.log("res", res);
        const data = res;
        if (res) {
          localStorage.setItem("admin_email", email);

          setSuccessMail(true);
        }
      })
      .catch((err) => {
        console.log(err.response.data.msg, "errrrrrrrrrrorrrr");
        setError(err.response.data.msg);
        throw err;
      });
  };

  const handleOTP = (e) => {
    setOTP(e.target.value);
    console.log(OTP);
  };

  const verifyOTP = () => {
    console.log("OTP verification");
    const obj = {
      otp: OTP,
    };
    axios
      .post(
        `http://elbforcvmu-2038773933.ap-south-1.elb.amazonaws.com/api/v1/admin/otp/validate/${email}`,
        obj
      )
      .then((res) => {
        const data = res;

        if (data.data.res == "success") {
          setFlag(true);
          console.log("Otp verified");
          setOtpmsg(true);
        }
        if (data.data.res == "failed") {
          setFlag(false);
          console.log("Otp failed to verified");
          setOtpmsg(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const changePassword = () => {
    console.log("admin new password : ", newPassword);
    const obj = {
      password: newPassword,
    };
    axios
      .patch(
        `http://elbforcvmu-2038773933.ap-south-1.elb.amazonaws.com/api/v1/admin/password/${email}`,
        obj
      )
      .then((res) => {
        const data = res;
        console.log(data.data.res);
        if (data.data.res == "success") {
          localStorage.setItem("adminNewPassword", newPassword);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div>
        <div>
          <div>
            <h1>Change Password</h1>
            <input
              type="text"
              placeholder="Enter your Email"
              name="forget-email"
              id="forget-email"
              onChange={handleChange}
              value={email}
              required
            />
            {Error && <p>{Error}</p>}
            {!successMail && (
              <button type="button" onClick={handleForgetPassword}>
                SEND OTP
              </button>
            )}
            {successMail ? (
              <div>
                <input
                  type="text"
                  placeholder="Enter 4 digit OTP"
                  name="OTP"
                  id="OTP"
                  required
                  onChange={handleOTP}
                  value={OTP}
                />
                {!flag && (
                  <button type="button" onClick={verifyOTP}>
                    Verify OTP
                  </button>
                )}
              </div>
            ) : (
              <div></div>
            )}
            {flag && (
              <div>
                <input
                  type="text"
                  name="newPassword"
                  id="newPassword"
                  placeholder="Enter your new Password"
                  onChange={handleNewPassword}
                  value={newPassword}
                />
                <button onClick={changePassword}>Change Password</button>
              </div>
            )}
            {!otpmsg && <div>Wrong Otp</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetAdminPassword;
