import React, { useContext } from "react";
import "../App.css";
import {
  ConsultantSidebar,
  ManagerSidebar,
  FinanceSidebar,
  ItSidebar,
  LoggedOutSidebar,
} from "./SidebarData";
import { LoginContext } from "../LoginContext";

export default function Sidebar() {
  const { loginStatus, roleStatus } = useContext(LoginContext);

  let sidebarData;
  switch (roleStatus) {
    case "consultant":
      sidebarData = ConsultantSidebar;
      break;
    case "manager":
      sidebarData = ManagerSidebar;
      break;
    case "finance":
      sidebarData = FinanceSidebar;
      break;
    case "it":
      sidebarData = ItSidebar;
      break;
    default:
      sidebarData = LoggedOutSidebar;
      break;
  }

  return (
    <div className="Sidebar">
      <h1 className="MainTitle"> TIMESHEETGO</h1>

      <ul className="SidebarList">
        {sidebarData.map((val, key) => {
          return (
            <li
              key={key}
              onClick={() => {
                window.location.pathname = val.link;
              }}
              className="SidebarElement"
              id={
                window.location.pathname === "/" && val.link === "/submit"
                  ? "active-sidebar-element"
                  : window.location.pathname === val.link
                  ? "active-sidebar-element"
                  : ""
              }
            >
              <div id="sidebar-icon">{val.icon}</div>
              <h2 id="sidebar-title">
                {val.title === "Logout"
                  ? loginStatus
                    ? "Logout"
                    : "Login"
                  : val.title}
              </h2>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
