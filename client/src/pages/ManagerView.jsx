import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

const ManagerView = () => {
  const [timesheets, setTimesheets] = useState([]);

  useEffect(() => {
    const fetchTimesheets = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/pending-timesheets"
        );
        setTimesheets(response.data);
      } catch (error) {
        console.error("Error fetching timesheets:", error);
      }
    };

    fetchTimesheets();
  }, []);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(timesheets);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Timesheets");
    XLSX.writeFile(workbook, "timesheets.xlsx");
  };

  const changeStatus = async (timesheetId, newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/update-timesheet/${timesheetId}`,
        { status: newStatus }
      );
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error updating timesheet status:", error);
    }
  };

  return (
    <div className="TimesheetForm">
      <div className="align-h">
        <h2>Manager View</h2>
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {timesheets.map((timesheet) => (
              <tr key={timesheet.timesheet_id}>
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
                <td>
                  <button
                    onClick={() =>
                      changeStatus(timesheet.timesheet_id, "approved")
                    }
                  >
                    Approve
                  </button>
                  <button
                    onClick={() =>
                      changeStatus(timesheet.timesheet_id, "rejected")
                    }
                  >
                    Reject
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

export default ManagerView;
