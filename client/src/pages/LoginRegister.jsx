import React, { useContext, useState } from "react";
import axios from "axios";
import { LoginContext, LoginProvider } from "../LoginContext.jsx";

const LoginRegister = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("consultant");

  const { loginStatus, setLoginStatus } = useContext(LoginContext);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() === "") {
      alert("Please enter a username");
      return;
    }
    if (password.trim() === "") {
      alert("Please enter a password");
      return;
    }
    if (showLogin) {
      //console.log("Login:", username, password);
      axios
        .post("http://localhost:5000/submit-login", {
          username: username,
          password: password,
        })
        .then((response) => {
          console.log(response);
          if (response.data.message) {
            setLoginStatus(response.data.message);
          } else {
            setLoginStatus(`Logged in as ${response.data[0].id}.`);
            console.log(loginStatus);
          }
        });
    } else {
      // Handle register logic
      //console.log("Register:", username, password, role);
      axios
        .post("http://localhost:5000/submit-register", {
          username: username,
          password: password,
          type: role,
        })
        .then((response) => {
          console.log(response);
        });
    }
  };

  const toggleForm = () => {
    setShowLogin(!showLogin);
    setUsername("");
    setPassword("");
    setRole("consultant");
  };

  return (
    <div className="TimesheetForm">
      <h2>{showLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        {!showLogin && (
          <div>
            <label>Role:</label>
            <div>
              <label>
                <input
                  type="radio"
                  value="consultant"
                  checked={role === "consultant"}
                  onChange={handleRoleChange}
                />
                Consultant
              </label>
              <label>
                <input
                  type="radio"
                  value="manager"
                  checked={role === "manager"}
                  onChange={handleRoleChange}
                />
                Manager
              </label>
            </div>
          </div>
        )}
        <button type="submit">{showLogin ? "Login" : "Register"}</button>
      </form>
      <button onClick={toggleForm}>
        {showLogin ? "Need to Register?" : "Back to Login"}
      </button>
      <h3>{loginStatus}</h3>
    </div>
  );
};

export default LoginRegister;
