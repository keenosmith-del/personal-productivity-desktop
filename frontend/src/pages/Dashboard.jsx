import MainLayout from "../layouts/MainLayout";

import { useState } from "react";

import AnalyticsCard from "../components/Dashboard/AnalyticsCard";
import WeatherWidget from "../components/Dashboard/WeatherWidget";
import ClockWidget from "../components/Dashboard/ClockWidget";
import DashboardModal from "../components/Dashboard/DashboardModal";
import GlassCard from "../components/GlassCard";

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

          <GlassCard minHeight="180px">
            <div
              style={{
                height: "100%",

                display: "flex",

                flexDirection: "column",
              }}
            >
              <h2
                style={{
                  fontWeight: "400",

                  marginBottom: "16px",
                }}
              >
                Recent Activity
              </h2>

              <div
                style={{
                  display: "flex",

                  flexDirection: "column",

                  gap: "10px",
                }}
              >

                <div>
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      marginBottom: "4px",
                    }}
                  >
                    <span
                      style={{
                        padding: "4px 8px",

                        borderRadius: "999px",

                        fontSize: "0.7rem",

                        background: "#c59c7033",

                        border:
                          "1px solid #c59c7066",
                      }}
                    >
                      Goal
                    </span>

                    <span
                      style={{
                        fontSize: "0.75rem",

                        color:
                          "var(--text-secondary)",
                      }}
                    >
                      Yesterday
                    </span>
                  </div>

                  <p
                    style={{
                      fontWeight: "300",
                    }}
                  >
                    Frontend Role progress +10%
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>

          <AnalyticsCard
            title="Progress"
            value="78%"
            subtitle="Weekly completion"
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
              subtitle="Items"

              chips={[
                {
                  label: "Task",
                  color: "#72715c",
                },
                {
                  label: "Reminder",
                  color: "#83545c",
                },
              ]}

              clickable
              onClick={() =>
                setModalData({
                  title: "Due Today",

                  items: [
                    {
                      title:
                        "Complete Portfolio Review",

                      entity: "Task",

                      priority: "High",
                    },

                    {
                      title:
                        "Doctor Appointment",

                      entity: "Reminder",
                    },
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
              title="Tomorrow"
              value="3"
              subtitle="Scheduled"

              chips={[
                {
                  label: "Goal",
                  color: "#c59c70",
                },
                {
                  label: "Project",
                  color: "#854c49",
                },
                {
                  label: "Reminder",
                  color: "#83545c",
                },
              ]}

              clickable
              onClick={() =>
                setModalData({
                  title: "Tomorrow",

                  items: [
                    {
                      title:
                        "Portfolio Launch Goal",

                      entity: "Goal",
                    },

                    {
                      title:
                        "Productivity App Milestone",

                      entity: "Project",
                    },

                    {
                      title:
                        "Weekly Review",

                      entity: "Reminder",
                    },
                  ],
                })
              }
            />

            <AnalyticsCard
              title="Attention"
              value="4"
              subtitle="Needs focus"

              chips={[
                {
                  label: "High",
                  color: "#ab3130",
                },
                {
                  label: "Medium",
                  color: "#62929e",
                },
              ]}

              clickable
              onClick={() =>
                setModalData({
                  title: "Attention",

                  items: [
                    {
                      title:
                        "Finish React Assignment",

                      entity: "Task",

                      priority: "High",
                    },

                    {
                      title:
                        "Update Portfolio",

                      entity: "Task",

                      priority: "High",
                    },

                    {
                      title:
                        "Review Meeting Notes",

                      entity: "Task",

                      priority: "Medium",
                    },

                    {
                      title:
                        "Calendar Improvements",

                      entity: "Task",

                      priority: "Medium",
                    },
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
              title="Projects"
              value="3"
              subtitle="Active Projects"

              chips={[
                {
                  label: "Work",
                  color: "#063f47",
                },
                {
                  label: "Study",
                  color: "#297376",
                },
              ]}

              clickable
              onClick={() =>
                setModalData({
                  title: "Projects",

                  items: [
                    {
                      title:
                        "Portfolio Website",

                      entity: "Project",

                      category: "Work",
                    },

                    {
                      title:
                        "Productivity App",

                      entity: "Project",

                      category: "Study",
                    },

                    {
                      title:
                        "Job Search Tracker",

                      entity: "Project",

                      category: "Personal",
                    },
                  ],
                })
              }
            />

            <AnalyticsCard
              title="Goals"
              value="3"
              subtitle="Active Goals"

              chips={[
                {
                  label: "Work",
                  color: "#063f47",
                },
                {
                  label: "Study",
                  color: "#297376",
                },
              ]}

              clickable
              onClick={() =>
                setModalData({
                  title: "Goals",

                  items: [
                    {
                      title:
                        "Frontend Developer Role",

                      entity: "Goal",

                      category: "Work",
                    },

                    {
                      title:
                        "Complete AI Diploma",

                      entity: "Goal",

                      category: "Study",
                    },

                    {
                      title:
                        "Launch Portfolio Website",

                      entity: "Goal",

                      category: "Personal",
                    },
                  ],
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
        />
      )}
    </MainLayout>
  );
}

export default Dashboard;