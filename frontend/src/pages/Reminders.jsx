import { useState } from "react";

import MainLayout from "../layouts/MainLayout";

import ReminderTimeline from "../components/ReminderTimeline";
import ReminderCategories from "../components/ReminderCategories";
import RemindersCard from "../components/RemindersCard";

import ReminderModal from "../components/ReminderModal";
import ReminderDetailsModal from "../components/ReminderDetailsModal";

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

        <ReminderTimeline />

        <ReminderCategories />
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