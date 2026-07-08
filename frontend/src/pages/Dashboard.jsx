import MainLayout from "../layouts/MainLayout";

import { useState, useEffect } from "react";

import { getProjects, updateProject, deleteProject } from "../services/projectService";
import { getTasks, updateTask, deleteTask } from "../services/taskService";
import { getGoals, updateGoal, deleteGoal } from "../services/goalService";
import { getReminders, updateReminder, deleteReminder } from "../services/reminderService";
import { getNotes, updateNote, deleteNote, createNote } from "../services/noteService";

import DashboardEntityCard from "../components/Dashboard/DashboardEntityCard";
import DashboardWideCard from "../components/Dashboard/DashboardWideCard";
import DashboardNotesCard from "../components/Dashboard/DashboardNotesCard";

import WeatherWidget from "../components/Dashboard/WeatherWidget";
import ClockWidget from "../components/Dashboard/ClockWidget";

import DashboardModal from "../components/Dashboard/DashboardModal";

import TaskModal from "../components/Tasks/TaskModal";
import GoalModal from "../components/Goals/GoalModal";
import ProjectModal from "../components/Projects/ProjectModal";
import ReminderModal from "../components/Reminders/ReminderModal";
import NoteModal from "../components/Notes/NoteModal";

import Toast from "../components/Toast";

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

  const [toast, setToast] =
    useState("");

  const today = new Date();

  today.setHours(
    0,
    0,
    0,
    0
  );

  const todayDate =
    today
      .toISOString()
      .split("T")[0];

  const nextWeek =
    new Date(today);

  nextWeek.setDate(
    nextWeek.getDate() + 7
  );

  nextWeek.setHours(
    23,
    59,
    59,
    999
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

  const [editingUpcomingItem,
    setEditingUpcomingItem] =
    useState(null);

  const [previousUpcomingItem,
    setPreviousUpcomingItem] =
    useState(null);

  const [selectedNote, setSelectedNote] =
    useState(null);

  const [showCreateNote, setShowCreateNote] =
    useState(false);

  useEffect(() => {
    loadDashboardData();

    window.addEventListener(
      "data-changed",
      loadDashboardData
    );

    return () =>
      window.removeEventListener(
        "data-changed",
        loadDashboardData
      );
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

  const handleUpdateNote = async (
    updatedNote
  ) => {

    await updateNote(
      selectedNote._id,
      updatedNote
    );

    await loadDashboardData();

    setToast("Note updated");

    setTimeout(() => {
      setToast("");
    }, 3000);

    setSelectedNote(null);
  };

  const handleDeleteNote = async (
    noteId
  ) => {

    await deleteNote(noteId);

    await loadDashboardData();

    setToast("Note deleted");

    setTimeout(() => {
      setToast("");
    }, 3000);

    setSelectedNote(null);
  };

  // upcoming handlers
  const handleEditUpcoming = (
    item
  ) => {

    setPreviousUpcomingItem(item);

    setSelectedUpcomingItem(null);

    setEditingUpcomingItem(item);
  };

  const handleCompleteUpcoming =
    async (item) => {

      const updateMap = {
        task: updateTask,
        project: updateProject,
        goal: updateGoal,
        reminder: updateReminder,
      };

      await updateMap[item.type](
        item._id,
        {
          ...item,

          completed: true,

          status: "Complete",

          completedDate:
            new Date()
              .toLocaleDateString(
                "en-GB"
              ),
        }
      );

      await loadDashboardData();

      setSelectedUpcomingItem({
        ...item,

        completed: true,

        status: "Complete",

        completedDate:
          new Date()
            .toLocaleDateString(
              "en-GB"
            ),
      });
    };

  const handleRestoreUpcoming =
    async (item) => {

      const updateMap = {
        task: updateTask,
        project: updateProject,
        goal: updateGoal,
        reminder: updateReminder,
      };

      await updateMap[item.type](
        item._id,
        {
          ...item,

          completed: false,

          status: "Active",

          completedDate: null,
        }
      );

      await loadDashboardData();

      setSelectedUpcomingItem({
        ...item,

        completed: false,

        status: "Active",

        completedDate: null,
      });
    };

  const handleDeleteUpcoming =
    async (item) => {

      const entityName = {
        task: "Task",
        project: "Project",
        goal: "Goal",
        reminder: "Reminder",
      };

      const deleteMap = {
        task: deleteTask,
        project: deleteProject,
        goal: deleteGoal,
        reminder: deleteReminder,
      };

      await deleteMap[item.type](
        item._id
      );

      await loadDashboardData();

      setToast(
        `${entityName[item.type]} deleted`
      );

      setTimeout(() => {
        setToast("");
      }, 3000);

      setSelectedUpcomingItem(null);
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

  const isOverdue = (item) => {

    if (item.completed) {
      return false;
    }

    if (item.status === "Paused") {
      return false;
    }

    if (!item.dueDate) {
      return false;
    }

    const today =
      new Date();

    today.setHours(
      0,
      0,
      0,
      0
    );

    const dueDate =
      new Date(item.dueDate);

    dueDate.setHours(
      0,
      0,
      0,
      0
    );

    return dueDate < today;
  };

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

    if (item.completed) {
      return false;
    }

    if (item.status === "Paused") {
      return false;
    }

    if (!item.dueDate) {
      return false;
    }

    const dueDate =
      new Date(item.dueDate);

    dueDate.setHours(
      0,
      0,
      0,
      0
    );

    return (
      dueDate <= nextWeek
    );
  }).sort((a, b) =>
    new Date(a.dueDate) -
    new Date(b.dueDate)
  );

  // urgent items
  const urgentItems = uniqueById([
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

    if (item.completed) {
      return false;
    }

    return (
      item.priority === "High" ||
      isOverdue(item)
    );
  });

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
            {/* need placeholder empty card for notes and wide card if none */}
            <DashboardWideCard
              title="Upcoming"
              items={upcomingSortedItems}
              placeholderTitle="Upcoming events will appear here"
              placeholderFooter=""
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

              onCreateNote={() =>
                setShowCreateNote(true)
              }
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
              placeholderFooter=""
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
              placeholderTitle="Create a project to see it here"
              placeholderFooter=""
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
              placeholderTitle="Create a task to see it here"
              placeholderFooter=""
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
              placeholderTitle="Create a goal to see it here"
              placeholderFooter=""
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
              placeholderTitle="Create a reminder to see it here"
              placeholderFooter=""
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

          onRefresh={loadDashboardData}

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

          onRefresh={loadDashboardData}

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

          onRefresh={loadDashboardData}

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

          onRefresh={loadDashboardData}

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

          onRefresh={loadDashboardData}

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

          onRefresh={loadDashboardData}

          onClose={() => {
            setShowUpcomingModal(false);

            setShowAllUpcoming(false);
          }}
        />
      )}

      {/* show preview item on wide card */}
      {selectedUpcomingItem?.type === "task" && (
        <TaskModal
          mode="edit"
          task={selectedUpcomingItem}
          onSave={async (taskData) => {

            await updateTask(
              selectedUpcomingItem._id,
              taskData
            );

            await loadDashboardData();

            setToast("Task updated");

            setTimeout(() => {
              setToast("");
            }, 3000);

            setSelectedUpcomingItem(null);
          }}
          onEditTask={
            handleEditUpcoming
          }

          onDelete={() =>
            handleDeleteUpcoming(
              selectedUpcomingItem
            )
          }

          onCompleteTask={
            handleCompleteUpcoming
          }

          onRestoreTask={
            handleRestoreUpcoming
          }

          onClose={() =>
            setSelectedUpcomingItem(null)
          }
        />
      )}

      {selectedUpcomingItem?.type === "project" && (
        <ProjectModal
          mode="edit"
          project={selectedUpcomingItem}
          onSave={async (projectData) => {

            await updateProject(
              selectedUpcomingItem._id,
              projectData
            );

            await loadDashboardData();

            setToast("Project updated");

            setTimeout(() => {
              setToast("");
            }, 3000);

            setSelectedUpcomingItem(null);
          }}

          onEditProject={
            handleEditUpcoming
          }

          onDelete={() =>
            handleDeleteUpcoming(
              selectedUpcomingItem
            )
          }

          onCompleteProject={
            handleCompleteUpcoming
          }

          onRestoreProject={
            handleRestoreUpcoming
          }

          onClose={() =>
            setSelectedUpcomingItem(null)
          }
        />
      )}

      {selectedUpcomingItem?.type === "goal" && (
        <GoalModal
          mode="edit"
          goal={selectedUpcomingItem}
          onSave={async (goalData) => {

            await updateGoal(
              selectedUpcomingItem._id,
              goalData
            );

            await loadDashboardData();

            setToast("Goal updated");

            setTimeout(() => {
              setToast("");
            }, 3000);

            setSelectedUpcomingItem(null);
          }}

          onEditGoal={
            handleEditUpcoming
          }

          onDelete={() =>
            handleDeleteUpcoming(
              selectedUpcomingItem
            )
          }

          onCompleteGoal={
            handleCompleteUpcoming
          }

          onRestoreGoal={
            handleRestoreUpcoming
          }

          onClose={() =>
            setSelectedUpcomingItem(null)
          }
        />
      )}

      {selectedUpcomingItem?.type === "reminder" && (
        <ReminderModal
          mode="edit"
          reminder={selectedUpcomingItem}
          onSave={async (taskData) => {

            await updateReminder(
              selectedUpcomingItem._id,
              reminderData
            );

            await loadDashboardData();

            setToast("Reminder updated");

            setTimeout(() => {
              setToast("");
            }, 3000);

            setSelectedUpcomingItem(null);
          }}

          onEditReminder={
            handleEditUpcoming
          }

          onDelete={() =>
            handleDeleteUpcoming(
              selectedUpcomingItem
            )
          }

          onCompleteReminder={
            handleCompleteUpcoming
          }

          onRestoreReminder={
            handleRestoreUpcoming
          }

          onClose={() =>
            setSelectedUpcomingItem(null)
          }
        />
      )}

      {/* edit preview card */}
      {editingUpcomingItem?.type === "task" && (
        <TaskModal
          mode="edit"

          task={editingUpcomingItem}

          onClose={() => {

            setEditingUpcomingItem(
              null
            );

            setSelectedUpcomingItem(
              previousUpcomingItem
            );
          }}

          onSave={async (
            taskData
          ) => {

            await updateTask(
              editingUpcomingItem._id,
              taskData
            );

            await loadDashboardData();

            setToast("Task updated");

            setTimeout(() => {
              setToast("");
            }, 3000);

            setEditingUpcomingItem(
              null
            );

            setSelectedUpcomingItem({
              ...previousUpcomingItem,
              ...taskData,
            });
          }}
        />
      )}

      {editingUpcomingItem?.type === "project" && (
        <ProjectModal
          mode="edit"

          project={editingUpcomingItem}

          onClose={() => {

            setEditingUpcomingItem(
              null
            );

            setSelectedUpcomingItem(
              previousUpcomingItem
            );
          }}

          onSave={async (
            projectData
          ) => {

            await updateProject(
              editingUpcomingItem._id,
              projectData
            );

            await loadDashboardData();

            setToast("Project updated");

            setTimeout(() => {
              setToast("");
            }, 3000);

            setEditingUpcomingItem(
              null
            );

            setSelectedUpcomingItem({
              ...previousUpcomingItem,
              ...projectData,
            });
          }}
        />
      )}

      {editingUpcomingItem?.type === "goal" && (
        <GoalModal
          mode="edit"

          goal={editingUpcomingItem}

          onClose={() => {

            setEditingUpcomingItem(
              null
            );

            setSelectedUpcomingItem(
              previousUpcomingItem
            );
          }}

          onSave={async (
            goalData
          ) => {

            await updateGoal(
              editingUpcomingItem._id,
              goalData
            );

            await loadDashboardData();

            setToast("Goal updated");

            setTimeout(() => {
              setToast("");
            }, 3000);

            setEditingUpcomingItem(
              null
            );

            setSelectedUpcomingItem({
              ...previousUpcomingItem,
              ...goalData,
            });
          }}
        />
      )}

      {editingUpcomingItem?.type === "reminder" && (
        <ReminderModal
          mode="edit"

          reminder={editingUpcomingItem}

          onClose={() => {

            setEditingUpcomingItem(
              null
            );

            setSelectedUpcomingItem(
              previousUpcomingItem
            );
          }}

          onSave={async (
            reminderData
          ) => {

            await updateReminder(
              editingUpcomingItem._id,
              reminderData
            );

            await loadDashboardData();

            setToast("Reminder updated");

            setTimeout(() => {
              setToast("");
            }, 3000);

            setEditingUpcomingItem(
              null
            );

            setSelectedUpcomingItem({
              ...previousUpcomingItem,
              ...reminderData,
            });
          }}
        />
      )}

      {/* open preview note */}
      {selectedNote && (
        <NoteModal
          note={selectedNote}

          mode="edit"

          onSave={handleUpdateNote}

          onDelete={handleDeleteNote}

          onClose={() =>
            setSelectedNote(null)
          }
        />
      )}
      {showCreateNote && (
        <NoteModal
          mode="create"

          onSave={async (
            noteData
          ) => {

            await createNote(
              noteData
            );

            await loadDashboardData();

            setToast(
              "Note created"
            );

            setTimeout(() => {
              setToast("");
            }, 3000);

            setShowCreateNote(
              false
            );
          }}

          onClose={() =>
            setShowCreateNote(
              false
            )
          }
        />
      )}
      <Toast
        message={toast}
      />
    </MainLayout>
  );
}

export default Dashboard;