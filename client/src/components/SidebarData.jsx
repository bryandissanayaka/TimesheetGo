import React, { useContext } from "react";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GradingIcon from "@mui/icons-material/Grading";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login"; // Import the LoginIcon
import HelpIcon from "@mui/icons-material/Help";


export const SidebarData = [
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
