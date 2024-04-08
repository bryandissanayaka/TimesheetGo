import React, { useState, useEffect } from "react";
import axios from "axios";

const SetReminders = () => {
  const [users, setUsers] = useState([]);
  const [reminderInput, setReminderInput] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get-consultants");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleReminderChange = (userId, event) => {
    setReminderInput((prevState) => ({
      ...prevState,
      [userId]: event.target.value,
    }));
  };

  const setReminder = async (userId) => {
    try {
      const reminder = reminderInput[userId];
      const response = await axios.put(
        `http://localhost:5000/set-reminder/${userId}`,
        { reminder: reminder }
      );
      console.log(response.data);
      alert("Reminder sent.");
      //window.location.reload();
    } catch (error) {
      console.error("Error settings reminder:", error);
    }
  };

  return (
    <div className="TimesheetForm">
      <h2>Consultants</h2>
      <table>
        <thead>
          <tr>
            <th>Consultant ID</th>
            <th>Username</th>
            <th>Send Reminder</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>
                  <input
                    type="text"
                    value={reminderInput[user.id] || ""}
                    onChange={(event) => handleReminderChange(user.id, event)}
                  />
                  <button onClick={() => setReminder(user.id)}>Send</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SetReminders;
