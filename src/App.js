import "./App.css";

import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Posts from "./components/Posts";
import Logout from "./components/Logout";

import ReactTest from "./components/ReactTest";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="register" element={<Register />} />
        <Route path="/" element={<Posts />} />
        <Route path="reacttest" element={<ReactTest />} />
      </Routes>
    </div>
  );
}

export default App;
