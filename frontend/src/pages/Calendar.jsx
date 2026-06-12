import MainLayout from "../layouts/MainLayout";
import { useState } from "react";

import CalendarGrid from "../components/Calendar/CalendarGrid";
import CalendarSidebar from "../components/Calendar/CalendarSidebar";

function Calendar() {
  // COMPONENT STATES
const currentDay = 8; // gets replaced with new Date().getDate()

const [
  selectedDay,
  setSelectedDay,
] = useState(currentDay);

  const calendarEvents = {
    3: [
      {
        title: "Gym Session",
        type: "goal",
        category: "Health",
      },
    ],

    5: [
      {
        title: "Dashboard UI",
        type: "task",
        priority: "Medium",
      },
    ],

    8: [
      {
        title:
          "Portfolio Website",
        type: "goal",
        category: "Personal",
      },

      {
        title:
          "Portfolio Review",
        type: "reminder",
        category: "Work",
      },

      {
        title:
          "Desktop App",
        type: "project",
        category: "Study",
      },

      {
        title:
          "Apply for Jobs",
        type: "task",
        priority: "High",
      },
    ],

    14: [
      {
        title: "Checkup",
        type: "reminder",
        category: "Health",
      },
    ],

    21: [
      {
        title:
          "Submission",
        type: "project",
        category: "Study",
      },
    ],
  };

  //FUNCTIONS
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
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
        />

        <div
          style={{
            width: "320px",
          }}
        >
          <CalendarSidebar
            selectedDay={selectedDay}
            events={
              calendarEvents[
              selectedDay
              ] || []
            }
          />
        </div>
      </div>
    </MainLayout>
  );
}

export default Calendar;