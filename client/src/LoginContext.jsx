import React, { createContext, useState, useEffect } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [loginStatus, setLoginStatus] = useState(""); //this is the user id. CBA to refactor :P
  const [roleStatus, setRoleStatus] = useState(""); // consultant/manager/finance
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("loginStatus");
    if (storedLoginStatus) {
      setLoginStatus(storedLoginStatus);
    }

    const storedRoleStatus = localStorage.getItem("roleStatus");
    if (storedRoleStatus) {
      setRoleStatus(storedRoleStatus);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("loginStatus", loginStatus);
  }, [loginStatus]);

  useEffect(() => {
    localStorage.setItem("roleStatus", roleStatus);
  }, [roleStatus]);

  const handleLogout = () => {
    localStorage.removeItem("loginStatus");
    localStorage.removeItem("roleStatus");
    setLoginStatus("");
    setRoleStatus("");
  };

  return (
    <LoginContext.Provider
      value={{
        loginStatus,
        setLoginStatus,
        roleStatus,
        setRoleStatus,
        handleLogout,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
