import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Projects from "./pages/Projects";
import Notes from "./pages/Notes";
import Goals from "./pages/Goals";
import Calendar from "./pages/Calendar";
import Reminders from "./pages/Reminders";
import Notifications from "./pages/Notifications";
import Break from "./pages/Break";
import GlobalSearch from "./pages/GlobalSearch";
import Urgent from "./pages/Urgent";
import Alarms from "./pages/Alarms";

import Account from "./pages/Account";

import { Search } from "lucide-react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />

        <Route
          path="/goals"
          element={
            <ProtectedRoute>
              <Goals />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <Notes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <Calendar />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reminders"
          element={
            <ProtectedRoute>
              <Reminders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/urgent"
          element={
            <ProtectedRoute>
              <Urgent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/alarms"
          element={
            <ProtectedRoute>
              <Alarms />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <GlobalSearch />
            </ProtectedRoute>
          }
        />

        <Route
          path="/break"
          element={
            <ProtectedRoute>
              <Break />
            </ProtectedRoute>
          }
        />

        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;