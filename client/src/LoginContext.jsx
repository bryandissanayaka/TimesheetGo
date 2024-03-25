import React, { createContext, useState } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [loginStatus, setLoginStatus] = useState("");

  return (
    <LoginContext.Provider value={{ loginStatus, setLoginStatus }}>
      {children}
    </LoginContext.Provider>
  );
};
