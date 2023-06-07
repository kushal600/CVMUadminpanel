import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { browserHistory } from "react-router-dom";
import Form from "./form";
const CreateQuiz = () => {
  const [duration, setDuration] = useState("");
  const [quizName, setQuizName] = useState("");
  const [semester, setSemester] = useState("");
  const [Error, setError] = useState("");
  const [isError, issetError] = useState(false);
  const [isRes, setIsRes] = useState(false);
  const [question, setQuestion] = useState("");
  const [marks, setMarks] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
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
    return <h1>Kushal</h1>;
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
          // navigate("/adminhome");
        }
      })
      .catch((err) => {
        console.log(err);
        // issetError(true);
        // setError(err.response.data.msg);
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
      <h1>Create Quiz</h1>
      <div>
        <form action="#">
          <input
            type="text"
            name="duration"
            placeholder="Enter duration in minutes"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
          <br />
          <input
            type="text"
            name="name"
            placeholder="Enter name of Quiz"
            value={quizName}
            onChange={(e) => setQuizName(e.target.value)}
            required
          />
          <br />
          <input
            type="text"
            name="semester"
            placeholder="Enter semester"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            required
          />
          <br />
          {!isRes && (
            <button onClick={createNewQuiz} type="button">
              Create New Quiz
            </button>
          )}
          {isRes && (
            <button onClick={createNewQuiz} type="button">
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
