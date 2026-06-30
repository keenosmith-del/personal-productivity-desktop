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

import DashboardModal from "../components/Dashboard/DashboardModal";

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

  // show modal functions
  // show urgent modal
  const [showUrgentModal, setShowUrgentModal] =
    useState(false);

  const [showAllUrgent, setShowAllUrgent] =
    useState(false);

  // show projects modal
  const [showProjectsModal, setShowProjectsModal] =
    useState(false);

  const [showAllProjects, setShowAllProjects] =
    useState(false);

  // show tasks modal
  const [showTasksModal, setShowTasksModal] =
    useState(false);

  const [showAllTasks, setShowAllTasks] =
    useState(false);

  // show goals modal
  const [showGoalsModal, setShowGoalsModal] =
    useState(false);

  const [showAllGoals, setShowAllGoals] =
    useState(false);

  // reminders modal
  const [showRemindersModal, setShowRemindersModal] =
    useState(false);

  const [showAllReminders, setShowAllReminders] =
    useState(false);
  // end show modal functions

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

  // why unique by ID?
  const uniqueById = (items) => {
    const map = new Map();
    items.forEach((item) => {
      map.set(item._id, item);
    });
    return Array.from(map.values());
  };

  // helpers to sort
  const sortByDate = (items) =>
    [...items].sort((a, b) => {
      const dateA =
        a.dueDate
          ? new Date(a.dueDate)
          : new Date("9999-12-31");

      const dateB =
        b.dueDate
          ? new Date(b.dueDate)
          : new Date("9999-12-31");

      return dateA - dateB;
    });

  // urgent items
  const urgentItems = uniqueById([
    ...tasks
      .filter(
        (task) =>
          task.priority === "High"
      )
      .map((task) => ({
        ...task,
        type: "task",
      })),

    ...goals
      .filter(
        (goal) =>
          goal.priority === "High"
      )
      .map((goal) => ({
        ...goal,
        type: "goal",
      })),

    ...projects
      .filter(
        (project) =>
          project.priority === "High"
      )
      .map((project) => ({
        ...project,
        type: "project",
      })),

    ...reminders
      .filter(
        (reminder) =>
          reminder.priority === "High"
      )
      .map((reminder) => ({
        ...reminder,
        type: "reminder",
      })),
  ]);

  const sortedUrgentItems =
    [...urgentItems].sort(
      (a, b) => {
        const dateA =
          a.dueDate
            ? new Date(a.dueDate)
            : new Date(
              "9999-12-31"
            );

        const dateB =
          b.dueDate
            ? new Date(b.dueDate)
            : new Date(
              "9999-12-31"
            );

        return dateA - dateB;
      }
    );

  // showing not completed only?
  // project items
  const projectItems =
  sortByDate(
    projects
      .map((project) => ({
        ...project,
        type: "project",
      }))
    );

  // task items
  const taskItems =
  sortByDate(
    tasks
      .map((task) => ({
        ...task,
        type: "task",
      }))
    );

  // goal items
  const goalItems =
  sortByDate(
    goals
      .map((goal) => ({
        ...goal,
        type: "goal",
      }))
    );

  // reminder items
  const reminderItems =
  sortByDate(
    reminders
      .map((reminder) => ({
        ...reminder,
        type: "reminder",
      }))
    );

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
        ) 
    ),

    ...goals.filter(
      (goal) =>
        goal.dueDate &&
        goal.dueDate.startsWith(
          todayDate
        ) 
    ),

    ...projects.filter(
      (project) =>
        project.dueDate &&
        project.dueDate.startsWith(
          todayDate
        ) 
    ),

    ...reminders.filter(
      (reminder) =>
        reminder.dueDate &&
        reminder.dueDate.startsWith(
          todayDate
        ) 
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
              onClick={() =>
                setShowUrgentModal(true)
              }
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
              items={projectItems}
              letter="P"
              subtitle="All projects"
              onClick={() =>
                setShowProjectsModal(true)
              }
            />

            {/* tasks */}
            <DashboardEntityCard
              title="Tasks"
              items={taskItems}
              letter="T"
              subtitle="All tasks"
              onClick={() =>
                setShowTasksModal(true)
              }
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
              items={goalItems}
              letter="G"
              subtitle="All goals"
              onClick={() =>
                setShowGoalsModal(true)
              }
            />


            {/* reminders */}
            <DashboardEntityCard
              title="Reminders"
              items={reminderItems}
              letter="R"
              subtitle="All reminders"
              onClick={() =>
                setShowRemindersModal(true)
              }
            />
          </div>
        </div>
      </div>
      {/* show modals */}
      {/* urgent */}
      {showUrgentModal && (
        <DashboardModal
          title="High Priority"
          subtitle="Items that need attention."

          events={
            showAllUrgent
              ? urgentItems
              : urgentItems.slice(0, 4)
          }

          projects={projects}
          tasks={tasks}
          goals={goals}
          reminders={reminders}

          remainingCount={
            showAllUrgent
              ? 0
              : Math.max(
                0,
                urgentItems.length - 4
              )
          }

          expanded={showAllUrgent}

          onShowAll={() =>
            setShowAllUrgent(true)
          }

          onShowLess={() =>
            setShowAllUrgent(false)
          }

          onClose={() => {
            setShowUrgentModal(false);

            setShowAllUrgent(false);
          }}
        />
      )}

      {/* projects */}
      {showProjectsModal && (
        <DashboardModal
          title="Projects"
          subtitle="All projects."

          events={
            showAllProjects
              ? projectItems
              : projectItems.slice(0, 4)
          }

          projects={projects}
          tasks={tasks}
          goals={goals}
          reminders={reminders}

          remainingCount={
            showAllProjects
              ? 0
              : Math.max(
                0,
                projectItems.length - 4
              )
          }

          expanded={showAllProjects}

          onShowAll={() =>
            setShowAllProjects(true)
          }

          onShowLess={() =>
            setShowAllProjects(false)
          }

          onClose={() => {
            setShowProjectsModal(false);

            setShowAllProjects(false);
          }}
        />
      )}

      {/* tasks */}
      {showTasksModal && (
        <DashboardModal
          title="Tasks"
          subtitle="All tasks."

          events={
            showAllTasks
              ? taskItems
              : taskItems.slice(0, 4)
          }

          projects={projects}
          tasks={tasks}
          goals={goals}
          reminders={reminders}

          remainingCount={
            showAllTasks
              ? 0
              : Math.max(
                0,
                taskItems.length - 4
              )
          }

          expanded={showAllTasks}

          onShowAll={() =>
            setShowAllTasks(true)
          }

          onShowLess={() =>
            setShowAllTasks(false)
          }

          onClose={() => {
            setShowTasksModal(false);

            setShowAllTasks(false);
          }}
        />
      )}

      {/* goals */}
      {showGoalsModal && (
        <DashboardModal
          title="Goals"
          subtitle="Active goals."

          events={
            showAllGoals
              ? goalItems
              : goalItems.slice(0, 4)
          }

          projects={projects}
          tasks={tasks}
          goals={goals}
          reminders={reminders}

          remainingCount={
            showAllGoals
              ? 0
              : Math.max(
                0,
                goalItems.length - 4
              )
          }

          expanded={showAllGoals}

          onShowAll={() =>
            setShowAllGoals(true)
          }

          onShowLess={() =>
            setShowAllGoals(false)
          }

          onClose={() => {
            setShowGoalsModal(false);

            setShowAllGoals(false);
          }}
        />
      )}

      {/* reminders */}
      {showRemindersModal && (
        <DashboardModal
          title="Reminders"
          subtitle="All reminders."

          events={
            showAllReminders
              ? reminderItems
              : reminderItems.slice(0, 4)
          }

          projects={projects}
          tasks={tasks}
          goals={goals}
          reminders={reminders}

          remainingCount={
            showAllReminders
              ? 0
              : Math.max(
                0,
                reminderItems.length - 4
              )
          }

          expanded={showAllReminders}

          onShowAll={() =>
            setShowAllReminders(true)
          }

          onShowLess={() =>
            setShowAllReminders(false)
          }

          onClose={() => {
            setShowRemindersModal(false);

            setShowAllReminders(false);
          }}
        />
      )}

      {/* end show modals */}
    </MainLayout>
  );
}

export default Dashboard;