import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { browserHistory } from "react-router-dom";

const Form = () => {
  const [inputList, setInputList] = useState([
    {
      question: "",
      marks: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      correctOption: "",
    },
  ]);
  let obj = {};
  let facultyToken = localStorage.getItem("facultytoken");
  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([
      ...inputList,
      {
        question: "",
        marks: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        correctOption: "",
      },
    ]);
  };
  const handleSubmit = () => {
    // const finalList = JSON.stringify(inputList);
    inputList.forEach((element) => {
      let arr = [];
      if (element.correctOption == "1") {
        arr.push(0);
      } else if (element.correctOption == "2") {
        arr.push(1);
      } else if (element.correctOption == "3") {
        arr.push(2);
      } else if (element.correctOption == "4") {
        arr.push(3);
      } else {
        arr.push(3);
      }
      obj = {
        quizId: localStorage.getItem("quizId"),
        question: element.question,
        marks: element.marks,
        options: [
          { option: element.option1 },
          { option: element.option2 },
          { option: element.option3 },
          { option: element.option4 },
        ],
        correctOption: arr,
      };
      console.log(obj);
      axios
        .post(
          "http://elbforcvmu-2038773933.ap-south-1.elb.amazonaws.com/api/v1/faculty/quiz/question",
          obj,
          {
            headers: { Authorization: `Bearer ${facultyToken}` },
          }
        )
        .then((res) => {
          const data = res;
          // console.log(data.data.res);
          // console.log(data.data.data);
          if (data.data.res == "success") {
            // navigate("/adminhome");
            console.log("success");
          }
        })
        .catch((err) => {
          console.log(err);
          // issetError(true);
          // setError(err.response.data.msg);
          // throw err.response.data.msg;
        });
    });
    // console.log(obj);
    // console.log(x);
    // console.log(typeof x);
  };
  return (
    <div className="App">
      <h3></h3>
      {inputList.map((x, i) => {
        return (
          <div className="box">
            <input
              name="question"
              placeholder="Enter question"
              value={x.question}
              onChange={(e) => handleInputChange(e, i)}
            />
            <br />
            <input
              className="ml10"
              name="marks"
              placeholder="Enter marks"
              value={x.marks}
              onChange={(e) => handleInputChange(e, i)}
            />
            <br />
            <input
              className="ml10"
              name="option1"
              placeholder="Enter option1"
              value={x.option1}
              onChange={(e) => handleInputChange(e, i)}
            />
            <br />
            <input
              className="ml10"
              name="option2"
              placeholder="Enter option2"
              value={x.option2}
              onChange={(e) => handleInputChange(e, i)}
            />
            <br />
            <input
              className="ml10"
              name="option3"
              placeholder="Enter option3"
              value={x.option3}
              onChange={(e) => handleInputChange(e, i)}
            />
            <br />
            <input
              className="ml10"
              name="option4"
              placeholder="Enter option4"
              value={x.option4}
              onChange={(e) => handleInputChange(e, i)}
            />
            <br />
            <input
              className="ml10"
              name="correctOption"
              placeholder="Enter Correct Option (1,2,3,4)"
              value={x.correctOption}
              onChange={(e) => handleInputChange(e, i)}
            />
            <br />
            <div className="btn-box">
              {inputList.length !== 1 && (
                <button className="mr10" onClick={() => handleRemoveClick(i)}>
                  Remove
                </button>
              )}
              {inputList.length - 1 === i && (
                <button onClick={handleAddClick}>Add</button>
              )}
            </div>
          </div>
        );
      })}
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Form;
