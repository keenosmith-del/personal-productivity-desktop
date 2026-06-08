import MainLayout from "../layouts/MainLayout";

import ReminderForm from "../components/ReminderForm";
import UpcomingReminders from "../components/UpcomingReminders";
import ReminderTimeline from "../components/ReminderTimeline";
import CompletedReminders from "../components/CompletedReminders";
import ReminderCategories from "../components/ReminderCategories";

function Reminders() {
  return (
    <MainLayout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
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
          <ReminderForm />

          <UpcomingReminders />
        </div>

        <ReminderTimeline />

        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "1fr 1fr",

            gap: "24px",
          }}
        >
          <CompletedReminders />

          <ReminderCategories />
        </div>
      </div>
    </MainLayout>
  );
}

export default Reminders;