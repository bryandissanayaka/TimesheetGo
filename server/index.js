const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password123",
  database: "timesheetgo",
});

app.post("/submit-timesheet", (req, res) => {
  //res.send("backend submit timesheet");

  const ConsultantId = req.body.ConsultantId;
  const ProjectName = req.body.ProjectName;
  const WeekStartDate = req.body.WeekStartDate;
  const MondayClockIn = req.body.MondayClockIn;
  const MondayClockOut = req.body.MondayClockOut;
  const TuesdayClockIn = req.body.TuesdayClockIn;
  const TuesdayClockOut = req.body.TuesdayClockOut;
  const WednesdayClockIn = req.body.WednesdayClockIn;
  const WednesdayClockOut = req.body.WednesdayClockOut;
  const ThursdayClockIn = req.body.ThursdayClockIn;
  const ThursdayClockOut = req.body.ThursdayClockOut;
  const FridayClockIn = req.body.FridayClockIn;
  const FridayClockOut = req.body.FridayClockOut;
  const SaturdayClockIn = req.body.SaturdayClockIn;
  const SaturdayClockOut = req.body.SaturdayClockOut;
  const SundayClockIn = req.body.SundayClockIn;
  const SundayClockOut = req.body.SundayClockOut;
  console.log(`ID: ${ConsultantId}`);
  db.query(
    "INSERT INTO timesheets (consultant_id, status, week_of, project_name, monday_in, monday_out, tuesday_in, tuesday_out, wednesday_in, wednesday_out, thursday_in, thursday_out, friday_in, friday_out, saturday_in, saturday_out, sunday_in, sunday_out) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      ConsultantId,
      "pending", // default status
      WeekStartDate,
      ProjectName,
      MondayClockIn,
      MondayClockOut,
      TuesdayClockIn,
      TuesdayClockOut,
      WednesdayClockIn,
      WednesdayClockOut,
      ThursdayClockIn,
      ThursdayClockOut,
      FridayClockIn,
      FridayClockOut,
      SaturdayClockIn,
      SaturdayClockOut,
      SundayClockIn,
      SundayClockOut,
    ],
    (error, results) => {
      if (error) {
        console.error("Error occurred while inserting timesheet:", error);
        res.status(500).send("Error occurred while inserting timesheet");
      } else {
        console.log("Timesheet inserted successfully");
        res.status(200).send("Timesheet submitted successfully");
      }
    }
  );
});

app.post("/submit-register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const type = req.body.type;

  // First, check if the username already exists
  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result.length > 0) {
        res.status(400).send("Username already exists");
        return;
      }
      //if username does not exist
      db.query(
        "INSERT INTO users (type, username, password) VALUES (?,?,?)",
        [type, username, password],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.status(200).send("Registration successful");
          }
        }
      );
    }
  );
});

app.post("/submit-login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) {
        res.send({ error: err });
      }
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Wrong username or password." });
      }
    }
  );
});

app.get("/timesheets/:consultantId", (req, res) => {
  const consultantId = req.params.consultantId;

  db.query(
    "SELECT * FROM timesheets WHERE consultant_id = ?",
    [consultantId],
    (error, results) => {
      if (error) {
        console.error("Error occurred while retrieving timesheets:", error);
        res.status(500).send("Error occurred while retrieving timesheets");
      } else {
        res.status(200).json(results);
      }
    }
  );
});

app.get("/alltimesheets", (req, res) => {
  db.query(
    "SELECT * FROM timesheets WHERE status = ?",
    ["approved"],
    (error, results) => {
      if (error) {
        console.error("Error occurred while retrieving timesheets:", error);
        res.status(500).send("Error occurred while retrieving timesheets");
      } else {
        res.status(200).json(results);
      }
    }
  );
});

app.get("/get-users", (req, res) => {
  const query = "SELECT * FROM users";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error querying the database:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    // Wrap the result in an array if it's not already an array
    const userData = Array.isArray(results) ? results : [results];

    res.json(userData);
  });
});

app.put("/change-password/:userId", (req, res) => {
  const userId = req.params.userId;
  const newPassword = req.body.newPassword;

  const query = "UPDATE users SET password = ? WHERE id = ?";

  db.query(query, [newPassword, userId], (error, results) => {
    if (error) {
      console.error("Error updating password:", error);
      res
        .status(500)
        .json({ error: "An error occurred while updating the password" });
    } else {
      res.json({ message: "Password changed successfully" });
    }
  });
});

app.listen(5000, () => {
  console.log(`Server running on port 5000.`);
});
