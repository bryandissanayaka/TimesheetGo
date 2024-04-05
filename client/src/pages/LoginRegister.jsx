import React, { useContext, useState } from "react";
import axios from "axios";
import { LoginContext } from "../LoginContext.jsx";

const LoginRegister = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("consultant");

  const {
    loginStatus,
    setLoginStatus,
    roleStatus,
    setRoleStatus,
    handleLogout,
  } = useContext(LoginContext);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleLogoutAndRedirect = () => {
    handleLogout();
  };

  function login(username, password) {
    axios
      .post("http://localhost:5000/submit-login", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.data.message) {
          setLoginStatus("");
          alert("Incorrect username or password.");
        } else {
          setLoginStatus(`${response.data[0].id}`);
          // Set roleStatus here
          setRoleStatus(response.data[0].type);
          if (response.data[0].type === "consultant") {
            window.location.pathname = "/submit";
          } else {
            window.location.pathname = "/view";
          }
        }
      });
  }

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
      login(username, password);
    } else {
      axios
        .post("http://localhost:5000/submit-register", {
          username: username,
          password: password,
          type: role,
        })
        .then((response) => {
          login(username, password);
        })
        .catch((error) => {
          console.error("Error during registration:", error);
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
    <>
      {!loginStatus ? (
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
                  <label>
                    <input
                      type="radio"
                      value="finance"
                      checked={role === "finance"}
                      onChange={handleRoleChange}
                    />
                    Finance
                  </label>
                </div>
              </div>
            )}
            <button type="submit">{showLogin ? "Login" : "Register"}</button>
          </form>
          <button onClick={toggleForm}>
            {showLogin ? "Need to Register?" : "Back to Login"}
          </button>
        </div>
      ) : (
        <button onClick={handleLogoutAndRedirect}>Logout</button>
      )}
    </>
  );
};

export default LoginRegister;
