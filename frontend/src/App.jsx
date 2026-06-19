import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Projects from "./pages/Projects";
import Notes from "./pages/Notes";
import Goals from "./pages/Goals";
import Calendar from "./pages/Calendar";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Reminders from "./pages/Reminders";
import Notifications from "./pages/Notifications";
import Break from "./pages/Break";
import GlobalSearch from "./pages/GlobalSearch";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/analytics"
          element={<Dashboard />}
        />

        <Route
          path="/tasks"
          element={<Tasks />}
        />

        <Route
          path="/goals"
          element={<Goals />}
        />

        <Route
          path="/projects"
          element={<Projects />}
        />

        <Route
          path="/notes"
          element={<Notes />}
        />

        <Route
          path="/calendar"
          element={<Calendar />}
        />

        <Route
          path="/reminders"
          element={<Reminders />}
        />

        <Route
          path="/notifications"
          element={<Notifications />}
        />

        <Route
          path="/search"
          element={<GlobalSearch />}
        />

        <Route
          path="/break"
          element={<Break />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;