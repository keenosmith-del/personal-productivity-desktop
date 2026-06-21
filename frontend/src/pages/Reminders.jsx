import { useState, useEffect } from "react";

import MainLayout from "../layouts/MainLayout";

import {
  getReminders,
  createReminder,
  updateReminder,
  deleteReminder,
  clearAllReminders,
} from "../services/reminderService";

import RemindersCard from "../components/Reminders/RemindersCard";
import ReminderModal from "../components/Reminders/ReminderModal";
import ReminderDetailsModal from "../components/Reminders/ReminderDetailsModal";
import SearchBar from "../components/SearchBar";
import ReminderOverview from "../components/Reminders/ReminderOverview";

import Toast from "../components/Toast";

function Reminders() {
  // COMPONENT STATES
  const [reminders, setReminders] =
    useState([]);

  const [showReminderModal,
    setShowReminderModal] =
    useState(false);

  const [selectedReminder,
    setSelectedReminder] =
    useState(null);

  const [editingReminder,
    setEditingReminder] =
    useState(null);

  const [toast, setToast] =
    useState("");

  const [completionTimeout,
    setCompletionTimeout] =
    useState(null);

  const [showClear,
    setShowClear] =
    useState(false);

  // FUNCTIONS
  const loadReminders = async () => {
    try {
      const data =
        await getReminders();

      setReminders(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadReminders();
  }, []);
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

            gridTemplateColumns: "1fr 1fr",

            gap: "24px",
          }}
        >
          <RemindersCard
            reminders={reminders}
            setReminders={setReminders}
            toast={toast}
            setToast={setToast}

            onNewReminder={() =>
              setShowReminderModal(true)
            }
            onViewReminder={
              setSelectedReminder
            }
            onEditReminder={
              setEditingReminder
            }

            completionTimeout={completionTimeout}
            setCompletionTimeout={setCompletionTimeout}
            onClearAll={() =>
              setShowClear(true)
            }
          />

          <ReminderOverview
            reminders={reminders}
          />
        </div>

      </div>
      {showReminderModal && (
        <ReminderModal
          onClose={() =>
            setShowReminderModal(false)
          }
          onSave={(reminderData) => {
            createReminder(reminderData)
              .then((newReminder) => {
                setReminders((prev) => [
                  newReminder,
                  ...prev,
                ]);

                setToast(
                  "Reminder created"
                );

                setTimeout(() => {
                  setToast("");
                }, 3000);

                setShowReminderModal(
                  false
                );
              })
              .catch((error) => {
                console.error(error);

                setToast(
                  "Failed to create reminder"
                );

                setTimeout(() => {
                  setToast("");
                }, 3000);
              });
          }}
        />
      )}
      {selectedReminder && (
        <ReminderDetailsModal
          reminder={selectedReminder}
          onClose={() =>
            setSelectedReminder(null)
          }
        />
      )}
      {editingReminder && (
        <ReminderModal
          mode="edit"
          reminder={editingReminder}
          onClose={() =>
            setEditingReminder(null)
          }
          onSave={(reminderData) => {
            updateReminder(
              editingReminder._id,
              reminderData
            )
              .then((updatedReminder) => {
                setReminders((prev) =>
                  prev.map((reminder) =>
                    reminder._id ===
                      updatedReminder._id
                      ? updatedReminder
                      : reminder
                  )
                );

                setToast(
                  "Reminder updated"
                );

                setTimeout(() => {
                  setToast("");
                }, 3000);

                setEditingReminder(
                  null
                );
              })
              .catch((error) => {
                console.error(error);

                setToast(
                  "Failed to update reminder"
                );

                setTimeout(() => {
                  setToast("");
                }, 3000);
              });
          }}
        />
      )}
      {showClear && (
        <div
          onClick={() =>
            setShowClear(
              false
            )
          }
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(12px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000,
          }}
        >
          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            style={{
              width: "400px",
              padding: "28px",
              borderRadius: "24px",
              background: "rgba(20,20,20,0.85)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <h3
              style={{
                marginBottom: "12px",
                fontWeight: "400",
              }}
            >
              Clear reminders?
            </h3>

            <p
              style={{
                color:
                  "var(--text-secondary)",
                marginBottom: "24px",
              }}
            >
              This action cannot be undone.
            </p>

            <div
              style={{
                display: "flex",
                justifyContent:
                  "flex-end",
                gap: "12px",
              }}
            >
              <button
                onClick={() =>
                  setShowClear(
                    false
                  )
                }
                style={{
                  background: "transparent",

                  border: "1px solid rgba(255,255,255,0.08)",

                  borderRadius: "999px",

                  padding: "8px 14px",

                  color: "#ff6b6b",

                  fontSize: "0.85rem",

                  fontWeight: "400",

                  cursor: "pointer",

                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color =
                    "#ff6b6b";

                  e.currentTarget.style.background =
                    "rgba(255,255,255,0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color =
                    "#ff6b6b";

                  e.currentTarget.style.background =
                    "transparent";
                }}
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  try {
                    await clearAllReminders();

                    setReminders([]);

                    setToast(
                      "Reminders cleared"
                    );

                    setTimeout(() => {
                      setToast("");
                    }, 3000);

                    setShowClear(false);
                  } catch (error) {
                    console.error(error);

                    setToast(
                      "Failed to clear reminders"
                    );

                    setTimeout(() => {
                      setToast("");
                    }, 3000);
                  }
                }}

                style={{
                  background: "transparent",

                  border: "1px solid rgba(255,255,255,0.08)",

                  borderRadius: "999px",

                  padding: "8px 14px",

                  color: "var(--text-secondary)",

                  fontSize: "0.85rem",

                  fontWeight: "400",

                  cursor: "pointer",

                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color =
                    "var(--text-primary)";

                  e.currentTarget.style.background =
                    "rgba(255,255,255,0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color =
                    "var(--text-secondary)";

                  e.currentTarget.style.background =
                    "transparent";
                }}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
      <Toast
        message={toast}
      />
    </MainLayout>
  );
}

export default Reminders;