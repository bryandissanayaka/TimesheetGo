import React, { useState } from "react";
import axios from "axios";

const TimesheetForm = () => {
  const [employeeData, setEmployeeData] = useState({
    ProjectName: "",
    WeekStartDate: "",
    MondayClockIn: "",
    MondayClockOut: "",
    TuesdayClockIn: "",
    TuesdayClockOut: "",
    WednesdayClockIn: "",
    WednesdayClockOut: "",
    ThursdayClockIn: "",
    ThursdayClockOut: "",
    FridayClockIn: "",
    FridayClockOut: "",
    SaturdayClockIn: "",
    SaturdayClockOut: "",
    SundayClockIn: "",
    SundayClockOut: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const calculateHours = (clockIn, clockOut) => {
    if (!clockIn || !clockOut) return "";
    const startTime = new Date(`2022-01-01T${clockIn}`);
    const endTime = new Date(`2022-01-01T${clockOut}`);
    const difference = endTime - startTime;
    const hours = difference / (1000 * 60 * 60);
    return hours.toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Calculate hours for each day
    const dataToSend = {
      ProjectName: employeeData.ProjectName,
      WeekStartDate: employeeData.WeekStartDate,
      MondayHours: calculateHours(
        employeeData.MondayClockIn,
        employeeData.MondayClockOut
      ),
      TuesdayHours: calculateHours(
        employeeData.TuesdayClockIn,
        employeeData.TuesdayClockOut
      ),
      WednesdayHours: calculateHours(
        employeeData.WednesdayClockIn,
        employeeData.WednesdayClockOut
      ),
      ThursdayHours: calculateHours(
        employeeData.ThursdayClockIn,
        employeeData.ThursdayClockOut
      ),
      FridayHours: calculateHours(
        employeeData.FridayClockIn,
        employeeData.FridayClockOut
      ),
      SaturdayHours: calculateHours(
        employeeData.SaturdayClockIn,
        employeeData.SaturdayClockOut
      ),
      SundayHours: calculateHours(
        employeeData.SundayClockIn,
        employeeData.SundayClockOut
      ),
    };
    axios
      .post("/submit-employee-hours", dataToSend)
      .then((response) => {
        console.log(response.data);
        // Handle success
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error
        alert("Error submitting timesheet.");
      });
  };

  return (
    <div className="TimesheetForm">
      <form onSubmit={handleSubmit}>
        <label>
          Project Name:
          <input
            type="text"
            name="ProjectName"
            value={employeeData.ProjectName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Week Start Date:
          <input
            type="date"
            name="WeekStartDate"
            value={employeeData.WeekStartDate}
            onChange={handleChange}
          />
        </label>
        <br />
        {/* Repeat for each day of the week */}
        {/* Example for Monday */}
        <label>
          Monday Clock In:
          <input
            type="time"
            name="MondayClockIn"
            value={employeeData.MondayClockIn}
            onChange={handleChange}
          />
        </label>
        <label>
          Monday Clock Out:
          <input
            type="time"
            name="MondayClockOut"
            value={employeeData.MondayClockOut}
            onChange={handleChange}
          />
        </label>
        <br />
        {/* Repeat for other days of the week */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TimesheetForm;
