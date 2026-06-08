import MainLayout from "../layouts/MainLayout";

import AnalyticsCard from "../components/AnalyticsCard";
import WeatherWidget from "../components/WeatherWidget";
import ClockWidget from "../components/ClockWidget";

function Dashboard() {
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
            title="Progress"
            value="78%"
            subtitle="Weekly completion"
            wide
          />

          <AnalyticsCard
            title="Goals"
            value="3"
            subtitle="Active goals"
            wide
          />

          <AnalyticsCard
            title="Productivity Score"
            value="82%"
            subtitle="This week"
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
              value="Jun 7"
              subtitle="2026"
            />

            <AnalyticsCard
              title="Due Today"
              value="2"
              subtitle="Tasks due"
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
              title="Upcoming"
              value="1"
              subtitle="Events tomorrow"
            />

            <AnalyticsCard
              title="Tasks"
              value="8"
              subtitle="Open tasks"
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
              title="Focus Time"
              value="14h"
              subtitle="Last 7 days"
            />

            <AnalyticsCard
              title="Current Streak"
              value="12"
              subtitle="Days active"
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Dashboard;