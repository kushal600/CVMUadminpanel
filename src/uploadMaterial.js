import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { browserHistory } from "react-router-dom";
import Select from "react-select";
const UploadMaterial = () => {
  const options = [
    { value: "Material", label: "Material" },
    { value: "Announcement", label: "Announcement" },
    { value: "Result", label: "Result" },
  ];
  // const [value,setValue] = useState("");
  const [uploadmaterial, setUploadMaterial] = useState(false);
  const [announcement, setAnnouncement] = useState(false);
  const [result, setResult] = useState(false);
  const [materialName, setMaterialName] = useState("");
  const [materialLink, setMaterialLink] = useState("");
  const [announcementName, setAnnouncementName] = useState("");
  const [resultName, setResultName] = useState("");
  const [resultLink, setResultLink] = useState("");
  const [type, setType] = useState("");
  const facultyToken = localStorage.getItem("facultytoken");

  let field;
  // let uploadmaterial = false;
  // let announcement = false;
  // let result = false;
  const handleSelect = (e) => {
    field = e.value;
    setType(field);
    console.log("field", field);
    if (field === "Material") {
      console.log("inside material");
      // uploadmaterial = true;
      // announcement = false;
      // result = false;
      setUploadMaterial(true);
      setAnnouncement(false);
      setResult(false);
      console.log(uploadmaterial);
    } else if (field === "Announcement") {
      // announcement = true;
      // uploadmaterial = false;
      // result = false;
      setUploadMaterial(false);
      setAnnouncement(true);
      setResult(false);
    } else if (field === "Result") {
      // result = true;
      // uploadmaterial = false;
      // result = false;
      setUploadMaterial(false);
      setAnnouncement(false);
      setResult(true);
    }
  };
  const handleUploadMaterial = () => {
    console.log("submit");
    console.log(materialLink, materialName);

    const obj = {
      Type: type,
      name: materialName,
      link: materialLink,
    };
    console.log(obj);
    axios
      .post(
        "http://elbforcvmu-2038773933.ap-south-1.elb.amazonaws.com/api/v1/faculty/notification",
        obj,
        {
          headers: { Authorization: `Bearer ${facultyToken}` },
        }
      )
      .then((res) => {
        const data = res;
        console.log(data.data.res);
        if (data.data.res == "success") {
          console.log("success");
          alert("Material uploaded successfully");
          // navigate("/adminhome");
          setUploadMaterial(false);
        }
      })
      .catch((err) => {
        console.log(err);
        // issetError(true);
        // setError(err.response.data.msg);
        // throw err.response.data.msg;
      });
  };
  const handleAnnouncement = () => {
    console.log("submit");
    const obj = {
      Type: type,
      name: announcementName,
    };
    console.log(obj);
    axios
      .post(
        "http://elbforcvmu-2038773933.ap-south-1.elb.amazonaws.com/api/v1/faculty/notification",
        obj,
        {
          headers: { Authorization: `Bearer ${facultyToken}` },
        }
      )
      .then((res) => {
        const data = res;
        console.log(data.data.res);
        if (data.data.res == "success") {
          console.log("success");
          alert("Annoucement recorded");
          // navigate("/adminhome");
          setAnnouncement(false);
        }
      })
      .catch((err) => {
        console.log(err);
        // issetError(true);
        // setError(err.response.data.msg);
        // throw err.response.data.msg;
      });
  };
  const handleResult = () => {
    console.log("submit");
    const obj = {
      Type: type,
      name: resultName,
      link: resultLink,
    };
    console.log(obj);
    axios
      .post(
        "http://elbforcvmu-2038773933.ap-south-1.elb.amazonaws.com/api/v1/faculty/notification",
        obj,
        {
          headers: { Authorization: `Bearer ${facultyToken}` },
        }
      )
      .then((res) => {
        const data = res;
        console.log(data.data.res);
        if (data.data.res == "success") {
          console.log("success");
          alert("Result stored");
          // navigate("/adminhome");
          setResult(false);
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
    <>
      {/* <h1>Upload Material</h1> */}
      <div class="mt-3">
        <Select options={options} onChange={handleSelect} />
      </div>
      <div>
        {uploadmaterial && (
          <>
            <h2 class="text-primary">Upload Material form</h2>
            <div>
              <form action="#">
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">
                    📝
                  </span>
                  <input
                    type="text"
                    name="materialName"
                    placeholder="Enter the name of material"
                    class="form-control"
                    aria-label="Enter the name of material"
                    aria-describedby="basic-addon1"
                    required
                    value={materialName}
                    onChange={(e) => setMaterialName(e.target.value)}
                  />
                </div>
                <br />
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">
                    🔗
                  </span>
                  <input
                    type="text"
                    name="materialLink"
                    placeholder="Enter Link for the material"
                    class="form-control"
                    aria-label="Enter Link for the material"
                    aria-describedby="basic-addon1"
                    value={materialLink}
                    onChange={(e) => setMaterialLink(e.target.value)}
                    required
                  />
                </div>

                <br />

                <button
                  type="button"
                  onClick={handleUploadMaterial}
                  class="btn btn-warning  "
                >
                  Upload Material
                </button>
              </form>
            </div>
          </>
        )}
        {announcement && (
          <>
            <h2 class="text-primary"> Announcement form</h2>
            <div>
              <form action="#">
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">
                    🎙️
                  </span>
                  <input
                    type="text"
                    name="announcementName"
                    placeholder="Enter Announcement"
                    class="form-control"
                    aria-label="Enter Announcement"
                    aria-describedby="basic-addon1"
                    required
                    value={announcementName}
                    onChange={(e) => setAnnouncementName(e.target.value)}
                  />
                </div>

                <br />

                <button
                  type="button"
                  onClick={handleAnnouncement}
                  class="btn btn-warning  "
                >
                  Announce
                </button>
              </form>
            </div>
          </>
        )}
        {result && (
          <>
            <h2 class="text-primary">Result form</h2>
            <div>
              <form action="#">
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">
                    📝
                  </span>
                  <input
                    type="text"
                    name="resultName"
                    placeholder="Enter Result Title"
                    class="form-control"
                    aria-label="Enter Result Title"
                    aria-describedby="basic-addon1"
                    required
                    value={resultName}
                    onChange={(e) => setResultName(e.target.value)}
                  />
                </div>
                <br />
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">
                    🔗
                  </span>
                  <input
                    type="text"
                    name="resultLink"
                    placeholder="Enter Link for the Result"
                    class="form-control"
                    aria-label="Enter Link for the Result"
                    aria-describedby="basic-addon1"
                    value={resultLink}
                    onChange={(e) => setResultLink(e.target.value)}
                    required
                  />
                </div>
                <br />
                <button
                  type="button"
                  onClick={handleResult}
                  class="btn btn-warning  "
                >
                  Result
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default UploadMaterial;
