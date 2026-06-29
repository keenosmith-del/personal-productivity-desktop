import MainLayout from "../layouts/MainLayout";

import { useState, useEffect } from "react";

import { getProjects } from "../services/projectService";
import { getTasks } from "../services/taskService";
import { getGoals } from "../services/goalService";
import { getReminders } from "../services/reminderService";
import { getNotes } from "../services/noteService";

import DashboardEntityCard from "../components/Dashboard/DashboardEntityCard";
import DashboardWideCard from "../components/Dashboard/DashboardWideCard";
import DashboardNotesCard from "../components/Dashboard/DashboardNotesCard";

import WeatherWidget from "../components/Dashboard/WeatherWidget";
import ClockWidget from "../components/Dashboard/ClockWidget";

function Dashboard() {

  const [projects, setProjects] =
    useState([]);

  const [tasks, setTasks] =
    useState([]);

  const [goals, setGoals] =
    useState([]);

  const [reminders, setReminders] =
    useState([]);

  const [notes, setNotes] =
    useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData =
    async () => {
      try {
        const [
          projectsData,
          tasksData,
          goalsData,
          remindersData,
          notesData,
        ] = await Promise.all([
          getProjects(),
          getTasks(),
          getGoals(),
          getReminders(),
          getNotes(),
        ]);

        setProjects(projectsData);
        setTasks(tasksData);
        setGoals(goalsData);
        setReminders(remindersData);
        setNotes(notesData);
      } catch (error) {
        console.error(error);
      }
    };

  const uniqueById = (items) => {
    const map = new Map();
    items.forEach((item) => {
      map.set(item._id, item);
    });
    return Array.from(map.values());
  };

  const today = new Date();

  today.setDate(
    today.getDate()
  );

  const todayDate =
    today
      .toISOString()
      .split("T")[0];

  const todayItems = uniqueById([
    ...tasks.filter(
      (task) =>
        task.dueDate &&
        task.dueDate.startsWith(
          todayDate
        ) &&
        !task.completed
    ),

    ...goals.filter(
      (goal) =>
        goal.targetDate &&
        goal.targetDate.startsWith(
          todayDate
        ) &&
        !goal.completed
    ),

    ...projects.filter(
      (project) =>
        project.dueDate &&
        project.dueDate.startsWith(
          todayDate
        ) &&
        !project.completed
    ),

    ...reminders.filter(
      (reminder) =>
        reminder.reminderDate &&
        reminder.reminderDate.startsWith(
          todayDate
        ) &&
        !reminder.completed
    ),
  ]);

  const urgentItems = uniqueById([
    ...tasks.filter(
      (task) =>
        !task.completed &&
        task.priority === "High"
    ),

    ...goals.filter(
      (goal) =>
        !goal.completed &&
        goal.priority === "High"
    ),

    ...projects.filter(
      (project) =>
        !project.completed &&
        project.priority === "High"
    ),

    ...reminders.filter(
      (reminder) =>
        !reminder.completed &&
        reminder.priority === "High"
    ),
  ]);

  return (
    <MainLayout>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
        }}
      >
        {/* LEFT */}

        <div
          style={{
            display: "grid",
            gap: "24px",
          }}
        >
          {/* WEATHER + TIME */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
            }}
          >
            <WeatherWidget />

            <ClockWidget />
          </div>

          {/* DUE TODAY and upcoming */}

          <div>
            <DashboardWideCard
              title="Upcoming"
              items={todayItems}
            />
          </div>

          {/* NOTES */}
          <div>
            <DashboardNotesCard 
            notes={notes}
            />
          </div>

        </div>

        {/* RIGHT */}

        <div
          style={{
            display: "grid",
            gap: "24px",
          }}
        >
          {/* date + urgent */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
            }}
          >
            {/* date */}
            <div
              style={{
                background: "var(--glass-bg)",

                border:
                  "1px solid var(--glass-border)",

                borderRadius:
                  "var(--radius-large)",

                backdropFilter: "blur(20px)",

                WebkitBackdropFilter:
                  "blur(20px)",

                minHeight: "240px",

                padding: "24px",

                display: "flex",

                flexDirection: "column",

                justifyContent: "center",

                alignItems: "center",

                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "0.82rem",

                  fontWeight: "300",

                  opacity: 0.55,

                  marginBottom: "12px",
                }}
              >
                Today
              </div>

              <div
                style={{
                  fontSize: "2rem",

                  fontWeight: "300",

                  letterSpacing: "-0.04em",
                }}
              >
                {new Date().toLocaleDateString(
                  "en-US",
                  {
                    month: "short",
                    day: "numeric",
                  }
                )}
              </div>

              <div
                style={{
                  marginTop: "8px",

                  fontSize: "0.78rem",

                  opacity: 0.4,
                }}
              >
                {new Date().getFullYear()}
              </div>
            </div>

            {/* urgent */}
            <DashboardEntityCard
              title="Urgent"
              items={urgentItems}
              letter="T"
              subtitle="Needs attention"
            />
          </div>

          {/* projects + tasks */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
            }}
          >
            {/* projects */}
            <DashboardEntityCard
              title="Projects"
              items={projects.filter(
                (project) => !project.completed
              )}
              letter="P"
              subtitle="Active projects"
            />

            {/* tasks */}
            <DashboardEntityCard
              title="Tasks"
              items={tasks.filter(
                (task) => !task.completed
              )}
              letter="T"
              subtitle="Active tasks"
            />
          </div>

          {/* goals + reminders */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
            }}
          >
            {/* goals */}
            <DashboardEntityCard
              title="Goals"
              items={goals.filter(
                (goal) => !goal.completed
              )}
              letter="G"
              subtitle="Active goals"
            />


            {/* reminders */}
            <DashboardEntityCard
              title="Reminders"
              items={reminders.filter(
                (reminder) => !reminder.completed
              )}
              letter="R"
              subtitle="Active reminders"
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Dashboard;