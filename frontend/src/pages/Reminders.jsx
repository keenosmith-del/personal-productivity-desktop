import { useState } from "react";

import MainLayout from "../layouts/MainLayout";

import RemindersCard from "../components/Reminders/RemindersCard";
import ReminderModal from "../components/Reminders/ReminderModal";
import ReminderDetailsModal from "../components/Reminders/ReminderDetailsModal";
import SearchBar from "../components/SearchBar";
import ReminderOverview from "../components/Reminders/ReminderOverview";

function Reminders() {
  const [showReminderModal,
    setShowReminderModal] =
    useState(false);

  const [selectedReminder,
    setSelectedReminder] =
    useState(null);

  const [editingReminder,
    setEditingReminder] =
    useState(null);
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
          <ReminderOverview />

          <RemindersCard
            onNewReminder={() =>
              setShowReminderModal(true)
            }
            onViewReminder={
              setSelectedReminder
            }
            onEditReminder={
              setEditingReminder
            }
          />
        </div>

      </div>
      {showReminderModal && (
        <ReminderModal
          onClose={() =>
            setShowReminderModal(false)
          }
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
        />
      )}
    </MainLayout>
  );
}

export default Reminders;