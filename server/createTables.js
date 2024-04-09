const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("timesheetgo.db", (err) => {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log("Connected to the SQLite database.");

  db.run("PRAGMA foreign_keys = ON");

  db.run(
    "CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT NOT NULL, username TEXT NOT NULL UNIQUE, password TEXT NOT NULL)"
  );

  db.run(
    "CREATE TABLE timesheets (timesheet_id INTEGER PRIMARY KEY AUTOINCREMENT, consultant_id INTEGER NOT NULL, status TEXT NOT NULL, week_of DATE NOT NULL, project_name TEXT DEFAULT NULL, monday_in TIME DEFAULT NULL, monday_out TIME DEFAULT NULL, tuesday_in TIME DEFAULT NULL, tuesday_out TIME DEFAULT NULL, wednesday_in TIME DEFAULT NULL, wednesday_out TIME DEFAULT NULL, thursday_in TIME DEFAULT NULL, thursday_out TIME DEFAULT NULL, friday_in TIME DEFAULT NULL, friday_out TIME DEFAULT NULL, saturday_in TIME DEFAULT NULL, saturday_out TIME DEFAULT NULL, sunday_in TIME DEFAULT NULL, sunday_out TIME DEFAULT NULL, FOREIGN KEY (consultant_id) REFERENCES users(id))"
  );

  db.run(
    "CREATE TABLE reminders (reminder_id INTEGER PRIMARY KEY AUTOINCREMENT, consultant_id INTEGER NOT NULL, reminder TEXT DEFAULT NULL, FOREIGN KEY (consultant_id) REFERENCES users(id))"
  );

  console.log("Tables created successfully.");
  db.close();
});
