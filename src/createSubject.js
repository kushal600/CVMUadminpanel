import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import image from "./CVM.png";
import { Link, useNavigate } from "react-router-dom";
import { browserHistory } from "react-router-dom";
import Form from "./form";
const CreateSubject = () => {
  // name,department,seats
  const navigate = useNavigate();

  const [subName, setSubName] = useState("");
  const [department, setDepartment] = useState("");
  const [seats, setSeats] = useState("");
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = () => {
    const obj = {
      name: subName,
      department: department,
      seats: seats,
    };
    console.log(obj);
    const adminToken = localStorage.getItem("admintoken");
    // console.log(facultyToken);
    axios
      .post(
        "http://elbforcvmu-2038773933.ap-south-1.elb.amazonaws.com/api/v1/admin/subject",
        obj,
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      )
      .then((res) => {
        const data = res;
        console.log(data.data.res);
        if (data.data.res == "success") {
          console.log("success");
          alert("Subject Created");
          setIsError(false);
          setError("");

          // navigate("/adminhome");
        }
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
        setError(err.response.data.msg);
        // throw err.response.data.msg;
      });
  };
  return (
    <div>
      <img src={image} alt="CVMU Logo" className="imgCVM" />

      <form action="#">
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">
            📗
          </span>
          <input
            type="text"
            name="subject"
            placeholder="Enter name of Subject"
            class="form-control"
            aria-label="Enter name of Subject"
            aria-describedby="basic-addon1"
            value={subName}
            onChange={(e) => setSubName(e.target.value)}
            required
          />
        </div>
        <br />
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">
            👨‍💻
          </span>
          <input
            type="text"
            name="department"
            placeholder="Enter name of Department"
            class="form-control"
            aria-label="Enter name of Department"
            aria-describedby="basic-addon1"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />
        </div>
        <br />
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">
            🔢
          </span>
          <input
            type="text"
            name="seats"
            placeholder="Enter number of Seats"
            class="form-control"
            aria-label="Enter number of Seats"
            aria-describedby="basic-addon1"
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            required
          />
        </div>

        <br />
        {isError && (
          <>
            <div class="mt-2 col-md-12">
              <p class="alert alert-danger">{error}</p>
            </div>
          </>
        )}
        <button
          onClick={handleSubmit}
          type="button"
          class="btn btn-warning btn-lg "
        >
          Create New Subject
        </button>
      </form>
      <div class="mt-3">
        <button onClick={() => navigate("/adminhome")} class="btn btn-primary ">
          Back TO Home
        </button>
      </div>
    </div>
  );
};

export default CreateSubject;
