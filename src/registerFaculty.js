import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
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
      <h1>Register faculty</h1>
      <form>
        <input
          type="text"
          name="newFacultyName"
          placeholder="Enter Faculty Name"
          required
          value={newFacultyName}
          onChange={(e) => setNewFacultyName(e.target.value)}
        />
        <br />
        <input
          type="email"
          name="newFacultyEmail"
          placeholder="Enter Faculty Email"
          required
          value={newFacultyEmail}
          onChange={(e) => setNewFacultyEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          name="newFacultyPass"
          placeholder="Enter Faculty Password"
          required
          value={newFacultyPass}
          onChange={(e) => setNewFacultyPass(e.target.value)}
        />
        <br />
        <input
          type="text"
          name="newFacultyDept"
          placeholder="Enter Faculty Department"
          required
          value={newFacultyDept}
          onChange={(e) => setNewFacultyDept(e.target.value)}
        />
        <br />
        <input
          type="text"
          name="newFacultySub"
          placeholder="Enter Faculty Subject"
          required
          value={newFacultySub}
          onChange={(e) => setNewFacultySub(e.target.value)}
        />
        <br />
        <button type="button" onClick={registerNewFaculty}>
          Register Faculty
        </button>
      </form>
      <button type="button" onClick={backToHome}>
        Back to Dashboard
      </button>
    </div>
  );
};

export default RegisterFaculty;
