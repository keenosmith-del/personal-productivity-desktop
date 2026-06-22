import MainLayout from "../layouts/MainLayout";
import {
  useState,
  useEffect,
} from "react";

import CalendarGrid from "../components/Calendar/CalendarGrid";
import CalendarSidebar from "../components/Calendar/CalendarSidebar";

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

        projects.forEach(
          (project) => {
            addEvent(
              project.dueDate,
              {
                title:
                  project.title,
                type:
                  "project",
                category:
                  project.category,
              }
            );
          }
        );

        tasks.forEach(
          (task) => {
            addEvent(
              task.dueDate,
              {
                title:
                  task.title,
                type: "task",
                priority:
                  task.priority,
              }
            );
          }
        );

        goals.forEach(
          (goal) => {
            addEvent(
              goal.targetDate,
              {
                title:
                  goal.title,
                type: "goal",
                category:
                  goal.category,
              }
            );
          }
        );

        reminders.forEach(
          (reminder) => {
            addEvent(
              reminder.reminderDate,
              {
                title:
                  reminder.title,
                type:
                  "reminder",
                category:
                  reminder.category,
              }
            );
          }
        );

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

        <div
          style={{
            width: "320px",
            height: "100%",
          }}
        >
          <CalendarSidebar
            selectedDate={
              selectedDate
            }
            events={
              calendarEvents[
              selectedEventKey
              ] || []
            }
          />
        </div>
      </div>
    </MainLayout>
  );
}

export default Calendar;