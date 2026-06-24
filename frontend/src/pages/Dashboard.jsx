import MainLayout from "../layouts/MainLayout";

import { useState, useEffect } from "react";

import { getProjects } from "../services/projectService";
import { getTasks } from "../services/taskService";
import { getGoals } from "../services/goalService";
import { getReminders } from "../services/reminderService";
import { getNotifications } from "../services/notificationService";

import AnalyticsCard from "../components/Dashboard/AnalyticsCard";
import WeatherWidget from "../components/Dashboard/WeatherWidget";
import ClockWidget from "../components/Dashboard/ClockWidget";
import DashboardModal from "../components/Dashboard/DashboardModal";
import GlassCard from "../components/GlassCard";

import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [modalData, setModalData] =
    useState(null);

  const [projects, setProjects] =
    useState([]);

  const [tasks, setTasks] =
    useState([]);

  const [goals, setGoals] =
    useState([]);

  const [reminders, setReminders] =
    useState([]);

  const [notifications, setNotifications] =
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
          notificationsData,
        ] = await Promise.all([
          getProjects(),
          getTasks(),
          getGoals(),
          getReminders(),
          getNotifications(),
        ]);

        setProjects(projectsData);
        setTasks(tasksData);
        setGoals(goalsData);
        setReminders(remindersData);
        setNotifications(notificationsData);
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

  const today = new Date()
    .toISOString()
    .split("T")[0];

  const dueTodayItems = uniqueById([
    ...tasks.filter(
      (task) =>
        task.dueDate &&
        task.dueDate.startsWith(
          today
        ) &&
        !task.completed
    ),

    ...goals.filter(
      (goal) =>
        goal.targetDate &&
        goal.targetDate.startsWith(
          today
        ) &&
        !goal.completed
    ),

    ...projects.filter(
      (project) =>
        project.dueDate &&
        project.dueDate.startsWith(
          today
        ) &&
        !project.completed
    ),

    ...reminders.filter(
      (reminder) =>
        reminder.reminderDate &&
        reminder.reminderDate.startsWith(
          today
        ) &&
        !reminder.completed
    ),
  ]);

  const tomorrow = new Date();

  tomorrow.setDate(
    tomorrow.getDate() + 1
  );

  const tomorrowDate =
    tomorrow
      .toISOString()
      .split("T")[0];

  const tomorrowItems = uniqueById([
    ...tasks.filter(
      (task) =>
        task.dueDate &&
        task.dueDate.startsWith(
          tomorrowDate
        ) &&
        !task.completed
    ),

    ...goals.filter(
      (goal) =>
        goal.targetDate &&
        goal.targetDate.startsWith(
          tomorrowDate
        ) &&
        !goal.completed
    ),

    ...projects.filter(
      (project) =>
        project.dueDate &&
        project.dueDate.startsWith(
          tomorrowDate
        ) &&
        !project.completed
    ),

    ...reminders.filter(
      (reminder) =>
        reminder.reminderDate &&
        reminder.reminderDate.startsWith(
          tomorrowDate
        ) &&
        !reminder.completed
    ),
  ]);

  const attentionItems = uniqueById([
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

  const getEntityType = (item) => {
    if (item.targetDate) return "Goal";
    if (item.reminderDate) return "Reminder";
    if (item.dueDate) return "Task";
    return "Project";
  };

  const allItems = [
    ...projects,
    ...tasks,
    ...goals,
    ...reminders,
  ];

  const completedItems = allItems.filter(
    (item) => item.completed
  );

  const progress =
    allItems.length === 0
      ? 0
      : Math.round(
        (completedItems.length /
          allItems.length) *
        100
      );

  const overdueTasks = tasks.filter(
    (task) =>
      !task.completed &&
      task.dueDate &&
      new Date(task.dueDate) < new Date()
  );

  const productivityScoreRaw =
    completedItems.reduce((acc, item) => {
      if (item.priority === "High")
        return acc + 1;
      return acc + 0.5;
    }, 0) -

    overdueTasks.length * 2;

  const productivityScore = Math.max(
    0,
    Math.min(
      100,
      Math.round(
        (productivityScoreRaw /
          (allItems.length || 1)) *
        100
      )
    )
  );
  return (
    <MainLayout>
      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "1fr 1fr",

          gap: "24px",
        }}
      >
        {/* LEFT COLUMN */}

        <div
          style={{
            display: "grid",
            gap: "24px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "1fr 1fr",
              gap: "24px",
            }}
          >
            <WeatherWidget />

            <ClockWidget />
          </div>

          <AnalyticsCard
            title="Recent Activity"
            value={notifications.length}
            subtitle={
              notifications.length === 0
                ? "No activity"
                : "Latest updates"
            }
            chips={
              notifications.length === 0
                ? []
                : [...new Set(
                  notifications
                    .slice(0, 2)
                    .map(
                      (notification) =>
                        notification.type
                    )
                )].map((type) => ({
                  label:
                    type.charAt(0).toUpperCase() +
                    type.slice(1),

                  color:
                    type === "goal"
                      ? "#c59c70"
                      : type === "task"
                        ? "#72715c"
                        : type === "reminder"
                          ? "#83545c"
                          : "#854c49",
                }))
            }
            activityLines={notifications
              .slice(0, 2)
              .map(
                (notification) =>
                  `${notification.title} • ${notification.description}`
              )}
            wide
          />

          <AnalyticsCard
            title="Progress"
            value={`${progress}%`}
            subtitle={
              progress === 100
                ? "All caught up"
                : progress >= 70
                  ? "On track"
                  : progress >= 40
                    ? "Needs focus"
                    : "Behind schedule"
            }
            wide
          />

          <AnalyticsCard
            title="Productivity Score"
            value={`${productivityScore}%`}
            subtitle={
              productivityScore >= 80
                ? "Highly productive"
                : productivityScore >= 60
                  ? "Good momentum"
                  : productivityScore >= 40
                    ? "Average output"
                    : "Low activity"
            }
            wide
          />
        </div>

        {/* RIGHT COLUMN */}

        <div
          style={{
            display: "grid",
            gap: "24px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "1fr 1fr",
              gap: "24px",
            }}
          >
            <AnalyticsCard
              title="Date"
              value={new Date().toLocaleDateString(
                "en-US",
                {
                  month: "short",
                  day: "numeric",
                }
              )}
              subtitle={String(
                new Date().getFullYear()
              )}
            />

            <AnalyticsCard
              title="Due Today"
              value={dueTodayItems.length}
              subtitle={
                dueTodayItems.length === 0
                  ? "Nothing due"
                  : dueTodayItems.length === 1
                    ? "Item"
                    : "Items"
              }

              chips={
                dueTodayItems.length === 0
                  ? []
                  : [
                    ...new Set(
                      dueTodayItems.map((item) =>
                        item.targetDate
                          ? "Goal"
                          : item.linkedProjects !==
                            undefined
                            ? "Task"
                            : item.reminderDate
                              ? "Reminder"
                              : "Project"
                      )
                    ),
                  ].map((label) => ({
                    label,

                    color:
                      label === "Goal"
                        ? "#c59c70"
                        : label === "Task"
                          ? "#72715c"
                          : label ===
                            "Reminder"
                            ? "#83545c"
                            : "#854c49",
                  }))
              }

              clickable
              onClick={() =>
                setModalData({
                  title: "Due Today",

                  items: dueTodayItems.map(
                    (item) => ({
                      title: item.title,

                      entity: getEntityType(item),

                      priority:
                        item.priority,

                      category:
                        item.category,
                    })
                  ),
                })
              }
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "1fr 1fr",
              gap: "24px",
            }}
          >
            <AnalyticsCard
              title="Tomorrow"
              value={tomorrowItems.length}
              subtitle={
                tomorrowItems.length === 0
                  ? "Nothing scheduled"
                  : "Scheduled"
              }

              chips={
                tomorrowItems.length === 0
                  ? []
                  : [
                    ...new Set(
                      tomorrowItems.map((item) =>
                        item.targetDate
                          ? "Goal"
                          : item.linkedProjects !==
                            undefined
                            ? "Task"
                            : item.reminderDate
                              ? "Reminder"
                              : "Project"
                      )
                    ),
                  ].map((label) => ({
                    label,

                    color:
                      label === "Goal"
                        ? "#c59c70"
                        : label === "Task"
                          ? "#72715c"
                          : label ===
                            "Reminder"
                            ? "#83545c"
                            : "#854c49",
                  }))
              }

              clickable
              onClick={() =>
                setModalData({
                  title: "Tomorrow",

                  items: tomorrowItems.map(
                    (item) => ({
                      title: item.title,

                      entity: getEntityType(item),

                      priority:
                        item.priority,

                      category:
                        item.category,
                    })
                  ),
                })
              }
            />

            <AnalyticsCard
              title="Attention"
              value={attentionItems.length}
              subtitle={
                attentionItems.length === 0
                  ? "Nothing urgent"
                  : "Needs focus"
              }

              chips={
                attentionItems.length === 0
                  ? []
                  : [
                    {
                      label: "High",
                      color: "#ab3130",
                    },
                  ]
              }

              clickable
              onClick={() =>
                setModalData({
                  title: "Attention",

                  items: attentionItems.map(
                    (item) => ({
                      title: item.title,

                      entity: getEntityType(item),

                      priority:
                        item.priority,

                      category:
                        item.category,
                    })
                  ),
                })
              }
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "1fr 1fr",
              gap: "24px",
            }}
          >
            <AnalyticsCard
              title="Projects"
              value={
                projects.filter(
                  (project) =>
                    !project.completed
                ).length
              }
              subtitle={
                projects.filter(
                  (project) =>
                    !project.completed
                ).length === 1
                  ? "Active Project"
                  : "Active Projects"
              }

              chips={
                projects.length === 0
                  ? []
                  : [
                    {
                      label: "Projects",
                      color: "#854c49",
                    },
                  ]
              }

              clickable
              onClick={() =>
                setModalData({
                  title: "Projects",

                  items: projects
                    .filter(
                      (project) =>
                        !project.completed
                    )
                    .map((project) => ({
                      title: project.title,

                      entity: "Project",

                      category:
                        project.category,
                    })),
                })
              }
            />

            <AnalyticsCard
              title="Goals"
              value={
                goals.filter(
                  (goal) =>
                    !goal.completed
                ).length
              }
              subtitle={
                goals.filter(
                  (goal) =>
                    !goal.completed
                ).length === 1
                  ? "Active Goal"
                  : "Active Goals"
              }

              chips={
                goals.length === 0
                  ? []
                  : [
                    {
                      label: "Goals",
                      color: "#c59c70",
                    },
                  ]
              }

              clickable
              onClick={() =>
                setModalData({
                  title: "Goals",

                  items: goals
                    .filter(
                      (goal) =>
                        !goal.completed
                    )
                    .map((goal) => ({
                      title: goal.title,

                      entity: "Goal",

                      category:
                        goal.category,
                    })),
                })
              }
            />
          </div>
        </div>
      </div>
      {modalData && (
        <DashboardModal
          title={modalData.title}
          items={modalData.items}
          onClose={() =>
            setModalData(null)
          }
          onNavigate={(path) => {
            setModalData(null);
            navigate(path);
          }}
        />
      )}
    </MainLayout>
  );
}

export default Dashboard;