import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import Sidebar from "./components/Sidebar.jsx";
import Footer from "./components/Footer.jsx";

import Submit from "./pages/Submit.jsx";
import View from "./pages/View.jsx";
import Reminders from "./pages/Reminders.jsx";
import Help from "./pages/Help.jsx";
import Login from "./pages/Login.jsx";

export default function App() {
  let page;
  switch (window.location.pathname) {
    case "/":
      page = <Submit />;
      break;
    case "/submit":
      page = <Submit />;
      break;
    case "/view":
      page = <View />;
      break;
    case "/reminders":
      page = <Reminders />;
      break;
    case "/help":
      page = <Help />;
      break;
    case "/login":
      page = <Login />;
      break;
  }

  return (
    <div className="App">
      <Sidebar />
      <div className="Page">{page}</div>
    </div>
  );
}
