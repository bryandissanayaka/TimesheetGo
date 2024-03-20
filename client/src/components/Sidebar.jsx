import React from "react";

function Sidebar() {
  return (
    <div>
      <h1>TimesheetGo</h1>
      <nav>
        <ul>
          <li>
            <a href="#">Submit Timesheet</a>
          </li>
          <li>
            <a href="#">View your timesheets</a>
          </li>
          <li>
            <a href="#">Logout</a>
          </li>
        </ul>
      </nav>
      <hr></hr>
    </div>
  );
}

export default Sidebar;
