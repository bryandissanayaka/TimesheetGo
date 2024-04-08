import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LoginContext } from "../LoginContext";
import * as XLSX from "xlsx";
import formatTime from "../components/FormatTime";

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

  const handleResubmit = (timesheet) => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const mondayDate = new Date(
      today.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1))
    );
    const formattedMondayDate = mondayDate.toISOString().slice(0, 10);

    const dataToSend = {
      ConsultantId: loginStatus,
      ProjectName: timesheet.project_name,
      WeekStartDate: formattedMondayDate,
      MondayClockIn: timesheet.monday_in,
      MondayClockOut: timesheet.monday_out,
      TuesdayClockIn: timesheet.tuesday_in,
      TuesdayClockOut: timesheet.tuesday_out,
      WednesdayClockIn: timesheet.wednesday_in,
      WednesdayClockOut: timesheet.wednesday_out,
      ThursdayClockIn: timesheet.thursday_in,
      ThursdayClockOut: timesheet.thursday_out,
      FridayClockIn: timesheet.friday_in,
      FridayClockOut: timesheet.friday_out,
      SaturdayClockIn: timesheet.saturday_in,
      SaturdayClockOut: timesheet.saturday_out,
      SundayClockIn: timesheet.sunday_in,
      SundayClockOut: timesheet.sunday_out,
    };

    axios
      .post("http://localhost:5000/submit-timesheet", dataToSend)
      .then((response) => {
        console.log(response.data);
        alert("Timesheet resubmitted successfully.");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error resubmitting timesheet.");
      });
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
              <th>Resubmit for this week</th>
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
                  {formatTime(timesheet.monday_in)} -{" "}
                  {formatTime(timesheet.monday_out)}
                </td>
                <td>
                  {formatTime(timesheet.tuesday_in)} -{" "}
                  {formatTime(timesheet.tuesday_out)}
                </td>
                <td>
                  {formatTime(timesheet.wednesday_in)} -{" "}
                  {formatTime(timesheet.wednesday_out)}
                </td>
                <td>
                  {formatTime(timesheet.thursday_in)} -{" "}
                  {formatTime(timesheet.thursday_out)}
                </td>
                <td>
                  {formatTime(timesheet.friday_in)} -{" "}
                  {formatTime(timesheet.friday_out)}
                </td>
                <td>
                  {formatTime(timesheet.saturday_in)} -{" "}
                  {formatTime(timesheet.saturday_out)}
                </td>
                <td>
                  {formatTime(timesheet.sunday_in)} -{" "}
                  {formatTime(timesheet.sunday_out)}
                </td>
                <td>
                  <button onClick={() => handleResubmit(timesheet)}>
                    Resubmit
                  </button>
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
