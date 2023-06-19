import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { browserHistory } from "react-router-dom";
import Form from "./form";
const CreateSubject = () =>{
    // name,department,seats
  const navigate = useNavigate();

    const [subName, setSubName] = useState("");
    const [department,setDepartment] = useState("");
    const [seats,setSeats] = useState("");

    const handleSubmit = () =>{
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
          // navigate("/adminhome");
        }
      })
      .catch((err) => {
        console.log(err);
        // issetError(true);
        // setError(err.response.data.msg);
        // throw err.response.data.msg;
      });
    };
 return (
    <div><form action="#">
    <input
      type="text"
      name="subject"
      placeholder="Enter name of Subject"
      value={subName}
      onChange={(e) => setSubName(e.target.value)}
      required
    />
    <br />
    <input
      type="text"
      name="department"
      placeholder="Enter name of Department"
      value={department}
      onChange={(e) => setDepartment(e.target.value)}
      required
    />
    <br />
    <input
      type="text"
      name="seats"
      placeholder="Enter number of Seats"
      value={seats}
      onChange={(e) => setSeats(e.target.value)}
      required
    />
    <br />
    <button onClick={handleSubmit} type="button">Create New Subject</button>
    
  </form>
  <div>
    <button onClick={()=>navigate("/adminhome")}>Back TO Home</button>


    
  </div>
  </div>
 )
}

export default CreateSubject;