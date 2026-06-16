import { useState } from "react";

import MainLayout from "../layouts/MainLayout";

import { initialReminders } from "../data/reminders";

import RemindersCard from "../components/Reminders/RemindersCard";
import ReminderModal from "../components/Reminders/ReminderModal";
import ReminderDetailsModal from "../components/Reminders/ReminderDetailsModal";
import SearchBar from "../components/SearchBar";
import ReminderOverview from "../components/Reminders/ReminderOverview";

import Toast from "../components/Toast";

function Reminders() {
  // COMPONENT STATES
  const [showReminderModal,
    setShowReminderModal] =
    useState(false);

  const [selectedReminder,
    setSelectedReminder] =
    useState(null);

  const [editingReminder,
    setEditingReminder] =
    useState(null);

  const [reminders, setReminders] =
    useState(initialReminders);

  const [toast, setToast] =
    useState("");

  const [lastDeletedReminder,
    setLastDeletedReminder] =
    useState(null);

  const [completionTimeout,
    setCompletionTimeout] =
    useState(null);

  const [showClear,
    setShowClear] =
    useState(false);

  // FUNCTIONS
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
            setLastDeletedReminder={
              setLastDeletedReminder
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
          onSave={(newReminder) => {
            setReminders((prev) => [
              newReminder,
              ...prev,
            ]);

            setToast("Reminder created");

            setTimeout(() => {
              setToast("");
            }, 3000);

            setShowReminderModal(false);
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
          onSave={(updatedReminder) => {
            setReminders((prev) =>
              prev.map((reminder) =>
                reminder.id === updatedReminder.id
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

            setEditingReminder(null);
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
                onClick={() => {
                  setReminders([]);

                  setLastDeletedReminder(
                    null
                  );

                  setToast("Reminders cleared");

                  setTimeout(() => {
                    setToast("");
                  }, 3000);

                  setShowClear(
                    false
                  );
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
        actionLabel={
          lastDeletedReminder
            ? "Undo"
            : null
        }
        onAction={() => {
          if (!lastDeletedReminder)
            return;

          setReminders((prev) => [
            lastDeletedReminder,
            ...prev,
          ]);

          setLastDeletedReminder(null);

          setToast("");
        }}
      />
    </MainLayout>
  );
}

export default Reminders;