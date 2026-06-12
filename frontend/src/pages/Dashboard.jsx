import MainLayout from "../layouts/MainLayout";

import { useState } from "react";

import AnalyticsCard from "../components/Dashboard/AnalyticsCard";
import WeatherWidget from "../components/Dashboard/WeatherWidget";
import ClockWidget from "../components/Dashboard/ClockWidget";
import DashboardModal from "../components/Dashboard/DashboardModal";

function Dashboard() {
  const [modalData, setModalData] =
    useState(null);
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
              clickable
              onClick={() =>
                setModalData({
                  title: "Due Today",
                  items: [
                    "Complete Portfolio Review",
                    "Finish React Assignment",
                  ],
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
              title="Upcoming"
              value="1"
              subtitle="Events tomorrow"
              clickable
              onClick={() =>
                setModalData({
                  title: "Upcoming",
                  items: [
                    "Team Meeting",
                    "Goal Review",
                  ],
                })
              }
            />

            <AnalyticsCard
              title="Tasks"
              value="8"
              subtitle="Open tasks"
              clickable
              onClick={() =>
                setModalData({
                  title: "Open Tasks",
                  items: [
                    "Dashboard Redesign",
                    "Notes Page",
                    "Calendar Improvements",
                  ],
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
      {modalData && (
        <DashboardModal
          title={modalData.title}
          items={modalData.items}
          onClose={() =>
            setModalData(null)
          }
        />
      )}
    </MainLayout>
  );
}

export default Dashboard;