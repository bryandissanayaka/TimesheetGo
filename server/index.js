const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = new sqlite3.Database("timesheetgo.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the SQLite database.");
});
db.run("PRAGMA foreign_keys = ON");

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
  db.run(
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
  db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }

    if (row) {
      return res.status(400).send("Username already exists");
    }

    // If username does not exist
    db.run(
      "INSERT INTO users (type, username, password) VALUES (?, ?, ?)",
      [type, username, password],
      function (err) {
        if (err) {
          console.log(err);
          return res.status(500).send("Internal Server Error");
        } else {
          return res.status(200).send("Registration successful");
        }
      }
    );
  });
});

app.post("/submit-login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.all(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).send({ error: "Internal Server Error" });
      }

      if (rows.length > 0) {
        return res.status(200).json(rows);
      } else {
        return res.status(401).send({ message: "Wrong username or password." });
      }
    }
  );
});

app.get("/timesheets/:consultantId", (req, res) => {
  const consultantId = req.params.consultantId;

  db.all(
    "SELECT * FROM timesheets WHERE consultant_id = ?",
    [consultantId],
    (error, rows) => {
      if (error) {
        console.error("Error occurred while retrieving timesheets:", error);
        res.status(500).send("Error occurred while retrieving timesheets");
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

app.get("/approved-timesheets", (req, res) => {
  db.all(
    "SELECT * FROM timesheets WHERE status = ?",
    ["approved"],
    (error, rows) => {
      if (error) {
        console.error("Error occurred while retrieving timesheets:", error);
        res.status(500).send("Error occurred while retrieving timesheets");
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

app.get("/pending-timesheets", (req, res) => {
  db.all(
    "SELECT * FROM timesheets WHERE status = ?",
    ["pending"],
    (error, rows) => {
      if (error) {
        console.error("Error occurred while retrieving timesheets:", error);
        res.status(500).send("Error occurred while retrieving timesheets");
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

app.put("/update-timesheet/:timesheetId", (req, res) => {
  const timesheetId = req.params.timesheetId;
  const newStatus = req.body.status;
  console.log(timesheetId);
  db.run(
    "UPDATE timesheets SET status = ? WHERE timesheet_id = ?",
    [newStatus, timesheetId],
    (error, results) => {
      if (error) {
        console.error("Error occurred while updating timesheet status:", error);
        res.status(500).send("Error occurred while updating timesheet status");
      } else {
        res
          .status(200)
          .json({ message: "Timesheet status updated successfully" });
      }
    }
  );
});

app.get("/get-users", (req, res) => {
  const query = "SELECT * FROM users";

  db.all(query, (err, rows) => {
    if (err) {
      console.error("Error querying the database:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    // No need to wrap the result in an array, as db.all returns an array
    res.json(rows);
  });
});

app.put("/change-password/:userId", (req, res) => {
  const userId = req.params.userId;
  const newPassword = req.body.newPassword;

  const query = "UPDATE users SET password = ? WHERE id = ?";

  db.run(query, [newPassword, userId], (error, results) => {
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

app.get("/get-consultants", (req, res) => {
  const query = "SELECT * FROM users WHERE type = 'consultant'";

  db.all(query, (err, rows) => {
    if (err) {
      console.error("Error querying the database:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json(rows);
  });
});
app.put("/set-reminder/:userId", (req, res) => {
  const userId = req.params.userId;
  const reminder = req.body.reminder;

  const query = "INSERT INTO reminders (consultant_id, reminder) VALUES (?, ?)";

  db.run(query, [userId, reminder], (error, results) => {
    if (error) {
      console.error("Error setting reminder:", error);
      res
        .status(500)
        .json({ error: "An error occurred while setting the reminder" });
    } else {
      res.json({ message: "Reminder set successfully" });
    }
  });
});

app.get("/get-reminders/:userId", (req, res) => {
  const userId = req.params.userId;
  const query = "SELECT * FROM reminders WHERE consultant_id = ?";

  db.all(query, [userId], (error, rows) => {
    if (error) {
      console.error("Error getting reminders:", error);
      res
        .status(500)
        .json({ error: "An error occurred while getting the reminders" });
    } else {
      res.json(rows);
    }
  });
});

app.delete("/delete-reminder/:reminderId", (req, res) => {
  const reminderId = req.params.reminderId;
  const query = "DELETE FROM reminders WHERE reminder_id = ?";

  db.run(query, [reminderId], (error, results) => {
    if (error) {
      console.error("Error deleting reminder:", error);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the reminder" });
    } else {
      res.json({ message: "Reminder deleted successfully" });
    }
  });
});

app.listen(5000, () => {
  console.log(`Server running on port 5000.`);
});
