import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import image from "./CVM.png";
import { Link, useNavigate } from "react-router-dom";
import { browserHistory } from "react-router-dom";
const RegisterFaculty = () => {
  const [newFacultyName, setNewFacultyName] = useState("");
  const [newFacultyEmail, setNewFacultyEmail] = useState("");
  const [newFacultyPass, setNewFacultyPass] = useState("");
  const [newFacultyDept, setNewFacultyDept] = useState("");
  const [newFacultySub, setNewFacultySub] = useState("");
  const navigate = useNavigate();
  const registerNewFaculty = () => {
    let adminToken = localStorage.getItem("admintoken");
    console.log("inisde register faculty");
    const obj = {
      name: newFacultyName,
      email: newFacultyEmail,
      password: newFacultyPass,
      department: newFacultyDept,
      subject: newFacultySub,
    };
    console.log(obj);
    // let config = {
    //   headers: {
    //     Authorization:
    //       `Bearer` +
    //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDczM2ViYWIyNWI0MzUwNjBlNGNjZDMiLCJuYW1lIjoicHJhdGhhbSBzaGFoIiwiaWF0IjoxNjg1NDYwMjQ2LCJleHAiOjE2ODgwNTIyNDZ9.ZDNDTZJrl5yKbURPemzoPlkOLUk0zJm9lhSxYHRU62Q",
    //   },
    // };
    axios
      .post(
        "http://elbforcvmu-2038773933.ap-south-1.elb.amazonaws.com/api/v1/admin/faculty",
        obj,
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      )
      .then((res) => {
        const data = res;
        console.log(data);
        if (res) {
          console.log("response");
        }
      })
      .catch((err) => {
        console.log(err);
        // issetError(true);
        // setError(err.response.data.msg);
        // throw err.response.data.msg;
      });
  };

  const backToHome = () => {
    navigate("/adminhome");
  };
  return (
    <div>
      <img src={image } alt="CVMU Logo" className="imgCVM"/>

      {/* <h1>Register faculty</h1> */}
      <form>
      <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">👤</span>
        <input
          type="text"
          name="newFacultyName"
          placeholder="Enter Faculty Name"
          class="form-control"
            aria-label="Enter Faculty Name" 
            aria-describedby="basic-addon1"
          required
          value={newFacultyName}
          onChange={(e) => setNewFacultyName(e.target.value)}
        />
        </div>
        <br />
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">✉️</span>
        <input
          type="email"
          name="newFacultyEmail"
          placeholder="Enter Faculty Email"
          class="form-control"
            aria-label="Enter Faculty Email" 
            aria-describedby="basic-addon1"
          required
          value={newFacultyEmail}
          onChange={(e) => setNewFacultyEmail(e.target.value)}
        />
        </div>

        <br />
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">🔑</span>
        <input
          type="password"
          name="newFacultyPass"
          placeholder="Enter Faculty Password"
          class="form-control"
            aria-label="Enter Faculty Password" 
            aria-describedby="basic-addon1"
          required
          value={newFacultyPass}
          onChange={(e) => setNewFacultyPass(e.target.value)}
        />
        </div>

        <br />
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">👨‍💻</span>
        <input
          type="text"
          name="newFacultyDept"
          placeholder="Enter Faculty Department"
          class="form-control"
            aria-label="Enter Faculty Department" 
            aria-describedby="basic-addon1"
          required
          value={newFacultyDept}
          onChange={(e) => setNewFacultyDept(e.target.value)}
        />
        </div>

        <br />
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">📗</span>
        <input
          type="text"
          name="newFacultySub"
          placeholder="Enter Faculty Subject"
          class="form-control"
            aria-label="Enter Faculty Subject" 
            aria-describedby="basic-addon1"
          required
          value={newFacultySub}
          onChange={(e) => setNewFacultySub(e.target.value)}
        />
        </div>

        <br />
        <button type="button" onClick={registerNewFaculty} class="btn btn-warning btn-lg " >
          Register Faculty
        </button>
      </form>
      <div class="mt-3">

      <button type="button" onClick={backToHome} class="btn btn-primary ">
        Back to Dashboard
      </button>
      </div>
    </div>
  );
};

export default RegisterFaculty;
