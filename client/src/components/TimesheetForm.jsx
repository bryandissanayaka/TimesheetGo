import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { LoginContext } from "../LoginContext";

const TimesheetForm = () => {
  const { loginStatus } = useContext(LoginContext);
  const [timesheetData, setTimesheetData] = useState({
    ProjectName: "",
    WeekStartDate: "",
    MondayClockIn: "00:00",
    MondayClockOut: "00:00",
    TuesdayClockIn: "00:00",
    TuesdayClockOut: "00:00",
    WednesdayClockIn: "00:00",
    WednesdayClockOut: "00:00",
    ThursdayClockIn: "00:00",
    ThursdayClockOut: "00:00",
    FridayClockIn: "00:00",
    FridayClockOut: "00:00",
    SaturdayClockIn: "00:00",
    SaturdayClockOut: "00:00",
    SundayClockIn: "00:00",
    SundayClockOut: "00:00",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "WeekStartDate") {
      // Calculate the Monday date based on the selected date
      const selectedDate = new Date(value);
      const dayOfWeek = selectedDate.getDay();
      const mondayDate = new Date(
        selectedDate.setDate(
          selectedDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)
        )
      );
      const formattedMondayDate = mondayDate.toISOString().slice(0, 10);

      setTimesheetData({
        ...timesheetData,
        [name]: value,
        WeekStartDate: formattedMondayDate,
      });
    } else {
      setTimesheetData({ ...timesheetData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate clock in and clock out times
    const isClockInBeforeClockOut = (clockIn, clockOut) => {
      if (!clockIn || !clockOut) return true; // Treat empty fields as valid
      const startTime = new Date(`2022-01-01T${clockIn}`);
      const endTime = new Date(`2022-01-01T${clockOut}`);
      return startTime <= endTime;
    };

    const isValid =
      isClockInBeforeClockOut(
        timesheetData.MondayClockIn,
        timesheetData.MondayClockOut
      ) &&
      isClockInBeforeClockOut(
        timesheetData.TuesdayClockIn,
        timesheetData.TuesdayClockOut
      ) &&
      isClockInBeforeClockOut(
        timesheetData.WednesdayClockIn,
        timesheetData.WednesdayClockOut
      ) &&
      isClockInBeforeClockOut(
        timesheetData.ThursdayClockIn,
        timesheetData.ThursdayClockOut
      ) &&
      isClockInBeforeClockOut(
        timesheetData.FridayClockIn,
        timesheetData.FridayClockOut
      ) &&
      isClockInBeforeClockOut(
        timesheetData.SaturdayClockIn,
        timesheetData.SaturdayClockOut
      ) &&
      isClockInBeforeClockOut(
        timesheetData.SundayClockIn,
        timesheetData.SundayClockOut
      );

    if (!isValid) {
      alert("Clock out time should be after clock in time.");
      return;
    }

    // Send clock in and clock out times
    const consultantId = Number(loginStatus);
    console.log(loginStatus);
    const dataToSend = {
      ConsultantId: consultantId,
      ProjectName: timesheetData.ProjectName,
      WeekStartDate: timesheetData.WeekStartDate,
      MondayClockIn: timesheetData.MondayClockIn,
      MondayClockOut: timesheetData.MondayClockOut,
      TuesdayClockIn: timesheetData.TuesdayClockIn,
      TuesdayClockOut: timesheetData.TuesdayClockOut,
      WednesdayClockIn: timesheetData.WednesdayClockIn,
      WednesdayClockOut: timesheetData.WednesdayClockOut,
      ThursdayClockIn: timesheetData.ThursdayClockIn,
      ThursdayClockOut: timesheetData.ThursdayClockOut,
      FridayClockIn: timesheetData.FridayClockIn,
      FridayClockOut: timesheetData.FridayClockOut,
      SaturdayClockIn: timesheetData.SaturdayClockIn,
      SaturdayClockOut: timesheetData.SaturdayClockOut,
      SundayClockIn: timesheetData.SundayClockIn,
      SundayClockOut: timesheetData.SundayClockOut,
    };

    axios
      .post("http://localhost:5000/submit-timesheet", dataToSend)
      .then((response) => {
        // Handle success
        console.log(response.data);
        alert("Timesheet submitted successfully.");
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
        alert("Error submitting timesheet.");
      });
  };
  useEffect(() => {
    setToThisWeek();
  }, []);
  const setToThisWeek = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const mondayDate = new Date(
      today.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1))
    );
    const formattedMondayDate = mondayDate.toISOString().slice(0, 10);
    setTimesheetData({
      ...timesheetData,
      WeekStartDate: formattedMondayDate,
    });
  };

  return (
    <div className="TimesheetForm">
      <form onSubmit={handleSubmit}>
        <label>
          Project Name
          <input
            className="projectNameInput"
            type="text"
            name="ProjectName"
            value={timesheetData.ProjectName}
            onChange={handleChange}
          />
        </label>
        <br />
        <br />
        <label>
          Week Start Date
          <div className="weekInputContainer">
            <input
              type="date"
              name="WeekStartDate"
              value={timesheetData.WeekStartDate}
              onChange={handleChange}
            />
            <button type="button" onClick={setToThisWeek}>
              This Week
            </button>
          </div>
        </label>
        <br />
        <br />
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Clock In</th>
              <th>Clock Out</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Monday</td>
              <td>
                <input
                  type="time"
                  name="MondayClockIn"
                  value={timesheetData.MondayClockIn}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="time"
                  name="MondayClockOut"
                  value={timesheetData.MondayClockOut}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Tuesday</td>
              <td>
                <input
                  type="time"
                  name="TuesdayClockIn"
                  value={timesheetData.TuesdayClockIn}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="time"
                  name="TuesdayClockOut"
                  value={timesheetData.TuesdayClockOut}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Wednesday</td>
              <td>
                <input
                  type="time"
                  name="WednesdayClockIn"
                  value={timesheetData.WednesdayClockIn}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="time"
                  name="WednesdayClockOut"
                  value={timesheetData.WednesdayClockOut}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Thursday</td>
              <td>
                <input
                  type="time"
                  name="ThursdayClockIn"
                  value={timesheetData.ThursdayClockIn}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="time"
                  name="ThursdayClockOut"
                  value={timesheetData.ThursdayClockOut}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Friday</td>
              <td>
                <input
                  type="time"
                  name="FridayClockIn"
                  value={timesheetData.FridayClockIn}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="time"
                  name="FridayClockOut"
                  value={timesheetData.FridayClockOut}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Saturday</td>
              <td>
                <input
                  type="time"
                  name="SaturdayClockIn"
                  value={timesheetData.SaturdayClockIn}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="time"
                  name="SaturdayClockOut"
                  value={timesheetData.SaturdayClockOut}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Sunday</td>
              <td>
                <input
                  type="time"
                  name="SundayClockIn"
                  value={timesheetData.SundayClockIn}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="time"
                  name="SundayClockOut"
                  value={timesheetData.SundayClockOut}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <button className="RedButton" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default TimesheetForm;
