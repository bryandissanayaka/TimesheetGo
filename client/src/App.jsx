import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar.jsx";
import Submit from "./pages/Submit.jsx";
import View from "./pages/View.jsx";
import Reminders from "./pages/Reminders.jsx";
import Help from "./pages/Help.jsx";
import LoginRegister from "./pages/LoginRegister.jsx";
import { LoginContext, LoginProvider } from "./LoginContext.jsx";
import Users from "./pages/Users.jsx";
import FinanceView from "./pages/FinanceView.jsx";
import ManagerView from "./pages/ManagerView.jsx";
export default function App() {
  return (
    <div className="App">
      <LoginProvider>
        <Sidebar />
        <PageRouter />
      </LoginProvider>
    </div>
  );
}

const PageRouter = () => {
  let page;

  //if (loginStatus) {
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
      page = <LoginRegister />;
      break;
    case "/users":
      page = <Users />;
      break;
    case "/financeview":
      page = <FinanceView />;
      break;
    case "/managerview":
      page = <ManagerView />;
    //}
  }

  return <div className="Page">{page}</div>;
};
