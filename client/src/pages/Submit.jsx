import React, { useContext } from "react";
import TimesheetForm from "../components/TimesheetForm.jsx";
import LoginRegister from "./LoginRegister.jsx";
import { LoginContext } from "../LoginContext.jsx";

function Submit() {
  const { loginStatus } = useContext(LoginContext);
  let page;

  if (loginStatus) {
    page = <TimesheetForm />;
  } else {
    page = <NotLoggedIn />;
  }
  return <div>{page}</div>;
}

const NotLoggedIn = () => {
  return <h1 className="TimesheetForm">Not logged in</h1>;
};

export default Submit;
