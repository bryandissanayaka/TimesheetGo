import React, { useState, useEffect } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [passwordInput, setPasswordInput] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get-users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handlePasswordChange = (userId, event) => {
    setPasswordInput((prevState) => ({
      ...prevState,
      [userId]: event.target.value,
    }));
  };

  const changePassword = async (userId) => {
    try {
      const newPassword = passwordInput[userId];
      const response = await axios.put(
        `http://localhost:5000/change-password/${userId}`,
        { newPassword }
      );
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  return (
    <div className="TimesheetForm">
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Role</th>
            <th>Change Password</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.type}</td>
                <td>
                  <input
                    type="password"
                    value={passwordInput[user.id] || ""}
                    onChange={(event) => handlePasswordChange(user.id, event)}
                  />
                  <button onClick={() => changePassword(user.id)}>
                    Change Password
                  </button>
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

export default Users;
