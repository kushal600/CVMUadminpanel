import React, { useState } from "react";

import axios from "axios";
import image from "./CVM.png";
import { Link, Navigate, useNavigate } from "react-router-dom";

const ForgetAdminPassword = () => {
  const [email, setEmail] = useState("");
  const [Error, setError] = useState("");
  const [ErrorOTP, setErrorOTP] = useState("");
  const [passError, setPassError] = useState("");
  const [successMail, setSuccessMail] = useState(false);
  const [OTP, setOTP] = useState("");
  const [flag, setFlag] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isOTPError, setIsOTPError] = useState(false);
  const [isPassError, setIsPassError] = useState(false);
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
          setIsError(false);
        }
      })
      .catch((err) => {
        console.log(err.response.data.msg, "errrrrrrrrrrorrrr");
        setError(err.response.data.msg);
        setIsError(true);
        // throw err;
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
        setIsOTPError(false);

        }
        if (data.data.res == "failed") {
          setFlag(false);
          console.log("Otp failed to verified");
          setOtpmsg(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorOTP(err.response.data.msg);
        setIsOTPError(true);
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
        setIsPassError(false);

          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        setPassError(err.response.data.msg);
        setIsPassError(true);
      });
  };

  return (
    <>
      <img src={image } alt="CVMU Logo" className="imgCVM"/>

      <div>
        <div>
          <div>
            <h1 class="text-primary">Change Password</h1>
            <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">@</span>
            <input
              type="text"
              placeholder="Enter your Email"
              name="forget-email"
              id="forget-email"
              class="form-control"
            aria-label="Enter your Email" 
            aria-describedby="basic-addon1"
              onChange={handleChange}
              value={email}
              required
            />
            </div>
            {/* {Error && <p>{Error}</p>} */}
            {isError && <>
            <div class="mt-2 col-md-12">

            <p  class="alert alert-danger">{Error}</p>
            </div>
          </>
            }
            {!successMail && (
              <button type="button" onClick={handleForgetPassword} class="btn btn-warning ">
                SEND OTP
              </button>
            )}
            {successMail ? (
              <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">OTP</span>

                <input
                  type="text"
                  placeholder="Enter 4 digit OTP"
                  name="OTP"
                  id="OTP"
                  class="form-control"
            aria-label="Enter 4 digit OTP" 
            aria-describedby="basic-addon1"
                  required
                  onChange={handleOTP}
                  value={OTP}
                />
                
                {!flag && (
                  <button type="button" onClick={verifyOTP} class="btn btn-warning ">
                    Verify OTP
                  </button>
                )}
                {isOTPError && <>
            <div class="mt-2 col-md-12">

            <p  class="alert alert-danger">Invalid OTP</p>
            </div>
          </>
            }
              </div>
              
            ) : (
              <div></div>
            )}
            {flag && (
              <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">**</span>
                <input
                  type="text"
                  name="newPassword"
                  id="newPassword"
                  placeholder="Enter your new Password"
                  class="form-control"
            aria-label="Enter your new Password" 
            aria-describedby="basic-addon1"
                  onChange={handleNewPassword}
                  value={newPassword}
                />
                <button onClick={changePassword} class="btn btn-warning ">Change Password</button>
              </div>
            )}
            {/* {!otpmsg && <div>Wrong Otp</div>} */}
            {isPassError && <>
            <div class="mt-2 col-md-12">

            <p  class="alert alert-danger">{passError}</p>
            </div>
          </>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetAdminPassword;
