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

import TaskDetailsModal from "../components/Tasks/TaskDetailsModal";
import ProjectDetailsModal from "../components/Projects/ProjectDetailsModal";
import GoalDetailsModal from "../components/Goals/GoalDetailsModal";
import ReminderDetailsModal from "../components/Reminders/ReminderDetailsModal";
import NoteModal from "../components/Notes/NoteModal";

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

  const today = new Date();

  today.setDate(
    today.getDate()
  );

  const todayDate =
    today
      .toISOString()
      .split("T")[0];

  const nextWeek = new Date();

  nextWeek.setDate(
    nextWeek.getDate() + 7
  );


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

  // upcoming wide card modal
  const [showUpcomingModal, setShowUpcomingModal] =
    useState(false);

  const [showAllUpcoming, setShowAllUpcoming] =
    useState(false);

  const [selectedUpcomingItem, setSelectedUpcomingItem] =
    useState(null);

  const [selectedNote, setSelectedNote] =
    useState(null);

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

  // helper functions 
  const getPriorityChips = (items) => {
    const low =
      items.filter(
        (item) =>
          item.priority === "Low"
      ).length;

    const medium =
      items.filter(
        (item) =>
          item.priority === "Medium"
      ).length;

    const high =
      items.filter(
        (item) =>
          item.priority === "High"
      ).length;

    const chips = [];

    if (low > 0) {
      chips.push(`L${low}`);
    }

    if (medium > 0) {
      chips.push(`M${medium}`);
    }

    if (high > 0) {
      chips.push(`H${high}`);
    }

    return chips.length > 0
      ? chips
      : ["—"];
  };

  const getUpcomingChips = (items) => {
    const goalsCount =
      items.filter(
        (item) =>
          item.type === "goal"
      ).length;

    const tasksCount =
      items.filter(
        (item) =>
          item.type === "task"
      ).length;

    const projectsCount =
      items.filter(
        (item) =>
          item.type === "project"
      ).length;

    const remindersCount =
      items.filter(
        (item) =>
          item.type === "reminder"
      ).length;

    const chips = [];

    if (goalsCount > 0) {
      chips.push(`G${goalsCount}`);
    }

    if (tasksCount > 0) {
      chips.push(`T${tasksCount}`);
    }

    if (projectsCount > 0) {
      chips.push(`P${projectsCount}`);
    }

    if (remindersCount > 0) {
      chips.push(`R${remindersCount}`);
    }

    return chips.length > 0
      ? chips
      : ["—"];
  };

  const getUrgentChips = () => {
    const goalsCount =
      urgentItems.filter(
        (item) =>
          item.type === "goal"
      ).length;

    const tasksCount =
      urgentItems.filter(
        (item) =>
          item.type === "task"
      ).length;

    const projectsCount =
      urgentItems.filter(
        (item) =>
          item.type === "project"
      ).length;

    const remindersCount =
      urgentItems.filter(
        (item) =>
          item.type === "reminder"
      ).length;

    const chips = [];

    if (goalsCount > 0) {
      chips.push(`G${goalsCount}`);
    }

    if (tasksCount > 0) {
      chips.push(`T${tasksCount}`);
    }

    if (projectsCount > 0) {
      chips.push(`P${projectsCount}`);
    }

    if (remindersCount > 0) {
      chips.push(`R${remindersCount}`);
    }

    return chips.length > 0
      ? chips
      : ["—"];
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

  // upcoming items
  const upcomingItems = uniqueById([
    ...tasks.map((task) => ({
      ...task,
      type: "task",
    })),

    ...goals.map((goal) => ({
      ...goal,
      type: "goal",
    })),

    ...projects.map((project) => ({
      ...project,
      type: "project",
    })),

    ...reminders.map((reminder) => ({
      ...reminder,
      type: "reminder",
    })),
  ]).filter((item) => {
    if (!item.dueDate) {
      return false;
    }

    const dueDate =
      new Date(item.dueDate);

    return (
      dueDate >= today &&
      dueDate <= nextWeek
    );
  }).sort((a, b) =>
    new Date(a.dueDate) -
    new Date(b.dueDate)
  );

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

  const upcomingSortedItems =
    [...upcomingItems].sort((a, b) => {
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
              items={upcomingSortedItems}
              chips={getUpcomingChips(
                upcomingSortedItems
              )}
              onClick={() =>
                setShowUpcomingModal(true)
              }
              onPreviewClick={
                setSelectedUpcomingItem
              }
            />
          </div>

          {/* NOTES */}
          <div>
            <DashboardNotesCard
              notes={notes}
              onNoteClick={setSelectedNote}
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
              onMouseEnter={(e) => {

                e.currentTarget.style.transform =
                  "translateY(-1px)";

                e.currentTarget.style.background =
                  "rgba(255,255,255,0.03)";
              }}
              onMouseLeave={(e) => {

                e.currentTarget.style.transform =
                  "translateY(0)";

                e.currentTarget.style.background =
                  "var(--glass-bg)";
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
              placeholderTitle="No urgent items right now"
              placeholderFooter="urgent items will appear here"
              chips={getUrgentChips()}
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
              placeholderTitle="No Projects"
              placeholderFooter="Create a project to see it here"
              chips={getPriorityChips(projectItems)}
              subtitle="All projects"
              onClick={() =>
                setShowProjectsModal(true)
              }
            />

            {/* tasks */}
            <DashboardEntityCard
              title="Tasks"
              items={taskItems}
              placeholderTitle="No Tasks"
              placeholderFooter="Create a task to see it here"
              chips={getPriorityChips(taskItems)}
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
              placeholderTitle="No Goals"
              placeholderFooter="Create a goal to see it here"
              chips={getPriorityChips(goalItems)}
              subtitle="All goals"
              onClick={() =>
                setShowGoalsModal(true)
              }
            />


            {/* reminders */}
            <DashboardEntityCard
              title="Reminders"
              items={reminderItems}
              placeholderTitle="No Reminders"
              placeholderFooter="Create a reminder to see it here"
              chips={getPriorityChips(reminderItems)}
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

      {/* show upcoming modal */}
      {showUpcomingModal && (
        <DashboardModal
          title="Upcoming"
          subtitle="Events due in the next 7 days."

          events={
            showAllUpcoming
              ? upcomingItems
              : upcomingItems.slice(0, 4)
          }

          projects={projects}
          tasks={tasks}
          goals={goals}
          reminders={reminders}

          remainingCount={
            showAllUpcoming
              ? 0
              : Math.max(
                0,
                upcomingItems.length - 4
              )
          }

          expanded={showAllUpcoming}

          onShowAll={() =>
            setShowAllUpcoming(true)
          }

          onShowLess={() =>
            setShowAllUpcoming(false)
          }

          onClose={() => {
            setShowUpcomingModal(false);

            setShowAllUpcoming(false);
          }}
        />
      )}

      {/* show preview item on wide card */}
      {selectedUpcomingItem?.type === "task" && (
        <TaskDetailsModal
          task={selectedUpcomingItem}
          onClose={() =>
            setSelectedUpcomingItem(null)
          }
        />
      )}

      {selectedUpcomingItem?.type === "project" && (
        <ProjectDetailsModal
          project={selectedUpcomingItem}
          onClose={() =>
            setSelectedUpcomingItem(null)
          }
        />
      )}

      {selectedUpcomingItem?.type === "goal" && (
        <GoalDetailsModal
          goal={selectedUpcomingItem}
          onClose={() =>
            setSelectedUpcomingItem(null)
          }
        />
      )}

      {selectedUpcomingItem?.type === "reminder" && (
        <ReminderDetailsModal
          reminder={selectedUpcomingItem}
          onClose={() =>
            setSelectedUpcomingItem(null)
          }
        />
      )}

      {/* open preview note */}
        { selectedNote && (
          <NoteModal
            note={selectedNote}
            onClose={() =>
              setSelectedNote(null)
            }
            mode = "edit"
          />
        )}
    </MainLayout>
  );
}

export default Dashboard;