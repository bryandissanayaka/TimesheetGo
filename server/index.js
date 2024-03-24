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

  // !!!need to send consultant ID!!!
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

  db.query(
    "INSERT INTO timesheets (consultant_id, status, week_of, project_name, monday_in, monday_out, tuesday_in, tuesday_out, wednesday_in, wednesday_out, thursday_in, thursday_out, friday_in, friday_out, saturday_in, saturday_out, sunday_in, sunday_out) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      1, // Hardcoded consultant_id (temp)
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
    ]
  );

  res.send(WeekStartDate);
});

app.listen(5000, () => {
  console.log(`Server running on port 5000.`);
});
