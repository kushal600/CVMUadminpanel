import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { browserHistory } from "react-router-dom";
const AdminHome = function () {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const getToken = () => {
    setToken(localStorage.getItem("admintoken"));
    // console.log(tok);
  };
  const adminEmail = localStorage.getItem("adminEmail");
  console.log(adminEmail);

  const handleCreateSubject = () =>{
    console.log("create subject");
    navigate("/createsubject");
  };
  useEffect(() => {
    // getToken();
    window.onpopstate = () => {
      if (localStorage.getItem("admintoken")) {
        navigate("/adminhome");
      }
    };
    if (!localStorage.getItem("admintoken")) {
      navigate("/");
    }
  }, []);

  const handlePublishResult  = () =>{
    console.log("Result Published");
    const adminToken = localStorage.getItem("admintoken");
    
    axios
      .get(
        "http://elbforcvmu-2038773933.ap-south-1.elb.amazonaws.com/api/v1/admin/result",
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
        
      )
      .then((res) => {
        const data = res;
        console.log(data);
        if (data.data.res == "success") {
          console.log("success");
          alert("Result Published on the App");
          // navigate("/adminhome");
        }
      })
      .catch((err) => {
        console.log(err);
        // issetError(true);
        // setError(err.response.data.msg);
        // throw err.response.data.msg;
      });
  }
  return (
    <div>
      <div>
        <h1>Admin Home Page</h1>
        <Link to="/registerfaculty">
          <p>
            Register Faculty?<a>click here</a>
          </p>
        </Link>
      </div>
      <div>
        <button onClick={handleCreateSubject}>Create Subject</button>
      </div>
      <div>
        <button onClick={()=>navigate("/verifystudent")}>Verify Student</button>
      </div>
      <div>
        <button onClick={handlePublishResult}>Publish Result</button>
      </div>
      <div>
        <button
          onClick={() => {
            localStorage.removeItem("admintoken");
            // localStorage.clear();
            window.location.reload();
          }}
        >
          Logout
        </button>
      </div>
      
    </div>
  );
};

export default AdminHome;
