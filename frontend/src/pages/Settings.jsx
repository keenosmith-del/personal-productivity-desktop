import MainLayout from "../layouts/MainLayout";

import { useState } from "react";

import WorkingHoursModal from "../components/WorkingHoursModal";
import DefaultReminderModal from "../components/DefaultReminderModal";
import AppearanceSettings from "../components/AppearanceSettings";
import NotificationSettings from "../components/NotificationSettings";
import ProductivityPreferences from "../components/ProductivityPreferences";
import AccountSettings from "../components/AccountSettings";

function Settings() {
  // COMPONENT STATES
  const [
    showWorkingHoursModal,
    setShowWorkingHoursModal,
  ] = useState(false);

  const [
    showReminderModal,
    setShowReminderModal,
  ] = useState(false);

  //FUNCTIONS
  return (
    <MainLayout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <AppearanceSettings />

        <NotificationSettings />

        <ProductivityPreferences
          onWorkingHoursClick={() =>
            setShowWorkingHoursModal(true)
          }
          onReminderClick={() =>
            setShowReminderModal(true)
          }
        />

        <AccountSettings />
      </div>
      {showWorkingHoursModal && (
        <WorkingHoursModal
          onClose={() =>
            setShowWorkingHoursModal(
              false
            )
          }
        />
      )}

      {showReminderModal && (
        <DefaultReminderModal
          onClose={() =>
            setShowReminderModal(
              false
            )
          }
        />
      )}
    </MainLayout>

  );
}

export default Settings;