import MainLayout from "../layouts/MainLayout";
import {
  useState,
  useEffect,
} from "react";

import CalendarGrid from "../components/Calendar/CalendarGrid";

import CalendarModal from "../components/Calendar/CalendarModal";

import {
  getProjects,
} from "../services/projectService";

import {
  getTasks,
} from "../services/taskService";

import {
  getGoals,
} from "../services/goalService";

import {
  getReminders,
} from "../services/reminderService";

function Calendar() {
  const currentDay =
    new Date().getDate();

  const [
    displayDate,
    setDisplayDate,
  ] = useState(
    new Date()
  );

  const [
    selectedDate,
    setSelectedDate,
  ] = useState({
    day: currentDay,
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const [
    showCalendarModal,
    setShowCalendarModal,
  ] = useState(false);

  const [
    calendarEvents,
    setCalendarEvents,
  ] = useState({});

  const loadCalendarData =
    async () => {
      try {
        const [
          projects,
          tasks,
          goals,
          reminders,
        ] = await Promise.all([
          getProjects(),
          getTasks(),
          getGoals(),
          getReminders(),
        ]);

        const events = {};

        const addEvent = (
          dateString,
          event
        ) => {
          if (!dateString) return;

          const date =
            new Date(dateString);

          if (
            Number.isNaN(
              date.getTime()
            )
          ) {
            return;
          }

          const eventKey =
            `${date.getFullYear()}-${date.getMonth()
            }-${date.getDate()}`;

          if (!events[eventKey]) {
            events[eventKey] = [];
          }

          events[eventKey].push(
            event
          );
        };

        projects
          .filter(
            (project) => !project.completed
          )
          .forEach((project) => {
            addEvent(
              project.dueDate,
              {
                _id: project._id,

                title: project.title,

                description:
                  project.description,

                category:
                  project.category,

                priority:
                  project.priority,

                status:
                  project.status,

                linkedItems:
                  project.linkedItems || [],

                completed:
                  project.completed,

                type: "project",
              }
            );
          });

        tasks
          .filter(
            (task) => !task.completed
          )
          .forEach((task) => {
            addEvent(
              task.dueDate,
              {
                _id: task._id,

                title: task.title,

                description:
                  task.description,

                category:
                  task.category,

                priority:
                  task.priority,

                status:
                  task.status,

                linkedItems:
                  task.linkedItems || [],

                completed:
                  task.completed,

                type: "task",
              }
            );
          });

        goals
          .filter(
            (goal) => !goal.completed
          )
          .forEach((goal) => {
            addEvent(
              goal.dueDate,
              {
                _id: goal._id,

                title: goal.title,

                description:
                  goal.description,

                category:
                  goal.category,

                priority:
                  goal.priority,

                status:
                  goal.status,

                linkedItems:
                  goal.linkedItems || [],

                completed:
                  goal.completed,

                type: "goal",
              }
            );
          });

        reminders
          .filter(
            (reminder) =>
              !reminder.completed
          )
          .forEach((reminder) => {
            addEvent(
              reminder.dueDate,
              {
                _id: reminder._id,

                title: reminder.title,

                description:
                  reminder.description,

                category:
                  reminder.category,

                priority:
                  reminder.priority,

                status:
                  reminder.status,

                linkedItems:
                  reminder.linkedItems || [],

                completed:
                  reminder.completed,

                type: "reminder",
              }
            );
          });

        setCalendarEvents(
          events
        );

      } catch (error) {
        console.error(error);
      }
    };

  useEffect(() => {
    loadCalendarData();
  }, []);

  const selectedEventKey =
    `${selectedDate.year}-${selectedDate.month}-${selectedDate.day}`;

  const selectedEvents =
    calendarEvents[
    selectedEventKey
    ] || [];

  return (
    <MainLayout>
      <div
        style={{
          display: "flex",

          gap: "24px",

          height: "calc(100vh - 140px)",
        }}
      >
        <CalendarGrid
          selectedDate={
            selectedDate
          }
          setSelectedDate={
            setSelectedDate
          }
          setShowCalendarModal={
            setShowCalendarModal
          }
          calendarEvents={
            calendarEvents
          }
          displayDate={
            displayDate
          }
          setDisplayDate={
            setDisplayDate
          }
        />
      </div>
      {showCalendarModal && (
        <CalendarModal
          selectedDate={
            selectedDate
          }
          events={selectedEvents}
          onClose={() =>
            setShowCalendarModal(false)
          }
        />
      )}
    </MainLayout>
  );
}

export default Calendar;