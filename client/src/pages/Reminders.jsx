import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LoginContext } from "../LoginContext";
import * as XLSX from "xlsx";

const Reminders = () => {
  const { loginStatus } = useContext(LoginContext);
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const consultantId = Number(loginStatus);
        const response = await axios.get(
          `http://localhost:5000/get-reminders/${consultantId}`,
          { userId: consultantId }
        );
        setReminders(response.data);
      } catch (error) {
        console.error("Error fetching reminders:", error);
      }
    };

    if (loginStatus) {
      fetchReminders();
    }
  }, [loginStatus]);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(reminders);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reminders");
    XLSX.writeFile(workbook, "reminders.xlsx");
  };

  const deleteReminder = async (reminderId) => {
    try {
      await axios.delete(`http://localhost:5000/delete-reminder/${reminderId}`);
      setReminders(
        reminders.filter((reminder) => reminder.reminder_id !== reminderId)
      );
    } catch (error) {
      console.error("Error deleting reminder:", error);
    }
  };

  return (
    <div className="TimesheetForm">
      <div className="align-h">
        <h2>Reminders</h2>
        {reminders.length > 0 && (
          <button onClick={exportToExcel}>Download Reminders</button>
        )}
      </div>
      {reminders.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Reminder ID</th>
              <th>Reminder</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reminders.map((reminder) => (
              <tr key={reminder.reminder_id}>
                <td>{reminder.reminder_id}</td>
                <td>{reminder.reminder}</td>
                <td>
                  <button onClick={() => deleteReminder(reminder.reminder_id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No reminders found.</p>
      )}
    </div>
  );
};

export default Reminders;
