import MainLayout from "../layouts/MainLayout";
import {
  useState,
  useEffect,
} from "react";

import CalendarGrid from "../components/Calendar/CalendarGrid";
import CalendarModal from "../components/Calendar/CalendarModal";

import Toast from "../components/Toast";

import { getProjects } from "../services/projectService";
import { getTasks } from "../services/taskService";
import { getGoals } from "../services/goalService";
import { getReminders } from "../services/reminderService";

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

  const [
    toast,
    setToast,
  ] = useState("");

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

        projects.forEach((project) => {
          addEvent(
            project.dueDate,
            {
              ...project,

              linkedItems:
                project.linkedItems || [],

              type: "project",
            }
          );
        });

        tasks.forEach((task) => {
          addEvent(
            task.dueDate,
            {
              ...task,

              linkedItems:
                task.linkedItems || [],

              type: "task",
            }
          );
        });

        goals.forEach((goal) => {
          addEvent(
            goal.dueDate,
            {
              ...goal,

              linkedItems:
                goal.linkedItems || [],

              type: "goal",
            }
          );
        });

        reminders.forEach((reminder) => {
          addEvent(
            reminder.dueDate,
            {
              ...reminder,

              linkedItems:
                reminder.linkedItems || [],

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

    window.addEventListener(
      "data-changed",
      loadCalendarData
    );

    return () =>
      window.removeEventListener(
        "data-changed",
        loadCalendarData
      );
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

          setToast={setToast}

          onRefresh={
            loadCalendarData
          }
        />
      )}
      <Toast
        message={toast}
      />
    </MainLayout>
  );
}

export default Calendar;