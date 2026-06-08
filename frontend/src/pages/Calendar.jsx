import MainLayout from "../layouts/MainLayout";

import CalendarGrid from "../components/CalendarGrid";
import CalendarSidebar from "../components/CalendarSidebar";

function Calendar() {
  return (
    <MainLayout>
      <div
        style={{
          display: "flex",

          gap: "24px",

          height: "calc(100vh - 140px)",
        }}
      >
        <CalendarGrid />

        <div
          style={{
            width: "320px",
          }}
        >
          <CalendarSidebar />
        </div>
      </div>
    </MainLayout>
  );
}

export default Calendar;