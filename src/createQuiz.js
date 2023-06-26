import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { browserHistory } from "react-router-dom";
import Form from "./form";
import image from "./CVM.png";
const CreateQuiz = () => {
  const [duration, setDuration] = useState("");
  const [quizName, setQuizName] = useState("");
  const [semester, setSemester] = useState("");
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [isRes, setIsRes] = useState(false);
  const [question, setQuestion] = useState("");
  const [marks, setMarks] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  // const [error, setError] = useState("");
  // const [correctOption, setCorrectOption] = useState("");
  const options = ["Option 1", "Option 2", "Option 3", "Opton 4"];
  let facultyToken = localStorage.getItem("facultytoken");
  // let questions = [];
  let quizId;
  let correctOption;
  let index;
  let arr = [];
  arr.push(2);
  const addQuestion = () => {
    let arr = [];
    arr.push(index);
    // console.log(arr);
    const obj = {
      quizId: localStorage.getItem("quizId"),
      question: question,
      marks: marks,
      options: [
        { option: option1 },
        { option: option2 },
        { option: option3 },
        { option: option4 },
      ],
      correctOption: arr,
    };
    console.log(obj);

    // axios
    //   .post(
    //     "http://elbforcvmu-2038773933.ap-south-1.elb.amazonaws.com/api/v1/faculty/quiz/question",
    //     obj,
    //     {
    //       headers: { Authorization: `Bearer ${facultyToken}` },
    //     }
    //   )
    //   .then((res) => {
    //     const data = res;
    //     // console.log(data.data.res);
    //     // console.log(data.data.data);
    //     if (data.data.res == "success") {
    //       // navigate("/adminhome");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     // issetError(true);
    //     // setError(err.response.data.msg);
    //     // throw err.response.data.msg;
    //   });
    // return <h1>Kushal</h1>;
  };
  const createNewQuiz = () => {
    const obj = {
      duration: duration,
      name: quizName,
      semester: semester,
    };

    const facultyToken = localStorage.getItem("facultytoken");
    axios
      .post(
        "http://elbforcvmu-2038773933.ap-south-1.elb.amazonaws.com/api/v1/faculty/quiz",
        obj,
        {
          headers: { Authorization: `Bearer ${facultyToken}` },
        }
      )
      .then((res) => {
        const data = res;

        if (data.data.res == "success") {
          console.log("success");
          quizId = data.data.data._id;
          localStorage.setItem("quizId", quizId);
          console.log(quizId);
          setIsRes(true);
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
    // console.log(obj);
  };
  const onOptionChangeHandler = (e) => {
    correctOption = e.target.value;
    console.log(correctOption);
    index = options.indexOf(correctOption);
    console.log(index);
  };

  return (
    <div>
      <img src={image} alt="CVMU Logo" className="imgCVM" />

      <h2 class="text-primary">Create Quiz</h2>
      <div>
        <form action="#">
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">
              ⌚
            </span>
            <input
              type="text"
              name="duration"
              placeholder="Enter duration in minutes"
              class="form-control"
              aria-label="Enter duration in minutes"
              aria-describedby="basic-addon1"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </div>

          <br />
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">
              📝
            </span>
            <input
              type="text"
              name="name"
              placeholder="Enter name of Quiz"
              class="form-control"
              aria-label="Enter name of Quiz"
              aria-describedby="basic-addon1"
              value={quizName}
              onChange={(e) => setQuizName(e.target.value)}
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
              name="semester"
              placeholder="Enter semester"
              class="form-control"
              aria-label="Enter semester"
              aria-describedby="basic-addon1"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
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
          {!isRes && (
            <button
              onClick={createNewQuiz}
              type="button"
              class="btn btn-warning mb-3"
            >
              Create New Quiz
            </button>
          )}
          {isRes && (
            <button
              onClick={createNewQuiz}
              type="button"
              class="btn btn-warning mb-3"
            >
              Edit Quiz Detail
            </button>
          )}
        </form>
        <Form />
        {/* <div>
          <form action="#">
            <input
              type="text"
              name="question"
              placeholder="Enter the Question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
            <br />
            <input
              type="text"
              name="marks"
              placeholder="Enter the marks"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              required
            />
            <br />
            <input
              type="text"
              name="option1"
              placeholder="Enter the option1"
              value={option1}
              onChange={(e) => setOption1(e.target.value)}
              required
            />
            <br />
            <input
              type="text"
              name="option2"
              placeholder="Enter the option2"
              value={option2}
              onChange={(e) => setOption2(e.target.value)}
              required
            />
            <br />
            <input
              type="text"
              name="option3"
              placeholder="Enter the option3"
              value={option3}
              onChange={(e) => setOption3(e.target.value)}
              required
            />
            <br />
            <input
              type="text"
              name="option4"
              placeholder="Enter the option4"
              value={option4}
              onChange={(e) => setOption4(e.target.value)}
              required
            />
            <br />
            <select onChange={onOptionChangeHandler}>
              <option>Please choose one option</option>
              {options.map((option, index) => {
                return <option key={index}>{option}</option>;
              })}
            </select>
            <button type="button" onClick={addQuestion}>
              +
            </button>
          </form>
        </div> */}
      </div>
    </div>
  );
};

export default CreateQuiz;
