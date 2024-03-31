import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LoginContext } from "../LoginContext";
import * as XLSX from "xlsx";

const TimesheetList = () => {
  const { loginStatus } = useContext(LoginContext);
  const [timesheets, setTimesheets] = useState([]);

  useEffect(() => {
    const fetchTimesheets = async () => {
      try {
        const consultantId = Number(loginStatus);
        const response = await axios.get(
          `http://localhost:5000/timesheets/${consultantId}`
        );
        setTimesheets(response.data);
      } catch (error) {
        console.error("Error fetching timesheets:", error);
      }
    };

    if (loginStatus) {
      fetchTimesheets();
    }
  }, [loginStatus]);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(timesheets);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Timesheets");
    XLSX.writeFile(workbook, "timesheets.xlsx");
  };

  return (
    <div className="TimesheetForm">
      <div className="align-h">
        <h2>Timesheets</h2>
        {timesheets.length > 0 && (
          <button onClick={exportToExcel}>Download Timesheets</button>
        )}
      </div>
      {timesheets.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Week Of</th>
              <th>Status</th>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
              <th>Saturday</th>
              <th>Sunday</th>
            </tr>
          </thead>
          <tbody>
            {timesheets.map((timesheet) => (
              <tr key={timesheet.id}>
                <td>{timesheet.project_name}</td>
                <td>
                  {new Date(timesheet.week_of).toLocaleString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td>{timesheet.status}</td>
                <td>
                  {timesheet.monday_in} - {timesheet.monday_out}
                </td>
                <td>
                  {timesheet.tuesday_in} - {timesheet.tuesday_out}
                </td>
                <td>
                  {timesheet.wednesday_in} - {timesheet.wednesday_out}
                </td>
                <td>
                  {timesheet.thursday_in} - {timesheet.thursday_out}
                </td>
                <td>
                  {timesheet.friday_in} - {timesheet.friday_out}
                </td>
                <td>
                  {timesheet.saturday_in} - {timesheet.saturday_out}
                </td>
                <td>
                  {timesheet.sunday_in} - {timesheet.sunday_out}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No timesheets found.</p>
      )}
    </div>
  );
};

export default TimesheetList;
