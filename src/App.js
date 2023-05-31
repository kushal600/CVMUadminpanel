import logo from "./logo.svg";
import "./App.css";
import Login from "./login";
import Home from "./home";
import ForgetEmail from "./forgetEmail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/home" element={<Home />}></Route>
          <Route exact path="/forgetEmail" element={<ForgetEmail />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
