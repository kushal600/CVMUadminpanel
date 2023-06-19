import logo from "./logo.svg";
import "./App.css";
import Login from "./login";
import AdminHome from "./adminHome";
import ForgetAdminPassword from "./forgetAdminPassword";
import FacultyHome from "./facultyHome";
import ForgetFacultyPassword from "./forgetFacultyPassword";
import RegisterFaculty from "./registerFaculty";
import CreateQuiz from "./createQuiz";
import CreateSubject from "./createSubject";
import VerifyStudent from "./verifyStudent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/adminhome" element={<AdminHome />}></Route>
          <Route exact path="/createsubject" element={<CreateSubject />}></Route>
          <Route exact path="/verifystudent" element={<VerifyStudent />}></Route>
          <Route
            exact
            path="/forgetadminpassword"
            element={<ForgetAdminPassword />}
          ></Route>
          <Route exact path="/facultyhome" element={<FacultyHome />}></Route>
          <Route
            exact
            path="/registerfaculty"
            element={<RegisterFaculty />}
          ></Route>
          <Route
            exact
            path="/forgetfacultypassword"
            element={<ForgetFacultyPassword />}
          ></Route>
          <Route exact path="/createquiz" element={<CreateQuiz />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
