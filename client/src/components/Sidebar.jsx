import React from "react";
import "../App.css";

import { SidebarData } from "./SidebarData";

export default function Sidebar() {
  return (
    <div className="Sidebar">
      <h1 className="MainTitle"> TIMESHEETGO</h1>
      <ul className="SidebarList">
        {SidebarData.map((val, key) => {
          return (
            <li
              key={key}
              onClick={() => {
                window.location.pathname = val.link;
              }}
              className="SidebarElement"
              id={
                window.location.pathname == "/" && val.link == "/submit"
                  ? "active-sidebar-element"
                  : window.location.pathname == val.link
                  ? "active-sidebar-element"
                  : ""
              }
            >
              <div id="sidebar-icon">{val.icon}</div>
              <h2 id="sidebar-title">{val.title}</h2>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
