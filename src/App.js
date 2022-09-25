import "./App.css";

import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Posts from "./components/Posts";
import PostDetail from "./components/PostDetail";
import Logout from "./components/Logout";

import ReactTest from "./components/ReactTest";

import { UserContext } from "./UserContext";

function App() {
  const [user, setUser] = useState({
    loggedIn: localStorage.getItem("logged_in"),
    email: localStorage.getItem("email"),
  });

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <Navbar />
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
          <Route path="register" element={<Register />} />
          <Route path="/" element={<Posts />} />
          <Route path="posts" element={<Posts />} />
          <Route path="posts/:id" element={<PostDetail />} />
          <Route path="reacttest" element={<ReactTest />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
