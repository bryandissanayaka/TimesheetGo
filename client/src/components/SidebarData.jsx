import React, { useContext } from "react";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GradingIcon from "@mui/icons-material/Grading";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import HelpIcon from "@mui/icons-material/Help";
import PeopleIcon from "@mui/icons-material/People";

export const ConsultantSidebar = [
  {
    title: "Submit Timesheet",
    icon: <AssignmentIcon />,
    link: "/submit",
  },
  {
    title: "View Timesheets",
    icon: <GradingIcon />,
    link: "/view",
  },
  {
    title: "Reminders",
    icon: <NotificationsIcon />,
    link: "/reminders",
  },
  {
    title: "Help",
    icon: <HelpIcon />,
    link: "/help",
  },
  {
    title: "Logout",
    icon: <LogoutIcon />,
    link: "/login",
  },
];

export const ManagerSidebar = [
  {
    title: "View Timesheets",
    icon: <GradingIcon />,
    link: "/managerview",
  },
  {
    title: "Set Reminders",
    icon: <NotificationsIcon />,
    link: "/setreminders",
  },
  {
    title: "Logout",
    icon: <LogoutIcon />,
    link: "/login",
  },
];

export const FinanceSidebar = [
  {
    title: "View Timesheets",
    icon: <GradingIcon />,
    link: "/financeview",
  },
  {
    title: "Logout",
    icon: <LogoutIcon />,
    link: "/login",
  },
];

export const ItSidebar = [
  {
    title: "Users",
    icon: <PeopleIcon />,
    link: "/users",
  },
  {
    title: "Logout",
    icon: <LogoutIcon />,
    link: "/login",
  },
];

export const LoggedOutSidebar = [
  {
    title: "Logout",
    icon: <LogoutIcon />,
    link: "/login",
  },
];

