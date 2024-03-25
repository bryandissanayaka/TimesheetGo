import React, { useContext } from "react";
import TimesheetForm from "../components/TimesheetForm.jsx";
import { LoginContext } from "../LoginContext.jsx";

function Submit() {
  const { loginStatus } = useContext(LoginContext);
  console.log(`Login status: ${loginStatus}`);
  return (
    <div>
      <TimesheetForm />
    </div>
  );
}

export default Submit;
