import React from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
// import "./OTP.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import CollapsibleBox from "../../components/Collapsible/CollapsibleBox";
// import LockOpenIcon from "@mui/icons-material/LockOpen";
// import { API } from "../../constants/API";
const OTP = () => {
  const [otp, setOtp] = React.useState("");

  const email = localStorage.getItem("admin_email");

  const navigate = useNavigate();

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  const handleOtp = () => {
    const obj = {
      otp: otp,
    };
    //le.log("vivek");
    //localhost:8000/api/v1/admin/login
    //le.log(email);
    http: axios
      .post(`localhost:8000/api/v1/admin/${email}/validateMailOtp`, obj)
      .then((res) => {
        const data = res;
        //le.log('res_admin',res);
        // //le.log();
        if (data.data.res === "success") {
          //le.log('success');
          //   localStorage.setItem('token',data.token);
          // <Navigate replace={true}  to="/owner-dashboard"/>\
          navigate("/home");
        }
      })
      .catch((err) => {
        //le.log(err.response.data.msg,'fsdffdafa')
      });
  };

  return (
    <div>
      <div>
        <div>
          <div>{/* <LockOpenIcon /> */}</div>
        </div>
        <div>
          <h1>Enter The OTP</h1>
          <MuiOtpInput value={otp} onChange={handleChange} />
          <button type="button" onClick={handleOtp}>
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTP;
