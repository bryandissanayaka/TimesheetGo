// LoginContext.js
import React, { createContext, useState, useEffect } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [loginStatus, setLoginStatus] = useState("");

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("loginStatus");
    if (storedLoginStatus) {
      setLoginStatus(storedLoginStatus);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("loginStatus", loginStatus);
  }, [loginStatus]);

  const handleLogout = () => {
    localStorage.removeItem("loginStatus");
    setLoginStatus("");
  };

  return (
    <LoginContext.Provider
      value={{ loginStatus, setLoginStatus, handleLogout }}
    >
      {children}
    </LoginContext.Provider>
  );
};
